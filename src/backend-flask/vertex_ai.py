import vertexai 

from google.cloud import storage
from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool

PROJECT_ID = 'course-project-417213'
REGION = 'us-central1'
BUCKET = 'bucket-course-project-417213'
EMBEDDING_MODEL = "publishers/google/models/text-embedding-005"
MODEL = 'gemini-1.5-flash-002'
PATH = "guru"

vertexai.init(project=PROJECT_ID, location=REGION)

emb_model_config = rag.EmbeddingModelConfig(publisher_model=EMBEDDING_MODEL)   

# The corpus object is used to store the data that you want to use to train the model
try:
    corpus = rag.create_corpus(display_name='corpus', embedding_model_config=emb_model_config)
except RuntimeError as e:
    print(f"Error creating corpus: {e}")
    print("Ensure the selected region supports Vertex AI RAG service.")


# print(corpus)


def list_pdf_files(bucket_name, folder_path):
    """
    List all .pdf files in a specific folder of a GCS bucket.
    """
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blobs = bucket.list_blobs(prefix=folder_path)
    
    # Filter for .txt files
    pdf_files = [f"gs://{bucket_name}/{blob.name}" for blob in blobs if blob.name.endswith(".pdf")]

    print(f"succesfully {len(pdf_files)} listed pdf files")

    return pdf_files

txt_files = list_pdf_files(BUCKET, folder_path=PATH)


rag.import_files(
    corpus_name=corpus.name,
    paths=txt_files,
    chunk_size=512,
    chunk_overlap=50,
)

rag_store = rag.VertexRagStore(
    rag_corpora=[corpus.name],
    similarity_top_k=5,
    vector_distance_threshold=0.5,
)

rag_retrieval_tool = Tool.from_retrieval(retrieval=rag.Retrieval(source=rag_store))

llm = GenerativeModel(
    MODEL,
    tools=[rag_retrieval_tool],
)

prompt = "What was the month with most expenses for me?"

response = llm.generate_content(prompt)
#return
print(response.text)