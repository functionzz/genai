import vertexai 
from google.cloud import storage
from google.oauth2 import service_account
from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool
import uuid
import os
import json

from credentials import storage_client

# Constants
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service-account-key.json"

PROJECT_ID = 'course-project-417213'
REGION = 'us-central1'
BUCKET = 'bucket-course-project-417213'
EMBEDDING_MODEL = "publishers/google/models/text-embedding-005"
MODEL = 'gemini-1.5-flash-002'
PATH = "guru"

def initialize_vertex_ai():
    """Initialize Vertex AI with the project and region."""
    vertexai.init(project=PROJECT_ID, location=REGION)


def create_corpus():
    """Create a corpus for the RAG model."""
    emb_model_config = rag.EmbeddingModelConfig(publisher_model=EMBEDDING_MODEL)
    try:
        corpus = rag.create_corpus(display_name='corpus', embedding_model_config=emb_model_config)
        return corpus
    except RuntimeError as e:
        print(f"Error creating corpus: {e}")
        print("Ensure the selected region supports Vertex AI RAG service.")
        return None


def list_pdf_files(bucket_name, folder_path):
    """
    List all .pdf files in a specific folder of a GCS bucket.
    """
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blobs = bucket.list_blobs(prefix=folder_path)
    
    # Filter for .pdf files
    pdf_files = [f"gs://{bucket_name}/{blob.name}" for blob in blobs if blob.name.endswith(".pdf")]

    print(f"Successfully listed {len(pdf_files)} PDF files")
    return pdf_files

def import_files_to_corpus(corpus, bucket_name, folder_path):
    """Import files from GCS into the RAG corpus."""
    txt_files = list_pdf_files(bucket_name, folder_path)
    if not txt_files:
        print("No PDF files found to import.")
        return

    rag.import_files(
        corpus_name=corpus.name,
        paths=txt_files,
        chunk_size=512,
        chunk_overlap=50,
    )

def create_rag_store(corpus):
    """Create a RAG store for retrieval."""
    return rag.VertexRagStore(
        rag_corpora=[corpus.name],
        similarity_top_k=5,
        vector_distance_threshold=0.5,
    )

def generate_response(prompt, rag_store):
    """Generate a response using the LLM and RAG store."""
    rag_retrieval_tool = Tool.from_retrieval(retrieval=rag.Retrieval(source=rag_store))
    llm = GenerativeModel(MODEL, tools=[rag_retrieval_tool])
    response = llm.generate_content(prompt)  
    return response


def main(prompt):
    """Main function to execute the workflow."""
    initialize_vertex_ai()
    corpus = create_corpus()
    
    if not corpus:
        return
    
    import_files_to_corpus(corpus, BUCKET, PATH)
    rag_store = create_rag_store(corpus)
    response = generate_response(prompt, rag_store)
    
    json_response = {
            "id": uuid.uuid4().int,  # Generate a unique numeric ID
            "response": response.text,
            "citation": response.citation if hasattr(response, 'citation') else "N/A",
            "role": "bot"
    }
    
    print(json_response)
    return json_response

if __name__ == "__main__":
    user_prompt = input("Enter your prompt: ")
    main(user_prompt)