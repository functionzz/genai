from flask import Flask
from upload_route import upload_bp  # Replace 'your_file_name' with the name of your Python file

app = Flask(__name__)
app.register_blueprint(upload_bp)
# app.register_blueprint(upload_bp, url_prefix='/api')  # Optional: Add a URL prefix like '/api'


if __name__ == '__main__':
    app.run(debug=True)
