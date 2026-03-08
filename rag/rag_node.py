from rag.literature_memory import retrieve_literature


def rag_retriever_node(state):

    pdf_path = state["pdf_path"]
    papers = retrieve_literature(pdf_path)
    state["retrieved_papers"] = papers

    return state