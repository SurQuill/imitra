from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes.deploy import deploy_bp
    from .routes.genai import genai_bp
    from .routes.visualize import visualize_bp

    app.register_blueprint(deploy_bp, url_prefix='/api/deploy')
    app.register_blueprint(genai_bp, url_prefix='/api/genai')
    app.register_blueprint(visualize_bp, url_prefix='/api/visualize')

    return app
