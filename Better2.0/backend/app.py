from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_talisman import Talisman
from flask_cors import CORS
import re
import os

app = Flask(__name__)
CORS(app)
Talisman(app)
limiter = Limiter(app, key_func=get_remote_address)

# Simple input sanitization
def sanitize(text):
    return re.sub(r'[<>]', '', text.strip())

@app.route("/submit", methods=["POST"])
@limiter.limit("5 per minute")
def submit():
    data = request.get_json()
    message = sanitize(data.get("message", ""))
    if not message:
        return jsonify({"error": "Empty message"}), 400
    # Optional: store, forward, or log the message
    print("Received:", message)
    return jsonify({"status": "success", "message": "Submission received."}), 200

if __name__ == "__main__":
    app.run(debug=True)
