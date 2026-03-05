from langchain.tools import tool
import subprocess

@tool
def factual_check_tool(pdf_path: str, topic: str = "general") -> str:
    """
    Runs factual consistency verification.
    """

    output_path = "data/results/factual.json"

    cmd = f"python utils/factual_check.py --path {pdf_path} --topic {topic} --output {output_path}"
    subprocess.run(cmd, shell=True)

    return output_path