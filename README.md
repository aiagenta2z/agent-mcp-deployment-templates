

# Agent MCP Deployment Platform - AI Agent A2Z Middleware
AI Agent and MCP Server Hosting and Deployment Service. Agent and MCP Deployment Middleware and Hosting Infrastructure - DeepNLP x AI Agent A2Z

[Website](https://www.deepnlp.org/workspace/deploy) | [GitHub](https://github.com/aiagenta2z/agent_mcp_deployment) | [AI Agent Marketplace](https://www.deepnlp.org/store/ai-agent) | [AI Agent A2Z](https://www.aiagenta2z.com)

## Introduction

DeepNLP x AI Agent A2Z (aiagenta2z.com) provide public hosting service of AI Agent and MCP Deployment. Users can get a unique live subdomain endpoint for their agent/mcp project, which can be distributed and used in ChatGPT Apps Store, Cursor, etc to connect and use
, e.g. Live URL: `${owner_name}.aiagenta2z.com/${repo_name}/mcp`

[Visit Deployment Panel](https://www.deepnlp.org/workspace/deploy)

### Features

1. Various Deployment methods: template, github_repo, and source code
2. GitHub/Source Code: Support both Python/Typescript, which is just like how you start your Agent locally, you can deploy in our cloud container and save money of without the heavy cost of renting a cloud server or get a domain name by yourself.
3. Templates: We provides 20+ templates in various business models, such as `selling product` and `digital resources` e-commerce products agent/mcps as resources, vendors and content creators can expose their physical goods, digital resources (documents,files,online courses) etc to ChatGPT/Cursor.
4. SubDomain URL: Each user can have a unique subdomain URL for your agents, able to verification and hosting services.
5. Domain Verification: We support subdomain verification for various platforms, such as OpenAI, WeCom, WeChat, DingTalk, etc.
6. API Monitor and Credit Rewards: You can visit the [Deployed Agent API Dashboard](https://deepnlp.org/workspace/api_dashboard) to see the metric of your Deploy Agent & MCP and [Billing Credits](https://deepnlp.org/workspace/billing) earned.

### Examples Deployed
| Deployment Type  | Framework / Package                              | Example Folder                                                                                                                                                                                                                      | Live URL                                                       | Description                                                                                                                           |
|------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| GitHub Repo      | Quickstart (Typescript)                          | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/quickstart/mcp_typescript)   [`quickstart/mcp_typescript`](quickstart/mcp_typescript/README.md)                                                     | https://quickstart.aiagenta2z.com/mcp_typescript/mcp           | Typescript MCP Quickstart Example                                                                                                     |
| GitHub Repo      | Quickstart (Python)                              | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/quickstart/mcp_python)  [`quickstart/mcp_python`](quickstart/mcp_python/README.md)                                                                  | https://quickstart.aiagenta2z.com/mcp_python/mcp               | Python MCP Quickstart Example                                                                                                         |
| GitHub Repo      | LangChain DeepAgents (Multi-Agents)              | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/langchain_deepagents/deep_research)  [`langchain_deepagents/deep_research`](./langchain_deepagents/deep_research/README.md)                         | https://langchain-ai.aiagenta2z.com/deep_research/chat         | LangChain [Examples](https://github.com/langchain-ai/deepagents) DeepResearch Agent of Tavily and Gemini model                        |
| GitHub Repo      | LangChain DeepAgents (Agents + Skills)           | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/langchain_deepagents/content-builder-agent)  [`langchain_deepagents/content-builder-agent`](./langchain_deepagents/content-builder-agent/README.md) | https://langchain-ai.aiagenta2z.com/content-builder-agent/chat | LangChain [Examples](https://github.com/langchain-ai/deepagents)  AI Content Builder + Image Generation Agent with Skills + Subagents |
| GitHub Repo      | ChatGPT Apps SDK                                 | [GitHub](https://github.com/openai/openai-apps-sdk-examples)    [`ChatGPT Apps`](https://github.com/openai/openai-apps-sdk-examples)                                                                                                | https://derekzz.aiagenta2z.com/solar-system_server_python/mcp  | ChatGPT App with MCP + Assets                                                                                                         |
| GitHub Repo      | AgentScope + Qwen3 + Tavily                      | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/agentscope_examples/deep_research_agent)  [`agentscope_examples/deep_research_agent`](./agentscope_examples/deep_research_agent/README.md)          | https://agentscope.aiagenta2z.com/deep_research_agent/chat     | AgentScope Deep Research Live Chat                                                                                                    |
| Source Code      | Python - Perplexity API DeepResearch             | [GitHub](https://github.com/jjjmc/perplexity_agent)  https://github.com/jjjmc/perplexity_agent                                                                                                                                      | https://jjjmc.aiagenta2z.com/perplexity_agent/mcp              | Perplexity API Deep Search Agent                                                                                                      |
| Source Code      | Typescript - Fortune Telling Agent (ChatGPT App) | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/chatgpt-apps/fortune-compass-agent)  [`chatgpt-apps/fortune-compass-agent`](./chatgpt-apps/fortune-compass-agent/README.md)                         | https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp                                                     | Fortune Telling App MCP                                                                                                               |
| Template Product | Deployment Templates                             |                                                                                                                                                                                                                                     | -                                                              | Deployment Template of OpenClaw/E-Commerce/etc                                                                                        |


### Support SDK and Packages

We provide python and typescript runtime suitable for various packages and framework, such as  [langchain](https://www.langchain.com/agents) , [agentscope](https://doc.agentscope.io/tutorial/), etc.

## Quickstart

### 1. Typescript - MCP Server

**Overview**

This typescript MCP server implements one tool `greeting` and one resource `index` (html in assets folder) in a mcp.streamable_http_app() and expose "/mcp" endpoint

**Deployment Steps**

1. Create new AI Service at [AI Service Project](https://deepnlp.org/workspace/my_ai_services) 

The quickstart tutorial is using (quickstart/mcp_typescript) which follows (username/project_name) format, you can change to (${your_user_name}/mcp_typescript)

2. Go to [A2Z Deployment Panel](https://deepnlp.org/workspace/deploy)

Choose Method `Github`

Public URL: https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/quickstart/mcp_typescript

Entry Point Starting Script:

```commandline
pnpm --prefix ./quickstart/mcp_typescript install
pnpm --prefix ./quickstart/mcp_typescript build
pnpm --prefix ./quickstart/mcp_typescript start
```

3. Click `Deploy`

**Results**

You can test the live /mcp URL on your client, such as Cursor, ChatGPT, Claude Code, etc. 

```
{
    "mcpServers": {
        "quickstart-mcp-node": {
          "url": "https://quickstart.aiagenta2z.com/mcp_typescript/mcp"
        }    
    }
}
```

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/quickstart_mcp_node_cursor.png" style="width:500px" alt="Quick start python 1">

Test resource in /assets folder 
```
https://quickstart.aiagenta2z.com/mcp_typescript/assets/index.html
```

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/quickstart_mcp_typescript.png" style="width: 500px" alt="Quick start python 1">

See examples [README.md](quickstart/mcp_typescript/README.md) for more details.

### 2. Python - MCP Server

**Overview**

This server implement two tools `add` `greeting` in a mcp.streamable_http_app() at "/mcp" endpoint

**Deployment Steps**

1. Create new AI Service at [AI Service Project](https://deepnlp.org/workspace/my_ai_services) 

The quickstart tutorial is using (quickstart/mcp_python) which follows (username/project_name) format, you can change to (${your_user_name}/mcp_python)

2.Go to [A2Z Deployment Panel](https://deepnlp.org/workspace/deploy)

Choose Method `Github` 

Public URL: https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/quickstart/mcp_python

Entry Point Starting Script:

```commandline
uvicorn quickstart.mcp_python.server:app
```

3.Click `Deploy`

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/quickstart_mcp_python_1.png" style="width:800px;" alt="Quick start python 1">

**Results**
You can test the live /mcp URL on your client, such as Cursor, ChatGPT, Claude Code, etc.

```
{
    "mcpServers": {
        "quickstart-mcp-python": {
          "url": "https://quickstart.aiagenta2z.com/mcp_python/mcp"
        }    
    }
}
```

See examples [README.md](quickstart/mcp_python/README.md) for more details.

### 3. Typescript - Agent


### 4. Python - Agent



## Tutorial
### 1 Deploy From Source Code

#### 1.1 Python - Case Hosting a Perplexity Deep Research Agent

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/agent_mcp_deployment_panel.png" style="width:800px;" alt="AI Agent Marketplace Category">

Lets' say you want to implement a Perplexity Search API Customized Search API based MCP server and
want to expose a tool  `perplexity_research_agent(messages: List[Dict[str, str]])` `perplexity_search_agent(question: str)` for users to use.

The source code can be found in [GitHub Perpleixty Agent](https://github.com/jjjmc/perplexity_agent)

And you have already prepared below information:

Requirements
```angular2html
## Create a new project and Register AI Service
unique_id: jjjmc/perplexity_agent

## archived source code
git clone https://github.com/jjjmc/perplexity_agent
cd perplexity_agent

## archive the file
tar czvf perplexity_agent.tar.gz ./*
## zip on windows
perplexity_agent.zip

## Drag and Upload to Source

## Starting Command
uvicorn server:app

## pip requirement files in the archived source code perplexity_agent_code.zip
requirements.txt
```

Step 1. Go to `Workspace->Agent Deployment` and visit the [Deployment Workspace](https://www.deepnlp.org/workspace/deploy)

Select the project to deploy 'jjjmc/perplexity_agent'

Step 2. Switch Tab: Custom Python/JS

Drag and drop the source code archive file `perplexity_agent_code.zip` to upload

Step 3. Choose Config and Deploy

`Deploy Region`: `global` for avoid most ip restriction)  
`Entry Point`: Input `uvicorn server:app`, this is the command that you use to start MCP/Agent server locally,
for example we have a server.py file and an app class, and we use `uvicorn` to start the mcp, please avoid specifying any `ports`
and we use assign dynamically.  
`Environment Variables`: We put `PERPLEXITY_API_KEY` and `DEEPNLP_ONEKEY_ROUTER_ACCESS` as key-value pairs in this field. Note that your access key is safe and we will
use pass the keys as variables in the requests to start your service in the container. It's equivalent to `.env` files in your uploaded sources.

```angular2html
PERPLEXITY_API_KEY=xxxxx
DEEPNLP_ONEKEY_ROUTER_ACCESS=xxxxx
```

Step 4. Deploy
Click deploy button and please wait a while for the deployment to complete and you will find your subdomain live url ready!

MCP SERVER URL: `https://jjjmc.aiagenta2z.com/perplexity_agent/mcp `


#### 1.2 Typescript - Case Hosting a Fortune Telling Divination Apps with UI

##### Deployment Steps

The source code can be downloaded from [Github](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/chatgpt-apps/fortune-compass-agent)

**Create AI Service** at [AI Service project](https://deepnlp.org/workspace/my_ai_services)

**Deployment from Source**

Archive your source code to `.zip` or `.tar.gz` file

```angular2html
## archived source code
git clone https://github.com/aiagenta2z/agent-mcp-deployment-templates
cd chatgpt-apps/fortune-compass-agent

## archive the file
tar czvf fortune-compass-agent.tar.gz ./*
## or zip
fortune-compass-agent.zip
```

Step 1. Go to `Workspace->Agent Deployment` and visit the [Deployment Workspace](https://www.deepnlp.org/workspace/deploy)

Select the project to deploy 'your_user_name/fortune-compass-agent'

Step 2. Switch Tab: Custom Python/JS

Drag and drop the source code archive file `fortune-compass-agent.tar.gz` to upload

Step 3. Choose Config and Deploy

`Deploy Region`: `global` for avoid most ip restriction)  
`Entry Point`: this is the command that you use to start MCP/Agent server.

For typescript deployment, we usually use pnpm,npx, etc command to start the server. Since we are building
from source code, the platform will first install dependency, build to ./dist/server.js and start from the js code there.

``` 
pnpm install
pnpm build
pnpm start
```

`Environment Variables`: If applicable 

Step 4. Deploy
Click deploy button and wait for completion.

SERVER URL: `https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp`

``` 
{
   "mcpServers": {
       "fortune-compass-agent-live": {
         "url": "derekzz.aiagenta2z.com/fortune-compass-agent/mcp"
       }
   }
}
```

See [README](./chatgpt-apps/fortune-compass-agent/README.md) for more details


### 2. Deploy From GitHub Repo

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/agent_deployment_github.jpg" style="width:800px;" alt="AI Agent Marketplace Category">

Deployment from Github Repo is as easy as you `git clone` project from web start the mcp/agent server locally.
Imagine you are tenants on a shared hosting cloud service, and you just need to prepare a multi-line `entry_point.sh` shell script to let us know how you want to run the server.

| mode | url |
|----- | ------ |
| public |  example: https://github.com/openai/openai-apps-sdk-examples | build static into /assets and start server uvicorn |
| private |  Connect GitHub & Load Private Repos, Allow app 'ai agent a2z' to connect and clone your code | build static into /assets and start server uvicorn |

#### 2.1 ChatGPT App Example

Step 1. Switch Tab to GitHub

Choose `Public URL` or `Private Repository` to allow us to connect to your private GitHub repos.

`GitHub Repository URL`: https://github.com/openai/openai-apps-sdk-examples   
`Deploy Region`: Global or region for your plans applicable

Step 2. Prepare Your Entry Command
`Entry Point (Startup Scripts)`:
This part is important and you might need to try various command.
Hints:
1. Enter one command per line. For multi-process Agent/MCP Deployment (like ChatGPT Apps Solar System), Include both the build and run commands.
2. The last line should be the main MCP/Agent server running command starting with `uvicorn,python,pnpm,npm` etc. Don't include any --port flags, the ports will be assigned automatically.
3. Dependency Installation: Don't add `node or pnpm install`, cloud platform will handle it by reading your package.json, file.
4. Static File Build and Serve: ChatGPT App will build static resources (Html/Css/Js) from the 'src' folder, and we have cached the prebuild example also.
   and you can also put the build command yourself.
5. Static File Serving: The example in the chatgpt app example started two web services: 'pnpm run serve' serve prebuild static file on port 4444, and `uvicorn solar-system_server_python.main:app`
   is the main MCP server starting endpoint. Successfully deployed logs include `Using BASE_URL http://localhost:4444 for generated HTML` and `Uvicorn running on http://0.0.0.0:8000`. You have to make sure your command 'pnpm run serve &' add trailing '&' to run in the backend and prevent blocking the scripts.
6. Any Unknown Failures: Please remember to contact us via raising issues on [GitHub](https://github.com/aiagenta2z/agent_mcp_deployment) and we will help you resolve the issues immediately.

```angular2html
pnpm run build
pnpm run serve &
uvicorn solar-system_server_python.main:app
```

or another app "kitchen-sink-mcp-node"

```angular2html
pnpm run build
pnpm run serve &
pnpm --filter kitchen-sink-mcp-node start
```

`Environment Variables`: If Applicable

Step 3. Deploy
Click deploy button and please wait a while for the deployment process to complete and you will find your subdomain live url ready!

And wait for server to finish and once it's done, you can copy and paste the server url in MCP client such as 'cursor',

MCP SERVER URL: `https://derekzz.aiagenta2z.com/solar-system_server_python/mcp

And you can see if it's deployed successfully!

Copy and Paste into your Client
```json
{
  "chatgpt-solar-system-mcp": {
    "url": "https://derekzz.aiagenta2z.com/solar-system_server_python/mcp"
  }
}
```

See ChatGPT App examples [README.md](chatgpt-apps/fortune-compass-agent/README.md) for more details.


#### 2.2 AgentScope Example-DeepResearch Agent

Example [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/agentscope_examples/deep_research_agent)

We will implement and deploy a agentscope based deep-research agent, converting the original [deep research example](https://github.com/agentscope-ai/agentscope/tree/main/examples/agent/deep_research_agent) to
an FastAPI Server and expose the "/chat" API endpoint so that users can call the deep research agent by parameters `messages` and
get the deep research reports

| Item                     | Description                                               |
|--------------------------|-----------------------------------------------------------|
| unique id                | agentscope/deep_research_agent                       |
| Live Chat URL(POST Only) | https://agentscope.aiagenta2z.com/deep_research_agent/chat |
| Playground               | https://agent.deepnlp.org/?agent=agentscope/deep_research_agent |


You can also use the Agent Router playground (WebUI) to start chatting with your live agents.
Visit the URL https://agent.deepnlp.org/?agent=${unique_id}. Note that the returned streaming chunks
should follow specific formats to work with the Agent Router Web UI. See [Doc](https://github.com/aiagenta2z/agent-mcp-deployment-templates/blob/main/agentscope/deep_research_agent/main_server.py) #assembly_message function for more details

See agentscope examples [README.md](agentscope_examples/deep_research_agent/README.md) for more details.


#### 2.3 LangChain DeepAgents

We wrap two examples `content-builder-agent` and `deep_research` of LangChain DeepAgents multi agents examples and bring it live. 
Example [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/langchain_deepagents)

This guide shows how to convert a **LangChain DeepAgents** content-builder-agent into a production-ready live service using `BaseLiveRuntime` from ai-agent-marketplace

The runtime wraps your agent and exposes a **FastAPI streaming `/chat` endpoint** automatically.

**QuickStart**
```
from ai_agent_marketplace.runtime.base import *

async def content_builder_stream_generator(
    agent: Any,
    user_query: str,
    **kwargs
) -> AsyncGenerator[str, None]:
    """
    """
    ## more

runtime = BaseLiveRuntime(
    agent=agent,
    stream_handler=content_builder_stream_generator
)

## Returned a FastAPI based app with /chat endpoint
app = runtime.app

```

And the detailed deployment steps can be found in
LangChain Deployment examples, please follow [README.md](langchain_deepagents/content-builder-agent/README.md) for more details.

### 3 Deploy From Template (Beta)

#### Use Case 1 Selling products




## Domain Verification

The AI Agent A2Z Agent & MCP platform provides subdomain verification services to help you submit your deploy agents
to various Apps Store and verify that you own the domains, such as ChatGPT App Store, MCP Official Registry, WeCom (Tencent), WeChat, DingTalk, etc.

Go to Deployment -> Deployment Configuration -> Domain Verification tab

You can choose your sites that need to verify for your customized subdomain: https://{username}.aiagenta2z.com
Switch the tab, fill in the filename and content value, the just one click "Verify Domain".

| App                 | Verification URL                                                     |
|---------------------|----------------------------------------------------------------------|
| ChatGPT App Store   | https://{username}.aiagenta2z.com/.well-known/openai-apps-challenge  |
| MCP Official Registry | https://{username}.aiagenta2z.com/.well-known/mcp-register-challenge |
| WeCom (Tencent)     | https://{username}.aiagenta2z.com/WW_verify_xxxxxx.txt               |
| WeChat              | https://{username}.aiagenta2z.com/MP_verify_xxxxxx.txt               |
| DingTalk            | https://{username}.aiagenta2z.com/verify_xxxxxx.txt                  |

<img src="https://raw.githubusercontent.com/aiagenta2z/ai-agent-marketplace/refs/heads/main/docs/verified_domain_list.jpg" style="width: 800px;" alt="AI Agent Marketplace Category">

### 1. ChatGPT App Submission and Domain Verification

On the ChatGPT App Manage Page (https://platform.openai.com/apps-manage), you can submit your AI Agent by filling the form.
You need to prepare a MCP Server URL (e.g. https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp) and copy and paste the
verification code under the file path (https://derekzz.aiagenta2z.com/.well-known/openai-apps-challenge).

<img src="https://raw.githubusercontent.com/aiagenta2z/ai-agent-marketplace/refs/heads/main/docs/domain_verification_before.png" style="width: 800px;" alt="AI Agent Marketplace Category">

You can go to the `Domain Verification` tab of AI Agent A2Z Deployment (https://deepnlp.org/workspace/deploy) platform.

Fill the form of `openai-apps-challenge` with the code on the platform. Then click `Verify Domain` to add a record.
Please wait a while for the record to work. If you want to change the content, just add a new record and the content will be overridden.

<img src="https://raw.githubusercontent.com/aiagenta2z/ai-agent-marketplace/refs/heads/main/docs/domain_verification_after.png" style="width: 800px" alt="AI Agent Marketplace Category">

## Agent API Dashboard 

Agent API Dashboard helps you monitor statistics and credits account

After you have deployed your AI Agent (e.g. https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp). The [Deployed Agent API Dashboard](https://deepnlp.org/workspace/api_dashboard) will monitor the incoming traffic to the endpoint.

You can also visit the detail page to set API credit per call and you can start earn credits from your hard work.
Visit the [Billing Credits](https://deepnlp.org/workspace/billing) for detail reports.

<img src="https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/docs/fortune_compass_traffic_monitor.png" style="width: 800px" alt="AI Agent Marketplace Category">


## Agent Router

Launch Your AI Agent with real user traffic by visiting [Agent Router Website](https://agent.deepnlp.org/),

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/agent_router_example.png" style="width: 800px" alt="Agent Router 2">

You can launch and expose your AI Agent to real users and attract user visit traffic via the Agent Router Web (https://agent.deepnlp.org) by registering either a `/chat` Agent endpoint or a `/mcp` MCP endpoint.

### 1. Agent Router with Chat Endpoint

For agent API with `/chat` endpoint and `messages` input, you can configure your AI Service “API Endpoint” with a POST interface that accepts the `messages` format and returns properly structured streaming chunks (including required fields such as `type`, `format`, `content`, and `message_id`) 
so the Router can correctly render text, markdown, HTML, images, or other MIME types in real time; 

Once configured, access your agent publicly at 
```
https://agent.deepnlp.org/?agent=${unique_id}
```

`${unique_id}` follows `{user_id}/{project_name}` format

```
https://agent.deepnlp.org/?agent=agentscope/deep_research_agent
```

Enabling live routing, streaming UI rendering, and ecosystem exposure.

### 2. Agent Router with MCP Endpoint

To quickly get started with the /mcp endpoint, first click the `Green Add` button. In the panel, switch to the New Agent tab. Enter your MCP name and MCP server URL just as you would in other MCP clients, then click Connect and wait for a successful connection.

Once connected, click Add Agent to complete the setup. Your agent will then be available as a web-based MCP client, allowing you to explore and use its tools and capabilities.

For MCP API with `/mcp` endpoint, use the green button of “Add Cross" in the Router UI to connect your MCP server URL and automatically explore its tools like any MCP client; 
Once configured, access your agent publicly at `https://agent.deepnlp.org/?agent={unique_id}`, enabling live routing, streaming UI rendering, and ecosystem exposure.

Please visit the [Agent Router Docs](agent_router/README.md) for more details.

### 3. Agent MCP Usage Rankings

Agent and MCP APIs Usage Ranking 
https://deepnlp.org/agent/rankings

## Related

[AI Agent Marketplace Registry](https://github.com/aiagenta2z/ai-agent-marketplace)

[Open AI Agent Marketplace](https://www.deepnlp.org/store/ai-agent)

[MCP Marketplace](https://www.deepnlp.org/store/ai-agent/mcp-server)

[OneKey Router AI Agent & MCP Ranking](https://www.deepnlp.org/agent/rankings)

[OneKey Agent MCP Router](https://www.deepnlp.org/agent/onekey-mcp-router)

[OneKey AGent MCP Router Doc](https://deepnlp.org/doc/onekey_mcp_router)

[AI Agent Dataset](https://www.deepnlp.org/store/dataset)

[Gemini Nano Banana Agent](https://agent.deepnlp.org/agent/mcp_tool_use?server=aiagenta2z%2Fgemini_mcp_onekey)     

