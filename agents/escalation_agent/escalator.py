import uuid
from agents.workflow.state import AgentState
from backend.app.api.tickets import tickets_store
from datetime import datetime


def escalation_agent(state: AgentState) -> AgentState:
    ticket_id = f"TKT-{str(uuid.uuid4())[:8].upper()}"

    tickets_store[ticket_id] = {
        "id": ticket_id,
        "user_id": state.get("user_id", "anonymous"),
        "subject": f"Escalated: {state['query'][:80]}",
        "description": f"Auto-escalated from AI agent.\nSentiment: {state.get('sentiment', 'unknown')}\nIntent: {state.get('intent', 'unknown')}\n\nQuery: {state['query']}",
        "priority": "high",
        "status": "open",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
        "escalated_by": "ai_agent",
        "session_id": state.get("session_id", "unknown")
    }

    escalation_message = (
        "I understand your concern and I want to make sure this gets the attention it deserves. "
        "I've created a support ticket for you and escalated it to a human agent who will review your case. "
        f"Your ticket ID is {ticket_id}. You should receive a response shortly."
    )

    return {
        **state,
        "needs_escalation": True,
        "ticket_id": ticket_id,
        "final_response": escalation_message
    }
