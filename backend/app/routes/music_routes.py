from flask import Blueprint, request, jsonify, send_from_directory
import os

from app.services.music_service import generate_music


music_bp = Blueprint("music", __name__)


@music_bp.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "Request body is required"
        }), 400

    prompt = data.get("prompt")

    if not prompt or not prompt.strip():
        return jsonify({
            "success": False,
            "error": "Prompt is required"
        }), 400

    result = generate_music(prompt)

    return jsonify(result)


@music_bp.route("/audio/<filename>", methods=["GET"])
def get_audio(filename):
    audio_folder = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../generated_audio"
        )
    )

    return send_from_directory(
        audio_folder,
        filename
    )


@music_bp.route("/download/<filename>", methods=["GET"])
def download_audio(filename):
    audio_folder = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../generated_audio"
        )
    )

    return send_from_directory(
        audio_folder,
        filename,
        as_attachment=True
    )