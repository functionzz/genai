from flask import Flask
from upload_route import upload_bp 
from storage_route import storage_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

app.register_blueprint(upload_bp)
app.register_blueprint(storage_bp)
app.register_blueprint(prompt_bp)

if __name__ == '__main__':
    app.run(debug=True)
