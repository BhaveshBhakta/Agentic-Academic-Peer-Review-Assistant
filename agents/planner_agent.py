import json
from utils.llm_client import query_llm

PLANNER_PROMPT_PATH = "prompts/planner_prompt.txt"

def load_prompt():
    with open(PLANNER_PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()

def planner_agent(state):

    pdf_path = state["pdf_path"]

    prompt_template = load_prompt()

    prompt = f"""
    {prompt_template}

    Paper path:
    {pdf_path}

    Return only JSON list of tools.
    """

    response = query_llm(prompt)

    try:
        tools = json.loads(response)
    except Exception:
        tools = ["novelty_search", "plagiarism_detection"]

    state["tools_to_run"] = tools

    return state