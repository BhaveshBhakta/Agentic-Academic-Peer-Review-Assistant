from langchain.tools import tool
from utils.data_fetch import fetch_and_add_papers

@tool
def deep_search_tool(topic: str) -> str:
    """
    Fetch additional papers from arXiv / Semantic Scholar / CrossRef.
    """

    fetch_and_add_papers(topic, max_papers=15)

    return "Deep search completed"