from dotenv import load_dotenv
import os
from google.oauth2 import service_account
from google.cloud import storage

# Load environment variables from .env file
load_dotenv()

# Method to get the storage client
def get_storage_client():
    # Use GOOGLE_APPLICATION_CREDENTIALS environment variable
    credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if not credentials_path:
        print("Warning: GOOGLE_APPLICATION_CREDENTIALS not set")
        # Default to local path if not set
        credentials_path = os.path.join(os.path.dirname(__file__), "service-account-key.json")

    # Check if the file exists
    if not os.path.exists(credentials_path):
        raise FileNotFoundError(f"Service account key file not found at: {credentials_path}")
    
    print(f"Using credentials file: {credentials_path}")

    # Try to create the storage client
    try:
        # Method 1: Using the environment variable (automatically picked up)
        storage_client = storage.Client()
        print("Connected successfully using environment variable!")
        return storage_client
    except Exception as e:
        print(f"Error using environment variable: {e}")
        # Fallback to explicitly loading from file
        credentials = service_account.Credentials.from_service_account_file(credentials_path)
        storage_client = storage.Client(credentials=credentials)
        print("Connected successfully using explicit file!")
        return storage_client

# Exported storage client
storage_client = get_storage_client()