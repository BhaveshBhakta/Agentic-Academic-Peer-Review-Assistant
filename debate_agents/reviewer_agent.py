from utils.llm_client import query_llm


def reviewer_agent(state):

    papers = state.get("retrieved_papers", [])

    literature_context = "\n".join(
        f"- {p.get('title')} (similarity {p.get('similarity'):.2f})"
        for p in papers
    )

    prompt = f"""
You are an academic peer reviewer.

Relevant literature retrieved from the research corpus:

{literature_context}

Use these papers as context when evaluating novelty.

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
4. Suggestions for improvement
5. Preliminary recommendation

When discussing novelty, explicitly reference relevant literature retrieved above.
"""

    review = query_llm(prompt)

    state["reviewer_draft"] = review

    return state