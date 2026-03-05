from langgraph.graph import StateGraph, END
from state.review_state import ReviewState
from agents.planner_agent import planner_agent
from tools.novelty_tool import novelty_search_tool
from tools.plagiarism_tool import plagiarism_detection_tool
from tools.citation_tool import citation_check_tool
from tools.claim_tool import claim_mapping_tool
from tools.factual_tool import factual_check_tool
from tools.deep_search_tool import deep_search_tool

# TOOL EXECUTION NODE

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

# REFLECTION NODE

from pathlib import Path
from utils.llm_review_synthesis import synthesize_report

def reflection_node(state):

    paper_dir = Path("data/results")
    review_path = Path("data/results/review.txt")

    synthesize_report(
        paper_dir=paper_dir,
        output_file=review_path
    )

    state["final_review"] = str(review_path)

    return state

# GRAPH BUILDER

def build_graph():

    builder = StateGraph(ReviewState)

    builder.add_node("planner", planner_agent)
    builder.add_node("tools", run_tools)
    builder.add_node("reflection", reflection_node)

    builder.set_entry_point("planner")

    builder.add_edge("planner", "tools")
    builder.add_edge("tools", "reflection")
    builder.add_edge("reflection", END)

    graph = builder.compile()

    return graph    