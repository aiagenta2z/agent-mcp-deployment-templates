# AgentScope x AIAgentA2Z Deep Research Agent Example Deployed Live

[AI Agent Marketplace](https://www.deepnlp.org/store/ai-agent) | [GitHub](https://github.com/aiagenta2z/agent-mcp-deployment-templates) | [Agent Deployment](https://deepnlp.org/doc/agent_mcp_deployment) 

This example shows how to deploy the agentscope package deep research agent (tavily search tool/ReAct DeepResearch Agent)
and deploy Live on AI Agent A2Z agent open platform. And we can get a live urls which return streaming chunks such as 
https://agentscope.aiagenta2z.com/deep_research_agent/chat .



## Requirements

1. Deploy From GitHub Source URL: https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/agentscope
2. Prepare Access Key: `DASHSCOPE_API_KEY` and `TAVILY_API_KEY`, you can see example in [AgentScope DeepResearch Example](https://github.com/agentscope-ai/agentscope/blob/main/examples/agent/deep_research_agent/deep_research_agent.py)

And that all you need to deploy a live agents on AI Agent A2Z (*.aiagenta2z.com) and expose a /chat endpoint.


### Go to Workspace
Vist Workspace: https://deepnlp.org/workspace/deploy
Create a new AI Service with unique id, for example "agentscope/deep_research_agent", and the final live url will be '${username}.aiagenta2z.com/${project_name}/chat'

The main.py is the original implementation which takes query and deep research and create a markdown report locally.
And `main_server.py` is the example we convert the agent to a FastAPI based application and expose the "/chat" endpoint.

### Deploy the server

<img src="https://raw.githubusercontent.com/aiagenta2z/agent-mcp-deployment-templates/refs/heads/main/docs/agentscope_deployment_deep_research.png" style="height:400px;" alt="AgentScope Deployment">

- Choose Tab: GitHub Source
- GitHub Repository URL: https://github.com/aiagenta2z/agent-mcp-deployment-templates/tree/main/agentscope
- Deploy Region: Global
- Entry Point (Startup Scripts)
```
uvicorn agentscope_examples.deep_research_agent.main_server:app
```

Note that the requirements.txt contains the python package required for deployment.
We put below in the requirements.txt. And fastapi and more packages are already build in the runtime so you don't need to install again every time.
```
pydantic>=2.12.0
shortuuid>=1.0.13
agentscope>=1.0.0
```

- Environment variable in the input form or as env variables
``` 
export DASHSCOPE_API_KEY="your_dashscope_api_key_here"
export TAVILY_API_KEY="your_tavily_api_key_here"
export AGENT_OPERATION_DIR="your_own_direction_here"
```

- Click Deploy!

After you see the log, we can test the live URL
```commandline
INFO:     Started server process [1]
INFO:     Waiting for application startup.
Application startup...
Tavily MCP server running on stdio
2026-02-11 04:00:19,324 | INFO    | _stateful_client_base:connect:66 - MCP client connected.
Lifecycle closed at the end...
INFO:     Application startup complete.
> SUCCESS: ✅ Deployment Complete!

```

### Test and Connect the Agent

#### Locally 

Before deployment, you can actually start the service on your local machine to save some time.

endpoint: http://localhost:8000/chat

curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What is difference between MCPs and skills?"}]}'


#### Expected Result

```
{"type": "assistant", "format": "text", "content": "{\n  \"type\": \"text\",\n  \"text\": \"Create and write ./agentscope/examples/agent/deep_research_agent/deepresearch_agent_demo_env/Friday260209165138_detailed_report.md successfully.\"\n}", "section": "answer", "message_id": "5d878be8-82df-4c23-8fa6-564bf745775b", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
```

### Test the deployed Live Agent URL

Live URL with /chat endpoint is live on https://agentscope.aiagenta2z.com/deep_research_agent/chat

And we try to `curl` to the post the messages as input 

```
curl -X POST "https://agentscope.aiagenta2z.com/deep_research_agent/chat" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Calculate 1+1 result"}]}'
```

Wait for a while because the deep research conduct multiple rounds of search be rendering results.

And the Rendered Results 

```
{"type": "assistant", "format": "text", "content": "DeepResearch Task Starting...", "section": "answer", "message_id": "b97e7d26-312a-46de-b14d-61ce029c5787", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
{"type": "assistant", "format": "text", "content": "Calculate 1+1 result\nExpected Output:\n- [ ] Verification of the mathematical operation and its foundational principles in arithmetic\\n- [ ] (EXPANSION) Historical evolution of the concept of addition and numeral systems across different civilizations\\n- [ ] (EXPANSION) Comparative analysis of how 1+1 is interpreted in various mathematical frameworks (e.g., Boolean algebra, modular arithmetic, set theory)", "section": "answer", "message_id": "33cd6f60-3250-4f26-b154-d828b2a4f13f", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
{"type": "assistant", "format": "text", "content": "Deep Research Iteration 0 starts...", "section": "answer", "message_id": "33cd6f60-3250-4f26-b154-d828b2a4f13f", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
{"type": "assistant", "format": "text", "content": "Deep Research Calling Tool {'type': 'tool_use', 'id': 'call_e018d7d78de0441fb4ba07ea', 'name': 'generate_response', 'input': {'response': 'The result of 1+1 in standard decimal arithmetic is **2**.\\n\\nThis fundamental calculation is based on the basic principles of addition in the decimal number system (base-10), where each number represents a quantity and addition combines these quantities. According to the Peano axioms that formalize arithmetic, 1+1 equals the successor of 1, which is defined as 2.\\n\\n**Historical Context**: The concept of addition emerged independently across ancient civilizations. Babylonians used a base-60 system, Egyptians employed hieroglyphic numerals, and Indian mathematicians later developed the decimal place-value system we use today. Despite different representations, all recognized that combining one unit with another yields two units.\\n\\n**Alternative Mathematical Interpretations**:\\n- **Binary arithmetic**: 1+1 = 10 (where \"10\" represents decimal 2)\\n- **Modulo-2 arithmetic**: 1+1 = 0 (since 2 mod 2 = 0)\\n- **Boolean algebra**: 1+1 = 1 (where + represents logical OR and 1 represents TRUE)\\n- **Set theory**: The union of two distinct singleton sets has cardinality 2\\n\\nHowever, in standard everyday arithmetic and mathematics, 1+1 definitively equals 2.'}, 'raw_input': '{\"response\": \"The result of 1+1 in standard decimal arithmetic is **2**.\\\\n\\\\nThis fundamental calculation is based on the basic principles of addition in the decimal number system (base-10), where each number represents a quantity and addition combines these quantities. According to the Peano axioms that formalize arithmetic, 1+1 equals the successor of 1, which is defined as 2.\\\\n\\\\n**Historical Context**: The concept of addition emerged independently across ancient civilizations. Babylonians used a base-60 system, Egyptians employed hieroglyphic numerals, and Indian mathematicians later developed the decimal place-value system we use today. Despite different representations, all recognized that combining one unit with another yields two units.\\\\n\\\\n**Alternative Mathematical Interpretations**:\\\\n- **Binary arithmetic**: 1+1 = 10 (where \\\\\"10\\\\\" represents decimal 2)\\\\n- **Modulo-2 arithmetic**: 1+1 = 0 (since 2 mod 2 = 0)\\\\n- **Boolean algebra**: 1+1 = 1 (where + represents logical OR and 1 represents TRUE)\\\\n- **Set theory**: The union of two distinct singleton sets has cardinality 2\\\\n\\\\nHowever, in standard everyday arithmetic and mathematics, 1+1 definitively equals 2.\"}'}...", "section": "answer", "message_id": "33cd6f60-3250-4f26-b154-d828b2a4f13f", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
{"type": "assistant", "format": "text", "content": "Deep Research Calling Tool Result...", "section": "answer", "message_id": "33cd6f60-3250-4f26-b154-d828b2a4f13f", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
{"type": "assistant", "format": "text", "content": "{\n  \"type\": \"text\",\n  \"text\": \"Create and write /Users/rockingdingo/Desktop/workspace/github/aiagenta2z/agent-mcp-deployment-templates/agentscope_examples/deep_research_agent/deepresearch_agent_demo_env/Friday260218173235_detailed_report.md successfully.\\n# The Mathematical and Conceptual Dimensions of 1+1\\n\\n## Introduction\\n\\nAt first glance, the expression \u201c1 + 1\u201d appears trivial\u2014a foundational arithmetic operation taught in early childhood education. Yet, beneath this apparent simplicity lies a rich tapestry of mathematical, historical, philosophical, and computational significance. This report explores the multifaceted nature of \u201c1 + 1,\u201d beginning with its standard interpretation in elementary arithmetic and expanding into its varied meanings across different mathematical systems and historical contexts. By examining both the universal consistency and contextual relativity of this operation, we uncover how even the most basic mathematical expressions are deeply embedded in cultural, logical, and structural frameworks.\\n\\n---\\n\\n## Section 1: Standard Arithmetic Interpretation of 1 + 1\\n\\n### 1.1 Foundational Principles in the Decimal Number System\\n\\nIn the standard decimal (base-10) number system used globally for everyday computation, **1 + 1 = 2**. This result is derived from the Peano axioms, a set of foundational principles formulated by Italian mathematician Giuseppe Peano in the late 19th century to formalize the natural numbers and arithmetic operations.\\n\\nThe Peano axioms define:\\n- **0** as a natural number.\\n- A **successor function** *S(n)* that maps each natural number *n* to the next natural number.\\n- **1** is defined as *S(0)*, and **2** as *S(1)* = *S(S(0))*.\\n- Addition is recursively defined:  \\n  - *n + 0 = n*  \\n  - *n + S(m) = S(n + m)*\\n\\nApplying these rules:\\n- 1 + 1 = 1 + S(0) = S(1 + 0) = S(1) = 2\\n\\nThus, within the framework of standard arithmetic grounded in set theory and logic, **1 + 1 = 2** is not merely an empirical observation but a rigorously provable theorem. In fact, Alfred North Whitehead and Bertrand Russell famously took over 300 pages in *Principia Mathematica* (1910\u20131913) to formally prove that 1 + 1 = 2, demonstrating the depth of logical scaffolding required to justify even elementary arithmetic.\\n\\nThis result assumes:\\n- The **commutative** and **associative** properties of addition.\\n- A consistent definition of the symbols \u201c1\u201d and \u201c2\u201d as distinct natural numbers.\\n- The use of **positional numeral notation** in base 10.\\n\\nTherefore, under conventional mathematical assumptions, **the result of 1 + 1 is unequivocally 2**.\\n\\n---\\n\\n## Section 2: Historical Development of Addition and Numeral Systems\\n\\n### 2.1 Ancient Egyptian Mathematics\\n\\nThe ancient Egyptians (c. 3000 BCE) used a **decimal-based additive numeral system** without place value. Numbers were represented by hieroglyphs: a single stroke for 1, a heel bone for 10, a coil of rope for 100, etc. Addition was performed by **collecting like symbols** and simplifying\u2014e.g., ten \u201c1\u201d strokes would be replaced by one \u201c10\u201d symbol.\\n\\nFor Egyptians, **1 + 1** would simply involve placing two single-stroke symbols together, yielding two units\u2014conceptually equivalent to our modern \u201c2.\u201d Their arithmetic was practical, focused on commerce, architecture, and administration, as seen in the Rhind Mathematical Papyrus (c. 1550 BCE). While they lacked abstract algebraic notation, their operational understanding of addition was robust and consistent with the result **1 + 1 = 2**.\\n\\n### 2.2 Babylonian Mathematics\\n\\nThe Babylonians (c. 1800 BCE) employed a **sexagesimal (base-60)** positional numeral system, one of the earliest known uses of place value. They used cuneiform wedges to represent numbers, with combinations for 1 (vertical wedge) and 10 (corner wedge). Despite the base-60 system, **addition remained fundamentally similar**: combining quantities and carrying over when exceeding 59.\\n\\nIn their system, **1 + 1** still equaled **2**, represented by two vertical wedges. The conceptual result did not change; only the notation and base differed. This illustrates a key insight: **the abstract concept of addition is independent of numeral base**, though representation varies.\\n\\n### 2.3 Indian Contributions and the Concept of Zero\\n\\nIndian mathematicians (notably during the Gupta period, c. 400\u2013600 CE) revolutionized arithmetic by introducing:\\n- The **decimal place-value system**\\n- The symbol and concept of **zero (\u015b\u016bnya)** as both a placeholder and a number\\n\\nAryabhata (476\u2013550 CE) and later Brahmagupta (598\u2013668 CE) formalized rules for arithmetic operations involving zero and negative numbers. In this system, **1 + 1 = 2** became part of a coherent, scalable numerical framework that eventually spread to the Islamic world and then Europe via Arabic texts.\\n\\nThe Indian innovation was not just notational but **conceptual**: numbers were treated as abstract entities governed by consistent rules. This laid the groundwork for modern algebra and calculus.\\n\\n> **Key Insight**: Across ancient civilizations, despite differences in notation and base systems, the **semantic meaning** of \u201c1 + 1\u201d as the combination of two discrete units consistently yielded what we now denote as \u201c2.\u201d\\n\\n---\\n\\n## Section 3: Alternative Interpretations of 1 + 1 in Non-Standard Mathematical Contexts\\n\\nWhile 1 + 1 = 2 holds in standard arithmetic, other mathematical frameworks redefine the meaning of \u201c+\u201d or the nature of \u201c1,\u201d leading to different results. These are not contradictions but **context-dependent interpretations**.\\n\\n### 3.1 Binary (Base-2) Arithmetic\\n\\nIn **binary arithmetic**, used universally in digital computing, numbers are represented using only two digits: 0 and 1. The base is 2, so place values are powers of 2 (1, 2, 4, 8\u2026).\\n\\nHere:\\n- **1 + 1 = 10** (read as \u201cone-zero\u201d in binary)\\n\\nWhy? Because:\\n- 1 (binary) = 1 (decimal)\\n- Adding another 1 gives 2 in decimal\\n- 2 in binary is written as **10** (1\u00d72\u00b9 + 0\u00d72\u2070)\\n\\nThus, **1 + 1 = 10\u2082**, where the subscript denotes base-2. This is not a different *value* but a different *representation*. The underlying quantity is still two units; only the symbolic expression changes.\\n\\n> **Clarification**: In binary, **1 + 1 \u2260 10 in decimal**\u2014it equals **2 in decimal**, written as **10 in binary**.\\n\\n### 3.2 Modular Arithmetic (Modulo-2)\\n\\nIn **modular arithmetic**, numbers \u201cwrap around\u201d after reaching a specified modulus *n*. In **modulo-2 arithmetic** (also called \u2124/2\u2124), the only possible residues are 0 and 1.\\n\\nHere:\\n- **1 + 1 \u2261 0 (mod 2)**\\n\\nBecause:\\n- 1 + 1 = 2\\n- 2 divided by 2 leaves remainder **0**\\n\\nThis system is foundational in:\\n- **Computer science** (bitwise operations)\\n- **Cryptography**\\n- **Error detection** (e.g., parity bits)\\n\\nIn this context, \u201c+\u201d denotes **addition modulo 2**, and the result **0** reflects equivalence classes rather than absolute quantity. It\u2019s not that two things vanish\u2014it\u2019s that their sum belongs to the same class as 0 under mod-2.\\n\\n### 3.3 Boolean Algebra and Logic Gates\\n\\nIn **Boolean algebra**, developed by George Boole (1815\u20131864), variables take values **true (1)** or **false (0)**, and \u201c+\u201d often denotes **logical OR** (though sometimes **XOR**, depending on convention).\\n\\n- Under **OR**: 1 + 1 = 1 (since \u201ctrue OR true\u201d is true)\\n- Under **XOR (exclusive OR)**: 1 + 1 = 0 (since XOR outputs true only if inputs differ)\\n\\nHowever, in many engineering contexts (especially digital circuits), **\u201c+\u201d in Boolean algebra corresponds to OR**, not arithmetic addition. Thus:\\n- **1 + 1 = 1** in Boolean OR logic\\n\\nBut caution is needed: **this is not arithmetic**\u2014it\u2019s a symbolic logic system where \u201c1\u201d represents truth, not quantity.\\n\\n> **Important Distinction**: Confusing Boolean \u201c+\u201d with arithmetic \u201c+\u201d leads to errors. They operate in different domains: **logic vs. quantity**.\\n\\n### 3.4 Set Theory: Union of Singleton Sets\\n\\nIn **set theory**, the number \u201c1\u201d can be represented as a **singleton set**, e.g., {\u2205} (the set containing the empty set). Then:\\n\\n- Let *A = {x}* and *B = {y}*, where *x \u2260 y*\\n- The **union** *A \u222a B = {x, y}*, which has **cardinality 2**\\n\\nIf we interpret \u201c1 + 1\u201d as the union of two disjoint singleton sets, the result is a set with **two elements**, corresponding to the cardinal number **2**.\\n\\nHowever, if *A = B = {x}*, then *A \u222a B = {x}*, and the cardinality remains **1**. Thus, in set theory:\\n- **1 + 1 = 2** only if the sets are **disjoint**\\n- Otherwise, **1 + 1 = 1**\\n\\nThis highlights that **addition in set theory depends on whether objects are distinguishable**\u2014a nuance absent in standard arithmetic where numbers are abstract and identical instances are indistinguishable.\\n\\n### 3.5 Abstract Algebra: Groups and Rings\\n\\nIn abstract algebra, the meaning of \u201c+\u201d depends on the **algebraic structure**:\\n\\n- In the **group (\u2124, +)**, 1 + 1 = 2\\n- In the **field GF(2)** (Galois Field with two elements), 1 + 1 = 0 (same as mod-2)\\n- In a **monoid** with idempotent addition (e.g., max-plus algebra), 1 + 1 = 1\\n\\nThus, **1 + 1 is not universally fixed**\u2014it is **defined by the axioms of the system** in which it operates.\\n\\n---\\n\\n## Comparative Analysis: When Does 1 + 1 Equal What?\\n\\n| Context                     | Operation Type      | Result of 1 + 1 | Explanation |\\n|----------------------------|---------------------|------------------|-------------|\\n| Standard Decimal Arithmetic | Natural number addition | **2** | Peano axioms, base-10 |\\n| Binary Arithmetic           | Base-2 addition     | **10\u2082** ( = 2\u2081\u2080 ) | Positional notation in base 2 |\\n| Modulo-2 Arithmetic         | Modular addition    | **0** | 2 mod 2 = 0 |\\n| Boolean Algebra (OR)        | Logical disjunction | **1** | True OR True = True |\\n| Boolean Algebra (XOR)       | Exclusive OR        | **0** | Same inputs \u2192 false |\\n| Set Union (disjoint sets)   | Cardinal addition   | **2** | Two distinct elements |\\n| Set Union (identical sets)  | Idempotent union    | **1** | No new elements added |\\n| Tropical (Max-Plus) Algebra | Max operation       | **1** | max(1,1) = 1 |\\n\\nThis table underscores a profound principle: **mathematical symbols derive meaning from context**. The expression \u201c1 + 1\u201d is **syntactically simple** but **semantically variable**.\\n\\n---\\n\\n## Philosophical and Educational Implications\\n\\nThe question \u201cWhat is 1 + 1?\u201d serves as a gateway to deeper mathematical literacy. It reveals that:\\n- **Mathematics is not just about numbers**, but about **structures, rules, and interpretations**.\\n- **Rigorous definitions** are essential\u2014without specifying the system, \u201c1 + 1\u201d is ambiguous.\\n- **Historical context** shows that even \u201cobvious\u201d truths required centuries of refinement.\\n\\nIn education, presenting 1 + 1 = 2 as an absolute without exploring its foundations can foster **procedural understanding without conceptual depth**. Conversely, introducing alternative systems (e.g., binary, modular arithmetic) early can cultivate **flexible mathematical thinking**.\\n\\n---\\n\\n## Conclusion\\n\\nThe calculation of **1 + 1** yields **2** in standard decimal arithmetic, grounded in the Peano axioms and universally accepted in everyday mathematics. However, this result is **context-dependent**. In binary, it is written as **10**; in modulo-2 arithmetic, it equals **0**; in Boolean logic, it may be **1** or **0**; and in set theory, it depends on element distinctness.\\n\\nHistorically, diverse civilizations\u2014Egyptian, Babylonian, Indian\u2014each developed consistent methods for combining units, always arriving at a conceptual equivalent of \u201ctwo\u201d for \u201cone plus one,\u201d despite notational differences. This cross-cultural convergence suggests that the **intuition of quantity combination** is fundamental to human cognition.\\n\\nUltimately, **1 + 1 = 2** is both a **specific truth** within a well-defined system and a **symbol of the broader flexibility of mathematical thought**. Recognizing this duality enriches our understanding of mathematics not as a rigid dogma, but as a dynamic, evolving language of abstraction.\\n\\n> **Final Answer (in standard arithmetic)**: **1 + 1 = 2**  \\n> **But in the full landscape of mathematics**: **1 + 1 can equal 0, 1, 2, or 10\u2014depending on the rules of the game.**\"\n}", "section": "answer", "message_id": "33cd6f60-3250-4f26-b154-d828b2a4f13f", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
{"type": "assistant", "format": "text", "content": "\"\"", "section": "answer", "message_id": "33cd6f60-3250-4f26-b154-d828b2a4f13f", "content_type": "text/markdown", "template": "streaming_content_type", "task_ids": "", "tab_message_ids": "", "tab_id": ""}
```



#------ Original AgentScope Example -------

## What This Example Demonstrates

This example shows a **DeepResearch Agent** implementation using the AgentScope framework. The DeepResearch Agent specializes in performing multi-step research to collect and integrate information from multiple sources, and generates comprehensive reports to solve complex tasks.
## Prerequisites

- Python 3.10 or higher
- Node.js and npm (for the MCP server)
- DashScope API key from [Alibaba Cloud](https://dashscope.console.aliyun.com/)
- Tavily search API key from [Tavily](https://www.tavily.com/)

## How to Run This Example
1. **Set Environment Variable**:
   ```bash
   export DASHSCOPE_API_KEY="your_dashscope_api_key_here"
   export TAVILY_API_KEY="your_tavily_api_key_here"
   export AGENT_OPERATION_DIR="your_own_direction_here"
   ```
2. **Test Tavily MCP Server**:
    ```bash
    npx -y tavily-mcp@latest
    ```

2. **Run the script**:
    ```bash
   python main.py
   ```

## Connect to Web Search MCP client
The DeepResearch Agent only supports web search through the Tavily MCP client currently. To use this feature, you need to start the MCP server locally and establish a connection to it.
```
from agentscope.mcp import StdIOStatefulClient

tavily_search_client= StdIOStatefulClient(
    name="tavily_mcp",
    command="npx",
    args=["-y", "tavily-mcp@latest"],
    env={"TAVILY_API_KEY": os.getenv("TAVILY_API_KEY", "")},
)
await tavily_search_client.connect()
```

> Note: The example is built with DashScope chat model. If you want to change the model in this example, don't forget
> to change the formatter at the same time! The corresponding relationship between built-in models and formatters are
> list in [our tutorial](https://doc.agentscope.io/tutorial/task_prompt.html#id1)
