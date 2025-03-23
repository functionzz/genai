from flask import Blueprint, request, jsonify
from vertex_ai import main

prompt_bp = Blueprint('upload', __name__)

@prompt_bp.route('/prompt', methods=['POST'])
def rag_query():
    try:
        # Ensure the request contains JSON data
        if not request.is_json:
            return jsonify({"error": "Request must be in JSON format"}), 400

        # Extract the 'prompt' key from the JSON payload
        data = request.get_json()
        if 'prompt' not in data:
            return jsonify({"error": "Missing 'prompt' in request body"}), 400

        # Pass the prompt to the main() function
        prompt = data['prompt']
        query_response = main(prompt)

        # Ensure the response from main() is valid
        if not query_response:
            return jsonify({"error": "Failed to process the query"}), 500

        return jsonify(query_response), 200

    except Exception as e:
        # Catch any unexpected errors and return a 500 response
        return jsonify({"error": str(e)}), 500