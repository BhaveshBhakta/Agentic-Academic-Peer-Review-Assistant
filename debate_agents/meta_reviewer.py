from utils.llm_client import query_llm


def meta_reviewer(state):

    review = state.get("reviewer_draft", "")
    critique = state.get("critic_feedback", "")

    prompt = f"""
You are a senior meta reviewer.

You must combine the draft review and the critique into a final peer review.

Draft Review:
{review}

Critique:
{critique}

Produce a final review using the structure below.

1. Summary of the Paper
2. Strengths
3. Weaknesses
4. Suggestions
9. Final Recommendation

Ensure the review is detailed and reflects the critique if improvements are needed.
"""

    final_review = query_llm(prompt)

    state["final_review_text"] = final_review

    return state