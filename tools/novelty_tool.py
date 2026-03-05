from langchain.tools import tool
import os
from utils.novelty_check import novelty_check

@tool
def novelty_search_tool(pdf_path: str) -> str:
    """
    Runs novelty detection using FAISS similarity search.
    """
    output_path = "data/results/novelty.json"

    novelty_check(
        input_pdf=pdf_path,
        top_k=5,
        output_path=output_path
    )

    return output_path