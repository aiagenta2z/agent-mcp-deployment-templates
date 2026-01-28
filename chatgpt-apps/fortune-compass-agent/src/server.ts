import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  type CallToolRequest,
  type ListResourcesRequest,
  type ListToolsRequest,
  type ReadResourceRequest,
  type Resource,
  type Tool,
  isInitializeRequest,
} from "@modelcontextprotocol/sdk/types.js";

import { z } from "zod";

import { drawFortune } from "./engine.js"; // your existing fortune logic

/* ------------------------------------------------------------------ */
/* MCP Server Setup */
/* ------------------------------------------------------------------ */

const server = new McpServer({
  name: "fortune-compass",
  version: "0.1.0",
});

const DEBUG_ENABLE = true;

/* ------------------------------------------------------------------ */
/* Paths & helpers */
/* ------------------------------------------------------------------ */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT_DIR, "assets");

function readWidgetHtml(name: string): string {
  const file = path.join(ASSETS_DIR, `${name}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing widget HTML: ${file}`);
  }
  return fs.readFileSync(file, "utf8");
}

/* ------------------------------------------------------------------ */
/* Widget definition */
/* ------------------------------------------------------------------ */

const WIDGET_URI = "ui://widget/fortune-compass.html";
const widgetHtml = readWidgetHtml("fortune-compass");

const widgetMeta = {
  "openai/outputTemplate": WIDGET_URI,
  "openai/widgetAccessible": true,
} as const;

server.resource(
  "fortune-compass-widget",          // internal ID
  WIDGET_URI,                        // resource URI (string)
  {
    description: "A specialized UI widget for fortune telling",
    mimeType: "text/html+skybridge",
    _meta: widgetMeta,
  },
  async (uri: URL) => {
    return {
      contents: [
        {
          uri: uri.toString(),
          mimeType: "text/html+skybridge",
          text: widgetHtml,
          _meta: widgetMeta,
        },
      ],
    };
  }
);

// Define your fortune tool
server.registerTool(
  "tell_fortune",
  {
    title: "Tell Fortune",
    description: "Tell your fortune via Tarot, ZhouYi, or Guangong",
    inputSchema: {
      prompt: z.string().describe("Prompt for fortune telling"),
      method: z
        .enum(["tarot", "zhouyi", "guangong", "all"])
        .default("all")
        .describe("Method of divination"),
    },
  },
  async ({ prompt, method }) => {
    const result = drawFortune(prompt, method);
    return {
      content: [
        {
          type: "text",
          text: Object.values(result)
            .map((f) => `${f.method} (${f.symbol}): ${f.title}`)
            .join("\n\n"),
        },
      ],
      structuredContent: result,
      _meta: {
        "openai/toolInvocation/invoking": "Consulting the Fortune Compass",
        "openai/toolInvocation/invoked": "The oracle has spoken",
      },
    };
  }
);

/* ------------------------------------------------------------------ */
/* HTTP Server */
/* ------------------------------------------------------------------ */
const PORT = Number(process.env.PORT ?? 8000);

// let initialized = false;

let connected = false;


const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
  onsessioninitialized: (sid) => {
    console.log("[mcp] Session initialized:", sid);
  },
  onsessionclosed: (sid) => {
    console.log("[mcp] Session closed:", sid);
  },
});

// await server.connect(transport);
await server.connect(transport);
console.log("[mcp] MCP server connected");

// mcp 1.25 server only initialze once

createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end();
    return;
  }

  // Only handle /mcp path
  if (req.url.startsWith("/mcp")) {
    try {
      // --- LOG HEADERS HERE ---
      if (DEBUG_ENABLE) {
          const reqId = randomUUID();
          console.log("[mcp]---- MCP Headers ------ ", req.method, req.url);
          console.log("\n[mcp:http] ===== Incoming Request =====");
          console.log("[mcp:http] reqId:", reqId);
          console.log("[mcp:http] method:", req.method);
          console.log("[mcp:http] url:", req.url);
          console.log("[mcp] Headers:");
          for (const [key, value] of Object.entries(req.headers)) {
            console.log(`  ${key}: ${value}`);
          }
      }

      // The transport handles both POST (RPC)
      // and GET (SSE/streamable) methods
      await transport.handleRequest(req, res);
    } catch (err) {
      console.error("[mcp] transport error:", err);
      if (!res.headersSent) {
        res.writeHead(500).end("MCP transport error");
      }
    }
    return;
  }

  // Any other route 404s
  res.writeHead(404).end("Not found");
}).listen(PORT, () => {
  console.log(`Fortune Compass MCP server running at http://localhost:${PORT}/mcp`);
});
