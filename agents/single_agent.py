from langchain_openai import ChatOpenAI
from agents.workflow.state import AgentState
from backend.app.core.config import get_settings
from typing import AsyncGenerator

settings = get_settings()

llm = ChatOpenAI(
    model="openrouter/free",
    temperature=0.3,
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

COMPANY_CONTEXTS = {
    "tech": {
        "name": "TechCorp",
        "desc": "a SaaS technology company providing cloud software, APIs, and digital tools",
        "offerings": "cloud subscriptions, API access, software licenses, enterprise plans",
        "faq": "password resets, billing for subscriptions, API documentation, upgrade/downgrade plans, refunds within 30 days",
    },
    "fashion": {
        "name": "StyleHub",
        "desc": "a fashion and clothing retailer",
        "offerings": "clothing, accessories, footwear, seasonal collections",
        "faq": "sizing guides, return/exchange policy (30 days), shipping times, order tracking, fabric care",
    },
    "shopping": {
        "name": "ShopMax",
        "desc": "an e-commerce marketplace",
        "offerings": "electronics, home goods, groceries, fashion, essentials",
        "faq": "order status, delivery tracking, return policy, payment methods, seller support",
    },
    "finance": {
        "name": "FinSecure",
        "desc": "a financial services and banking platform",
        "offerings": "savings accounts, loans, credit cards, investment plans",
        "faq": "account balance, transaction history, loan eligibility, credit limit, interest rates",
    },
    "healthcare": {
        "name": "MediCare+",
        "desc": "a healthcare and telemedicine provider",
        "offerings": "online consultations, prescriptions, health packages, lab tests",
        "faq": "appointment booking, prescription refills, insurance coverage, doctor availability, test results",
    },
    "education": {
        "name": "LearnHub",
        "desc": "an online education and e-learning platform",
        "offerings": "online courses, certification programs, tutoring, study materials",
        "faq": "course enrollment, refund policy, certificate delivery, course access duration, payment plans",
    },
}


def build_prompt(state: AgentState) -> str:
    ctype = state.get("company_type", "tech")
    ctx = COMPANY_CONTEXTS.get(ctype, COMPANY_CONTEXTS["tech"])

    history_str = ""
    if state.get("messages"):
        recent = state["messages"][-6:]
        history_str = "Conversation History:\n" + "\n".join(
            f"{m.get('role', 'user')}: {m.get('content', '')}" for m in recent
        )

    api_info = ""
    if state.get("api_result"):
        api_info = f"API Result: {state['api_result']}"

    return f"""You are a customer support agent for {ctx['name']}, {ctx['desc']}.

We offer: {ctx['offerings']}
Common topics: {ctx['faq']}

{history_str}
{api_info}

Customer: {state['query']}

First, classify the intent: [order_status, billing, technical, faq, complaint, escalation, general]
Then, classify sentiment: [positive, neutral, negative, angry]
Then, respond helpfully.

Format your response exactly as:
INTENT: <one word>
SENTIMENT: <one word>
---

<your helpful response>"""


def process_query(state: AgentState) -> AgentState:
    prompt = build_prompt(state)
    result = llm.invoke(prompt)
    content = result.content.strip()

    intent = "general"
    sentiment = "neutral"
    response_text = content

    parts = content.split("---", 1)
    if len(parts) == 2:
        header = parts[0].strip()
        response_text = parts[1].strip()

        for line in header.split("\n"):
            line = line.strip()
            if line.upper().startswith("INTENT:"):
                val = line.split(":", 1)[1].strip().lower()
                valid = {"order_status", "billing", "technical", "faq", "complaint", "escalation", "general"}
                if val in valid:
                    intent = val
            elif line.upper().startswith("SENTIMENT:"):
                val = line.split(":", 1)[1].strip().lower()
                if val in {"positive", "neutral", "negative", "angry"}:
                    sentiment = val

    needs_esc = sentiment == "angry" or intent == "escalation"

    return {
        **state,
        "intent": intent,
        "sentiment": sentiment,
        "needs_escalation": needs_esc,
        "final_response": response_text,
    }


async def stream_response(state: AgentState) -> AsyncGenerator[str, None]:
    prompt = build_prompt(state)
    seen_separator = False
    header_done = False

    async for chunk in llm.astream(prompt):
        token = chunk.content
        if not seen_separator:
            if "---" in token:
                seen_separator = True
                after = token.split("---", 1)[1]
                if after.strip():
                    yield after.strip()
                header_done = True
            continue
        yield token
