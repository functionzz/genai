from flask import Flask, request, jsonify
import vertexai
from google.cloud import storage
from vertexai.preview import rag
from vertexai.preview.generative_models import GenerativeModel, Tool

app = Flask(__name__)

# Configuration
PROJECT_ID = 'course-project-417213'
REGION = 'us-central1'
BUCKET = 'bucket-course-project-417213'
EMBEDDING_MODEL = "publishers/google/models/text-embedding-005"
MODEL = 'gemini-1.5-flash-002'
PATH = "guru"

def initialize_vertex_ai():
    """Initialize Vertex AI and create corpus if it doesn't exist"""
    vertexai.init(project=PROJECT_ID, location=REGION)
    emb_model_config = rag.EmbeddingModelConfig(publisher_model=EMBEDDING_MODEL)
    
    try:
        # Try to get existing corpus, if it exists
        corpora = rag.list_corpora()
        for corpus in corpora:
            if corpus.display_name == 'corpus':
                return corpus
        
        # Create new corpus if it doesn't exist
        corpus = rag.create_corpus(display_name='corpus', embedding_model_config=emb_model_config)
        
        # Import files once when creating the corpus
        txt_files = list_all_files(BUCKET, folder_path=PATH)
        rag.import_files(
            corpus_name=corpus.name,
            paths=txt_files,
            chunk_size=512,
            chunk_overlap=50,
        )
        
        return corpus
    except RuntimeError as e:
        print(f"Error with corpus: {e}")
        print("Ensure the selected region supports Vertex AI RAG service.")
        raise

def list_all_files(bucket_name, folder_path):
    """List all files in a specific folder of a GCS bucket."""
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blobs = bucket.list_blobs(prefix=folder_path)
    
    # Filter for .pdf files
    files = [f"gs://{bucket_name}/{blob.name}" for blob in blobs]
    print(f"Successfully listed {len(files)} files")
    return files

def create_rag_model(corpus):
    """Create and return the RAG model"""
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
    
    return llm

# Initialize Vertex AI and RAG model at startup
corpus = initialize_vertex_ai()
model = create_rag_model(corpus)

@app.route('/query', methods=['POST'])
def query_rag():
    """API endpoint to query the RAG model"""
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()
    
    if 'prompt' not in data:
        return jsonify({"error": "Missing 'prompt' field in request"}), 400
    
    prompt = data['prompt']
    
    try:
        response = model.generate_content(prompt)
        
        # Extract the response text
        response_text = response.text
        
        # If there are citations in the response, include them
        citations = []
        if hasattr(response, 'citations') and response.citations:
            for citation in response.citations:
                citations.append({
                    "start_index": citation.start_index,
                    "end_index": citation.end_index,
                    "uri": citation.uri if hasattr(citation, 'uri') else None,
                    "title": citation.title if hasattr(citation, 'title') else None
                })
        
        return jsonify({
            "response": response_text,
            "citations": citations
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)