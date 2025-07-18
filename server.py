from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Ollama endpoint for local model
OLLAMA_URL = "http://localhost:11434/api/generate"

@app.route('/optimize', methods=['POST'])
def optimize_code():
    data = request.get_json()

    prompt = data.get("input", "")
    if not prompt:
        return jsonify({"error": "No input provided"}), 400

    # Mistral prompt using Ollama
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        result = response.json()

        return jsonify({
            "output": result.get("response", "").strip()
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)
