from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from agents.api_agent.tools import tools
from backend.app.core.config import get_settings

settings = get_settings()
llm_with_tools = ChatOpenAI(
    model="openrouter/free",
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
).bind_tools(tools)


def api_tool_agent(state: dict) -> dict:
    query = state.get("query", "")
    intent = state.get("intent", "")

    tool_intents = {"order_status", "billing", "technical"}

    if intent not in tool_intents:
        return {**state, "api_result": None}

    messages = [
        SystemMessage(content="You are a customer support agent with access to tools. Use them to help answer the customer's query."),
        HumanMessage(content=query)
    ]

    response = llm_with_tools.invoke(messages)

    if hasattr(response, "tool_calls") and response.tool_calls:
        tool_results = []
        for tool_call in response.tool_calls:
            tool_name = tool_call["name"]
            tool_args = tool_call["args"]

            for t in tools:
                if t.name == tool_name:
                    result = t.invoke(tool_args)
                    tool_results.append({"tool": tool_name, "result": str(result)})
                    break

        return {**state, "api_result": {"tool_calls": tool_results}}

    return {**state, "api_result": None}
