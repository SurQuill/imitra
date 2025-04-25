from ..bedrock_client import call_bedrock

import os

def generate_terraform_aws(prompt):
    name = "aws_project"
    folder = f"backend/terraform/{name}"
    os.makedirs(folder, exist_ok=True)

    terraform_prompt = build_prompt(prompt)
    terraform_code = call_bedrock(terraform_prompt)

    tf_path = os.path.join(folder, "main.tf")
    with open(tf_path, "w") as f:
        f.write(terraform_code)

    return terraform_code, folder

def build_prompt(user_prompt):
    return f"""
You are a Terraform expert. Generate only valid Terraform HCL code to:
{user_prompt}

Use Terraform 1.5+ and AWS provider.
Do NOT include provider block or explanation.
Output only Terraform code.
"""
