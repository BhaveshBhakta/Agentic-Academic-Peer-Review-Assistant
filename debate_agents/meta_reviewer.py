from utils.llm_client import query_llm


def meta_reviewer(state):

    review = state.get("reviewer_draft", "")
    critique = state.get("critic_feedback", "")

    prompt = f"""
You are a senior meta reviewer.

You must combine the draft review and critique into a final academic peer review.

Follow the EXACT structure below. Do NOT add extra headings, bullet numbers, or text before section titles.

Write each section clearly.

FORMAT:

**1. Summary of the Paper**
<paragraph>

**2. Strengths**
- point
- point

**3. Weaknesses**
- point
- point

**4. Suggestions for Improvement**
- point
- point

**5. Section-wise Scores (0–10 each)**
Novelty: <score>
Claims (Citation Quality): <score>
Plagiarism: <score>
Factual Accuracy: <score>

**6. Claim Labels (TRUE/FALSE)**
<explanation>

**7. Plagiarism / Overlap Evidence**
<evidence>

**8. Duplicate Claim Evidence**
<evidence>

**9. Final Recommendation**
<Accept / Minor Revision / Major Revision / Reject>

Draft Review:
{review}

Critique:
{critique}
"""

    final_review = query_llm(prompt)
    
    if not final_review.strip():
        final_review = "Review generation failed."

    state["final_review_text"] = final_review

    return state