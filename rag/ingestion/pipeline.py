import os
from typing import List
from langchain_core.documents import Document
from langchain_community.vectorstores import Chroma
from rag.ingestion.loaders import load_documents
from rag.ingestion.chunker import chunk_with_metadata
from rag.embeddings.embedder import get_embeddings
from backend.app.core.config import get_settings

settings = get_settings()


def get_vectorstore(collection_name: str = "customer_support_kb"):
    embeddings = get_embeddings(use_local=True)

    return Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=settings.CHROMA_PERSIST_DIR
    )


def ingest_document(file_path: str, collection_name: str = "customer_support_kb") -> int:
    documents = load_documents(file_path)

    chunks = chunk_with_metadata(documents, chunk_size=1000, chunk_overlap=200)

    for chunk in chunks:
        chunk.metadata["source_file"] = os.path.basename(file_path)

    embeddings = get_embeddings(use_local=True)

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=settings.CHROMA_PERSIST_DIR,
        collection_name=collection_name
    )

    return len(chunks)


def ingest_directory(directory_path: str, collection_name: str = "customer_support_kb") -> int:
    total_chunks = 0

    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        if os.path.isfile(file_path):
            try:
                chunks = ingest_document(file_path, collection_name)
                total_chunks += chunks
                print(f"Ingested {filename}: {chunks} chunks")
            except Exception as e:
                print(f"Failed to ingest {filename}: {e}")

    return total_chunks


def search_knowledge_base(query: str, k: int = 4, collection_name: str = "customer_support_kb") -> List[Document]:
    vectorstore = get_vectorstore(collection_name)
    return vectorstore.similarity_search(query, k=k)


def initialize_vectorstore(documents: List[Document], collection_name: str = "customer_support_kb"):
    embeddings = get_embeddings(use_local=True)

    vectorstore = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        persist_directory=settings.CHROMA_PERSIST_DIR,
        collection_name=collection_name
    )

    return vectorstore
