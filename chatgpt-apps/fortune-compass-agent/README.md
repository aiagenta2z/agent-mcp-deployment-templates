[Agent MCP Ranking](https://deepnlp.org/agent/rankings) | [AI Agent Marketplace](https://deepnlp.org/store/ai-agent) | [AI Agent A2Z Deployment](https://deepnlp.org/doc/agent_mcp_deployment) | [A2Z Agent Payment](https://deepnlp.org/agent/agent-a2z-payment) | [Agent Router](https://deepnlp.org/agent/onekey-ai-agent-router)

# 🧭 Fortune Compass Agent

Try Playground URL: https://agent.deepnlp.org/?agent=derekzz/fortune-compass-agent 

LiveMCP URL (Use in various Clients):  https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp 

**H5**
prompt: Should I quit my current job in 2026?

<img src="https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/docs/tarot_snapshot.png" style="height:400px;" alt="AI Agent A2Z Tarot">


### Features
An AI-powered fortune telling divination Agent (ChatGPT App/MCP) that integrates traditional **Tarot**, **Zhouyi (I Ching)**, and **Guangong Oracle** into a unified digital experience. The agent performs real-world drawing logic (shuffling and orientation) and uses LLM intelligence to interpret the results. 


Deploy at AI Agent A2Z Agent [Workspace](https://deepnlp.org/workspace/deploy) [Doc](https://deepnlp.org/doc/agent_mcp_deployment) and Live URL [https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp](https://derekzz.aiagenta2z.com/fortune-compass-agent/mcp)

![Fortune Compass ace-of-wands.jpg](https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/assets/tarot/ace-of-wands.jpg)
![Fortune Compass ace-of-swords.jpg](https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/assets/tarot/ace-of-swords.jpg)
![API Requests](https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/docs/fortune_compass_traffic_monitor.png)


---

## 🔮 Agent ChatGPT App Features

### 🃏 Tarot
* **Complete Deck:** Randomly draws from all 78 cards.
* **Orientation Logic:** 1. Simulates a physical draw with a 50/50 chance.
    2. If `0`: Display the **Upright** meaning.
    3. If `1`: Display the **Reversed** meaning.
* **Example Prompt:** *"What should I focus on to succeed in my career right now?"*


### ☯️ Zhouyi (I Ching)
* **Hexagram Generation:** Generates a 6-line hexagram using randomized binary logic ($2^6 = 64$ combinations).
* **Binary Mapping:** Maps results to specific assets based on binary strings (e.g., `000000.jpg`).

### 🏮 Guangong Oracle
* **Divine Lots:** Traditional temple-style randomized draws for spiritual guidance.

---

## 🚀 Getting Started

Start Usage and tell the fortune of your future!

###  Clients (Cursor, ChatGPT App, Claude Code)
```
{
    "fortune-compass-agent-live": {
      "url": "derekzz.aiagenta2z.com/fortune-compass-agent/mcp"
    }
}
```

### Agent Router

[Playground](https://agent.deepnlp.org/?url=derekzz.aiagenta2z.com/fortune-compass-agent/mcp&agent=derekzz/fortune-compass-agent)

### 1. Installation & Build
Install dependencies and compile the TypeScript source code into executable JavaScript:

```bash
pnpm install
pnpm build
```


```bash
# Start the static file server (Port 4444)
pnpm run serve &
# Start the main agent server
pnpm start
```

Change port
```bash
PORT=9000 pnpm start
```


### 2. Tool
The agent exposes the following primary tool to the LLM:

`tell_fortune`: Tell Your Fortune by Divination via Tarot, ZhouYi, or Guangong Drawing and Asking
prompt: The question you want to ask
method: all,tarot,zhouyi,guangong


### 3. Deployment

Deploy to [DeepNLP Workspalce](https://deepnlp.org/workspace/deploy) and Live URL(https://derekzz.aiagenta2z.fortune-compass-agent/mcp)


### 4. Realtime API Calls Dashboard
This is the API Dashboard for Incoming Traffic of Hosted *.aiagenta2z.com agents 

![API Requests](https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/docs/fortune_compass_traffic_monitor.png)


### 5. AI Agent Monetization (Credits Earned)

The fortune compass UI Agent(ChatGPT App) has tell_fortune tool, which is charged 1000 credits/1k API Calls (1 credits worth 0.01 USD) in the DeepNLP x AI Agent A2Z credits program and the rate is set in the detail pages [Fortune Compass Agent](https://deepnlp.org/store/ai-agent/ai-agent/pub-derekzz/fortune-compass-agent). And the credits earned can be easily tracked in the [Billing Account](https://www.deepnlp.org/workspace/billing) as well as the [API dashboard](https://deepnlp.org/workspace/api_dashboard)

![API Requests](https://raw.githubusercontent.com/AI-Hub-Admin/fortune-compass-agent/refs/heads/main/docs/fortune_compass_credits_earned.jpg)



