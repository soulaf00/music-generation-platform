from flask import Flask
from flask_cors import CORS

from app.routes.music_routes import music_bp


def create_app():
    app = Flask(__name__)

    CORS(app)

    app.register_blueprint(music_bp)

    return app