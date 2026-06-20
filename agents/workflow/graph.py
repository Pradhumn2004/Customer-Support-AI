from langgraph.graph import StateGraph, END
from agents.workflow.state import AgentState
from agents.single_agent import process_query
from agents.escalation_agent.escalator import escalation_agent
from agents.api_agent.agent import api_tool_agent


def route_after_process(state: AgentState) -> str:
    if state.get("needs_escalation"):
        return "escalate"
    if state.get("api_result"):
        return "end"
    intent = state.get("intent", "")
    if intent in ("order_status", "billing", "technical"):
        return "api_tools"
    return "end"


def route_after_tools(state: AgentState) -> str:
    if state.get("needs_escalation"):
        return "escalate"
    if state.get("api_result"):
        return "process"
    return "end"


def build_workflow():
    workflow = StateGraph(AgentState)

    workflow.add_node("process", process_query)
    workflow.add_node("api_tools", api_tool_agent)
    workflow.add_node("escalate", escalation_agent)

    workflow.set_entry_point("process")
    workflow.add_conditional_edges(
        "process",
        route_after_process,
        {
            "escalate": "escalate",
            "api_tools": "api_tools",
            "end": END,
        }
    )
    workflow.add_conditional_edges(
        "api_tools",
        route_after_tools,
        {
            "escalate": "escalate",
            "process": "process",
            "end": END,
        }
    )
    workflow.add_edge("escalate", END)

    return workflow.compile()


app_graph = build_workflow()
