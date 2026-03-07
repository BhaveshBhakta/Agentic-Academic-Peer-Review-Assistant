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


def run_tools(state: ReviewState):

    tools = state.get("tools_to_run", [])
    pdf_path = state["pdf_path"]
    topic = state.get("topic", "general")

    if "novelty_search" in tools:
        state["novelty_result"] = novelty_search_tool.invoke({
            "pdf_path": pdf_path
        })

    if "plagiarism_detection" in tools:
        state["plagiarism_result"] = plagiarism_detection_tool.invoke({
            "pdf_path": pdf_path
        })

    if "citation_quality" in tools:
        state["citation_result"] = citation_check_tool.invoke({
            "pdf_path": pdf_path
        })

    if "claim_mapping" in tools:
        state["claim_result"] = claim_mapping_tool.invoke({
            "pdf_path": pdf_path
        })

    if "factual_check" in tools:
        state["factual_result"] = factual_check_tool.invoke({
            "pdf_path": pdf_path,
            "topic": topic
        })

    if "deep_search" in tools:
        deep_search_tool.invoke({
            "topic": topic
        })

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