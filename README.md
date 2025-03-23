# GuruApp - Your AI-Powered Financial Assistant

![alt logo](image.png)

## Overview

GuruApp is an AI-powered financial assistant designed to help students, professors, intrapreneurs, and small businesses manage their finances without needing extensive accounting knowledge. Users can upload financial documents (utility bills, receipts, etc.) and chat with the app to gain insights, analyze expenses, and get personalized financial advice. The platform uses Google Cloud Functions, Vertex AI, and a simplified React frontend to provide an intuitive experience for organizing and understanding your financial data.

## Inspiration

Managing finances without a solid background in accounting or financial analysis can be challenging. Poor financial management can lead to serious problems, and simple oversights might disrupt your purchasing power. Storing countless documents and struggling to find important details when needed is frustrating for many people.

## Features

* **Document Upload:** Upload financial documents (PDFs, DOCs, Excel files, and even photos of receipts) for analysis.
* **Intelligent Document Processing:** Extract relevant data (dates, amounts, categories) using Vertex AI Document AI.
* **AI-Powered Chat:** Ask questions and receive financial insights using Vertex AI PaLM API.
* **Expense Analysis:** Query expenses by month, category, etc. with simple questions like:
  * "In which month did I spend more?"
  * "How much did I pay in credit card interest last month?"
  * "Am I paying for duplicate services like internet and streaming?"
* **Document Organization:** Find documents instantly without endless searching.
* **Financial Overview:** View expenses and upcoming payments at a glance.

## Architecture

* **Frontend:**
    * React application built with Vite for file uploads and chat interface.
    * Uses `fetch` API for communication with the backend.
* **Backend:**
    * Flask server for handling API requests.
    * Vertex AI: Document AI for data extraction, RAG for retrieval augmented generation, and Gemini for conversational AI.
    * Google Cloud Storage: For storing uploaded files and processed data.

## How We Built It

We followed the Lean Startup approach to shape our idea and model:
1. **Brainstorming:** Used Miro to capture all our ideas focused on practical daily issues.
2. **Concept Development:** After three rounds of voting, we chose to focus on helping people track spending and saving habits.
3. **Project Management:** Used Trello for task distribution and workflow organization.
4. **Technology Implementation:**
   * Vite-React for the front end
   * Flask for the back end
   * Gemini for enhanced AI functionalities
   * Vertex AI RAG for retrieval augmented generation
   * Google Cloud Storage for document storage
   * Postman for API testing

## Challenges We Faced

* Navigating the demanding financial domain
* Understanding and integrating Vertex AI RAG
* Setting up Google Cloud for development
* Working with Google Cloud authentication APIs
* Ensuring consistent data ingestion and model training
* Creating a user-friendly interface that still provides deep financial insights

## Getting Started

### Setup
(Setup instructions here)

## Limitations

* This is a hackathon project, so it may have limited functionality and error handling.
* Data is stored in JSON files, which may not be suitable for large datasets.
* The accuracy of the financial advice depends on the quality of the data and the capabilities of the Vertex AI models.

## Future Improvements

* Implement a robust database for data storage.
* Add alerts for non-essential spending and repeated late payments.
* Provide an overall view of financial health.
* Incorporate automated tax calculation for simpler annual reporting.
* Advanced budget projection features using user-defined goals.
* Automatic identification of upcoming financial risks or opportunities.
* Improve the user interface and user experience.
* Add user authentication.
* Enhance the accuracy of document processing and chatbot responses.

## Team

* Kelly Vergara [LinkedIn](https://www.linkedin.com/in/kellyvergarat/)
* Jaimie Hu [LinkedIn](https://www.linkedin.com/in/jamie-hu-757785213/)
* Jorge Godiel [LinkedIn](https://www.linkedin.com/in/jorge-ronaldo-godiel-galvez-237000141/)
* Shahhan Khan [LinkedIn](https://www.linkedin.com/in/shaharyar-khan-33032a2a0/)


