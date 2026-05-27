from langgraph.graph import StateGraph, END
from agents.workflow.state import AgentState
from agents.retrieval_agent.intent_classifier import classify_intent
from agents.retrieval_agent.retriever import retrieval_agent
from agents.sentiment_agent import sentiment_agent
from agents.response_generator import generate_response
from agents.escalation_agent.escalator import escalation_agent
from agents.api_agent.agent import api_tool_agent


def route_by_intent(state: AgentState) -> str:
    if state.get("needs_escalation"):
        return "escalate"
    return "api_tools"


def route_after_tools(state: AgentState) -> str:
    if state.get("needs_escalation"):
        return "escalate"
    return "generate"


def build_workflow():
    workflow = StateGraph(AgentState)

    workflow.add_node("classify", classify_intent)
    workflow.add_node("retrieve", retrieval_agent)
    workflow.add_node("analyze_sentiment", sentiment_agent)
    workflow.add_node("api_tools", api_tool_agent)
    workflow.add_node("generate", generate_response)
    workflow.add_node("escalate", escalation_agent)

    workflow.set_entry_point("classify")
    workflow.add_edge("classify", "retrieve")
    workflow.add_edge("retrieve", "analyze_sentiment")
    workflow.add_conditional_edges(
        "analyze_sentiment",
        route_by_intent,
        {
            "escalate": "escalate",
            "api_tools": "api_tools"
        }
    )
    workflow.add_conditional_edges(
        "api_tools",
        route_after_tools,
        {
            "escalate": "escalate",
            "generate": "generate"
        }
    )
    workflow.add_edge("generate", END)
    workflow.add_edge("escalate", END)

    return workflow.compile()


app_graph = build_workflow()
