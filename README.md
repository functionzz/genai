# GuruApp - Your AI-Powered Financial Assistant

## Overview

GuruApp is a hackathon project designed to provide users with an AI-powered financial assistant. Users can upload financial documents (utility bills, receipts, etc.) and chat with the app to gain insights, analyze expenses, and get financial advice. This version prioritizes simplicity and utilizes Google Cloud Functions, Vertex AI, and a simplified React frontend (or a no-code alternative) to minimize development complexity.

## Features

* **File Upload:** Upload financial documents for analysis.
* **Document Processing:** Extract relevant data (dates, amounts, categories) using Vertex AI Document AI.
* **AI Chat:** Ask questions and receive financial insights using Vertex AI PaLM API.
* **Expense Analysis:** Query expenses by month, category, etc.
* **Simplified Data Storage:** Uses JSON files stored in Google Cloud Storage.

## Architecture

* **Frontend:**
    * Simplified React application (or AppSheet/Glide/Bubble) for file uploads and chat interface.
    * Uses `fetch` API for communication with the backend.
* **Backend:**
    * Google Cloud Functions: Serverless functions for handling API requests.
    * Vertex AI: Document AI for data extraction, PaLM API for conversational AI.
    * Google Cloud Storage: For storing uploaded files and processed data (JSON files).

## Getting Started

### Setup


### Limitations

* This is a hackathon project, so it may have limited functionality and error handling.
* Data is stored in JSON files, which may not be suitable for large datasets.
* The accuracy of the financial advice depends on the quality of the data and the capabilities of the Vertex AI models.

### Future Improvements

* Implement a robust database for data storage.
* Add more advanced financial analysis features.
* Improve the user interface and user experience.
* Add user authentication.
* Improve the accuracy of document processing and chatbot responses.

### Team

* \[Your Team Members' Names]

### License

This project is licensed under the \[Your License] license.