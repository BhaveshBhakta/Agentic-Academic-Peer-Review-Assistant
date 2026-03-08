from utils.llm_client import query_llm


def critic_agent(state):

    draft = state.get("reviewer_draft", "")

    prompt = f"""
You are a senior academic reviewer.

Below is a draft peer review.

Your job is NOT to criticize the reviewer.

Instead, evaluate whether the review properly evaluates the research paper.

Draft Review:
{draft}

Check whether the review:

• Identifies strengths
• Identifies weaknesses
• Provides suggestions
• Provides a clear recommendation

If something is missing, explain what should be improved.

Do not claim the review is empty unless it is truly empty.
"""

    critique = query_llm(prompt)

    state["critic_feedback"] = critique

    return state