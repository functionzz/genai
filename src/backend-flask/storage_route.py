from flask import Blueprint, request, jsonify
from google.cloud import storage

storage_bp = Blueprint('storage', __name__)

# Google Cloud Storage settings
BUCKET_NAME = 'bucket-course-project-417213'  # Replace with your GCS bucket name
SERVICE_ACCOUNT_KEY_PATH = 'service-account-key.json'  # Path to your service account key file

# Initialize the GCS client
storage_client = storage.Client.from_service_account_json(SERVICE_ACCOUNT_KEY_PATH)
bucket = storage_client.bucket(BUCKET_NAME)

@storage_bp.route('/storage', methods=['GET'])
def list_files():
    try:
        # List all files in the /guru folder
        blobs = bucket.list_blobs(prefix='guru/')  # List objects with the prefix 'guru/'

        # Extract file names and public URLs
        files = []
        for blob in blobs:
            if not blob.name.endswith('/'):  # Skip "folder" objects
                files.append({
                    "file_name": blob.name.replace('guru/', ''),  # Remove the folder prefix
                    "size": blob.size,  # File size in bytes
                    "file_type": blob.name.split('.')[-1].lower(),  # Extract file extension
                    "creation_time": blob.time_created.strftime('%Y-%m-%d %H:%M:%S'),  # Creation time
                    "update_time": blob.updated.strftime('%Y-%m-%d %H:%M:%S')  # Last update time
                })

        return jsonify({
            "message": "Files retrieved successfully",
            "files": files
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@storage_bp.route('/delete-files', methods=['DELETE'])
def delete_files():
    try:
        # Get the list of file names to delete
        file_names = request.json.get('file_names', [])
        if not file_names:
            return jsonify({"error": "No files selected"}), 400

        # Delete each file
        for file_name in file_names:
            blob = bucket.blob(f"guru/{file_name}")  # Prepend the folder name
            blob.delete()

        return jsonify({"message": "Files deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500