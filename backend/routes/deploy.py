from flask import Blueprint

deploy_bp = Blueprint('deploy', __name__)

# Define your routes here
@deploy_bp.route("/example")
def example():
    return "Deploy route works!"
