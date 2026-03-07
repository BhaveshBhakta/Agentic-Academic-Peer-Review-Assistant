from utils.llm_client import query_llm


def reviewer_agent(state):

    prompt = f"""
You are an academic peer reviewer.

Based on the analysis results below, write an initial peer review.

Evidence available:
Citation analysis: {state.get("citation_result")}
Novelty analysis: {state.get("novelty_result")}
Plagiarism analysis: {state.get("plagiarism_result")}
Factual verification: {state.get("factual_result")}
Claim mapping: {state.get("claim_result")}

Write a structured review including:

1. Summary of the paper
2. Strengths
3. Weaknesses
4. Suggestions
5. Preliminary recommendation
"""

    review = query_llm(prompt)

    state["reviewer_draft"] = review

    return state