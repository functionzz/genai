import vertexai 

from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool

PROJECT_ID = 'course-project-417213'
REGION = 'us-central1'
BUCKET = 'your-bucket-name'
EMBEDDING_MODEL = "publishers/google/models/text-embedding-005"
MODEL = 'gemini-1.5-flash-002'

vertexai.init(project=PROJECT_ID, location=REGION)

emb_model_config = rag.EmbeddingModelConfig(publisher_model=EMBEDDING_MODEL)   

# The corpus object is used to store the data that you want to use to train the model
try:
    corpus = rag.create_corpus(display_name='corpus', embedding_model_config=emb_model_config)
except RuntimeError as e:
    print(f"Error creating corpus: {e}")
    print("Ensure the selected region supports Vertex AI RAG service.")


print(corpus)