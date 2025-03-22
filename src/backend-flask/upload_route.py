from flask import Blueprint, request, jsonify
from google.cloud import storage
import os

upload_bp = Blueprint('upload', __name__)

# Google Cloud Storage settings
BUCKET_NAME = 'bucket-course-project-417213'  # Replace with your GCS bucket name
SERVICE_ACCOUNT_KEY_PATH = 'service-account-key.json'  # Path to your service account key file

# Allowed file extensions
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'xlsx', 'docx', 'jpeg'}

# Initialize the GCS client
storage_client = storage.Client.from_service_account_json(SERVICE_ACCOUNT_KEY_PATH)
bucket = storage_client.bucket(BUCKET_NAME)

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Check if the file has an allowed extension
    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    try:
        # Upload the file to GCS
        blob = bucket.blob(file.filename)
        blob.upload_from_file(file)

        # Get the public URL of the uploaded file
        public_url = blob.public_url

        return jsonify({
            "message": "File uploaded successfully",
            "file_name": file.filename,
            "public_url": public_url
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500