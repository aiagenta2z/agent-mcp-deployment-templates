"""
FastMCP quickstart example.

Run from the repository root:
    uv run examples/snippets/servers/fastmcp_quickstart.py
"""

import uuid
from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Demo", json_response=True)

# Add an addition tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# Add a dynamic greeting resource
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"


# Add a prompt
@mcp.prompt()
def greet_user(name: str, style: str = "friendly") -> str:
    """Generate a greeting prompt"""
    styles = {
        "friendly": "Please write a warm, friendly greeting",
        "formal": "Please write a formal, professional greeting",
        "casual": "Please write a casual, relaxed greeting",
    }

    return f"{styles.get(style, styles['friendly'])} for someone named {name}."

### Deployment
import contextlib
from starlette.applications import Starlette
from starlette.routing import Mount, Route
from starlette.responses import JSONResponse

@contextlib.asynccontextmanager
async def lifespan(app: Starlette):
    # STARTUP: Initialize Perplexity Agent
    print("--- APPLICATION STARTUP ---")
    # Agent is already initialized at module level
    # If needed, we can add async initialization here

    async with mcp.session_manager.run():
        yield

    # SHUTDOWN: Cleanup
    print("--- APPLICATION SHUTDOWN ---")
    # PerplexityAgent doesn't require explicit cleanup

async def get_mcp_root_id_handler(request):
    """
    This function handles the GET request to the root of the MCP application (i.e., /mcp).
    """
    unique_id = "quickstart/mcp_python"
    return JSONResponse({"id": unique_id})

# --- Starlette Route Function (for the main / route) ---
async def starlette_root_id_endpoint(request):
    """
    Starlette endpoint to serve the root path of the main application: http://<server>:7004/
    """
    unique_id = str(uuid.uuid4())[:8]
    return JSONResponse({"app_root_id": unique_id})

## Route: single endpoint, Mount: /xxx all the subsequent urls
mcp_app = mcp.streamable_http_app()
mcp_app.routes.insert(
    0, Route("/mcp", get_mcp_root_id_handler, methods=["GET"])
)

## GET /mcp : 1. Mount("/", app=mcp_app) -> 2. mcp_app.Route, e.g. http://0.0.0.0:7004/
## POST /mcp : 1. Mount("/", app=mcp_app) -> 3. mcp_app里面 /json_rpc handler

# Mount using Host-based routing
app = Starlette(
    routes=[
        Mount("/", app=mcp_app),
    ],
    lifespan=lifespan,
)

# Define the argument parser
def parse_args():
    """Parses command line arguments for the server port."""
    import argparse

    parser = argparse.ArgumentParser(description="Run Deployment Agent")
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="The port number on which to run the server.",
    )
    return parser.parse_args()

# Run with streamable HTTP transport
if __name__ == "__main__":
    """
    """
    import argparse
    import os

    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=7004)
    args = parser.parse_args()

    print(f"Starting MCP server on port {args.port}")
    os.environ["MCP_SERVER_URL"] = f"http://0.0.0.0:{args.port}/mcp"
    mcp.run("streamable-http")
