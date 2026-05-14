import http, { IncomingMessage, ServerResponse } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import crypto from "node:crypto";

// ----- Constants -----
const KEY_USER_ID = "user_id";
const KEY_COOKIE_USER_ID = "deepnlp_user_id";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// typescript/server.ts -> repo root
const ROOT_DIR = path.resolve(__dirname, "..");
const STATIC_DIR = path.join(ROOT_DIR, "static");
const ASSETS_DIR = path.join(ROOT_DIR, "assets");

const ONE_MONTH_SECONDS = 60 * 60 * 24 * 30;

function generateUserId(): string {
  // Python version: TEMP_{first4}
  const id = crypto.randomUUID().replaceAll("-", "").slice(0, 4);
  return `TEMP_${id}`;
}

function parseCookies(req: IncomingMessage): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) return {};

  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (!key) continue;
    out[key] = decodeURIComponent(value);
  }
  return out;
}

function setCookie(res: ServerResponse, key: string, value: string, maxAgeSeconds: number) {
  const cookie = `${key}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
  const existing = res.getHeader("Set-Cookie");
  if (!existing) {
    res.setHeader("Set-Cookie", cookie);
    return;
  }
  if (Array.isArray(existing)) {
    res.setHeader("Set-Cookie", [...existing, cookie]);
    return;
  }
  res.setHeader("Set-Cookie", [existing.toString(), cookie]);
}

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function isSafeChildPath(root: string, candidate: string): boolean {
  const rel = path.relative(root, candidate);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

async function sendFile(res: ServerResponse, filePath: string, sendBody: boolean): Promise<void> {
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not Found");
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", contentTypeFor(filePath));
  res.setHeader("Content-Length", stat.size);
  res.setHeader("Cache-Control", "public, max-age=60");
  if (!sendBody) {
    res.end();
    return;
  }
  const data = await fs.readFile(filePath);
  res.end(data);
}

async function handleMainIndex(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const cookies = parseCookies(req);
  let userId = cookies[KEY_COOKIE_USER_ID];

  if (!userId) {
    userId = generateUserId();
    console.log(
      `INFO: /main_index user_id not in cookie, generate new|${userId}`,
    );
  } else {
    console.log(`INFO: /main_index user_id exist in cookie|${userId}`);
  }

  setCookie(res, KEY_COOKIE_USER_ID, userId, ONE_MONTH_SECONDS);

  // Mirrors the python template variable, even though index.html is static.
  // Kept to preserve behavior parity for future template updates.
  void KEY_USER_ID;

  const indexPath = path.join(STATIC_DIR, "index.html");
  try {
    await sendFile(res, indexPath, (req.method ?? "GET") !== "HEAD");
  } catch (err) {
    console.error(`ERROR: main_index failed reading ${indexPath}:`, err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}

async function handleStatic(req: IncomingMessage, res: ServerResponse, mountPath: string, dir: string) {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);

  if (!pathname.startsWith(mountPath)) {
    res.statusCode = 404;
    res.end("Not Found");
    return;
  }

  const relPath = pathname.slice(mountPath.length).replace(/^\/+/, "");
  const filePath = path.resolve(dir, relPath);
  if (!isSafeChildPath(dir, filePath)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Bad Request");
    return;
  }

  try {
    await sendFile(res, filePath, (req.method ?? "GET") !== "HEAD");
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not Found");
    return;
  }
}

export function createServer() {
  // Ensure folders exist (python version creates them on startup)
  // If they don't exist, create them to prevent runtime crashes in deployments.
  fs.mkdir(STATIC_DIR, { recursive: true })
    .then(() => console.log(`✅ STATIC_DIR created at: ${STATIC_DIR}`))
    .catch((e) => console.error("Failed to ensure STATIC_DIR:", e));

  fs.mkdir(ASSETS_DIR, { recursive: true })
    .then(() => console.log(`✅ ASSETS_DIR created at: ${ASSETS_DIR}`))
    .catch((e) => console.error("Failed to ensure ASSETS_DIR:", e));

  return http.createServer(async (req, res) => {
    try {
      const method = req.method ?? "GET";
      const url = new URL(req.url ?? "/", "http://localhost");

      if (method !== "GET" && method !== "HEAD") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Method Not Allowed");
        return;
      }

      if (url.pathname === "/") {
        await handleMainIndex(req, res);
        return;
      }

      if (url.pathname.startsWith("/static/")) {
        await handleStatic(req, res, "/static", STATIC_DIR);
        return;
      }

      if (url.pathname.startsWith("/assets/")) {
        await handleStatic(req, res, "/assets", ASSETS_DIR);
        return;
      }

      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Not Found");
    } catch (err) {
      console.error("Unhandled request error:", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Internal Server Error");
    }
  });
}

export function main() {
  const host = process.env.HOST ?? "0.0.0.0";
  const port = Number(process.env.PORT ?? "8000");

  const server = createServer();
  server.listen(port, host, () => {
    console.log(`✅ TypeScript static server listening on http://${host}:${port}`);
    console.log(`- GET / -> ${path.join(STATIC_DIR, "index.html")}`);
    console.log(`- Static files at /static/* -> ${STATIC_DIR}`);
    console.log(`- Static files at /assets/* -> ${ASSETS_DIR}`);
  });
}

// Allow running via ts-node / node --loader ts-node/esm, etc.
const entry = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (entry && import.meta.url === entry) main();
