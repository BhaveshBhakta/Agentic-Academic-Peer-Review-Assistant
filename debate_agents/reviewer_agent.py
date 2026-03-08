from utils.llm_client import query_llm
from PyPDF2 import PdfReader

def extract_paper_text(pdf_path, max_chars=3000):

    text = ""

    try:
        reader = PdfReader(pdf_path)

        for page in reader.pages[:3]:
            text += page.extract_text() or ""

    except:
        pass

    return text[:max_chars]

def reviewer_agent(state):

    papers = state.get("retrieved_papers", [])
    pdf_path = state.get("pdf_path")
    paper_text = extract_paper_text(pdf_path)   

    literature_context = "\n".join(
        f"- {p.get('title')} (similarity {p.get('similarity'):.2f})"
        for p in papers
    )

    # ---------------- Citation Summary ----------------

    citation_data = state.get("citation_result", {})
    citation_analysis = citation_data.get("analysis", {})

    citation_summary = (
        f"Total references: {citation_analysis.get('total_references', 'N/A')}\n"
        f"Recent citations: {citation_analysis.get('recent_percentage', 'N/A')}%\n"
        f"Missing DOIs: {citation_analysis.get('missing_dois', 'N/A')}"
    )

    # ---------------- Novelty Summary ----------------

    novelty_results = state.get("novelty_result", {}).get("results", [])

    novelty_lines = []
    for r in novelty_results[:3]:
        sim = r.get("similarity")
        path = r.get("pdf_path")
        novelty_lines.append(f"- similarity {sim} with {path}")

    novelty_summary = "\n".join(novelty_lines) if novelty_lines else "No similar papers found."

    # ---------------- Plagiarism Summary ----------------

    plag_summary_data = state.get("plagiarism_result", {}).get("summary", {})

    plagiarism_summary = (
        f"Exact overlaps: {plag_summary_data.get('exact_overlap_count', 0)}\n"
        f"Paraphrase overlaps: {plag_summary_data.get('paraphrase_overlap_count', 0)}\n"
        f"Risk level: {plag_summary_data.get('plagiarism_risk', 'Unknown')}"
    )

    # ---------------- Factual Summary ----------------

    factual_issues = state.get("factual_result", {}).get("issues", {})

    factual_summary = (
        f"Hard issues: {len(factual_issues.get('hard_checks', []))}\n"
        f"Statistical issues: {len(factual_issues.get('statistical_checks', []))}"
    )

    # ---------------- Prompt ----------------

    prompt = f"""
You are an expert academic peer reviewer.

Below is the content of a research paper and evidence from automated analysis tools.

Your job is to evaluate the paper and produce a detailed peer review.

------------------------------------
PAPER CONTENT
------------------------------------
{paper_text}

------------------------------------
RELEVANT LITERATURE
------------------------------------
{literature_context}

------------------------------------
AUTOMATED ANALYSIS EVIDENCE
------------------------------------

Citation Analysis
{citation_summary}

Novelty Analysis
{novelty_summary}

Plagiarism Analysis
{plagiarism_summary}

Factual Verification
{factual_summary}

------------------------------------

Write a **complete peer review** using the following format.

Do NOT leave any section empty.

1. Summary of the Paper  
Provide a concise summary of the research problem, methodology, and key contributions.

2. Strengths  
List the main strengths of the paper.

3. Weaknesses  
List the main weaknesses or limitations.

4. Suggestions for Improvement  
Provide constructive suggestions to improve the paper.

5. Preliminary Recommendation  
Choose one: Accept / Minor Revision / Major Revision / Reject.

Ensure the review is detailed and written in professional academic tone.
"""

    review = query_llm(prompt)

    if not review or len(review.strip()) < 50:
        review = """
    1. Summary of the Paper
    The paper presents a research study in its respective domain.

    2. Strengths
    • The topic is relevant to current research.

    3. Weaknesses
    • The evaluation is limited.

    4. Suggestions for Improvement
    • Expand the experimental evaluation.

    5. Preliminary Recommendation
    Major Revision
    """

    state["reviewer_draft"] = review

    return state