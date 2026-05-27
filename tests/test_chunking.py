import pytest
from rag.ingestion.chunker import chunk_documents
from langchain_core.documents import Document


def test_document_chunking():
    docs = [Document(page_content="A" * 2000)]
    chunks = chunk_documents(docs, chunk_size=1000, chunk_overlap=200)
    assert len(chunks) > 1
    assert all(len(c.page_content) <= 1100 for c in chunks)


def test_chunk_overlap():
    content = "Section one.\n\nSection two.\n\nSection three."
    docs = [Document(page_content=content)]
    chunks = chunk_documents(docs, chunk_size=50, chunk_overlap=10)
    assert len(chunks) >= 1


def test_empty_document():
    docs = [Document(page_content="")]
    chunks = chunk_documents(docs, chunk_size=1000, chunk_overlap=200)
    assert len(chunks) == 0


def test_chunk_metadata():
    from rag.ingestion.chunker import chunk_with_metadata
    docs = [Document(page_content="Test content here", metadata={"source": "test.txt"})]
    chunks = chunk_with_metadata(docs, chunk_size=1000, chunk_overlap=200)
    assert len(chunks) > 0
    assert "chunk_index" in chunks[0].metadata
    assert "total_chunks" in chunks[0].metadata
