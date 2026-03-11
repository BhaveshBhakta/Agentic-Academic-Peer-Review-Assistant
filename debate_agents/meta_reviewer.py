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

Produce a final review using EXACTLY this format:

**1. Summary of the Paper**
<text>

**2. Strengths**
<text>

**3. Weaknesses**
<text>

**4. Suggestions**
<text>

**5. Final Recommendation**
<text>

Ensure the review is detailed and reflects the critique if improvements are needed.
"""

    final_review = query_llm(prompt)
    
    if not final_review.strip():
        final_review = "Review generation failed."

    state["final_review_text"] = final_review

    return state