import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// Constants
const MCP_SERVER_NAME = "quickstart_mcp_typescript";
const WIDGET_NAME = "index";
const DEBUG_ENABLE = false;
const STATIC_PREFIX = "/assets";
const app = express();
app.use(express.json());
// Create MCP server once
const transports = new Map();
// const server = new McpServer({
//   name: MCP_SERVER_NAME,
//   version: "1.0.0",
// });
function createServer() {
    const server = new McpServer({
        name: MCP_SERVER_NAME,
        version: "1.0.0",
    });
    /* ---------------- Widget ---------------- */
    server.resource(WIDGET_NAME, WIDGET_URI, {
        description: "A specialized UI widget Index",
        mimeType: "text/html+skybridge",
        _meta: widgetMeta,
    }, async (uri) => {
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
    });
    /* ---------------- Tool ---------------- */
    server.registerTool("greet_user", {
        title: "Greet User",
        description: "Generate a greeting prompt",
        inputSchema: {
            name: z.string().describe("Name of User to Greet"),
            style: z
                .enum(["friendly", "formal", "casual"])
                .default("friendly")
                .describe("Styles of Greeting"),
        },
    }, async ({ name, style }) => {
        const styles = {
            friendly: "Please write a warm, friendly greeting",
            formal: "Please write a formal, professional greeting",
            casual: "Please write a casual, relaxed greeting",
        };
        const prompt = `${styles[style] ?? styles.friendly} for someone named ${name}.`;
        return {
            content: [
                {
                    type: "text",
                    text: prompt,
                },
            ],
            _meta: {
                "openai/toolInvocation/invoking": "Greet User Tool",
                "openai/toolInvocation/invoked": "Prompt generated",
            },
        };
    });
    return server;
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT_DIR, "assets");
function readWidgetHtml(name) {
    const file = path.join(ASSETS_DIR, `${name}.html`);
    if (!fs.existsSync(file)) {
        throw new Error(`Missing widget HTML: ${file}`);
    }
    return fs.readFileSync(file, "utf8");
}
// use express server to serve assets instead of serving on 4444
app.use('/assets', express.static(ASSETS_DIR));
/* ------------------------------------------------------------------ */
/* Widget definition */
/* ------------------------------------------------------------------ */
const WIDGET_URI = "ui://widget/index.html";
const widgetHtml = readWidgetHtml("index");
const widgetMeta = {
    "openai/outputTemplate": WIDGET_URI,
    "openai/widgetAccessible": true,
};
// // Resource
// server.resource(
//   WIDGET_NAME,          // internal ID
//   WIDGET_URI,                        // resource URI (string)
//   {
//     description: "A specialized UI widget Index",
//     mimeType: "text/html+skybridge",
//     _meta: widgetMeta,
//   },
//   async (uri: URL) => {
//     return {
//       contents: [
//         {
//           uri: uri.toString(),
//           mimeType: "text/html+skybridge",
//           text: widgetHtml,
//           _meta: widgetMeta,
//         },
//       ],
//     };
//   }
// );
// // Define your fortune tool
// server.registerTool(
//   "greet_user",
//   {
//     title: "Greet User",
//     description: "Generate a greeting prompt",
//     inputSchema: {
//       name: z.string().describe("Name of User to Greet"),
//       style: z
//         .enum(["friendly", "formal", "casual"])
//         .default("friendly")
//         .describe("Styles of Greeting"),
//     },
//   },
//   async ({ name, style }) => {
//     const styles: Record<string, string> = {
//       friendly: "Please write a warm, friendly greeting",
//       formal: "Please write a formal, professional greeting",
//       casual: "Please write a casual, relaxed greeting",
//     };
//
//     const prompt = `${styles[style] ?? styles.friendly} for someone named ${name}.`;
//
//     return {
//       content: [
//         {
//           type: "text",
//           text: prompt,
//         },
//       ],
//       _meta: {
//         "openai/toolInvocation/invoking": "Greet User Tool",
//         "openai/toolInvocation/invoked": "Prompt generated",
//       },
//     };
//   }
// );
// Store transports by session ID
// const transports = new Map<string, StreamableHTTPServerTransport>();
// Change to MCP 1.26 format
// Session - MCP - Transport
app.post("/mcp", async (req, res) => {
    // const sessionIdHeader = req.headers["mcp-session-id"] as string | undefined;
    const sessionId = req.headers["mcp-session-id"];
    let transport;
    // --- LOG HEADERS HERE ---
    if (DEBUG_ENABLE) {
        const reqId = randomUUID();
        console.log("[mcp]---- MCP POST METHOD Headers ------ ", req.method, req.url);
        console.log("\n[mcp:http] ===== Incoming Request =====");
        console.log("[mcp:http] reqId:", reqId);
        console.log("[mcp:http] method:", req.method);
        console.log("[mcp:http] url:", req.url);
        console.log("[mcp] Headers:");
        for (const [key, value] of Object.entries(req.headers)) {
            console.log(`  ${key}: ${value}`);
        }
    }
    if (sessionId && transports.has(sessionId)) {
        transport = transports.get(sessionId);
    }
    else if (!sessionId && isInitializeRequest(req.body)) {
        transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
        });
        transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (sid) => {
                transports.set(sid, transport);
            }
        });
        //  Create fresh server per session
        const server = createServer();
        await server.connect(transport);
    }
    else {
        return res.status(400).json({ error: "Invalid session" });
    }
    await transport.handleRequest(req, res, req.body);
});
app.get("/mcp", async (req, res) => {
    const sessionIdGet = req.headers["mcp-session-id"];
    // --- LOG HEADERS HERE ---
    if (DEBUG_ENABLE) {
        const reqId = randomUUID();
        console.log("[mcp]---- MCP POST METHOD Headers ------ ", req.method, req.url);
        console.log("\n[mcp:http] ===== Incoming Request =====");
        console.log("[mcp:http] reqId:", reqId);
        console.log("[mcp:http] method:", req.method);
        console.log("[mcp:http] url:", req.url);
        console.log("[mcp] Headers:");
        for (const [key, value] of Object.entries(req.headers)) {
            console.log(`  ${key}: ${value}`);
        }
    }
    if (!sessionIdGet || !transports.has(sessionIdGet)) {
        return res.status(400).json({ error: "Missing session" });
    }
    const transport = transports.get(sessionIdGet);
    await transport.handleRequest(req, res);
});
const PORT = Number(process.env.PORT ?? 8000);
app.listen(PORT, () => {
    console.log(`MCP server listening on http://localhost:${PORT}/mcp`);
});
