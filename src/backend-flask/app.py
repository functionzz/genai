from flask import Flask
from upload_route import upload_bp 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

app.register_blueprint(upload_bp)
# app.register_blueprint(upload_bp, url_prefix='/api')  # Optional: Add a URL prefix like '/api'


if __name__ == '__main__':
    app.run(debug=True)
