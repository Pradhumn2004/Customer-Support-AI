from langchain_openai import ChatOpenAI
from agents.workflow.state import AgentState
from backend.app.core.config import get_settings

settings = get_settings()
llm = ChatOpenAI(
    model="openrouter/free",
    temperature=0,
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)


def sentiment_agent(state: AgentState) -> AgentState:
    prompt = f"""Analyze the sentiment of this customer support query.
Return exactly one of: positive, neutral, negative, angry

Consider:
- "angry" = explicit anger, frustration, threats, profanity
- "negative" = dissatisfaction, disappointment, complaints
- "neutral" = factual questions, standard inquiries
- "positive" = thanks, praise, satisfaction

Query: {state['query']}

Respond with ONLY the sentiment label."""

    result = llm.invoke(prompt)
    sentiment = result.content.strip().lower()

    valid_sentiments = {"positive", "neutral", "negative", "angry"}
    if sentiment not in valid_sentiments:
        sentiment = "neutral"

    needs_escalation = sentiment in ("angry",)

    return {
        **state,
        "sentiment": sentiment,
        "needs_escalation": needs_escalation
    }
