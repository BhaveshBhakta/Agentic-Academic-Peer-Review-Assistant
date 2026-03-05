from typing import TypedDict, List, Optional

class ReviewState(TypedDict):
    
    pdf_path: str
    topic: str

    # planner decision
    tools_to_run: List[str]

    # tool outputs
    citation_result: Optional[str]
    novelty_result: Optional[str]
    plagiarism_result: Optional[str]
    factual_result: Optional[str]
    claim_result: Optional[str]

    # final review
    final_review: Optional[str]