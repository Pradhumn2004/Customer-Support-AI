from typing import TypedDict, List, Optional


class AgentState(TypedDict):
    messages: List[dict]
    query: str
    intent: Optional[str]
    retrieved_context: List[str]
    retrieved_sources: List[str]
    api_result: Optional[dict]
    sentiment: Optional[str]
    needs_escalation: bool
    final_response: Optional[str]
    ticket_id: Optional[str]
    session_id: str
    user_id: Optional[str]
    graph_rag_context: Optional[str]
    company_name: str
    company_type: str
