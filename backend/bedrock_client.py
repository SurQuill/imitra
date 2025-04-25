import boto3

def generate_terraform_from_nlp(prompt):
    bedrock_runtime = boto3.client(
        service_name="bedrock-runtime",
        region_name="us-east-1",
        aws_access_key_id="YOUR_ACCESS_KEY",
        aws_secret_access_key="YOUR_SECRET_KEY"
    )

    body = {
        "inputText": prompt,
        "textGenerationConfig": {
            "temperature": 0.5,
            "maxTokenCount": 500
        }
    }

    response = bedrock_runtime.invoke_model(
        modelId="amazon.titan-text-express-v1",
        body=json.dumps(body),
        contentType="application/json",
        accept="application/json"
    )

    output = json.loads(response['body'].read())
    return output['results'][0]['outputText']
