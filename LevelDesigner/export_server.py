from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import base64
import io
import json
import re
import socket
import sys
import zipfile
from urllib.error import URLError
from urllib.request import urlopen
from urllib.parse import unquote

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
LEVEL0_DIR = ROOT / "background" / "levels" / "level0"
DEFAULT_WIDTH = 640
DEFAULT_HEIGHT = 480


def project_path(asset_path):
    clean = unquote(asset_path).replace("\\", "/")
    while clean.startswith("../"):
        clean = clean[3:]
    return (ROOT / clean).resolve()


def render_template(draw, image):
    width, height = image.size
    draw.rectangle((0, 0, width, height), fill="#050505")
    draw.rectangle((34, 58, 34 + 572, 58 + 368), outline="#f7f7f7", width=4)
    draw.rectangle((88, 92, 88 + 464, 92 + 82), fill="#101010", outline="#777777", width=2)
    draw.rectangle((88, 194, 88 + 464, 194 + 82), fill="#101010", outline="#777777", width=2)
    draw.rectangle((88, 296, 88 + 464, 296 + 82), fill="#101010", outline="#777777", width=2)
    draw.rectangle((258, 184, 258 + 124, 184 + 92), outline="#e0c15c", width=3)
    draw.rectangle((276, 202, 276 + 88, 202 + 14), fill="#e0c15c")
    draw.rectangle((276, 226, 276 + 88, 226 + 8), fill="#777777")
    draw.rectangle((276, 244, 276 + 88, 244 + 8), fill="#777777")
    font = ImageFont.load_default()
    draw.text((224, 28), "THE ARCHIVE", fill="#f7f7f7", font=font)
    draw.text((98, 390), "LEVEL 0", fill="#777777", font=font)


def render_action(base, action):
    draw = ImageDraw.Draw(base)
    kind = action.get("type")
    if kind == "template":
        render_template(draw, base)
    elif kind == "backgroundImage":
        src = action.get("src", "")
        if src.startswith("data:"):
            image = Image.open(io.BytesIO(decode_data_url(src))).convert("RGBA")
        else:
            path = project_path(src)
            if not path.is_file():
                raise FileNotFoundError(f"Missing background image: {path}")
            image = Image.open(path).convert("RGBA")
        x = int(action.get("x", 0))
        y = int(action.get("y", 0))
        w = int(action.get("w", base.size[0]))
        h = int(action.get("h", base.size[1]))
        image = image.resize((w, h), Image.Resampling.NEAREST)
        base.alpha_composite(image, (x, y))
    elif kind == "stroke":
        points = [(p["x"], p["y"]) for p in action.get("points", [])]
        if len(points) > 1:
            draw.line(points, fill=action.get("color", "#f7f7f7"), width=int(action.get("size", 1)))
    elif kind == "line":
        start = action.get("from", {})
        end = action.get("to", {})
        draw.line(
            (start.get("x", 0), start.get("y", 0), end.get("x", 0), end.get("y", 0)),
            fill=action.get("color", "#f7f7f7"),
            width=int(action.get("size", 1)),
        )
    elif kind == "rect":
        start = action.get("from", {})
        end = action.get("to", {})
        draw.rectangle(
            (start.get("x", 0), start.get("y", 0), end.get("x", 0), end.get("y", 0)),
            outline=action.get("color", "#f7f7f7"),
            width=int(action.get("size", 1)),
        )
    elif kind == "asset":
        path = project_path(action["sheet"])
        if not path.is_file():
            raise FileNotFoundError(f"Missing asset: {path}")
        sheet = Image.open(path).convert("RGBA")
        sx = int(action["sx"])
        sy = int(action["sy"])
        sw = int(action["sw"])
        sh = int(action["sh"])
        dw = int(action["dw"])
        dh = int(action["dh"])
        tile = sheet.crop((sx, sy, sx + sw, sy + sh)).resize((dw, dh), Image.Resampling.NEAREST)
        rotation = int(action.get("rotation", 0)) % 360
        if rotation:
            tile = tile.rotate(-rotation, resample=Image.Resampling.NEAREST, expand=False)
        base.alpha_composite(tile, (int(action["x"]), int(action["y"])))


def render_png(actions, width=DEFAULT_WIDTH, height=DEFAULT_HEIGHT):
    image = Image.new("RGBA", (int(width), int(height)), "#050505")
    for action in actions:
        render_action(image, action)
    return image


def decode_data_url(data_url):
    if not isinstance(data_url, str) or "," not in data_url:
        raise ValueError("Invalid backgroundDataUrl.")
    header, encoded = data_url.split(",", 1)
    if ";base64" not in header:
        raise ValueError("backgroundDataUrl must be base64-encoded.")
    return base64.b64decode(encoded)


def slugify_filename(text, fallback="character"):
    slug = re.sub(r"[^a-z0-9]+", "-", str(text).lower()).strip("-")
    return slug or fallback


def build_level_files(payload):
    hitboxes = []
    for box in payload.get("hitboxes", []):
        hitboxes.append({
            "x": int(box.get("x", 0)),
            "y": int(box.get("y", 0)),
            "width": int(box.get("width", box.get("w", 0))),
            "height": int(box.get("height", box.get("h", 0))),
        })
    hitboxes_payload = {
        "room": "archive",
        "level": "level0",
        "hitboxes": hitboxes,
    }

    characters = []
    for character in payload.get("characters", []):
        entry = {
            "type": "character",
            "characterId": character.get("characterId") or character.get("id") or "character",
            "name": character.get("name") or character.get("characterId") or "Character",
            "sprite": character.get("sprite") or "",
            "source": {
                "x": int(character.get("sourceX", 0)),
                "y": int(character.get("sourceY", 0)),
                "width": int(character.get("sourceWidth", character.get("width", 16))),
                "height": int(character.get("sourceHeight", character.get("height", 32))),
            },
            "position": {
                "x": int(character.get("x", 0)),
                "y": int(character.get("y", 0)),
            },
            "size": {
                "width": int(character.get("width", 16)),
                "height": int(character.get("height", 32)),
            },
            "dialogue": character.get("dialogue") or "",
        }
        characters.append(entry)

    characters_payload = {
        "room": "archive",
        "level": "level0",
        "characters": characters,
    }

    notes = []
    for note in payload.get("notes", []):
        notes.append({
            "id": note.get("id") or "note",
            "title": note.get("title") or "Note",
            "body": note.get("body") or "",
            "x": int(note.get("x", 0)),
            "y": int(note.get("y", 0)),
            "layer": note.get("layer") or {},
        })
    notes_payload = {
        "room": "archive",
        "level": "level0",
        "notes": notes,
    }

    files = {
        "background.png": decode_data_url(payload.get("backgroundDataUrl")) if payload.get("backgroundDataUrl") else None,
        "hitboxes.json": f"{json.dumps(hitboxes_payload, indent=2)}\n".encode("utf-8"),
        "characters.json": f"{json.dumps(characters_payload, indent=2)}\n".encode("utf-8"),
        "notes.json": f"{json.dumps(notes_payload, indent=2)}\n".encode("utf-8"),
    }
    for character in characters:
        filename = f"{slugify_filename(character['name'], slugify_filename(character['characterId']))}.json"
        files[filename] = f"{json.dumps(character, indent=2)}\n".encode("utf-8")
    return files, characters


def sync_runtime_level(payload):
    LEVEL0_DIR.mkdir(parents=True, exist_ok=True)
    files, characters = build_level_files(payload)
    for name, content in files.items():
        if content is None:
            continue
        (LEVEL0_DIR / name).write_bytes(content)

    for existing in LEVEL0_DIR.glob("*.json"):
        if existing.name in {"hitboxes.json", "characters.json", "notes.json"}:
            continue
        if existing.name == "adam.json" and any(character.get("characterId") == "adam" for character in characters):
            continue
        if existing.name.startswith("hitboxes-"):
            existing.unlink(missing_ok=True)


def build_bundle(payload):
    files, _ = build_level_files(payload)
    archive = io.BytesIO()
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
        for name, content in files.items():
            if content is None:
                continue
            bundle.writestr(f"level0/{name}", content)
    archive.seek(0)
    return archive.read()


def import_bundle(zip_data):
    raw = base64.b64decode(zip_data)
    with zipfile.ZipFile(io.BytesIO(raw), "r") as bundle:
        names = bundle.namelist()
        background_name = next((name for name in names if name.endswith("/background.png") or name == "background.png"), None)
        hitboxes_name = next((name for name in names if name.endswith("/hitboxes.json") or name == "hitboxes.json"), None)
        characters_name = next((name for name in names if name.endswith("/characters.json") or name == "characters.json"), None)
        notes_name = next((name for name in names if name.endswith("/notes.json") or name == "notes.json"), None)
        if not background_name:
            raise ValueError("Zip does not contain background.png")
        background_bytes = bundle.read(background_name)
        image = Image.open(io.BytesIO(background_bytes))
        width, height = image.size
        background_data_url = f"data:image/png;base64,{base64.b64encode(background_bytes).decode('ascii')}"
        hitboxes_payload = json.loads(bundle.read(hitboxes_name).decode("utf-8")) if hitboxes_name else {}
        characters_payload = json.loads(bundle.read(characters_name).decode("utf-8")) if characters_name else {}
        notes_payload = json.loads(bundle.read(notes_name).decode("utf-8")) if notes_name else {}
        return {
            "width": width,
            "height": height,
            "backgroundDataUrl": background_data_url,
            "hitboxes": hitboxes_payload.get("hitboxes", hitboxes_payload if isinstance(hitboxes_payload, list) else []),
            "characters": characters_payload.get("characters", characters_payload if isinstance(characters_payload, list) else []),
            "notes": notes_payload.get("notes", notes_payload if isinstance(notes_payload, list) else []),
        }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if self.path == "/export/png":
                image = render_png(
                    payload.get("actions", []),
                    payload.get("width", DEFAULT_WIDTH),
                    payload.get("height", DEFAULT_HEIGHT),
                )
                self.send_response(200)
                self.send_header("Content-Type", "image/png")
                self.send_header("Content-Disposition", "attachment; filename=background.png")
                self.end_headers()
                image.save(self.wfile, format="PNG")
                return
            if self.path == "/sync/runtime":
                sync_runtime_level(payload)
                response = json.dumps({"ok": True}).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(response)))
                self.end_headers()
                self.wfile.write(response)
                return
            if self.path == "/export/bundle":
                bundle = build_bundle(payload)
                self.send_response(200)
                self.send_header("Content-Type", "application/zip")
                self.send_header("Content-Disposition", "attachment; filename=level0-export.zip")
                self.send_header("Content-Length", str(len(bundle)))
                self.end_headers()
                self.wfile.write(bundle)
                return
            if self.path == "/import/bundle":
                imported = import_bundle(payload.get("zipData", ""))
                response = json.dumps(imported).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(response)))
                self.end_headers()
                self.wfile.write(response)
                return
            self.send_error(404)
        except Exception as exc:
            message = str(exc).encode("utf-8")
            self.send_response(500)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(message)))
            self.end_headers()
            self.wfile.write(message)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    try:
        server = ThreadingHTTPServer(("localhost", port), Handler)
    except OSError as exc:
        if exc.errno == 48:
            editor_url = f"http://localhost:{port}/LevelDesigner/level-editor.html"
            try:
                with urlopen(editor_url) as response:
                    if response.status == 200:
                        print(f"Server already running at {editor_url}")
                        return
            except URLError:
                pass
            print(f"Port {port} is already in use. Stop the existing process or run on another port, for example:")
            print(f"python3 LevelDesigner/export_server.py {port + 1}")
            return
        raise
    print(f"Serving level editor at http://localhost:{port}/LevelDesigner/level-editor.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
