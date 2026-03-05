from langchain.tools import tool
from utils.plagiarism_check import run_plagiarism_check

@tool
def plagiarism_detection_tool(pdf_path: str) -> str:
    """
    Runs plagiarism detection using FAISS and semantic similarity.
    """

    output_path = "data/results/plagiarism.json"

    run_plagiarism_check(
        test_pdf=pdf_path,
        output_file=output_path,
        top_k=5
    )

    return output_path