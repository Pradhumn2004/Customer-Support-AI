from typing import AsyncGenerator
from agents.workflow.graph import app_graph
from agents.single_agent import stream_response, build_prompt
from backend.app.services.memory import memory_manager
from backend.app.core.config import get_settings

settings = get_settings()


async def run_agent_workflow(
    message: str,
    session_id: str,
    user_id: str = None,
    company_type: str = "tech"
) -> dict:
    history = memory_manager.get_history(session_id)

    initial_state = {
        "messages": history,
        "query": message,
        "intent": None,
        "sentiment": None,
        "needs_escalation": False,
        "final_response": None,
        "ticket_id": None,
        "session_id": session_id,
        "user_id": user_id,
        "company_type": company_type,
        "api_result": None,
    }

    try:
        result = app_graph.invoke(initial_state)
        response = result.get("final_response", "")
        escalated = result.get("needs_escalation", False)
        ticket_id = result.get("ticket_id")
        intent = result.get("intent")
        sentiment = result.get("sentiment")
    except Exception as e:
        err_str = str(e).lower()
        if "rate limit" in err_str or "429" in err_str or "free-models-per-day" in err_str:
            response = "Rate limit reached. Try again later or add credits at https://openrouter.ai/settings/credits"
        elif "model not found" in err_str or "404" in err_str:
            response = "No free models available right now. Try again later."
        else:
            response = "I'm having trouble processing your request."
        escalated = False
        ticket_id = None
        intent = None
        sentiment = None

    memory_manager.add_message(session_id, "user", message)
    memory_manager.add_message(session_id, "assistant", response)

    return {
        "response": response,
        "escalated": escalated,
        "ticket_id": ticket_id,
        "intent": intent,
        "sentiment": sentiment
    }


async def stream_agent_workflow(
    message: str,
    session_id: str,
    user_id: str = None,
    company_type: str = "tech"
) -> AsyncGenerator[str, None]:
    history = memory_manager.get_history(session_id)

    initial_state = {
        "messages": history,
        "query": message,
        "intent": None,
        "sentiment": None,
        "needs_escalation": False,
        "final_response": None,
        "ticket_id": None,
        "session_id": session_id,
        "user_id": user_id,
        "company_type": company_type,
        "api_result": None,
    }

    try:
        async for token in stream_response(initial_state):
            yield token
    except Exception as e:
        yield f"Error: {str(e)[:100]}"

    memory_manager.add_message(session_id, "user", message)
