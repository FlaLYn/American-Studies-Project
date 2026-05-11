const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const urlParams = new URLSearchParams(window.location.search);
const editorPreviewMode = urlParams.get("preview") === "editor";
const EDITOR_PREVIEW_STORAGE_KEY = "levelEditorGamePreview";
const gameWrap = document.getElementById("gameWrap");
const runtimeCacheBuster = (() => {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "::1"
    ? `v=${Date.now()}`
    : "";
})();

const ui = {
  title: document.getElementById("placeTitle"),
  objective: document.getElementById("objective"),
  dialogue: document.getElementById("dialogue"),
  speaker: document.getElementById("speaker"),
  text: document.getElementById("text"),
  choices: document.getElementById("choices"),
  opVal: document.getElementById("opVal"),
  eqVal: document.getElementById("eqVal"),
  stVal: document.getElementById("stVal"),
  opFill: document.getElementById("opFill"),
  eqFill: document.getElementById("eqFill"),
  stFill: document.getElementById("stFill")
};
const needsHttpForLevelData = window.location.protocol === "file:";

const eraOrder = ["market", "gilded", "progressive", "twenties", "depression"];
const eras = {
  market: {
    title: "Market Revolution",
    years: "1815-1850",
    object: "Canal Coin",
    icon: "$",
    scene: "A canal town where cash wages, factories, and banks are changing daily life.",
    npc: "Mill Worker Eliza",
    goal: "Talk to Eliza and help decide how wages should be used.",
    facts: ["new canals and roads connected markets", "factory labor created cash wages", "workers organized over hours and conditions"],
    choices: [
      ["Save wages and organize for shorter hours.", "Eliza gains some independence and joins workers demanding a ten-hour day. Money creates opportunity, but workers must fight for fair conditions.", { op: 2, eq: 2, st: 1 }],
      ["Spend every wage on new factory goods.", "The shops grow busy, but Eliza has no cushion when work slows. The cash economy rewards buying and selling while placing risk on wage earners.", { op: 2, eq: 0, st: 0 }],
      ["Leave wage work and return to subsistence farming.", "Eliza avoids factory discipline, but her family struggles to buy tools and pay debts in a market economy.", { op: 0, eq: 1, st: 1 }]
    ],
    quiz: [
      ["What helped create the Market Revolution?", "Transportation, factories, banks, and expanding markets", ["Transportation, factories, banks, and expanding markets", "The New Deal", "The end of wage labor"]],
      ["What problem did many workers face?", "Long hours and dependence on wages", ["Long hours and dependence on wages", "Too much control over factory profits", "No need for cash"]]
    ]
  },
  gilded: {
    title: "Gilded Age",
    years: "1870-1900",
    object: "Railroad Ticket",
    icon: "R",
    scene: "Rail lines, trusts, strikes, and huge fortunes divide the depot.",
    npc: "Rail Worker Thomas",
    goal: "Talk to Thomas and respond to a wage cut.",
    facts: ["railroads linked national markets", "corporations and trusts gained power", "workers and farmers organized against unfair systems"],
    choices: [
      ["Organize peacefully and demand public attention.", "The strike draws newspapers and reformers. Concentrated wealth creates organized resistance.", { op: 1, eq: 3, st: 1 }],
      ["Trust the railroad owner to raise wages later.", "Profits rise, but wages do not. The gap between owners and workers grows.", { op: 1, eq: 0, st: 1 }],
      ["Destroy equipment to stop trains immediately.", "Authorities arrive, and support fades. Economic conflict can explode when people lack a voice.", { op: 0, eq: 1, st: 0 }]
    ],
    quiz: [
      ["Why was the age called 'gilded'?", "It looked wealthy while hiding deep problems", ["It looked wealthy while hiding deep problems", "Everyone became rich", "Paper money disappeared"]],
      ["What was one major conflict?", "Workers and farmers challenged powerful corporations", ["Workers and farmers challenged powerful corporations", "Railroads stopped mattering", "Factories vanished"]]
    ]
  },
  progressive: {
    title: "Progressive Era",
    years: "1890-1920",
    object: "Reform Newspaper",
    icon: "N",
    scene: "A newspaper office investigates unsafe factories, monopolies, and poverty.",
    npc: "Reporter Ida Wellspring",
    goal: "Talk to Ida and choose the front-page investigation.",
    facts: ["muckrakers exposed abuses", "reformers pushed regulation", "government power expanded to address industrial problems"],
    choices: [
      ["Expose unsafe factories and demand inspections.", "Readers pressure lawmakers. Reform shows government can limit industrial abuses.", { op: 1, eq: 3, st: 2 }],
      ["Print only stories that please advertisers.", "The paper earns money, but dangerous conditions stay hidden.", { op: 1, eq: 0, st: 1 }],
      ["Call for every business to close immediately.", "Workers still need jobs. The city turns toward regulation, unions, and public pressure.", { op: 0, eq: 1, st: 0 }]
    ],
    quiz: [
      ["What did many Progressives want?", "Regulate business and improve social conditions", ["Regulate business and improve social conditions", "End every newspaper", "Remove all workplace rules"]],
      ["How did muckrakers help reform?", "They exposed problems to build public pressure", ["They exposed problems to build public pressure", "They owned all trusts", "They banned spending"]]
    ]
  },
  twenties: {
    title: "Roaring Twenties",
    years: "1920-1929",
    object: "Stock Certificate",
    icon: "%",
    scene: "A bright brokerage window promises radios, cars, credit, and quick profits.",
    npc: "Clerk Joseph Carter",
    goal: "Talk to Joseph before he invests his savings.",
    facts: ["mass production expanded consumer goods", "installment credit encouraged buying", "stock speculation made prosperity fragile"],
    choices: [
      ["Buy cautiously and keep emergency savings.", "Joseph enjoys new goods without risking everything. Opportunity and danger arrive together.", { op: 2, eq: 1, st: 3 }],
      ["Borrow heavily to buy stocks on margin.", "Paper profits rise, then vanish when prices fall. Easy money can become crisis.", { op: 2, eq: 0, st: 0 }],
      ["Reject all new products and hide cash at home.", "Joseph avoids debt but misses chances offered by new industries.", { op: 0, eq: 1, st: 2 }]
    ],
    quiz: [
      ["What made the 1920s seem prosperous?", "Mass production, credit, advertising, and rising stocks", ["Mass production, credit, advertising, and rising stocks", "A complete end to poverty", "All banks closing"]],
      ["What danger helped lead toward the crash?", "Speculation and buying stocks with borrowed money", ["Speculation and buying stocks with borrowed money", "Too many safety laws", "No consumer goods"]]
    ]
  },
  depression: {
    title: "Great Depression / New Deal",
    years: "1929-1941",
    object: "Relief Card",
    icon: "W",
    scene: "A relief office line waits for jobs, bank rules, and federal help.",
    npc: "Organizer Ruth Alvarez",
    goal: "Talk to Ruth and choose a recovery plan.",
    facts: ["bank failures destroyed savings", "unemployment reached millions", "New Deal programs expanded federal responsibility"],
    choices: [
      ["Support public jobs, bank rules, and family relief.", "The town gets work crews, insured deposits, and relief. The New Deal changes expectations of government.", { op: 2, eq: 3, st: 3 }],
      ["Wait for business to recover without public help.", "Some owners prefer it, but hungry families cannot wait. Markets can fail on a national scale.", { op: 1, eq: 0, st: 0 }],
      ["Give money only to banks and ignore unemployment.", "Banks matter, but families still lose homes and hope. Recovery must rebuild daily life too.", { op: 1, eq: 0, st: 1 }]
    ],
    quiz: [
      ["What did the Depression reveal?", "The economy could collapse and leave millions unemployed", ["The economy could collapse and leave millions unemployed", "Stocks always rise", "Banks never affect people"]],
      ["How did the New Deal change economic life?", "It expanded federal responsibility for relief, jobs, and regulation", ["It expanded federal responsibility for relief, jobs, and regulation", "It ended taxes forever", "It removed government from the economy"]]
    ]
  }
};

const state = {
  room: "archive",
  unlocked: 0,
  completed: {},
  scores: { op: 0, eq: 0, st: 0 },
  player: { x: 310, y: 360, w: 18, h: 24, speed: 2.1, facing: "down", moving: false },
  keys: {},
  dialogueOpen: false,
  typing: false,
  typeTimer: 0,
  fullText: "",
  visibleText: "",
  dialogueAction: null,
  quizEra: null,
  quizIndex: 0,
  quizCorrect: 0,
  message: ""
};

const objects = [
  { era: "market", x: 132, y: 128, label: "$" },
  { era: "gilded", x: 222, y: 104, label: "R" },
  { era: "progressive", x: 318, y: 104, label: "N" },
  { era: "twenties", x: 414, y: 128, label: "%" },
  { era: "depression", x: 500, y: 172, label: "W" }
];

const spriteCatalog = {
  player: {
    idleSheet: "sprites/player/Adam_idle_anim_16x16.png",
    runSheet: "sprites/player/Adam_run_16x16.png",
    frameWidth: 16,
    frameHeight: 32,
    framesPerDirection: 6,
    directionOffset: {
      right: 0,
      up: 6,
      left: 12,
      down: 18
    },
    fallbackFrames: {
      down: ["sprites/player/down-0.png", "sprites/player/down-1.png"],
      up: ["sprites/player/up-0.png", "sprites/player/up-1.png"],
      left: ["sprites/player/left-0.png", "sprites/player/left-1.png"],
      right: ["sprites/player/right-0.png", "sprites/player/right-1.png"]
    }
  },
  archivist: {
    idle: ["sprites/archivist/idle-0.png", "sprites/archivist/idle-1.png"]
  },
  npcs: {
    market: ["sprites/npcs/eliza/idle-0.png", "sprites/npcs/eliza/idle-1.png"],
    gilded: ["sprites/npcs/thomas/idle-0.png", "sprites/npcs/thomas/idle-1.png"],
    progressive: ["sprites/npcs/ida/idle-0.png", "sprites/npcs/ida/idle-1.png"],
    twenties: ["sprites/npcs/joseph/idle-0.png", "sprites/npcs/joseph/idle-1.png"],
    depression: ["sprites/npcs/ruth/idle-0.png", "sprites/npcs/ruth/idle-1.png"]
  }
};

const sprites = {};
const levelBackgrounds = {
  archivePreview: null,
  archivePng: loadImage(runtimeAssetPath("background/levels/level0/background.png")),
  archiveSvg: loadImage(runtimeAssetPath("background/levels/level0/background.svg"))
};
const levelData = {
  archivePreviewActive: false,
  archivePreviewSize: { width: 640, height: 480 },
  archiveHitboxes: [],
  archiveCharacters: []
};
const archiveCharacterFiles = [
  "adam.json",
  "the-archivist.json",
  "mill-worker-eliza.json",
  "rail-worker-thomas.json",
  "reporter-ida-wellspring.json",
  "clerk-joseph-carter.json",
  "organizer-ruth-alvarez.json",
  "archivist.json",
  "eliza.json",
  "thomas.json",
  "ida.json",
  "joseph.json",
  "ruth.json"
];
const archiveHitboxFiles = [
  "hitboxes.json",
  "hitboxes-2.json"
];

function runtimeAssetPath(path) {
  if (!runtimeCacheBuster || String(path).startsWith("data:")) return path;
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}${runtimeCacheBuster}`;
}

function loadImage(path) {
  const image = new Image();
  image.src = path;
  return image;
}

function setPreviewLayout() {
  document.body.classList.toggle("preview-mode", editorPreviewMode);
}

function resizeCanvasToViewport() {
  const rect = gameWrap?.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect?.width || window.innerWidth || 640));
  const height = Math.max(1, Math.floor(rect?.height || window.innerHeight || 480));
  if (canvas.width === width && canvas.height === height) return;
  canvas.width = width;
  canvas.height = height;
  ctx.imageSmoothingEnabled = false;
}

function loadArchivePreview() {
  if (!editorPreviewMode) return false;
  try {
    const raw = localStorage.getItem(EDITOR_PREVIEW_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    const sourceWidth = Math.max(1, Number(data.width) || 640);
    const sourceHeight = Math.max(1, Number(data.height) || 480);
    levelData.archivePreviewSize = { width: sourceWidth, height: sourceHeight };
    if (data.backgroundDataUrl) {
      levelBackgrounds.archivePreview = loadImage(data.backgroundDataUrl);
    }
    const hitboxes = Array.isArray(data.hitboxes) ? data.hitboxes : [];
    levelData.archiveHitboxes = hitboxes
      .map((box) => ({
        x: Number(box.x) || 0,
        y: Number(box.y) || 0,
        width: Number(box.width ?? box.w) || 0,
        height: Number(box.height ?? box.h) || 0
      }))
      .filter((box) => box.width > 0 && box.height > 0);
    const characters = Array.isArray(data.characters) ? data.characters : [];
    levelData.archiveCharacters = characters
      .map((character) => ({
        id: character.id || character.characterId || "character",
        name: character.name || character.characterId || "Character",
        dialogue: character.dialogue || "",
        x: Number(character.x) || 0,
        y: Number(character.y) || 0,
        width: Number(character.width) || 16,
        height: Number(character.height) || 32,
        sourceX: Number(character.sourceX) || 0,
        sourceY: Number(character.sourceY) || 0,
        sourceWidth: Number(character.sourceWidth) || Number(character.width) || 16,
        sourceHeight: Number(character.sourceHeight) || Number(character.height) || 32,
        sprite: loadImage(String(character.sprite || "").trim())
      }))
      .filter((character) => character.sprite?.src);
    levelData.archiveCharacters.sort((a, b) => (a.y + a.height) - (b.y + b.height));
    levelData.archivePreviewActive = true;
    ensureArchiveSpawnClear();
    return true;
  } catch {
    return false;
  }
}

async function loadArchiveHitboxes() {
  if (levelData.archivePreviewActive) return;
  try {
    const loaded = [];
    await Promise.all(archiveHitboxFiles.map(async (filename) => {
      try {
        const response = await fetch(runtimeAssetPath(`background/levels/level0/${filename}`), { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        const hitboxes = Array.isArray(data?.hitboxes) ? data.hitboxes : Array.isArray(data) ? data : [];
        loaded.push(...hitboxes);
      } catch {
        return;
      }
    }));
    const seen = new Set();
    levelData.archiveHitboxes = loaded
      .map((box) => ({
        x: Number(box.x) || 0,
        y: Number(box.y) || 0,
        width: Number(box.width ?? box.w) || 0,
        height: Number(box.height ?? box.h) || 0
      }))
      .filter((box) => box.width > 0 && box.height > 0);
    levelData.archiveHitboxes = levelData.archiveHitboxes.filter((box) => {
      const key = `${box.x}:${box.y}:${box.width}:${box.height}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    ensureArchiveSpawnClear();
  } catch {
    levelData.archiveHitboxes = [];
  }
}

async function loadArchiveCharacters() {
  if (levelData.archivePreviewActive) return;
  const loaded = [];
  try {
    const manifestResponse = await fetch(runtimeAssetPath("background/levels/level0/characters.json"), { cache: "no-store" });
    if (manifestResponse.ok) {
      const manifest = await manifestResponse.json();
      const characters = Array.isArray(manifest?.characters) ? manifest.characters : Array.isArray(manifest) ? manifest : [];
      characters.forEach((data, index) => {
        if (data?.type !== "character") return;
        const spritePath = String(data.sprite || "").trim();
        const position = data.position || {};
        const size = data.size || {};
        const source = data.source || {};
        if (!spritePath) return;
        loaded.push({
          id: data.characterId || data.id || `character-${index + 1}`,
          name: data.name || data.characterId || "Character",
          dialogue: data.dialogue || "",
          x: Number(position.x) || 0,
          y: Number(position.y) || 0,
          width: Number(size.width) || 16,
          height: Number(size.height) || 32,
          sourceX: Number(source.x) || 0,
          sourceY: Number(source.y) || 0,
          sourceWidth: Number(source.width) || Number(size.width) || 16,
          sourceHeight: Number(source.height) || Number(size.height) || 32,
          sprite: loadImage(runtimeAssetPath(spritePath))
        });
      });
    }
  } catch {
    // Fall back to individual character JSON files below.
  }
  if (loaded.length) {
    levelData.archiveCharacters = loaded.sort((a, b) => (a.y + a.height) - (b.y + b.height));
    return;
  }
  await Promise.all(archiveCharacterFiles.map(async (filename) => {
    try {
      const response = await fetch(runtimeAssetPath(`background/levels/level0/${filename}`), { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      if (data?.type !== "character") return;
      const spritePath = String(data.sprite || "").trim();
      const position = data.position || {};
      const size = data.size || {};
      const source = data.source || {};
      if (!spritePath) return;
      loaded.push({
        id: filename.replace(/\.json$/i, ""),
        name: data.name || data.characterId || "Character",
        dialogue: data.dialogue || "",
        x: Number(position.x) || 0,
        y: Number(position.y) || 0,
        width: Number(size.width) || 16,
        height: Number(size.height) || 32,
        sourceX: Number(source.x) || 0,
        sourceY: Number(source.y) || 0,
        sourceWidth: Number(source.width) || Number(size.width) || 16,
        sourceHeight: Number(source.height) || Number(size.height) || 32,
        sprite: loadImage(runtimeAssetPath(spritePath))
      });
    } catch {
      return;
    }
  }));
  levelData.archiveCharacters = loaded.sort((a, b) => (a.y + a.height) - (b.y + b.height));
}

function preloadSprites() {
  sprites.playerIdleSheet = loadImage(spriteCatalog.player.idleSheet);
  sprites.playerRunSheet = loadImage(spriteCatalog.player.runSheet);
  Object.entries(spriteCatalog.player.fallbackFrames).forEach(([direction, paths]) => {
    sprites[`player:${direction}`] = loadFrames(paths);
  });
  sprites.archivist = loadFrames(spriteCatalog.archivist.idle);
  Object.entries(spriteCatalog.npcs).forEach(([era, paths]) => {
    sprites[`npc:${era}`] = loadFrames(paths);
  });
}

function loadFrames(paths) {
  return paths.map((path) => {
    const image = new Image();
    image.src = path;
    return image;
  });
}

function readyFrame(image) {
  return image && image.complete && image.naturalWidth > 0;
}

function drawSpriteFrames(frames, x, y, width, height, frameIndex = 0) {
  if (!frames || !frames.length) return false;
  const frame = frames[frameIndex % frames.length];
  if (!readyFrame(frame)) return false;
  ctx.drawImage(frame, Math.round(x), Math.round(y), width, height);
  return true;
}

function drawSpriteSheet(sheet, sx, sy, sw, sh, dx, dy, dw, dh) {
  if (!readyFrame(sheet)) return false;
  ctx.drawImage(sheet, sx, sy, sw, sh, Math.round(dx), Math.round(dy), dw, dh);
  return true;
}

function animationFrame(count, speed = 260) {
  if (count <= 1) return 0;
  return Math.floor(performance.now() / speed) % count;
}

function save() {
  localStorage.setItem("moneyAmericaPixelRpg", JSON.stringify({
    unlocked: state.unlocked,
    completed: state.completed,
    scores: state.scores
  }));
}

function load() {
  const raw = localStorage.getItem("moneyAmericaPixelRpg");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    state.unlocked = data.unlocked ?? 0;
    state.completed = data.completed || {};
    state.scores = data.scores || state.scores;
  } catch {
    localStorage.removeItem("moneyAmericaPixelRpg");
  }
}

function resetGame() {
  localStorage.removeItem("moneyAmericaPixelRpg");
  state.room = "archive";
  state.unlocked = 0;
  state.completed = {};
  state.scores = { op: 0, eq: 0, st: 0 };
  state.player.x = 310;
  state.player.y = 360;
  closeDialogue();
  updateHud();
  save();
}

function updateHud() {
  const roomName = state.room === "archive" ? "The Archive" : eras[state.room].title;
  ui.title.textContent = `Money in America: ${roomName}`;
  const httpNote = needsHttpForLevelData
    ? " Open the game through the local server URL so custom hitboxes and character JSON load."
    : "";
  if (state.room === "archive") {
    const next = eraOrder[state.unlocked];
    ui.objective.textContent = next
      ? `Unlocked: ${eras[next].object}. Talk to The Archivist or touch the glowing object.${httpNote}`
      : `All objects unlocked. Talk to The Archivist to review what money changed.${httpNote}`;
  } else {
    ui.objective.textContent = `${eras[state.room].goal}${httpNote}`;
  }
  setMeter("op", ui.opVal, ui.opFill);
  setMeter("eq", ui.eqVal, ui.eqFill);
  setMeter("st", ui.stVal, ui.stFill);
}

function archiveWorldSize() {
  if (levelData.archivePreviewActive) return levelData.archivePreviewSize;
  if (readyFrame(levelBackgrounds.archivePng)) {
    return {
      width: levelBackgrounds.archivePng.naturalWidth || 640,
      height: levelBackgrounds.archivePng.naturalHeight || 480
    };
  }
  if (readyFrame(levelBackgrounds.archiveSvg)) {
    return {
      width: levelBackgrounds.archiveSvg.naturalWidth || 640,
      height: levelBackgrounds.archiveSvg.naturalHeight || 480
    };
  }
  return { width: 640, height: 480 };
}

function currentWorldSize() {
  if (state.room === "archive") return archiveWorldSize();
  return { width: 640, height: 480 };
}

function currentCamera() {
  const world = currentWorldSize();
  const zoom = Math.max(1, Math.ceil(Math.max(canvas.width / world.width, canvas.height / world.height)));
  const viewWidth = canvas.width / zoom;
  const viewHeight = canvas.height / zoom;
  const playerCenterX = state.player.x + state.player.w / 2;
  const playerCenterY = state.player.y + state.player.h / 2;
  const x = Math.max(0, Math.min(world.width - viewWidth, playerCenterX - viewWidth / 2));
  const y = Math.max(0, Math.min(world.height - viewHeight, playerCenterY - viewHeight / 2));
  return {
    zoom,
    x: Number.isFinite(x) ? x : 0,
    y: Number.isFinite(y) ? y : 0,
    viewWidth,
    viewHeight,
    world
  };
}

function setMeter(key, valueEl, fillEl) {
  valueEl.textContent = state.scores[key];
  fillEl.style.width = `${Math.min(100, state.scores[key] * 8)}%`;
}

function say(speaker, text, choices = [], action = null) {
  state.dialogueOpen = true;
  state.typing = true;
  state.typeTimer = 0;
  state.fullText = text;
  state.visibleText = "";
  state.dialogueAction = action;
  ui.dialogue.classList.add("open");
  ui.speaker.textContent = speaker;
  ui.text.textContent = "";
  ui.choices.innerHTML = "";
  choices.forEach(([label, callback]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.textContent = label;
    button.addEventListener("click", callback);
    ui.choices.appendChild(button);
  });
}

function closeDialogue() {
  state.dialogueOpen = false;
  state.typing = false;
  state.dialogueAction = null;
  ui.dialogue.classList.remove("open");
  ui.choices.innerHTML = "";
}

function continueDialogue() {
  if (!state.dialogueOpen) return;
  if (state.typing) {
    state.visibleText = state.fullText;
    ui.text.textContent = state.fullText;
    state.typing = false;
    return;
  }
  if (ui.choices.children.length) return;
  const action = state.dialogueAction;
  closeDialogue();
  if (action) action();
}

function enterEra(id) {
  state.room = id;
  state.player.x = 314;
  state.player.y = 378;
  closeDialogue();
  updateHud();
}

function returnArchive(startQuiz = false) {
  const current = state.room;
  state.room = "archive";
  state.player.x = 310;
  state.player.y = 360;
  updateHud();
  if (startQuiz && current !== "archive") beginQuiz(current);
}

function interact() {
  if (state.dialogueOpen) {
    continueDialogue();
    return;
  }
  if (state.room === "archive") interactArchive();
  else interactEra();
}

function interactArchive() {
  const hasCustomArchive = readyFrame(levelBackgrounds.archivePreview) || readyFrame(levelBackgrounds.archivePng) || readyFrame(levelBackgrounds.archiveSvg);
  if (hasCustomArchive) {
    const customCharacter = archiveCharacterInRange();
    if (!customCharacter) return;
    say(customCharacter.name, customCharacter.dialogue || "...");
    return;
  }
  const p = center(state.player);
  const archivist = { x: 320, y: 240 };
  if (dist(p, archivist) < 64) {
    const doneCount = Object.keys(state.completed).length;
    const text = doneCount >= eraOrder.length
      ? "You have seen money build canals, fortunes, reforms, bubbles, and safety nets. Remember: money is never just coins. It is power, hope, risk, and argument."
      : "Each object is a door. In every period, ask who gained opportunity, who carried the risk, who fought back, and what changed after conflict.";
    say("The Archivist", text);
    return;
  }
  const found = objects.find((obj) => dist(p, obj) < 48);
  if (!found) return;
  const index = eraOrder.indexOf(found.era);
  if (index > state.unlocked) {
    say("Locked Object", "The object is cold. Complete the Archive questions to wake it.");
    return;
  }
  if (state.completed[found.era]) {
    say(eras[found.era].object, "This memory is complete. You may revisit it, but the Archive already recorded your choice.", [
      ["Revisit", () => enterEra(found.era)],
      ["Stay", closeDialogue]
    ]);
    return;
  }
  say(eras[found.era].object, `The ${eras[found.era].object} pulls you into ${eras[found.era].title}, ${eras[found.era].years}.`, [], () => enterEra(found.era));
}

function interactEra() {
  const p = center(state.player);
  const era = eras[state.room];
  if (dist(p, { x: 320, y: 238 }) < 64) {
    const options = era.choices.map((choice, index) => [choice[0], () => chooseEra(index)]);
    say(era.npc, `${era.scene}\n\n${era.goal}`, options);
    return;
  }
  if (dist(p, { x: 590, y: 420 }) < 54) {
    say("Archive Door", "Return to The Archive?", [
      ["Return", () => returnArchive(false)],
      ["Stay", closeDialogue]
    ]);
  }
}

function chooseEra(index) {
  const era = eras[state.room];
  const choice = era.choices[index];
  state.scores.op += choice[2].op;
  state.scores.eq += choice[2].eq;
  state.scores.st += choice[2].st;
  state.completed[state.room] = true;
  save();
  updateHud();
  say(era.npc, choice[1], [], () => returnArchive(true));
}

function beginQuiz(eraId) {
  state.quizEra = eraId;
  state.quizIndex = 0;
  state.quizCorrect = 0;
  askQuiz();
}

function askQuiz() {
  const era = eras[state.quizEra];
  const q = era.quiz[state.quizIndex];
  say("The Archivist", q[0], q[2].map((answer) => [answer, () => answerQuiz(answer)]));
}

function answerQuiz(answer) {
  const era = eras[state.quizEra];
  const q = era.quiz[state.quizIndex];
  if (answer === q[1]) state.quizCorrect += 1;
  state.quizIndex += 1;
  if (state.quizIndex < era.quiz.length) {
    say("The Archivist", answer === q[1] ? "Correct. The object warms." : "Not quite. Listen to the next question.", [], askQuiz);
    return;
  }
  const passed = state.quizCorrect === era.quiz.length;
  const eraNumber = eraOrder.indexOf(state.quizEra);
  if (passed && state.unlocked < eraNumber + 1) {
    state.unlocked = Math.min(eraNumber + 1, eraOrder.length - 1);
  }
  save();
  updateHud();
  say("The Archivist", passed
    ? `Score: ${state.quizCorrect}/${era.quiz.length}. The next object unlocks.`
    : `Score: ${state.quizCorrect}/${era.quiz.length}. The lock holds. Try the questions again.`, [], passed ? null : beginQuiz.bind(null, state.quizEra));
}

function center(rect) {
  return { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 };
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function expandRect(rect, amount) {
  return {
    x: rect.x - amount,
    y: rect.y - amount,
    width: rect.width + amount * 2,
    height: rect.height + amount * 2
  };
}

function playerBoundsAt(x, y) {
  return {
    x: x + 2,
    y: y + 14,
    width: Math.max(8, state.player.w - 4),
    height: Math.max(8, state.player.h - 10)
  };
}

function collidesWithArchiveHitboxes(x, y) {
  if (state.room !== "archive" || !levelData.archiveHitboxes.length) return false;
  const bounds = playerBoundsAt(x, y);
  return levelData.archiveHitboxes.some((box) => rectsOverlap(bounds, box));
}

function archiveCharacterInRange() {
  const bounds = expandRect(playerBoundsAt(state.player.x, state.player.y), 18);
  return levelData.archiveCharacters.find((character) => rectsOverlap(bounds, {
    x: character.x,
    y: character.y,
    width: character.width,
    height: character.height
  })) || null;
}

function archiveBoundsContain(x, y) {
  const world = archiveWorldSize();
  return x >= 0 && x <= world.width - state.player.w && y >= 0 && y <= world.height - state.player.h;
}

function ensureArchiveSpawnClear() {
  if (!levelData.archiveHitboxes.length) return;
  if (!collidesWithArchiveHitboxes(state.player.x, state.player.y)) return;
  const origin = { x: state.player.x, y: state.player.y };
  const maxRadius = 24;
  const step = 16;
  for (let radius = 1; radius <= maxRadius; radius += 1) {
    for (let gy = -radius; gy <= radius; gy += 1) {
      for (let gx = -radius; gx <= radius; gx += 1) {
        if (Math.abs(gx) !== radius && Math.abs(gy) !== radius) continue;
        const candidateX = origin.x + gx * step;
        const candidateY = origin.y + gy * step;
        if (!archiveBoundsContain(candidateX, candidateY)) continue;
        if (!collidesWithArchiveHitboxes(candidateX, candidateY)) {
          state.player.x = candidateX;
          state.player.y = candidateY;
          return;
        }
      }
    }
  }
}

function movePlayer() {
  if (state.dialogueOpen) {
    state.player.moving = false;
    return;
  }
  let dx = 0;
  let dy = 0;
  if (state.keys.ArrowLeft || state.keys.KeyA) dx -= 1;
  if (state.keys.ArrowRight || state.keys.KeyD) dx += 1;
  if (state.keys.ArrowUp || state.keys.KeyW) dy -= 1;
  if (state.keys.ArrowDown || state.keys.KeyS) dy += 1;
  state.player.moving = Boolean(dx || dy);
  if (dx || dy) {
    const mag = Math.hypot(dx, dy);
    dx /= mag;
    dy /= mag;
    const nextX = state.player.x + dx * state.player.speed;
    const nextY = state.player.y + dy * state.player.speed;
    if (!collidesWithArchiveHitboxes(nextX, state.player.y)) state.player.x = nextX;
    if (!collidesWithArchiveHitboxes(state.player.x, nextY)) state.player.y = nextY;
    if (Math.abs(dx) > Math.abs(dy)) state.player.facing = dx > 0 ? "right" : "left";
    else state.player.facing = dy > 0 ? "down" : "up";
  }
  const world = currentWorldSize();
  state.player.x = Math.max(0, Math.min(world.width - state.player.w, state.player.x));
  state.player.y = Math.max(0, Math.min(world.height - state.player.h, state.player.y));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const camera = currentCamera();
  ctx.save();
  ctx.scale(camera.zoom, camera.zoom);
  ctx.translate(-camera.x, -camera.y);
  if (state.room === "archive") drawArchive();
  else drawEraRoom(eras[state.room]);
  drawPlayer();
  ctx.restore();
  drawHint();
}

function drawArchive() {
  const hasCustomBackground = readyFrame(levelBackgrounds.archivePreview) || readyFrame(levelBackgrounds.archivePng) || readyFrame(levelBackgrounds.archiveSvg);
  if (readyFrame(levelBackgrounds.archivePreview)) {
    const world = archiveWorldSize();
    ctx.drawImage(levelBackgrounds.archivePreview, 0, 0, world.width, world.height);
  } else if (readyFrame(levelBackgrounds.archivePng)) {
    const world = archiveWorldSize();
    ctx.drawImage(levelBackgrounds.archivePng, 0, 0, world.width, world.height);
  } else if (readyFrame(levelBackgrounds.archiveSvg)) {
    const world = archiveWorldSize();
    ctx.drawImage(levelBackgrounds.archiveSvg, 0, 0, world.width, world.height);
  } else {
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, 640, 480);
    rect(34, 58, 572, 368, "#050505", "#f7f7f7", 4);
    rect(88, 92, 464, 82, "#101010", "#777", 2);
    rect(88, 194, 464, 82, "#101010", "#777", 2);
    rect(88, 296, 464, 82, "#101010", "#777", 2);
    text("THE ARCHIVE", 224, 42, "#f7f7f7", 20);
    drawArchivist(320, 240);
    objects.forEach((obj, index) => {
      const unlocked = index <= state.unlocked;
      const done = state.completed[obj.era];
      drawObject(obj.x, obj.y, obj.label, unlocked, done);
    });
  }
  levelData.archiveCharacters.forEach(drawArchiveCharacter);
  if (!hasCustomBackground) return;
}

function drawEraRoom(era) {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, 640, 480);
  rect(42, 74, 556, 350, "#050505", "#f7f7f7", 4);
  text(era.title.toUpperCase(), 64, 46, "#f7f7f7", 18);
  text(era.years, 456, 46, "#a8a8a8", 14);
  drawEraDecor(state.room);
      drawNpc(320, 238, era.npc, state.room);
  drawDoor(590, 420);
  text("ARCHIVE", 518, 388, "#a8a8a8", 12);
}

function drawEraDecor(id) {
  if (id === "market") {
    rect(76, 300, 172, 38, "#111", "#6eb6ff", 2);
    text("CANAL", 120, 326, "#6eb6ff", 13);
    rect(428, 126, 84, 128, "#111", "#f7f7f7", 3);
    for (let y = 148; y < 236; y += 26) rect(450, y, 18, 14, "#f7f7f7");
  }
  if (id === "gilded") {
    line(76, 332, 544, 332, "#f7f7f7", 4);
    for (let x = 90; x < 544; x += 56) line(x, 312, x + 28, 360, "#777", 3);
    rect(88, 264, 112, 44, "#111", "#f7f7f7", 3);
    circle(112, 314, 13, "#f7f7f7");
    circle(174, 314, 13, "#f7f7f7");
  }
  if (id === "progressive") {
    rect(90, 130, 132, 170, "#111", "#f7f7f7", 3);
    text("PRESS", 124, 160, "#f7f7f7", 14);
    for (let y = 186; y < 270; y += 18) line(112, y, 200, y, "#777", 2);
  }
  if (id === "twenties") {
    rect(90, 118, 160, 70, "#111", "#f7f7f7", 3);
    text("STOCKS", 128, 148, "#f7f7f7", 14);
    line(108, 170, 138, 146, "#69d47a", 3);
    line(138, 146, 178, 166, "#69d47a", 3);
    line(178, 166, 228, 132, "#69d47a", 3);
  }
  if (id === "depression") {
    rect(76, 126, 190, 74, "#111", "#f7f7f7", 3);
    text("RELIEF OFFICE", 98, 164, "#f7f7f7", 14);
    for (let x = 92; x < 250; x += 38) drawSmallPerson(x, 260);
  }
  eras[id].facts.forEach((fact, i) => text(`* ${fact}`, 72, 366 + i * 18, "#a8a8a8", 12));
}

function drawObject(x, y, label, unlocked, done) {
  const color = unlocked ? (done ? "#69d47a" : "#e0c15c") : "#555";
  rect(x - 21, y - 21, 42, 42, "#050505", color, 3);
  text(label, x - 6, y + 7, color, 18);
}

function drawArchiveCharacter(character) {
  if (drawSpriteSheet(
    character.sprite,
    character.sourceX,
    character.sourceY,
    character.sourceWidth,
    character.sourceHeight,
    character.x,
    character.y,
    character.width,
    character.height
  )) {
    return;
  }
  rect(character.x, character.y, character.width, character.height, "#111", "#adc6ff", 2);
  text((character.name || "?").slice(0, 2).toUpperCase(), character.x + 1, character.y + 18, "#adc6ff", 10);
}

function drawArchivist(x, y) {
  const frame = animationFrame(sprites.archivist?.length || 0, 460);
  if (drawSpriteFrames(sprites.archivist, x - 24, y - 48, 48, 64, frame)) {
    text("ARCHIVIST", x - 42, y + 42, "#a8a8a8", 12);
    return;
  }
  rect(x - 13, y - 24, 26, 40, "#050505", "#f7f7f7", 3);
  rect(x - 8, y - 45, 16, 18, "#f7f7f7");
  rect(x - 26, y - 5, 52, 8, "#f7f7f7");
  text("ARCHIVIST", x - 42, y + 42, "#a8a8a8", 12);
}

function drawNpc(x, y, name, eraId) {
  const frames = sprites[`npc:${eraId}`];
  const frame = animationFrame(frames?.length || 0, 520);
  if (drawSpriteFrames(frames, x - 24, y - 46, 48, 62, frame)) {
    text(name.split(" ")[0].toUpperCase(), x - 36, y + 42, "#a8a8a8", 12);
    return;
  }
  rect(x - 12, y - 22, 24, 38, "#050505", "#f7f7f7", 3);
  rect(x - 8, y - 42, 16, 16, "#f7f7f7");
  rect(x - 18, y - 6, 36, 8, "#f7f7f7");
  text(name.split(" ")[0].toUpperCase(), x - 36, y + 42, "#a8a8a8", 12);
}

function drawSmallPerson(x, y) {
  rect(x - 6, y - 12, 12, 20, "#050505", "#a8a8a8", 2);
  rect(x - 5, y - 24, 10, 10, "#a8a8a8");
}

function drawDoor(x, y) {
  rect(x - 22, y - 44, 44, 44, "#050505", "#f7f7f7", 4);
  line(x - 12, y - 2, x + 12, y - 2, "#e0c15c", 3);
}

function drawPlayer() {
  const p = state.player;
  const playerConfig = spriteCatalog.player;
  const sheet = p.moving ? sprites.playerRunSheet : sprites.playerIdleSheet;
  const localFrame = p.moving
    ? animationFrame(playerConfig.framesPerDirection, 95)
    : animationFrame(playerConfig.framesPerDirection, 260);
  const sheetFrame = playerConfig.directionOffset[p.facing] + localFrame;
  const sx = sheetFrame * playerConfig.frameWidth;
  if (drawSpriteSheet(sheet, sx, 0, playerConfig.frameWidth, playerConfig.frameHeight, p.x - 7, p.y - 31, 32, 64)) return;
  const frames = sprites[`player:${p.facing}`];
  const frame = p.moving ? animationFrame(frames?.length || 0, 180) : 0;
  if (drawSpriteFrames(frames, p.x - 12, p.y - 18, 42, 54, frame)) return;
  rect(p.x, p.y + 8, p.w, p.h - 8, "#050505", "#f7f7f7", 3);
  rect(p.x + 3, p.y - 6, p.w - 6, 14, "#f7f7f7");
  ctx.fillStyle = "#050505";
  if (p.facing === "left") ctx.fillRect(p.x + 4, p.y - 1, 4, 4);
  else if (p.facing === "right") ctx.fillRect(p.x + p.w - 8, p.y - 1, 4, 4);
  else {
    ctx.fillRect(p.x + 5, p.y - 1, 3, 4);
    ctx.fillRect(p.x + p.w - 8, p.y - 1, 3, 4);
  }
  ctx.fillStyle = "#f24f5e";
  pixelHeart(p.x + 6, p.y + 20);
}

function drawHint() {
  return;
}

function pixelHeart(x, y) {
  ctx.fillRect(x + 4, y, 4, 4);
  ctx.fillRect(x + 12, y, 4, 4);
  ctx.fillRect(x, y + 4, 20, 4);
  ctx.fillRect(x + 4, y + 8, 12, 4);
  ctx.fillRect(x + 8, y + 12, 4, 4);
}

function rect(x, y, w, h, fill, stroke, sw = 0) {
  ctx.fillStyle = fill;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  if (stroke && sw) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = sw;
    ctx.strokeRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }
}

function circle(x, y, r, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function line(x1, y1, x2, y2, stroke, sw = 1) {
  ctx.strokeStyle = stroke;
  ctx.lineWidth = sw;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function text(content, x, y, color = "#f7f7f7", size = 16) {
  ctx.fillStyle = color;
  ctx.font = `${size}px "Courier New", monospace`;
  ctx.fillText(content, Math.round(x), Math.round(y));
}

function loop(time) {
  movePlayer();
  if (state.typing && time - state.typeTimer > 18) {
    state.typeTimer = time;
    state.visibleText = state.fullText.slice(0, state.visibleText.length + 1);
    ui.text.textContent = state.visibleText;
    if (state.visibleText.length >= state.fullText.length) state.typing = false;
  }
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();
  if (event.code === "KeyR") resetGame();
  if (["KeyE", "Enter", "Space"].includes(event.code)) interact();
  state.keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  state.keys[event.code] = false;
});
window.addEventListener("resize", resizeCanvasToViewport);

document.querySelectorAll("[data-dir]").forEach((button) => {
  const map = { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" };
  const code = map[button.dataset.dir];
  button.addEventListener("pointerdown", () => state.keys[code] = true);
  button.addEventListener("pointerup", () => state.keys[code] = false);
  button.addEventListener("pointerleave", () => state.keys[code] = false);
});
document.querySelector("[data-action]").addEventListener("click", interact);

preloadSprites();
setPreviewLayout();
resizeCanvasToViewport();
loadArchivePreview();
loadArchiveHitboxes();
loadArchiveCharacters();
load();
updateHud();
requestAnimationFrame(loop);
