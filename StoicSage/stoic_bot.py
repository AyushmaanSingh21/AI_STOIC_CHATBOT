from dotenv import load_dotenv
import os
import json
from llama_index.core import Document
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.groq import Groq
import qdrant_client
from qdrant_client import models
from llama_index.core.prompts import PromptTemplate
import logging
import time
from typing import List
from qdrant_client.http import models as rest_models

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv("keys.env")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

# Load texts
with open("stoic_texts.json", "r", encoding="utf-8") as f:
    data = json.load(f)
texts = data["texts"]

# Prepare embeddings and client
embed_model = HuggingFaceEmbedding(
    model_name="BAAI/bge-large-en-v1.5"  # This model produces 1024-dimensional vectors
)
client = qdrant_client.QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
    prefer_grpc=True
)
collection_name = "stoic_corpus"

# Define prompt template
PROMPT_TEMPLATE = PromptTemplate(
    """
    You are an expert Stoic assistant, well-versed in the teachings of Stoicism, 
    including the works of Marcus Aurelius, Seneca, and Epictetus.
    You provide insightful and practical advice based on Stoic philosophy.
    
    Context information:
    {context_str}
    ---------------------
    Question: {query}
    ---------------------
    If the question cannot be answered from the provided context, say "I don't have enough information to answer that question."
    
    Answer: """
)

llm = Groq(
    api_key=GROQ_API_KEY,
    model="deepseek-r1-distill-llama-70b",
    default_headers={},  # Add empty dict for default_headers
    logprobs=None,  # Set logprobs to None
    temperature=0.7,  # Optional: Add temperature
    max_tokens=512,  # Optional: Add max_tokens
)

def search(query, k=5):
    try:
        query_embedding = embed_model.get_text_embedding(query)
        result = client.search(
            collection_name=collection_name,
            query_vector=query_embedding,
            limit=k
        )
        return result
    except Exception as e:
        logging.error(f"Search error: {str(e)}")
        return []

def pipeline(query: str) -> dict:
    try:
        # Get relevant context
        logging.debug(f"Searching for query: {query}")
        search_results = search(query)
        logging.debug(f"Search results: {search_results}")
        
        if not search_results:
            logging.error("No search results found")
            return {"response": "I apologize, but I'm having trouble accessing the Stoic wisdom database."}
        
        # Prepare context from search results
        context = "\n".join([result.payload.get("text", "") for result in search_results])
        
        # Generate response using LLM
        prompt = PROMPT_TEMPLATE.format(context_str=context, query=query)
        response = llm.complete(prompt)
        
        return {"response": response.text if response else "I apologize, but I couldn't generate a response."}
        
    except Exception as e:
        logging.error(f"Pipeline error: {str(e)}", exc_info=True)
        return {"response": f"I apologize, but I encountered an error: {str(e)}"}

def upload_batch_with_retry(client, collection_name: str, batch: List[models.PointStruct], max_retries: int = 3) -> bool:
    for attempt in range(max_retries):
        try:
            client.upsert(
                collection_name=collection_name,
                points=batch
            )
            return True
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            logging.warning(f"Upload attempt {attempt + 1} failed, retrying in 2 seconds...")
            time.sleep(2)
    return False

# If you need to recreate the collection, add this code after the client initialization
def setup_collection():
    try:
        # Create HTTP client as fallback
        http_client = qdrant_client.QdrantClient(
            url=QDRANT_URL,
            api_key=QDRANT_API_KEY,
            prefer_grpc=False  # Force HTTP
        )
        
        logging.info("Checking if collection exists...")
        collections = http_client.get_collections()
        exists = any(c.name == collection_name for c in collections.collections)
        
        if exists:
            logging.info(f"Collection {collection_name} exists, deleting...")
            http_client.delete_collection(collection_name)
        
        logging.info(f"Creating new collection: {collection_name}")
        http_client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=1024,
                distance=models.Distance.COSINE
            )
        )
        
        # Upload texts
        logging.info(f"Processing {len(texts)} texts for embedding...")
        vectors = []
        for i, text in enumerate(texts):
            logging.debug(f"Embedding text {i+1}/{len(texts)}")
            vector = embed_model.get_text_embedding(text)
            vectors.append(models.PointStruct(
                id=i,
                vector=vector,
                payload={"text": text}
            ))
        
        # Upload in smaller batches with retry logic
        batch_size = 10  # Reduced batch size
        total_batches = (len(vectors) + batch_size - 1) // batch_size
        
        for i in range(0, len(vectors), batch_size):
            batch = vectors[i:i + batch_size]
            batch_num = (i // batch_size) + 1
            logging.info(f"Uploading batch {batch_num}/{total_batches}")
            
            try:
                success = upload_batch_with_retry(http_client, collection_name, batch)
                if not success:
                    raise Exception("Failed to upload batch after retries")
            except Exception as batch_error:
                logging.error(f"Failed to upload batch {batch_num}: {str(batch_error)}")
                raise
            
            # Add delay between batches
            if batch_num < total_batches:
                time.sleep(1)
        
        logging.info(f"Successfully created collection {collection_name} with {len(texts)} texts")
        return True
        
    except Exception as e:
        logging.error(f"Setup error: {str(e)}", exc_info=True)
        return False

def test_pipeline():
    logging.info("Testing pipeline...")
    test_query = "What is the meaning of life according to Stoicism?"
    try:
        result = pipeline(test_query)
        logging.info(f"Test query result: {result}")
        return result
    except Exception as e:
        logging.error(f"Test failed: {str(e)}", exc_info=True)
        return None

if __name__ == "__main__":
    logging.info("Starting setup and test...")
    
    # Setup collection
    if setup_collection():
        logging.info("Collection setup successful")
        # Test the pipeline
        test_result = test_pipeline()
        if test_result:
            logging.info("Pipeline test successful")
            print("\nSetup completed successfully!")
            print("You can now use pipeline(\"your query\") to get responses.")
        else:
            logging.error("Pipeline test failed")
    else:
        logging.error("Collection setup failed")