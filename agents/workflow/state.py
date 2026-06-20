from typing import TypedDict, List, Optional


class AgentState(TypedDict):
    messages: List[dict]
    query: str
    intent: Optional[str]
    sentiment: Optional[str]
    needs_escalation: bool
    final_response: Optional[str]
    ticket_id: Optional[str]
    session_id: str
    user_id: Optional[str]
    company_type: str
    api_result: Optional[dict]
