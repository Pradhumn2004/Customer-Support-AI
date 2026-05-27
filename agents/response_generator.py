from langchain_openai import ChatOpenAI
from agents.workflow.state import AgentState
from backend.app.core.config import get_settings

settings = get_settings()
llm = ChatOpenAI(
    model="openrouter/free",
    temperature=0.3,
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)


def generate_response(state: AgentState) -> AgentState:
    company = state.get("company_name", "our company")
    company_type = state.get("company_type", "a company")

    context = "\n\n".join(state["retrieved_context"]) if state["retrieved_context"] else "No context available."

    if state.get("graph_rag_context"):
        context += f"\n\nGraph RAG Context:\n{state['graph_rag_context']}"

    history_str = ""
    if state.get("messages"):
        recent = state["messages"][-6:]
        history_str = "\nConversation History:\n" + "\n".join(
            f"{m.get('role', 'user')}: {m.get('content', '')}" for m in recent
        )

    prompt = f"""You are a professional, helpful customer support AI agent for {company}, which is {company_type}.

{history_str}

Knowledge Base Context:
{context}

Customer Query: {state['query']}

Instructions:
1. Answer based ONLY on the provided context above
2. Always answer as a representative of {company}
3. If the context doesn't contain enough information, say so honestly and offer to escalate
4. Be concise, professional, and helpful
5. If you reference specific information, mention which source it came from
6. Do NOT make up information or hallucinate
7. If the customer seems frustrated, acknowledge their concern empathetically

Response:"""

    result = llm.invoke(prompt)

    return {
        **state,
        "final_response": result.content
    }
