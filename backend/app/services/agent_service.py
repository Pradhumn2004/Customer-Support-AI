from typing import AsyncGenerator
from agents.workflow.graph import app_graph
from backend.app.services.memory import memory_manager
from backend.app.core.config import get_settings

settings = get_settings()


async def run_agent_workflow(
    message: str,
    session_id: str,
    user_id: str = None
) -> dict:
    history = memory_manager.get_history(session_id)

    initial_state = {
        "messages": history,
        "query": message,
        "intent": None,
        "retrieved_context": [],
        "retrieved_sources": [],
        "api_result": None,
        "sentiment": None,
        "needs_escalation": False,
        "final_response": None,
        "ticket_id": None,
        "session_id": session_id,
        "user_id": user_id,
        "graph_rag_context": None,
        "company_name": settings.COMPANY_NAME,
        "company_type": settings.COMPANY_TYPE
    }

    try:
        result = app_graph.invoke(initial_state)
        response = result.get("final_response", "")
        sources = result.get("retrieved_sources", [])
        escalated = result.get("needs_escalation", False)
        ticket_id = result.get("ticket_id")
        intent = result.get("intent")
        sentiment = result.get("sentiment")
    except Exception as e:
        import traceback
        print(f"Agent workflow error: {str(e)}")
        traceback.print_exc()
        err_str = str(e).lower()
        if "rate limit" in err_str or "429" in err_str or "free-models-per-day" in err_str:
            response = (
                "I'm currently unable to process requests because the free API rate limit has been reached. "
                "To continue, add at least $10 in credits to your OpenRouter account at "
                "https://openrouter.ai/settings/credits — this unlocks 1,000 free model calls per day. "
                "Alternatively, try again in a few hours when the rate limit resets."
            )
        elif "500" in err_str or "internal server error" in err_str:
            response = (
                "The AI model is temporarily unavailable. "
                "This is usually a transient issue with the free API tier. "
                "Please try again in a moment. "
                "If the problem persists, add credits to your OpenRouter account at "
                "https://openrouter.ai/settings/credits"
            )
        elif "model not found" in err_str or "404" in err_str:
            response = (
                "The OpenRouter free tier has no available models right now. "
                "All free models are rate-limited for your account today. "
                "Options:\n"
                "1. Wait a few hours for the rate limit to reset\n"
                "2. Add $10+ at https://openrouter.ai/settings/credits (unlocks 1000 free calls/day)\n"
                "3. Install Ollama (fully local, free): https://ollama.com — then run 'ollama pull llama3.2:3b'"
            )
        else:
            response = (
                "I'm having trouble processing your request. "
                f"Error: {str(e)[:200]}"
            )
        sources = []
        escalated = False
        ticket_id = None
        intent = None
        sentiment = None

    memory_manager.add_message(session_id, "user", message)
    memory_manager.add_message(session_id, "assistant", response)

    return {
        "response": response,
        "sources": sources,
        "escalated": escalated,
        "ticket_id": ticket_id,
        "intent": intent,
        "sentiment": sentiment
    }


async def stream_agent_workflow(
    message: str,
    session_id: str,
    user_id: str = None
) -> AsyncGenerator[str, None]:
    history = memory_manager.get_history(session_id)

    initial_state = {
        "messages": history,
        "query": message,
        "intent": None,
        "retrieved_context": [],
        "retrieved_sources": [],
        "api_result": None,
        "sentiment": None,
        "needs_escalation": False,
        "final_response": None,
        "ticket_id": None,
        "session_id": session_id,
        "user_id": user_id,
        "graph_rag_context": None,
        "company_name": settings.COMPANY_NAME,
        "company_type": settings.COMPANY_TYPE
    }

    for event in app_graph.stream(initial_state, stream_mode="values"):
        if "final_response" in event and event["final_response"]:
            yield event["final_response"]

    memory_manager.add_message(session_id, "user", message)
