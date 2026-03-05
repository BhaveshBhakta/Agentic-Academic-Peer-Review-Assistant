from langchain.tools import tool
import subprocess

@tool
def citation_check_tool(pdf_path: str) -> str:
    """
    Runs citation quality analysis using GROBID.
    """

    output_path = "data/results/citation_report.json"

    cmd = f"python utils/grobid_citation_alerts.py {pdf_path} --output {output_path}"
    subprocess.run(cmd, shell=True)

    return output_path