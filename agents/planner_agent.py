import json
from utils.llm_client import query_llm
from PyPDF2 import PdfReader

PLANNER_PROMPT_PATH = "prompts/planner_prompt.txt"


def load_prompt():
    with open(PLANNER_PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()


def extract_paper_text(pdf_path, max_chars=2000):

    text = ""

    try:
        reader = PdfReader(pdf_path)

        for page in reader.pages[:2]:
            text += page.extract_text() or ""

    except:
        pass

    return text[:max_chars]


def planner_agent(state):

    pdf_path = state["pdf_path"]

    paper_text = extract_paper_text(pdf_path)

    prompt_template = load_prompt()

    prompt = f"""
{prompt_template}

Paper excerpt:

{paper_text}

Return only JSON list of tools.
"""

    response = query_llm(prompt)

    try:
        tools = json.loads(response)

        if not tools:
            raise ValueError("Empty tool list")

    except Exception:
        tools = [
            "novelty_search",
            "plagiarism_detection",
            "citation_quality",
            "claim_mapping",
            "factual_check"
        ]

    state["tools_to_run"] = tools

    return state