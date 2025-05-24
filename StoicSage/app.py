from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from stoic_bot import pipeline, setup_collection

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Replace before_first_request with this initialization code
def init_app():
    try:
        setup_collection()
        logger.info("Qdrant collection initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Qdrant collection: {str(e)}")

@app.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    try:
        if request.method == 'OPTIONS':
            return jsonify({}), 200
            
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        query = data.get('query')
        if not query:
            return jsonify({"error": "No query provided"}), 400
            
        logger.debug(f"Received query: {query}")
        
        response = pipeline(query)
        logger.debug(f"Generated response: {response}")
        
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    init_app()  # Initialize before running the app
    app.run(debug=True)