from langchain.tools import tool
import subprocess
import os

@tool
def claim_mapping_tool(pdf_path: str, run_dir: str) -> str:
    """
    Runs claim extraction and mapping against prior literature.
    """

    novelty_json = os.path.join(run_dir, "novelty.json")

    output_path = os.path.join(run_dir, "claim_mapping.json")

    cmd = f"python utils/claim_mapping.py --new_pdf {pdf_path} --similar_json {novelty_json} --out_dir {run_dir}"

    subprocess.run(cmd, shell=True)

    return output_path