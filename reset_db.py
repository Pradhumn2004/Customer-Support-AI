import shutil, os
from rag.ingestion.pipeline import ingest_document, search_knowledge_base
from backend.app.core.config import get_settings

settings = get_settings()
if os.path.exists(settings.CHROMA_PERSIST_DIR):
    shutil.rmtree(settings.CHROMA_PERSIST_DIR)
    print("Cleared ChromaDB")

c = ingest_document("knowledge_base/faq.txt")
print(f"Ingested {c} chunks")

results = search_knowledge_base("refund policy", k=3)
for r in results:
    src = r.metadata.get("source_file", "?")
    txt = r.page_content[:80]
    print(f"  source={src} | {txt}")
