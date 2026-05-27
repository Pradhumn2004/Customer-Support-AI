from agents.workflow.state import AgentState
from rag.ingestion.pipeline import search_knowledge_base
from rag.rerankers.reranker import Reranker


def retrieval_agent(state: AgentState) -> AgentState:
    try:
        docs = search_knowledge_base(state["query"], k=6)

        if docs:
            try:
                reranker = Reranker()
                docs = reranker.rerank(state["query"], docs, top_k=4)
            except Exception:
                docs = docs[:4]

        context = [doc.page_content for doc in docs]
        sources = [doc.metadata.get("source_file", "unknown") for doc in docs]

        return {
            **state,
            "retrieved_context": context,
            "retrieved_sources": sources
        }
    except Exception:
        return {
            **state,
            "retrieved_context": [],
            "retrieved_sources": []
        }
