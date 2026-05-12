import io
import os
from pathlib import Path

from flask import Flask, Response, abort, jsonify, request, send_file, send_from_directory

from LevelDesigner.export_server import (
    DEFAULT_HEIGHT,
    DEFAULT_WIDTH,
    ROOT,
    build_bundle,
    import_bundle,
    render_png,
    sync_runtime_level,
)


app = Flask(__name__)


@app.after_request
def add_no_cache_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


def editor_html():
    page = (ROOT / "LevelDesigner" / "level-editor.html").read_text(encoding="utf-8")
    page = page.replace("<head>", '<head>\n  <base href="/LevelDesigner/">', 1)
    return Response(page, mimetype="text/html")

def game_html():
    page = (ROOT / "index.html").read_text(encoding="utf-8")
    return Response(page, mimetype="text/html")


@app.route("/", methods=["GET", "HEAD"])
@app.route("/LevelDesigner/level-editor.html", methods=["GET", "HEAD"])
def level_designer():
    return editor_html()


@app.route("/play", methods=["GET", "HEAD"])
@app.route("/index.html", methods=["GET", "HEAD"])
def game_page():
    return game_html()


@app.post("/export/png")
def export_png():
    payload = request.get_json(force=True, silent=True) or {}
    image = render_png(
        payload.get("actions", []),
        payload.get("width", DEFAULT_WIDTH),
        payload.get("height", DEFAULT_HEIGHT),
    )
    output = io.BytesIO()
    image.save(output, format="PNG")
    output.seek(0)
    return send_file(output, mimetype="image/png", as_attachment=True, download_name="background.png")


@app.post("/sync/runtime")
def sync_runtime():
    payload = request.get_json(force=True, silent=True) or {}
    sync_runtime_level(payload)
    return jsonify(ok=True)


@app.post("/export/bundle")
def export_bundle():
    payload = request.get_json(force=True, silent=True) or {}
    bundle = io.BytesIO(build_bundle(payload))
    bundle.seek(0)
    return send_file(bundle, mimetype="application/zip", as_attachment=True, download_name="level0-export.zip")


@app.post("/import/bundle")
def import_level_bundle():
    payload = request.get_json(force=True, silent=True) or {}
    return jsonify(import_bundle(payload.get("zipData", "")))


@app.route("/<path:resource_path>", methods=["GET", "HEAD"])
def static_resource(resource_path):
    parts = Path(resource_path).parts
    if any(part.startswith(".") or part == "__pycache__" for part in parts):
        abort(404)
    return send_from_directory(ROOT, resource_path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    host = os.environ.get("HOST", "0.0.0.0")
    app.run(host=host, port=port)
