import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from PyPDF2 import PdfReader

FAISS_INDEX = "data/faiss_indexes/global_index.bin"
FAISS_MAPPING = "data/faiss_indexes/global_mapping.json"

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def extract_text_from_pdf(pdf_path, max_chars=2000):
    text = ""
    try:
        reader = PdfReader(pdf_path)
        for page in reader.pages[:5]:
            text += page.extract_text() or ""
    except:
        pass
    return text[:max_chars]

def normalize(v):
    return v / np.linalg.norm(v, axis=1, keepdims=True)

def retrieve_literature(pdf_path, top_k=5):

    index = faiss.read_index(FAISS_INDEX)

    with open(FAISS_MAPPING, "r", encoding="utf-8") as f:
        mapping = json.load(f)

    if isinstance(mapping, list):
        mapping = {str(i): entry for i, entry in enumerate(mapping)}

    text = extract_text_from_pdf(pdf_path)

    emb = model.encode([text], convert_to_numpy=True)
    emb = normalize(emb)

    D, I = index.search(emb, top_k)

    papers = []

    for sim, idx in zip(D[0], I[0]):
        if idx == -1:
            continue

        entry = mapping[str(idx)]

        papers.append({
            "title": entry.get("title"),
            "pdf_path": entry.get("pdf_path"),
            "similarity": float(sim),
            "abstract": entry.get("abstract"),
            "link": entry.get("link")
        })

    return papers