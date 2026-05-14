"""
"""


import uuid
from starlette.applications import Starlette
from starlette.exceptions import HTTPException
from starlette.responses import JSONResponse, StreamingResponse, HTMLResponse
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles
from starlette.requests import Request
import sys
from pathlib import Path
from fastapi.templating import Jinja2Templates

# ----- Constants -----
KEY_USER_ID = "user_id"
KEY_COOKIE_USER_ID = "deepnlp_user_id"
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
SRC_DIR = Path(__file__).resolve().parent
STATIC_DIR = ROOT_DIR / "static"
ASSETS_DIR = ROOT_DIR / "assets"

STATIC_DIR.mkdir(parents=True, exist_ok=True)
ASSETS_DIR.mkdir(parents=True, exist_ok=True)
print(f"✅ STATIC_DIR created at: {STATIC_DIR.resolve()}")
print(f"✅ ASSETS_DIR created at: {ASSETS_DIR.resolve()}")

if str(ASSETS_DIR) not in sys.path:
    sys.path.insert(0, str(ASSETS_DIR))  # put at highest priority
    print (f"Appending {ASSETS_DIR} to sys.path")

# ----- Web ------
templates = Jinja2Templates(directory="static")


# ----- Utils -----
def generate_session_id() -> str:
    return f"SESSION_{str(uuid.uuid4())[:8]}"

def generate_user_id() -> str:
    return f"TEMP_{str(uuid.uuid4())[:4]}"

async def main_entry(request: Request) -> HTMLResponse:
    """
        endpoint: /, responsible for APIs and more
    """
    user_id = request.cookies.get(KEY_COOKIE_USER_ID)
    try:
        response = templates.TemplateResponse(
            "craftsman_agent_app.html",
            {
                "request": request,
                "user_id": user_id
            }
        )

        return response

    except Exception as e:
        print (f"DEBUG: main_entry failed with error {e}")
        user_id = generate_user_id()
        response = templates.TemplateResponse(
            "craftsman_agent_app.html",
            {
                "request": request,
                "user_id": user_id
            }
        )
        return response


### Main Index of the website
async def main_index(request: Request) -> HTMLResponse:
    user_info = {}
    user_id = user_info.get(KEY_USER_ID, "") if user_info is not None else ""

    if user_id == "":
        user_id = request.cookies.get(KEY_COOKIE_USER_ID)
        print (f"INFO: /main_index user not logged in check client cookie user_id: {user_id}")

    if not user_id:
        user_id = generate_user_id()
        print(f"INFO: /main_index user_id not in cookie or logged in before session_id not in server state, generation new|{user_id}")
    else:
        print (f"INFO: /main_index user_id exist in cookie|{user_id}")
    try:
        response = templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "user_id": user_id
            }
        )

        # put both logged in and unlogged in user_id in the cooki and update
        response.set_cookie(
            key=KEY_COOKIE_USER_ID,
            value=user_id,
            max_age=60 * 60 * 24 * 30
        )

        return response

    except Exception as e:
        print (f"ERROR: main_entry failed with error {e}")
        user_id = generate_user_id()
        response = templates.TemplateResponse(
            "index.html",
            {
                "request": request,
                "user_id": user_id
            }
        )
        return response


async def lifespan(app: Starlette):
    """
        Initialization of Background Tasks
    :param app:
    :return:
    """
    yield

## Static endpoint
# Mount using Host-based routing
## the order if routes matters, put everything before the final mcp_app (which internally add /mcp and /messages endpoints)
app = Starlette(
    routes=[
        Route("/", main_index, methods=["GET"]),
        Mount("/static", app=StaticFiles(directory=str(STATIC_DIR.resolve()), html=True), name="static"),
        Mount("/assets", app=StaticFiles(directory=str(ASSETS_DIR.resolve()), html=True), name="assets")
    ],
    lifespan=lifespan,
)

def run_agent_server():
    """
    """

def main():
    run_agent_server()

# Run with streamable HTTP transport
if __name__ == "__main__":
    main()
