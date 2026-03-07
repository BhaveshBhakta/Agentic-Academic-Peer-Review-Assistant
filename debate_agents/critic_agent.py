from utils.llm_client import query_llm


def critic_agent(state):

    draft = state.get("reviewer_draft", "")

    prompt = f"""
You are a strict academic reviewer.

Your task is to critique the following peer review.

Review:
{draft}

Identify:

1. Missing evidence
2. Weak reasoning
3. Unsupported claims
4. Overlooked weaknesses

Write a critique explaining what is wrong or incomplete in the review.
"""

    critique = query_llm(prompt)

    state["critic_feedback"] = critique

    return state