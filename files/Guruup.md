# Inspiration

Students, professors, intrapreneurs, and small businesses all face the challenge of managing money without always having a solid background in accounting or financial analysis. If finances are handled poorly, they can lead to serious problems, and a simple oversight might disrupt your purchasing power. It can be frustrating to store countless documents and never be sure where to find the details you really need.

# What it does

Guruup is a platform designed to help you organize your finances, make better decisions, and quickly access your information in an intuitive way. You can upload PDFs, DOCs, Excel files, and even photos of your receipts. The system learns from your data and becomes your personal financial assistant, instantly providing key insights. 

It is especially useful for entrepreneurs or small businesses who need to navigate all their documents without endless searching, and for professionals who want to view their expenses and upcoming payments at a glance. 

You might ask: 
- In which month I spend more?
- How much did I pay in credit card interest last month?
- am I paying for duplicate services like internet and streaming?

# What we learn

We discovered new tools such as Vertex AI for generating embeddings and learned more about people’s needs regarding financial information. Many do not fully understand their own financial health, so having a system that can interpret and summarize important data is crucial.

# How we built it

We followed the Lean Startup approach to shape our idea and model. During brainstorming, we used Miro to capture all our ideas focused on practical daily issues that, if solved, could have a significant positive impact on users. After three rounds of votes, a winning concept emerged: people need step by step guidance to manage their finances and to track spending or saving habits effectively. To stay organized and maintain a fast workflow, we turned to Trello for task distribution.

Our technology stack includes Vite-React for the front end, Flask for the back end, and Gemini for enhanced AI functionalities. We rely on Vertex AI RAG for retrieval augmented generation, Google Cloud Storage to hold documents, and we use Postman for API testing.

# Challenges

From the start, we were uncertain because the financial domain is always demanding. Understanding how different APIs work and integrating Vertex AI RAG as a single tool proved to be the biggest hurdle. We also faced challenges in setting up Google Cloud for development, working with Google Cloud authentication APIs, and ensuring data ingestion and model training remained consistent. Our final interface had to stay user-friendly while retaining the depth of information that users need.

# Built with

The system uses Google Cloud Storage for data handling, Vertex AI to generate embeddings for document analysis, and Large Language Models to power the search and interpretation. We built a proof-of-concept front end in React for the final presentation.

# What’s next

In the future, the platform will feature alerts for non-essential spending, repeated late payments, and an overall view of your financial health. It will also incorporate automated tax calculation to simplify annual reporting.

We also plan to incorporate advanced budget projection features using user-defined goals, so the platform can automatically identify and highlight upcoming financial risks or opportunities.