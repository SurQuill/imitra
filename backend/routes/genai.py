from flask import Blueprint, request, jsonify
import boto3
import json
import os
from pathlib import Path

genai_bp = Blueprint("genai", __name__)

# Bedrock client
client = boto3.client("bedrock-runtime", region_name=os.getenv("AWS_REGION"))

@genai_bp.route("/generate", methods=["POST"])
def generate_terraform():
    user_prompt = request.json.get("prompt")

    bedrock_body = {
        "inputText": f"Generate Terraform script to: {user_prompt}",
        "textGenerationConfig": {
            "maxTokenCount": 500,
            "temperature": 0.5,
            "topP": 0.9,
        },
    }

    try:
        response = client.invoke_model(
            modelId="amazon.titan-text-express-v1",
            body=json.dumps(bedrock_body),
            contentType="application/json",
            accept="application/json",
        )
        output = json.loads(response["body"].read())
        terraform_code = output["results"][0]["outputText"]

        # Save to file for future deployment
        filename = user_prompt.replace(" ", "_").lower() + ".tf"
        output_path = Path("terraform/generated") / filename
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w") as f:
            f.write(terraform_code)

        return jsonify({"terraform": terraform_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
