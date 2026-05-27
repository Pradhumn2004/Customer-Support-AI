from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever
from langchain_core.documents import Document
from typing import List, Optional


class HybridRetriever:
    def __init__(self, vectorstore, documents: Optional[List[Document]] = None, k: int = 4):
        self.vectorstore = vectorstore
        self.k = k
        self.bm25_retriever = None

        if documents:
            self.bm25_retriever = BM25Retriever.from_documents(documents, k=k)

    def get_ensemble_retriever(self, weights: tuple = (0.3, 0.7)):
        if not self.bm25_retriever:
            return self.vectorstore.as_retriever(search_kwargs={"k": self.k})

        vector_retriever = self.vectorstore.as_retriever(search_kwargs={"k": self.k})

        return EnsembleRetriever(
            retrievers=[self.bm25_retriever, vector_retriever],
            weights=list(weights)
        )

    def search(self, query: str, k: Optional[int] = None):
        retriever = self.get_ensemble_retriever()
        return retriever.invoke(query)
