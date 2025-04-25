from flask import Blueprint, jsonify

visualize_bp = Blueprint('visualize', __name__)

@visualize_bp.route('/', methods=['GET'])
def visualize_home():
    # Example data; replace with real visual output logic
    data = {
        "status": "success",
        "message": "Visualization endpoint is working!",
        "example": {
            "architecture": "2-tier",
            "resources": ["VPC", "Subnet", "EC2", "RDS"]
        }
    }
    return jsonify(data)
