from flask import Flask
from upload_route import upload_bp  # Import the blueprint

app = Flask(__name__)

# Register the upload blueprint
app.register_blueprint(upload_bp, url_prefix='/api')  # Optional: Add a URL prefix like '/api'

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)