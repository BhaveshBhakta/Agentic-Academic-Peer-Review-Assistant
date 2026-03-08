from typing import TypedDict, List, Dict


class ReviewState(TypedDict):

    pdf_path: str
    topic: str

    tools_to_run: List[str]

    retrieved_papers: List[Dict]

    novelty_result: Dict
    plagiarism_result: Dict
    citation_result: Dict
    claim_result: Dict
    factual_result: Dict

    reviewer_draft: str
    critic_feedback: str
    final_review_text: str