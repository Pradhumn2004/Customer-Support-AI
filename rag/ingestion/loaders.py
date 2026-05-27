from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    CSVLoader,
    UnstructuredHTMLLoader,
    TextLoader,
    DirectoryLoader
)


def load_pdf(file_path: str):
    return PyPDFLoader(file_path).load()


def load_docx(file_path: str):
    return Docx2txtLoader(file_path).load()


def load_csv(file_path: str):
    return CSVLoader(file_path).load()


def load_html(file_path: str):
    return UnstructuredHTMLLoader(file_path).load()


def load_txt(file_path: str):
    return TextLoader(file_path, encoding="utf-8").load()


def load_documents(file_path: str):
    ext = file_path.lower().split(".")[-1]
    loaders = {
        "pdf": load_pdf,
        "docx": load_docx,
        "doc": load_docx,
        "csv": load_csv,
        "html": load_html,
        "htm": load_html,
        "txt": load_txt,
    }

    loader_fn = loaders.get(ext)
    if not loader_fn:
        raise ValueError(f"Unsupported file extension: .{ext}")

    return loader_fn(file_path)


def load_directory(directory_path: str, glob_pattern: str = "**/*"):
    return DirectoryLoader(directory_path, glob=glob_pattern).load()
