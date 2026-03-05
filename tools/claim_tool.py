from langchain.tools import tool
import subprocess

@tool
def claim_mapping_tool(pdf_path: str) -> str:
    """
    Runs claim extraction and mapping against prior literature.
    """

    novelty_json = "data/results/novelty.json"
    out_dir = "data/results"

    cmd = f"python utils/claim_mapping.py --new_pdf {pdf_path} --similar_json {novelty_json} --out_dir {out_dir}"
    subprocess.run(cmd, shell=True)

    return "data/results/claim_mapping.json"