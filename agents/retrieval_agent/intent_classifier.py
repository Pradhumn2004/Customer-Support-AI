from langchain_openai import ChatOpenAI
from agents.workflow.state import AgentState
from backend.app.core.config import get_settings

settings = get_settings()

llm = ChatOpenAI(
    model="openrouter/free",
    temperature=0.1,
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)


def classify_intent(state: AgentState) -> AgentState:
    company = state.get("company_name", "our company")
    prompt = f"""You are a customer support system for {company}.
Classify this customer support query into exactly one of these categories:
[order_status, billing, technical, faq, complaint, escalation, general]

Query: {state['query']}

Respond with ONLY the category name, nothing else."""

    result = llm.invoke(prompt)
    intent = result.content.strip().lower()

    valid_intents = {"order_status", "billing", "technical", "faq", "complaint", "escalation", "general"}
    if intent not in valid_intents:
        intent = "general"

    return {**state, "intent": intent}
