from langgraph.graph import StateGraph, END
from state.review_state import ReviewState

from agents.planner_agent import planner_agent

from tools.novelty_tool import novelty_search_tool
from tools.plagiarism_tool import plagiarism_detection_tool
from tools.citation_tool import citation_check_tool
from tools.claim_tool import claim_mapping_tool
from tools.factual_tool import factual_check_tool
from tools.deep_search_tool import deep_search_tool
from rag.rag_node import rag_retriever_node
from debate_agents.reviewer_agent import reviewer_agent
from debate_agents.critic_agent import critic_agent
from debate_agents.meta_reviewer import meta_reviewer


import json

def load_json_safe(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return {"error": f"Failed to load {path}"}


def run_tools(state: ReviewState):

    tools = state.get("tools_to_run", [])
    pdf_path = state["pdf_path"]
    topic = state.get("topic", "general")

    if "novelty_search" in tools:
        path = novelty_search_tool.invoke({"pdf_path": pdf_path})
        state["novelty_result"] = load_json_safe(path)

    if "plagiarism_detection" in tools:
        path = plagiarism_detection_tool.invoke({"pdf_path": pdf_path})
        state["plagiarism_result"] = load_json_safe(path)

    if "citation_quality" in tools:
        path = citation_check_tool.invoke({"pdf_path": pdf_path})
        state["citation_result"] = load_json_safe(path)

    if "claim_mapping" in tools:
        path = claim_mapping_tool.invoke({"pdf_path": pdf_path})
        state["claim_result"] = load_json_safe(path)

    if "factual_check" in tools:
        path = factual_check_tool.invoke({
            "pdf_path": pdf_path,
            "topic": topic
        })
        state["factual_result"] = load_json_safe(path)

    if "deep_search" in tools:
        deep_search_tool.invoke({"topic": topic})

    return state


def build_graph():

    builder = StateGraph(ReviewState)

    builder.add_node("planner", planner_agent)
    builder.add_node("rag_retrieval", rag_retriever_node)
    builder.add_node("tools", run_tools)
    builder.add_node("reviewer", reviewer_agent)
    builder.add_node("critic", critic_agent)
    builder.add_node("meta_reviewer", meta_reviewer)

    builder.set_entry_point("planner")

    builder.add_edge("planner", "rag_retrieval")
    builder.add_edge("rag_retrieval", "tools")
    builder.add_edge("tools", "reviewer")
    builder.add_edge("reviewer", "critic")
    builder.add_edge("critic", "meta_reviewer")
    builder.add_edge("meta_reviewer", END)

    graph = builder.compile()

    return graph