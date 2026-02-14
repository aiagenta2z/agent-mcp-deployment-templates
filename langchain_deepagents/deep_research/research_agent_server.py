"""Research Agent - Standalone script for LangGraph deployment.

This module creates a deep research agent with custom tools and prompts
for conducting web research with strategic thinking and context management.
"""

from dotenv import load_dotenv
load_dotenv(".env", override=True)

from .research_agent.tools import tavily_search, think_tool
tools = [tavily_search, think_tool]

from datetime import datetime
from .utils import show_prompt, format_messages
from .research_agent.prompts import (
    RESEARCHER_INSTRUCTIONS,
    RESEARCH_WORKFLOW_INSTRUCTIONS,
    SUBAGENT_DELEGATION_INSTRUCTIONS,
)

# show_prompt(RESEARCHER_INSTRUCTIONS)

# Get current date
current_date = datetime.now().strftime("%Y-%m-%d")

# Create research sub-agent
research_sub_agent = {
    "name": "research-agent",
    "description": "Delegate research to the sub-agent researcher. Only give this researcher one topic at a time.",
    "system_prompt": RESEARCHER_INSTRUCTIONS.format(date=current_date),
    "tools": [tavily_search, think_tool],
}

max_concurrent_research_units = 1
max_researcher_iterations = 1

# Combine orchestrator instructions (RESEARCHER_INSTRUCTIONS only for sub-agents)
INSTRUCTIONS = (
    RESEARCH_WORKFLOW_INSTRUCTIONS
    + "\n\n"
    + "=" * 80
    + "\n\n"
    +  SUBAGENT_DELEGATION_INSTRUCTIONS.format(
        max_concurrent_research_units=max_concurrent_research_units,
        max_researcher_iterations=max_researcher_iterations,
    )
)

# show_prompt(INSTRUCTIONS)

from deepagents import create_deep_agent
from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI

# Model Gemini 3
model = ChatGoogleGenerativeAI(model="gemini-3-pro-preview")

# Model Claude 4.5
# model = init_chat_model(model="anthropic:claude-sonnet-4-5-20250929", temperature=0.0)

# Create the agent
agent = create_deep_agent(
    model=model,
    tools=tools,
    system_prompt=INSTRUCTIONS,
    subagents=[research_sub_agent],
)

print (f"INFO: Successfully Create the Deep Agent with subagents Research Sub Agents")

# Show the agent
# display(Image(agent.get_graph().draw_mermaid_png()))
def main():
    result = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": "research context engineering approaches used to build AI agents",
                }
            ],
        },
    )
    format_messages(result["messages"])



#### Use Live Runtime to Bring Agent Live
from ai_agent_marketplace.runtime.base import *
from typing import Any, AsyncGenerator
import json
import uuid
import asyncio

async def deepagents_stream_generator(agent: Any, user_query: str, **kwargs) -> AsyncGenerator[str, None]:
    """
    Universal async adapter
    """
    initial_content = "Task Started and Research Take a Few Minutes"
    initial_chunk = json.dumps(
            assembly_message(type=MESSAGE_TYPE_ASSISTANT, format=OUTPUT_FORMAT_TEXT, content=initial_content, content_type=CONTENT_TYPE_MARKDOWN,
                             section=SECTION_ANSWER, message_id=str(uuid.uuid4()), template=TEMPLATE_STREAMING_CONTENT_TYPE))
    yield initial_chunk + STREAMING_SEPARATOR_DEFAULT
    await asyncio.sleep(0)

    try:

        messages = [{"role": "user", "content": user_query,}]
        result = agent.invoke(
            {
                "messages": messages,
            },
        )
        output_messages = result["messages"] if "messages" in result else []
        # print (f"DEBUG: Customized Generator output_messages {output_messages}")
        for message in output_messages:
            #print (f"DEBUG: Message Type is {type(message)} and message is {message}")
            message_id, content, role = extract_message_content_langchain(message)
            print (f"DEBUG: Extracted Message Type is message_id {message_id} and content is {content} role {role}")
            output_chunk = json.dumps(
                assembly_message(type=MESSAGE_TYPE_ASSISTANT, format=OUTPUT_FORMAT_TEXT, content=content,
                                 content_type=CONTENT_TYPE_MARKDOWN, section = SECTION_ANSWER, message_id = message_id, template=TEMPLATE_STREAMING_CONTENT_TYPE)
            )
            yield output_chunk + STREAMING_SEPARATOR_DEFAULT
            await asyncio.sleep(0)

    except Exception as e:
        print (f"customize_stream_generator failed with error {e}")
        yield json.dumps({}) + STREAMING_SEPARATOR_DEFAULT

runtime = BaseLiveRuntime(
    agent=agent,
    stream_handler=deepagents_stream_generator
)

## Returned a FastAPI based app with /chat endpoint
app = runtime.app
