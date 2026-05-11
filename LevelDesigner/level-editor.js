const canvas = document.getElementById("levelCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const colorInput = document.getElementById("color");
const sizeInput = document.getElementById("size");
const tileSizeInput = document.getElementById("tileSize");
const assetScaleInput = document.getElementById("assetScale");
const assetRotationInput = document.getElementById("assetRotation");
const assetStackInput = document.getElementById("assetStack");
const assetPrecisePlacementInput = document.getElementById("assetPrecisePlacement");
const assetSheetSelect = document.getElementById("assetSheet");
const assetCanvas = document.getElementById("assetCanvas");
const assetCtx = assetCanvas.getContext("2d");
assetCtx.imageSmoothingEnabled = false;
const assetStatus = document.getElementById("assetStatus");
const assetDrawer = document.getElementById("assetDrawer");
const assetShelfControls = document.getElementById("assetShelfControls");
const assetTabButtons = document.querySelectorAll("[data-asset-tab]");
const assetPanels = document.querySelectorAll("[data-asset-panel]");
const characterBrowser = document.getElementById("characterBrowser");
const characterStatus = document.getElementById("characterStatus");
const hitboxStatus = document.getElementById("hitboxStatus");
const notesStatus = document.getElementById("notesStatus");
const pngDownloadLink = document.getElementById("pngDownloadLink");
const svgDownloadLink = document.getElementById("svgDownloadLink");
const layerList = document.getElementById("layerList");
const addLayerBtn = document.getElementById("addLayerBtn");
const deleteLayerBtn = document.getElementById("deleteLayerBtn");
const toggleLayersBtn = document.getElementById("toggleLayersBtn");
const togglePropertiesBtn = document.getElementById("togglePropertiesBtn");
const propertyBadge = document.getElementById("propertyBadge");
const propertiesPanel = document.getElementById("propertiesPanel");
const designerMain = document.querySelector(".designer-main");
const layersManager = document.querySelector(".layers-manager");
const propertiesStack = document.querySelector(".properties-stack");
const rightPanelResizeHandle = document.getElementById("rightPanelResizeHandle");
const sectionResizeHandle = document.getElementById("sectionResizeHandle");
const propertyGroups = document.querySelectorAll(".property-group");
const eraserSizeInput = document.getElementById("eraserSize");
const characterSelect = document.getElementById("characterSelect");
const characterNameInput = document.getElementById("characterName");
const characterDialogueInput = document.getElementById("characterDialogue");
const characterXInput = document.getElementById("characterX");
const characterYInput = document.getElementById("characterY");
const hitboxWidthInput = document.getElementById("hitboxWidth");
const hitboxHeightInput = document.getElementById("hitboxHeight");
const hitboxSnapInput = document.getElementById("hitboxSnap");
const exportHitboxesJsonBtn = document.getElementById("exportHitboxesJsonBtn");
const exportCharacterJsonBtn = document.getElementById("exportCharacterJsonBtn");
const deleteCharacterBtn = document.getElementById("deleteCharacterBtn");
const levelDescription = document.getElementById("levelDescription");
const levelWidthInput = document.getElementById("levelWidth");
const levelHeightInput = document.getElementById("levelHeight");
const levelExpandXInput = document.getElementById("levelExpandX");
const levelExpandYInput = document.getElementById("levelExpandY");
const resizeLevelBtn = document.getElementById("resizeLevelBtn");
const runPreviewBtn = document.getElementById("runPreviewBtn");
const exportBundleBtn = document.getElementById("exportBundleBtn");
const toolButtons = document.querySelectorAll("[data-tool]");
const noteTitleInput = document.getElementById("noteTitle");
const noteBodyInput = document.getElementById("noteBody");
const noteXInput = document.getElementById("noteX");
const noteYInput = document.getElementById("noteY");
const exportNotesJsonBtn = document.getElementById("exportNotesJsonBtn");
const deleteNoteBtn = document.getElementById("deleteNoteBtn");

const modernExteriorThemeDefs = [
  ["1_Terrains_and_Fences", "Terrains and Fences"],
  ["2_City_Terrains", "City Terrains"],
  ["3_City_Props", "City Props"],
  ["4_Generic_Buildings", "Generic Buildings"],
  ["5_Floor_Modular_Buildings", "Floor Modular Buildings"],
  ["6_Garage_Sales", "Garage Sales"],
  ["7_Villas", "Villas"],
  ["8_Worksite", "Worksite"],
  ["9_Shopping_Center_and_Markets", "Shopping Center and Markets"],
  ["10_Vehicles", "Vehicles"],
  ["11_Camping", "Camping"],
  ["12_Hotel_and_Hospital", "Hotel and Hospital"],
  ["13_School", "School"],
  ["14_Swimming_Pool", "Swimming Pool"],
  ["15_Police_Station", "Police Station"],
  ["16_Office", "Office"],
  ["17_Garden", "Garden"],
  ["18_Fire_Station", "Fire Station"],
  ["19_Graveyard", "Graveyard"],
  ["20_Subway_and_Train_Station", "Subway and Train Station"],
  ["21_Beach", "Beach"],
  ["22_Post_Office", "Post Office"],
  ["23_MIlitary_Base", "Military Base"],
  ["24_Additional_Houses", "Additional Houses"]
];

const modernFarmMvSheetDefs = [
  ["Icons", "Icons.png"],
  ["Terrains A2", "Modern_Farm_Terrains_A2.png"],
  ["Barn 1", "Tileset_Barn_1.png"],
  ["Barn 2", "Tileset_Barn_2.png"],
  ["Barn 3", "Tileset_Barn_3.png"],
  ["Barn 4", "Tileset_Barn_4.png"],
  ["Barn Inside 1", "Tileset_Barn_Inside_1.png"],
  ["Barn Inside 2", "Tileset_Barn_Inside_2.png"],
  ["Barn Inside 3", "Tileset_Barn_Inside_3.png"],
  ["Barn Inside 4", "Tileset_Barn_Inside_4.png"],
  ["Crops", "Tileset_Crops.png"],
  ["Crops Crates", "Tileset_Crops_Crates.png"],
  ["Farm Props 1", "Tileset_Farm_Props_1.png"],
  ["Farm Props 2", "Tileset_Farm_Props_2.png"],
  ["Farm Props 3", "Tileset_Farm_Props_3.png"],
  ["Farm Props 4", "Tileset_Farm_Props_4.png"],
  ["Farm Props 5", "Tileset_Farm_Props_5.png"],
  ["Farm Props 6", "Tileset_Farm_Props_6.png"],
  ["Farm Props 7", "Tileset_Farm_Props_7.png"],
  ["Farm Props 8", "Tileset_Farm_Props_8.png"],
  ["Farm Props 9", "Tileset_Farm_Props_9.png"],
  ["Fences 1", "Tileset_Fences_1.png"],
  ["Fences 2", "Tileset_Fences_2.png"],
  ["Fruit Trees 1", "Tileset_Fruit_Trees_1.png"],
  ["Fruit Trees 2", "Tileset_Fruit_Trees_2.png"],
  ["Fruit Trees 3", "Tileset_Fruit_Trees_3.png"],
  ["Fruit Trees 4", "Tileset_Fruit_Trees_4.png"],
  ["Pick Ups", "Tileset_Pick_Ups.png"],
  ["Trees 1", "Tileset_Trees_1.png"],
  ["Trees 2", "Tileset_Trees_2.png"],
  ["Trees 3", "Tileset_Trees_3.png"],
  ["Trees 4", "Tileset_Trees_4.png"],
  ["Trees 5", "Tileset_Trees_5.png"]
];

function modernExteriorThemePath(size, key) {
  const sizeLabel = `${size}x${size}`;
  if (size === 48 && key === "17_Garden") {
    return `../Texture/modernexteriors-win/Modern_Exteriors_${sizeLabel}/ME_Theme_Sorter_${sizeLabel}/17_Garden_48xx48.png`;
  }
  return `../Texture/modernexteriors-win/Modern_Exteriors_${sizeLabel}/ME_Theme_Sorter_${sizeLabel}/${key}_${sizeLabel}.png`;
}

const assetSheets = [
  { name: "Interiors 16x16", path: "../Texture/Misc/16x16/Interiors_free_16x16.png", tile: 16 },
  { name: "Room Builder 16x16", path: "../Texture/Misc/16x16/Room_Builder_free_16x16.png", tile: 16 },
  { name: "Interiors 32x32", path: "../Texture/Misc/32x32/Interiors_free_32x32.png", tile: 32 },
  { name: "Room Builder 32x32", path: "../Texture/Misc/32x32/Room_Builder_free_32x32.png", tile: 32 },
  { name: "Interiors 48x48", path: "../Texture/Misc/48x48/Interiors_free_48x48.png", tile: 48 },
  { name: "Room Builder 48x48", path: "../Texture/Misc/48x48/Room_Builder_free_48x48.png", tile: 48 },
  { name: "Plant", path: "../Texture/Misc/TX Plant.png", tile: 16 },
  { name: "Props", path: "../Texture/Misc/TX Props.png", tile: 16 },
  { name: "Struct", path: "../Texture/Misc/TX Struct.png", tile: 16 },
  { name: "Grass Tileset", path: "../Texture/Misc/TX Tileset Grass.png", tile: 16 },
  { name: "Stone Tileset", path: "../Texture/Misc/TX Tileset Stone Ground.png", tile: 16 },
  { name: "Wall Tileset", path: "../Texture/Misc/TX Tileset Wall.png", tile: 16 },
  { name: "Plant Shadow", path: "../Texture/Misc/TX Shadow Plant.png", tile: 16 },
  { name: "Shadow", path: "../Texture/Misc/TX Shadow.png", tile: 16 },
  { name: "Extra Plant With Shadow", path: "../Texture/Misc/Extra/TX Plant with Shadow.png", tile: 16 },
  { name: "Extra Props With Shadow", path: "../Texture/Misc/Extra/TX Props with Shadow.png", tile: 16 },

  { name: "Modern Farm Complete 16x16", path: "../Texture/Modern_Farm_v1/16x16/0_Complete_Tileset_16x16.png", tile: 16 },
  { name: "Modern Farm Terrains 16x16", path: "../Texture/Modern_Farm_v1/16x16/1_Terrains_16x16.png", tile: 16 },
  { name: "Modern Farm Fences 16x16", path: "../Texture/Modern_Farm_v1/16x16/2_Fences_16x16.png", tile: 16 },
  { name: "Modern Farm Props 16x16", path: "../Texture/Modern_Farm_v1/16x16/3_Props_and_Buildings_16x16.png", tile: 16 },
  { name: "Modern Farm Crops 16x16", path: "../Texture/Modern_Farm_v1/16x16/4_Crops_16x16.png", tile: 16 },
  { name: "Modern Farm Fruit Trees 16x16", path: "../Texture/Modern_Farm_v1/16x16/5_Fruit_Trees.png", tile: 16 },
  { name: "Modern Farm Trees 16x16", path: "../Texture/Modern_Farm_v1/16x16/6_Trees_16x16.png", tile: 16 },
  { name: "Modern Farm Pickups 16x16", path: "../Texture/Modern_Farm_v1/16x16/7_Pickup_Items_16x16.png", tile: 16 },
  { name: "Modern Farm Tractor 16x16", path: "../Texture/Modern_Farm_v1/16x16/Vehicles_16x16/Tractor_16x16.png", tile: 16 },
  { name: "Modern Farm Autotiles GM 16x16", path: "../Texture/Modern_Farm_v1/16x16/Autotiles_16x16/Autotiles_GameMaker_16x16.png", tile: 16 },
  { name: "Modern Farm Autotiles Godot 16x16", path: "../Texture/Modern_Farm_v1/16x16/Autotiles_16x16/Autotiles_Godot_16x16.png", tile: 16 },

  { name: "Modern Farm Complete 32x32", path: "../Texture/Modern_Farm_v1/32x32/0_Complete_Tileset_32x32.png", tile: 32 },
  { name: "Modern Farm Terrains 32x32", path: "../Texture/Modern_Farm_v1/32x32/1_Terrains_32x32.png", tile: 32 },
  { name: "Modern Farm Fences 32x32", path: "../Texture/Modern_Farm_v1/32x32/2_Fences_32x32.png", tile: 32 },
  { name: "Modern Farm Props 32x32", path: "../Texture/Modern_Farm_v1/32x32/3_Props_and_Buildings_32x32.png", tile: 32 },
  { name: "Modern Farm Crops 32x32", path: "../Texture/Modern_Farm_v1/32x32/4_Crops_32x32.png", tile: 32 },
  { name: "Modern Farm Fruit Trees 32x32", path: "../Texture/Modern_Farm_v1/32x32/5_Fruit_Trees_32x32.png", tile: 32 },
  { name: "Modern Farm Trees 32x32", path: "../Texture/Modern_Farm_v1/32x32/6_Trees_32x32.png", tile: 32 },
  { name: "Modern Farm Pickups 32x32", path: "../Texture/Modern_Farm_v1/32x32/7_Pickup_Items_32x32.png", tile: 32 },
  { name: "Modern Farm Tractor 32x32", path: "../Texture/Modern_Farm_v1/32x32/Vehicles_32x32/Tractor_32x32.png", tile: 32 },
  { name: "Modern Farm Autotiles GM 32x32", path: "../Texture/Modern_Farm_v1/32x32/Autotiles_32x32/Autotiles_GameMaker_32x32.png", tile: 32 },
  { name: "Modern Farm Autotiles Godot 32x32", path: "../Texture/Modern_Farm_v1/32x32/Autotiles_32x32/Autotiles_Godot_32x32.png", tile: 32 },

  { name: "Modern Farm Complete 48x48", path: "../Texture/Modern_Farm_v1/48x48/0_Complete_Tileset_48x48.png", tile: 48 },
  { name: "Modern Farm Terrains 48x48", path: "../Texture/Modern_Farm_v1/48x48/1_Terrains_48x48.png", tile: 48 },
  { name: "Modern Farm Fences 48x48", path: "../Texture/Modern_Farm_v1/48x48/2_Fences_48x48.png", tile: 48 },
  { name: "Modern Farm Props 48x48", path: "../Texture/Modern_Farm_v1/48x48/3_Props_and_Buildings_48x48.png", tile: 48 },
  { name: "Modern Farm Crops 48x48", path: "../Texture/Modern_Farm_v1/48x48/4_Crops_48x48.png", tile: 48 },
  { name: "Modern Farm Fruit Trees 48x48", path: "../Texture/Modern_Farm_v1/48x48/5_Fruit_Trees_48x48.png", tile: 48 },
  { name: "Modern Farm Trees 48x48", path: "../Texture/Modern_Farm_v1/48x48/6_Trees_32x32.png", tile: 48 },
  { name: "Modern Farm Pickups 48x48", path: "../Texture/Modern_Farm_v1/48x48/7_Pickup_Items_48x48.png", tile: 48 },
  { name: "Modern Farm Tractor 48x48", path: "../Texture/Modern_Farm_v1/48x48/Vehicles_48x48/Tractor_48x48.png", tile: 48 },
  { name: "Modern Farm Autotiles GM 48x48", path: "../Texture/Modern_Farm_v1/48x48/Autotiles_48x48/Autotiles_GameMaker_48x48.png", tile: 48 },
  { name: "Modern Farm Autotiles Godot 48x48", path: "../Texture/Modern_Farm_v1/48x48/Autotiles_48x48/Autotiles_Godot_48x48.png", tile: 48 },

  { name: "Modern Farm Icons 16x16", path: "../Texture/Modern_Farm_v1/Icons/Icons_16x16/Icons_16x16.png", tile: 16 },
  { name: "Modern Farm Icons 24x24", path: "../Texture/Modern_Farm_v1/Icons/Icons_24x24/Icons_24x24.png", tile: 24 },
  { name: "Modern Farm Icons 32x32", path: "../Texture/Modern_Farm_v1/Icons/Icons_32x32/Icons_32x32.png", tile: 32 },

  ...modernFarmMvSheetDefs.map(([label, file]) => ({
    name: `Modern Farm MV ${label}`,
    path: `../Texture/Modern_Farm_v1/RPG_Maker_MV/${file}`,
    tile: 48
  })),

  ...[16, 32, 48].flatMap((size) => {
    const sizeLabel = `${size}x${size}`;
    return [
      ...(size === 48
        ? []
        : [{
            name: `Modern Exteriors Complete ${sizeLabel}`,
            path: `../Texture/modernexteriors-win/Modern_Exteriors_${sizeLabel}/${size === 16 ? "Modern_Exteriors_Complete_Tileset.png" : `Modern_Exteriors_Complete_Tileset_${sizeLabel}.png`}`,
            tile: size
          }]),
      {
        name: `Modern Exteriors Autotiles GM ${sizeLabel}`,
        path: `../Texture/modernexteriors-win/Modern_Exteriors_${sizeLabel}/Autotiles_${sizeLabel}/Game_Maker_Studio_Autotiles_${sizeLabel}.png`,
        tile: size
      },
      {
        name: `Modern Exteriors Autotiles Godot ${sizeLabel}`,
        path: `../Texture/modernexteriors-win/Modern_Exteriors_${sizeLabel}/Autotiles_${sizeLabel}/Godot_Autotiles_${sizeLabel}.png`,
        tile: size
      },
      ...modernExteriorThemeDefs.map(([key, label]) => ({
        name: `Modern Exteriors ${label} ${sizeLabel}`,
        path: modernExteriorThemePath(size, key),
        tile: size
      }))
    ];
  })
];

const characterCatalog = [
  { id: "archivist", label: "Archivist", name: "The Archivist", sprite: "../sprites/archivist/idle-0.png", width: 16, height: 32, sourceWidth: 16, sourceHeight: 32 },
  { id: "eliza", label: "Eliza", name: "Mill Worker Eliza", sprite: "../sprites/npcs/eliza/idle-0.png", width: 16, height: 32, sourceWidth: 16, sourceHeight: 32 },
  { id: "thomas", label: "Thomas", name: "Rail Worker Thomas", sprite: "../sprites/npcs/thomas/idle-0.png", width: 16, height: 32, sourceWidth: 16, sourceHeight: 32 },
  { id: "ida", label: "Ida", name: "Reporter Ida Wellspring", sprite: "../sprites/npcs/ida/idle-0.png", width: 16, height: 32, sourceWidth: 16, sourceHeight: 32 },
  { id: "joseph", label: "Joseph", name: "Clerk Joseph Carter", sprite: "../sprites/npcs/joseph/idle-0.png", width: 16, height: 32, sourceWidth: 16, sourceHeight: 32 },
  { id: "ruth", label: "Ruth", name: "Organizer Ruth Alvarez", sprite: "../sprites/npcs/ruth/idle-0.png", width: 16, height: 32, sourceWidth: 16, sourceHeight: 32 },
  { id: "adam", label: "Adam", name: "Adam", sprite: "../sprites/player/Adam_idle_anim_16x16.png", width: 16, height: 32, sourceX: 288, sourceY: 0, sourceWidth: 16, sourceHeight: 32 }
];

const loadedAssets = {};
const EXPORT_SERVER_ORIGIN = window.location.protocol === "file:"
  ? "http://localhost:8000"
  : window.location.origin;
const GAME_PREVIEW_STORAGE_KEY = "levelEditorGamePreview";

const state = {
  tool: "pencil",
  assetTab: "tilesets",
  drawing: false,
  start: null,
  last: null,
  showGrid: true,
  selectedSheet: 0,
  selectedTile: null,
  selectionStart: null,
  assetStack: false,
  assetPrecisePlacement: false,
  selectedCharacterId: characterCatalog[0].id,
  selectedCharacterActionId: null,
  selectedNoteActionId: null,
  hoverPoint: null,
  dragPlacedKeys: null,
  dragDidPlace: false,
  levelExpandX: "right",
  levelExpandY: "down",
  rightPanelWidth: 320,
  layerPanelPercent: 50,
  layersCollapsed: false,
  propertiesCollapsed: false,
  layers: [
    { id: "layer-1", name: "Layer 1", visible: true, actions: [] }
  ],
  activeLayerId: "layer-1"
};

function snapLevelDimension(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(160, Math.round(numeric / 16) * 16);
}

function syncCanvasBoundInputs() {
  if (levelDescription) {
    levelDescription.textContent = `Draw a ${canvas.width}x${canvas.height} background for Level 0: The Archive.`;
  }
  if (levelWidthInput) levelWidthInput.value = String(canvas.width);
  if (levelHeightInput) levelHeightInput.value = String(canvas.height);
  if (levelExpandXInput) levelExpandXInput.value = state.levelExpandX;
  if (levelExpandYInput) levelExpandYInput.value = state.levelExpandY;
  if (characterXInput) characterXInput.max = String(canvas.width);
  if (characterYInput) characterYInput.max = String(canvas.height);
  if (hitboxWidthInput) hitboxWidthInput.max = String(canvas.width);
  if (hitboxHeightInput) hitboxHeightInput.max = String(canvas.height);
}

function offsetAction(action, dx, dy) {
  if (!dx && !dy) return;
  if (action.type === "stroke" && Array.isArray(action.points)) {
    action.points.forEach((point) => {
      point.x += dx;
      point.y += dy;
    });
    return;
  }
  if ((action.type === "line" || action.type === "rect") && action.from && action.to) {
    action.from.x += dx;
    action.from.y += dy;
    action.to.x += dx;
    action.to.y += dy;
    return;
  }
  if (action.type === "asset" || action.type === "hitbox" || action.type === "character") {
    action.x += dx;
    action.y += dy;
  }
}

function resizeLevelCanvas(nextWidth, nextHeight) {
  const previousWidth = canvas.width;
  const previousHeight = canvas.height;
  const width = snapLevelDimension(nextWidth, canvas.width);
  const height = snapLevelDimension(nextHeight, canvas.height);
  if (width < canvas.width || height < canvas.height) {
    setStatus("Shrinking the level is not supported yet. Increase width and height only.");
    syncCanvasBoundInputs();
    return false;
  }
  if (width === canvas.width && height === canvas.height) {
    syncCanvasBoundInputs();
    return false;
  }
  const shiftX = width > previousWidth && state.levelExpandX === "left" ? width - previousWidth : 0;
  const shiftY = height > previousHeight && state.levelExpandY === "up" ? height - previousHeight : 0;
  if (shiftX || shiftY) {
    state.layers.forEach((layer) => layer.actions.forEach((action) => offsetAction(action, shiftX, shiftY)));
  }
  canvas.width = width;
  canvas.height = height;
  ctx.imageSmoothingEnabled = false;
  state.hoverPoint = null;
  syncCanvasBoundInputs();
  redraw();
  syncCharacterControls();
  updatePropertiesView();
  saveDraft();
  setStatus(`Level expanded to ${canvas.width}x${canvas.height} toward ${state.levelExpandX}/${state.levelExpandY}.`);
  return true;
}

function setTool(tool) {
  state.tool = tool;
  toolButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tool === tool);
  });
  if (assetDrawer) assetDrawer.classList.toggle("open", tool === "asset");
  updatePropertiesView();
  redraw();
}

function setStatus(message) {
  if (assetStatus) assetStatus.textContent = message;
  if (characterStatus) characterStatus.textContent = message;
  if (hitboxStatus) hitboxStatus.textContent = message;
  if (notesStatus) notesStatus.textContent = message;
}

function currentCharacterDefinition() {
  return characterCatalog.find((character) => character.id === state.selectedCharacterId) || characterCatalog[0];
}

function characterDefinitionById(id) {
  return characterCatalog.find((character) => character.id === id) || currentCharacterDefinition();
}

function setAssetTab(tab) {
  if (tab === "audio") tab = "notes";
  state.assetTab = tab;
  assetTabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.assetTab === tab);
  });
  assetPanels.forEach((panel) => {
    panel.hidden = panel.dataset.assetPanel !== tab;
  });
  if (assetShelfControls) assetShelfControls.hidden = tab !== "tilesets";
  if (tab === "tilesets") renderAssetMenu();
  if (tab === "characters") {
    renderCharacterBrowser();
    syncCharacterControls();
  }
  if (tab === "hitboxes" && hitboxStatus) {
    hitboxStatus.textContent = "Click or drag on the canvas to place solid collision boxes. These stay editor-only and are not baked into PNG or SVG exports.";
  }
  if (tab === "notes" && notesStatus) {
    notesStatus.textContent = selectedNoteAction()
      ? "Editing note. Click another marker to switch selection."
      : "Click the canvas to place editor notes. These never appear in the game and export to notes.json only.";
  }
  updatePropertiesView();
  redraw();
}

function selectedCharacterRecord() {
  if (!state.selectedCharacterActionId) return null;
  for (const layer of state.layers) {
    const action = layer.actions.find((item) => item.type === "character" && item.id === state.selectedCharacterActionId);
    if (action) return { layer, action };
  }
  state.selectedCharacterActionId = null;
  return null;
}

function selectedCharacterAction() {
  return selectedCharacterRecord()?.action || null;
}

function selectedNoteRecord() {
  if (!state.selectedNoteActionId) return null;
  for (const layer of state.layers) {
    const action = layer.actions.find((item) => item.type === "note" && item.id === state.selectedNoteActionId);
    if (action) return { layer, action };
  }
  state.selectedNoteActionId = null;
  return null;
}

function selectedNoteAction() {
  return selectedNoteRecord()?.action || null;
}

function syncCharacterControls() {
  if (!characterSelect) return;
  const selectedAction = selectedCharacterAction();
  const definition = selectedAction
    ? characterDefinitionById(selectedAction.characterId)
    : currentCharacterDefinition();
  characterSelect.value = definition.id;
  if (characterNameInput) {
    characterNameInput.value = selectedAction ? (selectedAction.name || definition.name) : definition.name;
    characterNameInput.disabled = !selectedAction;
  }
  if (characterDialogueInput) {
    characterDialogueInput.value = selectedAction ? (selectedAction.dialogue || "") : "";
    characterDialogueInput.disabled = !selectedAction;
  }
  if (characterXInput) {
    characterXInput.value = selectedAction ? String(selectedAction.x) : "";
    characterXInput.disabled = !selectedAction;
  }
  if (characterYInput) {
    characterYInput.value = selectedAction ? String(selectedAction.y) : "";
    characterYInput.disabled = !selectedAction;
  }
  if (exportCharacterJsonBtn) exportCharacterJsonBtn.disabled = !selectedAction;
  if (deleteCharacterBtn) deleteCharacterBtn.disabled = !selectedAction;
  if (characterStatus) {
    characterStatus.textContent = selectedAction
      ? `Editing ${selectedAction.name || definition.name}. Drag on empty space to place more, or click a placed character to switch selection.`
      : "Choose a character, then click or drag on the canvas to place it. Click a placed character to edit its dialogue.";
  }
}

function syncNoteControls() {
  const action = selectedNoteAction();
  if (noteTitleInput) {
    noteTitleInput.value = action ? (action.title || "") : "";
    noteTitleInput.disabled = !action;
  }
  if (noteBodyInput) {
    noteBodyInput.value = action ? (action.body || "") : "";
    noteBodyInput.disabled = !action;
  }
  if (noteXInput) {
    noteXInput.value = action ? String(action.x) : "";
    noteXInput.disabled = !action;
  }
  if (noteYInput) {
    noteYInput.value = action ? String(action.y) : "";
    noteYInput.disabled = !action;
  }
  if (exportNotesJsonBtn) exportNotesJsonBtn.disabled = !action;
  if (deleteNoteBtn) deleteNoteBtn.disabled = !action;
  if (notesStatus) {
    notesStatus.textContent = action
      ? `Editing note ${action.title || "(untitled)"}.`
      : "Click the canvas to place editor notes. These never appear in the game and export to notes.json only.";
  }
}

function applyCharacterDefinitionToSelection(definition) {
  state.selectedCharacterId = definition.id;
  const action = selectedCharacterAction();
  if (!action) return;
  const previous = characterDefinitionById(action.characterId);
  action.characterId = definition.id;
  action.sprite = resolvedCharacterSpritePath(definition);
  action.w = definition.width || action.w;
  action.h = definition.height || action.h;
  action.sourceX = Number(definition.sourceX) || 0;
  action.sourceY = Number(definition.sourceY) || 0;
  action.sourceW = Number(definition.sourceWidth) || action.w;
  action.sourceH = Number(definition.sourceHeight) || action.h;
  if (!action.name || action.name === previous.name) action.name = definition.name;
}

function renderCharacterBrowser() {
  if (!characterBrowser) return;
  characterBrowser.innerHTML = "";
  characterCatalog.forEach((character) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `character-card${state.selectedCharacterId === character.id ? " active" : ""}`;
    const preview = document.createElement("div");
    preview.className = "character-preview";
    const image = loadAssetImage({ path: character.sprite });
    drawCharacterPreview(preview, character, image);
    const details = document.createElement("div");
    details.className = "character-details";
    details.innerHTML = `
      <span class="character-name">${character.label}</span>
      <span class="character-path">${isImageReady(image) ? character.sprite.split("/").pop() : "Add idle-0.png or a sprite to preview"}</span>
    `;
    button.appendChild(preview);
    button.appendChild(details);
    button.addEventListener("click", () => {
      applyCharacterDefinitionToSelection(character);
      syncCharacterControls();
      renderCharacterBrowser();
      redraw();
      updatePropertiesView();
      saveDraft();
    });
    characterBrowser.appendChild(button);
  });
}

function selectCharacterAction(action) {
  state.selectedCharacterActionId = action.id;
  state.selectedCharacterId = action.characterId || state.selectedCharacterId;
  syncCharacterControls();
  renderCharacterBrowser();
  updatePropertiesView();
  redraw();
}

function selectNoteAction(action) {
  state.selectedNoteActionId = action.id;
  syncNoteControls();
  updatePropertiesView();
  redraw();
}

function activeLayer() {
  return state.layers.find((layer) => layer.id === state.activeLayerId) || state.layers[0];
}

function visibleLayers() {
  return state.layers.filter((layer) => layer.visible);
}

function allActions() {
  return visibleLayers().flatMap((layer) => layer.actions);
}

function layerActions() {
  const layer = activeLayer();
  return layer ? layer.actions : [];
}

function makeLayer(name = `Layer ${state.layers.length + 1}`) {
  return {
    id: `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    visible: true,
    actions: []
  };
}

function renderLayers() {
  if (!layerList) return;
  layerList.innerHTML = "";
  state.layers.slice().reverse().forEach((layer) => {
    const isActive = layer.id === state.activeLayerId;
    const row = document.createElement("button");
    row.type = "button";
    row.className = `layer-row ${isActive ? "active" : ""}`;
    row.innerHTML = `
      <span class="visibility">${layer.visible ? "visibility" : "visibility_off"}</span>
      <span class="layer-icon material-symbols-outlined"${isActive ? ' style="font-variation-settings: \'FILL\' 1;"' : ""}>layers</span>
      <span class="layer-name">${layer.name}${isActive ? " (Active)" : ""}</span>
      <span class="lock-icon material-symbols-outlined">lock_open</span>
    `;
    row.addEventListener("click", () => {
      state.activeLayerId = layer.id;
      renderLayers();
      saveDraft();
    });
    const visibility = row.querySelector(".visibility");
    visibility.classList.add("material-symbols-outlined");
    visibility.addEventListener("click", (event) => {
      event.stopPropagation();
      layer.visible = !layer.visible;
      redraw();
      renderLayers();
      saveDraft();
    });
    layerList.appendChild(row);
  });
  if (deleteLayerBtn) deleteLayerBtn.disabled = state.layers.length <= 1;
}

function updatePropertiesView() {
  if (propertyBadge) {
    if (state.tool === "asset") {
      if (state.assetTab === "characters") {
        const selectedAction = selectedCharacterAction();
        const definition = selectedAction
          ? characterDefinitionById(selectedAction.characterId)
          : currentCharacterDefinition();
        propertyBadge.textContent = selectedAction ? (selectedAction.name || definition.name) : definition.label;
      } else if (state.assetTab === "hitboxes") {
        propertyBadge.textContent = "Hit Box";
      } else if (state.assetTab === "notes") {
        propertyBadge.textContent = selectedNoteAction()?.title || "Notes";
      } else {
        propertyBadge.textContent = "Tileset";
      }
    } else {
      propertyBadge.textContent = state.tool.charAt(0).toUpperCase() + state.tool.slice(1);
    }
  }
  propertyGroups.forEach((group) => {
    const tools = (group.dataset.tools || "all").split(",");
    let visible = tools.includes("all") || tools.includes(state.tool);
    if (visible && state.tool === "asset" && group.dataset.assetModes) {
      const assetModes = group.dataset.assetModes.split(",");
      visible = assetModes.includes(state.assetTab);
    }
    group.hidden = !visible;
  });
}

function applyPanelLayout() {
  if (designerMain) designerMain.style.setProperty("--right-panel-width", `${state.rightPanelWidth}px`);
  if (layersManager) {
    layersManager.classList.toggle("collapsed", state.layersCollapsed);
    layersManager.style.flexBasis = state.layersCollapsed ? "40px" : `${state.layerPanelPercent}%`;
  }
  if (propertiesStack) {
    propertiesStack.classList.toggle("collapsed", state.propertiesCollapsed);
    propertiesStack.style.flexBasis = state.propertiesCollapsed ? "40px" : `${100 - state.layerPanelPercent}%`;
  }
  if (toggleLayersBtn) {
    toggleLayersBtn.querySelector(".material-symbols-outlined").textContent = state.layersCollapsed ? "unfold_more" : "unfold_less";
  }
  if (togglePropertiesBtn) {
    togglePropertiesBtn.querySelector(".material-symbols-outlined").textContent = state.propertiesCollapsed ? "unfold_more" : "unfold_less";
  }
}

function startPanelResize(event) {
  event.preventDefault();
  rightPanelResizeHandle.classList.add("dragging");
  const startX = event.clientX;
  const startWidth = state.rightPanelWidth;
  const mainRect = designerMain.getBoundingClientRect();
  const maxWidth = Math.max(260, Math.min(720, mainRect.width - 220));
  const onMove = (moveEvent) => {
    const delta = startX - moveEvent.clientX;
    state.rightPanelWidth = Math.max(240, Math.min(maxWidth, startWidth + delta));
    applyPanelLayout();
  };
  const onUp = () => {
    rightPanelResizeHandle.classList.remove("dragging");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    saveDraft();
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

function startSectionResize(event) {
  event.preventDefault();
  sectionResizeHandle.classList.add("dragging");
  const rect = propertiesPanel.getBoundingClientRect();
  const onMove = (moveEvent) => {
    const relativeY = moveEvent.clientY - rect.top;
    const percent = (relativeY / rect.height) * 100;
    state.layerPanelPercent = Math.max(20, Math.min(80, percent));
    state.layersCollapsed = false;
    state.propertiesCollapsed = false;
    applyPanelLayout();
  };
  const onUp = () => {
    sectionResizeHandle.classList.remove("dragging");
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    saveDraft();
  };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
}

function toggleLayersCollapsed() {
  state.layersCollapsed = !state.layersCollapsed;
  if (state.layersCollapsed && state.propertiesCollapsed) state.propertiesCollapsed = false;
  applyPanelLayout();
  saveDraft();
}

function togglePropertiesCollapsed() {
  state.propertiesCollapsed = !state.propertiesCollapsed;
  if (state.layersCollapsed && state.propertiesCollapsed) state.layersCollapsed = false;
  applyPanelLayout();
  saveDraft();
}

function addLayer() {
  const layer = makeLayer();
  state.layers.push(layer);
  state.activeLayerId = layer.id;
  renderLayers();
  syncCharacterControls();
  syncNoteControls();
  saveDraft();
}

function deleteActiveLayer() {
  if (state.layers.length <= 1) return;
  const index = state.layers.findIndex((layer) => layer.id === state.activeLayerId);
  if (index === -1) return;
  state.layers.splice(index, 1);
  state.activeLayerId = state.layers[Math.max(0, index - 1)].id;
  redraw();
  renderLayers();
  syncCharacterControls();
  syncNoteControls();
  renderCharacterBrowser();
  updatePropertiesView();
  saveDraft();
}

function getPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.round((event.clientX - rect.left) * (canvas.width / rect.width)),
    y: Math.round((event.clientY - rect.top) * (canvas.height / rect.height))
  };
}

function loadAssetImage(sheet) {
  if (loadedAssets[sheet.path]) return loadedAssets[sheet.path];
  const image = new Image();
  image.src = sheet.path;
  loadedAssets[sheet.path] = image;
  image.addEventListener("load", renderAssetMenu);
  image.addEventListener("error", renderAssetMenu);
  return image;
}

function currentSheet() {
  return assetSheets[state.selectedSheet];
}

function currentAssetImage() {
  return loadAssetImage(currentSheet());
}

function isImageReady(image) {
  return image && image.complete && image.naturalWidth > 0;
}

function normalizeAssetPath(path) {
  return path.replace(/^\.\.\//, "");
}

function assetGroupLabel(sheet) {
  const normalized = normalizeAssetPath(sheet.path);
  const segments = normalized.split("/");
  if (segments.length <= 2) return "Texture";
  return segments.slice(0, -1).join(" / ");
}

function setupAssetMenu() {
  const groups = new Map();
  assetSheets.forEach((sheet, index) => {
    const label = assetGroupLabel(sheet);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push({ sheet, index });
  });

  groups.forEach((entries, label) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = label;
    entries.forEach(({ sheet, index }) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = sheet.name;
      optgroup.appendChild(option);
      loadAssetImage(sheet);
    });
    assetSheetSelect.appendChild(optgroup);
  });

  assetSheets.forEach((sheet) => {
    loadAssetImage(sheet);
  });

  tileSizeInput.value = String(currentSheet().tile);
  renderAssetMenu();
  if (window.location.protocol === "file:") {
    setStatus("Opened as a file. Start the export server and use http://localhost:8000/LevelDesigner/level-editor.html for best results.");
  }
}

function setupCharacterMenu() {
  if (characterSelect) {
    characterCatalog.forEach((character) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.label;
      characterSelect.appendChild(option);
      const image = loadAssetImage({ path: character.sprite });
      image.addEventListener("load", renderCharacterBrowser);
      image.addEventListener("error", renderCharacterBrowser);
    });
  }
  renderCharacterBrowser();
  syncCharacterControls();
}

function renderAssetMenu() {
  const sheet = currentSheet();
  const image = currentAssetImage();
  if (isImageReady(image)) {
    if (assetCanvas.width !== image.naturalWidth) assetCanvas.width = image.naturalWidth;
    if (assetCanvas.height !== image.naturalHeight) assetCanvas.height = image.naturalHeight;
  } else {
    if (assetCanvas.width !== 256) assetCanvas.width = 256;
    if (assetCanvas.height !== 256) assetCanvas.height = 256;
  }
  assetCtx.imageSmoothingEnabled = false;
  assetCtx.clearRect(0, 0, assetCanvas.width, assetCanvas.height);
  assetCtx.fillStyle = "#050505";
  assetCtx.fillRect(0, 0, assetCanvas.width, assetCanvas.height);
  if (!isImageReady(image)) {
    assetStatus.textContent = `Loading ${sheet.name}...`;
    return;
  }
  const scale = 1;
  const drawWidth = Math.floor(image.naturalWidth * scale);
  const drawHeight = Math.floor(image.naturalHeight * scale);
  assetCtx.drawImage(image, 0, 0, drawWidth, drawHeight);
  const tile = Number(tileSizeInput.value);
  assetCtx.strokeStyle = "rgba(255,255,255,0.22)";
  assetCtx.lineWidth = 1;
  for (let x = 0; x <= drawWidth; x += tile * scale) {
    assetCtx.beginPath();
    assetCtx.moveTo(Math.round(x), 0);
    assetCtx.lineTo(Math.round(x), drawHeight);
    assetCtx.stroke();
  }
  for (let y = 0; y <= drawHeight; y += tile * scale) {
    assetCtx.beginPath();
    assetCtx.moveTo(0, Math.round(y));
    assetCtx.lineTo(drawWidth, Math.round(y));
    assetCtx.stroke();
  }
  if (state.selectedTile) {
    assetCtx.strokeStyle = "#e0c15c";
    assetCtx.lineWidth = 3;
    assetCtx.strokeRect(
      state.selectedTile.sx * scale,
      state.selectedTile.sy * scale,
      state.selectedTile.sw * scale,
      state.selectedTile.sh * scale
    );
  }
  if (state.selectionStart) {
    assetCtx.strokeStyle = "#69d47a";
    assetCtx.lineWidth = 3;
    assetCtx.strokeRect(state.selectionStart.sx * scale, state.selectionStart.sy * scale, tile * scale, tile * scale);
  }
  assetStatus.textContent = state.selectedTile
    ? `Selected ${state.selectedTile.sw}x${state.selectedTile.sh} from ${sheet.name} (${normalizeAssetPath(sheet.path)}).`
    : "Click or drag for one tile. Shift-click two corners for a block.";
}

function selectAssetTile(event) {
  const sheet = currentSheet();
  const image = currentAssetImage();
  if (!isImageReady(image)) return;
  const rect = assetCanvas.getBoundingClientRect();
  const scale = 1;
  const canvasX = (event.clientX - rect.left) * (assetCanvas.width / rect.width);
  const canvasY = (event.clientY - rect.top) * (assetCanvas.height / rect.height);
  const sourceX = Math.floor(canvasX / scale);
  const sourceY = Math.floor(canvasY / scale);
  const tile = Number(tileSizeInput.value);
  const sx = Math.floor(sourceX / tile) * tile;
  const sy = Math.floor(sourceY / tile) * tile;
  if (sx >= image.naturalWidth || sy >= image.naturalHeight) return;
  if (event.shiftKey && state.selectionStart && state.selectionStart.sheet === sheet.path) {
    const x1 = Math.min(state.selectionStart.sx, sx);
    const y1 = Math.min(state.selectionStart.sy, sy);
    const x2 = Math.max(state.selectionStart.sx, sx) + tile;
    const y2 = Math.max(state.selectionStart.sy, sy) + tile;
    state.selectedTile = {
      sheet: sheet.path,
      sx: x1,
      sy: y1,
      sw: Math.min(x2 - x1, image.naturalWidth - x1),
      sh: Math.min(y2 - y1, image.naturalHeight - y1)
    };
    state.selectionStart = null;
    setTool("asset");
    renderAssetMenu();
    return;
  }
  state.selectedTile = {
    sheet: sheet.path,
    sx,
    sy,
    sw: Math.min(tile, image.naturalWidth - sx),
    sh: Math.min(tile, image.naturalHeight - sy)
  };
  state.selectionStart = event.shiftKey ? { sheet: sheet.path, sx, sy } : null;
  setTool("asset");
  renderAssetMenu();
}

function findCharacterAt(point) {
  for (let layerIndex = state.layers.length - 1; layerIndex >= 0; layerIndex -= 1) {
    const layer = state.layers[layerIndex];
    if (!layer.visible) continue;
    for (let actionIndex = layer.actions.length - 1; actionIndex >= 0; actionIndex -= 1) {
      const action = layer.actions[actionIndex];
      if (action.type !== "character") continue;
      const width = action.w || 16;
      const height = action.h || 32;
      if (
        point.x >= action.x &&
        point.x <= action.x + width &&
        point.y >= action.y &&
        point.y <= action.y + height
      ) {
        return action;
      }
    }
  }
  return null;
}

function findNoteAt(point) {
  for (let layerIndex = state.layers.length - 1; layerIndex >= 0; layerIndex -= 1) {
    const layer = state.layers[layerIndex];
    if (!layer.visible) continue;
    for (let actionIndex = layer.actions.length - 1; actionIndex >= 0; actionIndex -= 1) {
      const action = layer.actions[actionIndex];
      if (action.type !== "note") continue;
      if (Math.abs(point.x - action.x) <= 10 && Math.abs(point.y - action.y) <= 10) {
        return action;
      }
    }
  }
  return null;
}

function drawArchiveTemplate() {
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  strokeRect(34, 58, 572, 368, "#f7f7f7", 4);
  strokeRect(88, 92, 464, 82, "#777777", 2);
  strokeRect(88, 194, 464, 82, "#777777", 2);
  strokeRect(88, 296, 464, 82, "#777777", 2);
  strokeRect(258, 184, 124, 92, "#e0c15c", 3);
  fillRect(276, 202, 88, 14, "#e0c15c");
  fillRect(276, 226, 88, 8, "#777777");
  fillRect(276, 244, 88, 8, "#777777");
  drawText("THE ARCHIVE", 224, 42, "#f7f7f7", 20);
  drawText("LEVEL 0", 98, 402, "#777777", 12);
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  visibleLayers().forEach((layer) => layer.actions.forEach(drawAction));
  if (state.showGrid) drawGrid();
  drawPlacementPreview();
}

function drawAction(action) {
  if (action.type === "template") {
    drawArchiveTemplate();
    return;
  }
  if (action.type === "character") {
    drawCharacterAction(action);
    return;
  }
  if (action.type === "hitbox") {
    drawHitboxAction(action);
    return;
  }
  if (action.type === "note") {
    drawNoteAction(action);
    return;
  }
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  ctx.strokeStyle = action.color;
  ctx.fillStyle = action.color;
  ctx.lineWidth = action.size;
  if (action.type === "stroke") {
    ctx.beginPath();
    action.points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }
  if (action.type === "line") {
    ctx.beginPath();
    ctx.moveTo(action.from.x, action.from.y);
    ctx.lineTo(action.to.x, action.to.y);
    ctx.stroke();
  }
  if (action.type === "rect") {
    ctx.strokeRect(action.from.x, action.from.y, action.to.x - action.from.x, action.to.y - action.from.y);
  }
  if (action.type === "asset") {
    const image = loadedAssets[action.sheet] || loadAssetImage({ path: action.sheet });
    if (!isImageReady(image)) {
      image.addEventListener("load", redraw, { once: true });
      return;
    }
    drawRotatedAsset(image, action);
  }
}

function drawHitboxAction(action, alpha = 0.28) {
  ctx.save();
  ctx.fillStyle = `rgba(242,79,94,${alpha})`;
  ctx.strokeStyle = alpha < 0.4 ? "rgba(242,79,94,0.95)" : "#f24f5e";
  ctx.lineWidth = 2;
  ctx.fillRect(action.x, action.y, action.w, action.h);
  ctx.strokeRect(action.x + 1, action.y + 1, Math.max(0, action.w - 2), Math.max(0, action.h - 2));
  ctx.restore();
}

function drawPlacementPreview() {
  if (state.drawing || state.tool !== "asset" || !state.hoverPoint) return;
  if (state.assetTab === "tilesets") {
    const preview = assetPlacementForPoint(state.hoverPoint);
    if (!preview) return;
    const image = loadedAssets[preview.sheet] || loadAssetImage({ path: preview.sheet });
    if (!isImageReady(image)) return;
    ctx.save();
    ctx.globalAlpha = 0.6;
    drawRotatedAsset(image, preview);
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#e0c15c";
    ctx.lineWidth = 2;
    ctx.strokeRect(preview.x, preview.y, preview.dw, preview.dh);
    ctx.restore();
    return;
  }
  if (state.assetTab === "characters") {
    const definition = currentCharacterDefinition();
    const spritePath = resolvedCharacterSpritePath(definition);
    const image = loadedAssets[spritePath] || loadAssetImage({ path: spritePath });
    const snapped = snapPointToGrid(state.hoverPoint, 16);
    const action = {
      type: "character",
      characterId: definition.id,
      sprite: spritePath,
      x: Math.max(0, Math.min(canvas.width - definition.width, snapped.x)),
      y: Math.max(0, Math.min(canvas.height - definition.height, snapped.y)),
      w: definition.width,
      h: definition.height,
      sourceX: Number(definition.sourceX) || 0,
      sourceY: Number(definition.sourceY) || 0,
      sourceW: Number(definition.sourceWidth) || definition.width,
      sourceH: Number(definition.sourceHeight) || definition.height
    };
    ctx.save();
    ctx.globalAlpha = 0.6;
    drawCharacterAction(action);
    ctx.restore();
    return;
  }
  if (state.assetTab === "hitboxes") {
    const preview = hitboxPlacementForPoint(state.hoverPoint);
    drawHitboxAction(preview, 0.16);
    return;
  }
  if (state.assetTab === "notes") {
    const preview = notePlacementForPoint(state.hoverPoint);
    drawNoteAction(preview, 0.55);
  }
}

function drawNoteAction(action, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#f7e07a";
  ctx.strokeStyle = state.selectedNoteActionId === action.id ? "#79ff5b" : "#10131b";
  ctx.lineWidth = state.selectedNoteActionId === action.id ? 2 : 1.5;
  ctx.beginPath();
  ctx.moveTo(action.x, action.y - 10);
  ctx.lineTo(action.x + 10, action.y);
  ctx.lineTo(action.x, action.y + 10);
  ctx.lineTo(action.x - 10, action.y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  const label = action.title || "Note";
  ctx.font = '11px Inter, Arial, sans-serif';
  const textWidth = Math.ceil(ctx.measureText(label).width) + 10;
  ctx.fillStyle = "#10131b";
  ctx.fillRect(action.x + 12, action.y - 10, textWidth, 16);
  ctx.strokeStyle = state.selectedNoteActionId === action.id ? "#79ff5b" : "#f7e07a";
  ctx.strokeRect(action.x + 12, action.y - 10, textWidth, 16);
  ctx.fillStyle = "#f7e07a";
  ctx.fillText(label, action.x + 17, action.y + 1);
  ctx.restore();
}

function drawCharacterAction(action) {
  const definition = characterDefinitionById(action.characterId);
  const spritePath = resolvedCharacterSpritePath(definition, action);
  const image = loadedAssets[spritePath] || loadAssetImage({ path: spritePath });
  const width = action.w || definition.width || 16;
  const height = action.h || definition.height || 32;
  const { sx, sy, sw, sh } = characterSourceRect(definition, action, image);

  if (isImageReady(image)) {
    ctx.drawImage(image, sx, sy, sw, sh, action.x, action.y, width, height);
  } else {
    ctx.fillStyle = "rgba(173,198,255,0.12)";
    ctx.fillRect(action.x, action.y, width, height);
    ctx.strokeStyle = "#adc6ff";
    ctx.lineWidth = 1;
    ctx.strokeRect(action.x + 0.5, action.y + 0.5, width - 1, height - 1);
    ctx.fillStyle = "#adc6ff";
    ctx.font = '11px Inter, Arial, sans-serif';
    ctx.fillText(definition.label.slice(0, 2).toUpperCase(), action.x + 2, action.y + Math.max(12, height / 2));
  }

  if (state.selectedCharacterActionId === action.id) {
    ctx.save();
    ctx.strokeStyle = "#79ff5b";
    ctx.lineWidth = 2;
    ctx.strokeRect(action.x - 2, action.y - 2, width + 4, height + 4);
    const label = action.name || definition.name;
    ctx.font = '11px Inter, Arial, sans-serif';
    const textWidth = Math.ceil(ctx.measureText(label).width) + 10;
    const labelY = Math.max(4, action.y - 20);
    ctx.fillStyle = "#10131b";
    ctx.fillRect(action.x - 2, labelY, textWidth, 16);
    ctx.strokeStyle = "#79ff5b";
    ctx.lineWidth = 1;
    ctx.strokeRect(action.x - 2, labelY, textWidth, 16);
    ctx.fillStyle = "#79ff5b";
    ctx.fillText(label, action.x + 3, labelY + 11);
    ctx.restore();
  }
}

function drawRotatedAsset(image, action) {
  const rotation = action.rotation || 0;
  ctx.save();
  ctx.translate(action.x + action.dw / 2, action.y + action.dh / 2);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.drawImage(image, action.sx, action.sy, action.sw, action.sh, -action.dw / 2, -action.dh / 2, action.dw, action.dh);
  ctx.restore();
}

function drawGrid() {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function strokeRect(x, y, w, h, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.strokeRect(x, y, w, h);
}

function fillRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawText(text, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.font = `${size}px "Courier New", monospace`;
  ctx.fillText(text, x, y);
}

function currentColor() {
  return state.tool === "eraser" ? "#050505" : colorInput.value;
}

function currentSize() {
  return state.tool === "eraser" ? Number(eraserSizeInput.value) : Number(sizeInput.value);
}

function currentHitboxConfig() {
  return {
    width: Math.max(8, Number(hitboxWidthInput.value) || 16),
    height: Math.max(8, Number(hitboxHeightInput.value) || 16),
    snap: Math.max(1, Number(hitboxSnapInput.value) || 16)
  };
}

function stackEnabled() {
  return Boolean(assetStackInput?.checked);
}

function precisePlacementEnabled() {
  return Boolean(assetPrecisePlacementInput?.checked);
}

function assetSnapStep() {
  if (!state.selectedTile) return { x: 16, y: 16 };
  if (precisePlacementEnabled()) {
    const tile = Math.max(1, Number(tileSizeInput.value) || 16);
    return { x: tile, y: tile };
  }
  return { x: state.selectedTile.sw, y: state.selectedTile.sh };
}

function snapPointToGrid(point, stepX, stepY = stepX) {
  return {
    x: Math.floor(point.x / stepX) * stepX,
    y: Math.floor(point.y / stepY) * stepY
  };
}

function assetPlacementForPoint(point) {
  if (!state.selectedTile) return null;
  const scale = Number(assetScaleInput.value);
  const snap = assetSnapStep();
  const snapped = snapPointToGrid(point, snap.x, snap.y);
  const dw = state.selectedTile.sw * scale;
  const dh = state.selectedTile.sh * scale;
  let targetY = snapped.y;
  if (stackEnabled()) {
    const matches = layerActions().filter((action) =>
      action.type === "asset" &&
      action.x === snapped.x &&
      action.dw === dw &&
      action.dh === dh
    );
    if (matches.length) {
      targetY = Math.max(0, Math.min(...matches.map((action) => action.y)) - dh);
    }
  }
  return {
    type: "asset",
    sheet: state.selectedTile.sheet,
    sx: state.selectedTile.sx,
    sy: state.selectedTile.sy,
    sw: state.selectedTile.sw,
    sh: state.selectedTile.sh,
    x: snapped.x,
    y: targetY,
    dw,
    dh,
    rotation: Number(assetRotationInput.value)
  };
}

function hitboxPlacementForPoint(point) {
  const config = currentHitboxConfig();
  const snapped = snapPointToGrid(point, config.snap);
  return {
    type: "hitbox",
    x: Math.max(0, Math.min(canvas.width - config.width, snapped.x)),
    y: Math.max(0, Math.min(canvas.height - config.height, snapped.y)),
    w: config.width,
    h: config.height
  };
}

function notePlacementForPoint(point) {
  const snapped = snapPointToGrid(point, 16);
  return {
    type: "note",
    x: Math.max(0, Math.min(canvas.width, snapped.x)),
    y: Math.max(0, Math.min(canvas.height, snapped.y)),
    title: "Note",
    body: ""
  };
}

function startPlacementDrag() {
  state.dragPlacedKeys = new Set();
  state.dragDidPlace = false;
}

function finishPlacementDrag() {
  state.dragPlacedKeys = null;
}

function placementDragKey(point) {
  if (state.tool !== "asset") return null;
  if (state.assetTab === "tilesets") {
    if (!state.selectedTile) return null;
    const snap = assetSnapStep();
    const snapped = snapPointToGrid(point, snap.x, snap.y);
    return [
      "asset",
      state.selectedTile.sheet,
      state.selectedTile.sx,
      state.selectedTile.sy,
      snapped.x,
      snapped.y
    ].join(":");
  }
  if (state.assetTab === "hitboxes") {
    const action = hitboxPlacementForPoint(point);
    return ["hitbox", action.x, action.y, action.w, action.h].join(":");
  }
  if (state.assetTab === "characters") {
    const definition = currentCharacterDefinition();
    const snapped = snapPointToGrid(point, 16);
    const x = Math.max(0, Math.min(canvas.width - definition.width, snapped.x));
    const y = Math.max(0, Math.min(canvas.height - definition.height, snapped.y));
    return ["character", definition.id, x, y].join(":");
  }
  if (state.assetTab === "notes") {
    const action = notePlacementForPoint(point);
    return ["note", action.x, action.y].join(":");
  }
  return null;
}

function beginDraw(event) {
  state.drawing = true;
  const point = getPoint(event);
  state.hoverPoint = point;
  state.start = point;
  state.last = point;
  if (state.tool === "asset") {
    startPlacementDrag();
    if (state.assetTab === "characters") {
      const existing = findCharacterAt(point);
      if (existing) {
        selectCharacterAction(existing);
        state.drawing = false;
        finishPlacementDrag();
      } else {
        stampWhileDragging(point);
      }
      return;
    }
    if (state.assetTab === "notes") {
      const existing = findNoteAt(point);
      if (existing) {
        selectNoteAction(existing);
        state.drawing = false;
        finishPlacementDrag();
      } else {
        stampWhileDragging(point);
      }
      return;
    }
    stampWhileDragging(point);
    return;
  }
  if (state.tool === "pencil" || state.tool === "eraser") {
    layerActions().push({
      type: "stroke",
      color: currentColor(),
      size: currentSize(),
      points: [point]
    });
  }
  redraw();
}

function moveDraw(event) {
  const point = getPoint(event);
  state.hoverPoint = point;
  if (!state.drawing) {
    if (state.tool === "asset") redraw();
    return;
  }
  if (state.tool === "asset") {
    stampWhileDragging(point);
    state.last = point;
    return;
  }
  if (state.tool === "pencil" || state.tool === "eraser") {
    const actions = layerActions();
    actions[actions.length - 1].points.push(point);
    state.last = point;
    redraw();
    return;
  }
  redraw();
  drawAction({
    type: state.tool,
    color: currentColor(),
    size: currentSize(),
    from: state.start,
    to: point
  });
  if (state.showGrid) drawGrid();
}

function endDraw(event) {
  if (!state.drawing) {
    if (event?.type === "pointerleave") {
      state.hoverPoint = null;
      redraw();
    }
    return;
  }
  const wasAssetDrag = state.tool === "asset";
  const point = getPoint(event);
  if (state.tool === "line" || state.tool === "rect") {
    layerActions().push({
      type: state.tool,
      color: currentColor(),
      size: currentSize(),
      from: state.start,
      to: point
    });
  }
  state.drawing = false;
  state.start = null;
  state.last = null;
  if (wasAssetDrag) {
    if (state.dragDidPlace) {
      redraw();
      renderLayers();
      syncCharacterControls();
      renderCharacterBrowser();
      updatePropertiesView();
      saveDraft();
    }
    finishPlacementDrag();
    if (event?.type === "pointerleave") {
      state.hoverPoint = null;
      redraw();
    }
    return;
  }
  redraw();
  renderLayers();
  saveDraft();
}

function saveDraft() {
  state.layers.forEach((layer) => layer.actions.forEach(normalizeAction));
  localStorage.setItem("level0BackgroundDraft", JSON.stringify({
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
    layers: state.layers,
    activeLayerId: state.activeLayerId,
    assetTab: state.assetTab,
    assetStack: state.assetStack,
    assetPrecisePlacement: state.assetPrecisePlacement,
    levelExpandX: state.levelExpandX,
    levelExpandY: state.levelExpandY,
    selectedCharacterId: state.selectedCharacterId,
    selectedNoteActionId: state.selectedNoteActionId,
    rightPanelWidth: state.rightPanelWidth,
    layerPanelPercent: state.layerPanelPercent,
    layersCollapsed: state.layersCollapsed,
    propertiesCollapsed: state.propertiesCollapsed
  }));
}

function stampAsset(point, options = {}) {
  const { save = true, refreshLayers = true } = options;
  const action = assetPlacementForPoint(point);
  if (!action) {
    setStatus("Select a tile before stamping.");
    return false;
  }
  layerActions().push(action);
  redraw();
  if (refreshLayers) renderLayers();
  if (save) saveDraft();
  return true;
}

function stampCharacter(point, options = {}) {
  const { save = true, refreshLayers = true, select = true, syncUi = true } = options;
  const definition = currentCharacterDefinition();
  const spritePath = resolvedCharacterSpritePath(definition);
  const image = loadedAssets[spritePath] || loadAssetImage({ path: spritePath });
  const width = definition.width || (isImageReady(image) ? image.naturalWidth : 16);
  const height = definition.height || (isImageReady(image) ? image.naturalHeight : 32);
  const source = characterSourceRect(definition, null, image);
  const action = {
    type: "character",
    id: `character-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    characterId: definition.id,
    sprite: spritePath,
    x: Math.max(0, Math.min(canvas.width - width, Math.floor(point.x / 16) * 16)),
    y: Math.max(0, Math.min(canvas.height - height, Math.floor(point.y / 16) * 16)),
    w: width,
    h: height,
    sourceX: source.sx,
    sourceY: source.sy,
    sourceW: source.sw,
    sourceH: source.sh,
    name: definition.name,
    dialogue: ""
  };
  layerActions().push(action);
  if (select) state.selectedCharacterActionId = action.id;
  redraw();
  if (refreshLayers) renderLayers();
  if (syncUi) {
    syncCharacterControls();
    syncNoteControls();
    renderCharacterBrowser();
    updatePropertiesView();
  }
  if (save) saveDraft();
  return true;
}

function stampHitbox(point, options = {}) {
  const { save = true, refreshLayers = true } = options;
  const action = hitboxPlacementForPoint(point);
  layerActions().push(action);
  redraw();
  if (refreshLayers) renderLayers();
  if (save) saveDraft();
  return true;
}

function stampNote(point, options = {}) {
  const { save = true, refreshLayers = true, select = true, syncUi = true } = options;
  const placement = notePlacementForPoint(point);
  const action = {
    type: "note",
    id: `note-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    x: placement.x,
    y: placement.y,
    title: "Note",
    body: ""
  };
  layerActions().push(action);
  if (select) state.selectedNoteActionId = action.id;
  redraw();
  if (refreshLayers) renderLayers();
  if (syncUi) {
    syncNoteControls();
    updatePropertiesView();
  }
  if (save) saveDraft();
  return true;
}

function stampWhileDragging(point) {
  const key = placementDragKey(point);
  if (!key) return false;
  if (!state.dragPlacedKeys) startPlacementDrag();
  if (state.dragPlacedKeys.has(key)) return false;
  let placed = false;
  if (state.assetTab === "tilesets") {
    placed = stampAsset(point, { save: false, refreshLayers: false });
  } else if (state.assetTab === "hitboxes") {
    placed = stampHitbox(point, { save: false, refreshLayers: false });
  } else if (state.assetTab === "characters") {
    if (!findCharacterAt(point)) {
      placed = stampCharacter(point, { save: false, refreshLayers: false, select: false, syncUi: false });
    }
  } else if (state.assetTab === "notes") {
    if (!findNoteAt(point)) {
      placed = stampNote(point, { save: false, refreshLayers: false, select: false, syncUi: false });
    }
  }
  if (placed) {
    state.dragPlacedKeys.add(key);
    state.dragDidPlace = true;
  }
  return placed;
}

function deleteSelectedCharacter() {
  const record = selectedCharacterRecord();
  if (!record) return;
  const index = record.layer.actions.findIndex((action) => action.id === record.action.id);
  if (index === -1) return;
  record.layer.actions.splice(index, 1);
  state.selectedCharacterActionId = null;
  redraw();
  renderLayers();
  syncCharacterControls();
  syncNoteControls();
  renderCharacterBrowser();
  updatePropertiesView();
  saveDraft();
}

function deleteSelectedNote() {
  const record = selectedNoteRecord();
  if (!record) return;
  const index = record.layer.actions.findIndex((action) => action.id === record.action.id);
  if (index === -1) return;
  record.layer.actions.splice(index, 1);
  state.selectedNoteActionId = null;
  redraw();
  renderLayers();
  syncNoteControls();
  updatePropertiesView();
  saveDraft();
}

function loadDraft() {
  const raw = localStorage.getItem("level0BackgroundDraft");
  if (!raw) return false;
  try {
    const draft = JSON.parse(raw);
    if (Array.isArray(draft)) {
      state.layers = [{ id: "layer-1", name: "Layer 1", visible: true, actions: draft }];
      state.activeLayerId = "layer-1";
    } else if (draft && Array.isArray(draft.layers)) {
      if (draft.canvasWidth || draft.canvasHeight) {
        canvas.width = snapLevelDimension(draft.canvasWidth, canvas.width);
        canvas.height = snapLevelDimension(draft.canvasHeight, canvas.height);
        ctx.imageSmoothingEnabled = false;
      }
      state.layers = draft.layers.map((layer, index) => ({
        id: layer.id || `layer-${index + 1}`,
        name: layer.name || `Layer ${index + 1}`,
        visible: layer.visible !== false,
        actions: Array.isArray(layer.actions) ? layer.actions : []
      }));
      if (!state.layers.length) state.layers = [{ id: "layer-1", name: "Layer 1", visible: true, actions: [] }];
      state.activeLayerId = state.layers.some((layer) => layer.id === draft.activeLayerId)
        ? draft.activeLayerId
        : state.layers[state.layers.length - 1].id;
      if (draft.assetTab) state.assetTab = draft.assetTab === "audio" ? "notes" : draft.assetTab;
      state.assetStack = Boolean(draft.assetStack);
      state.assetPrecisePlacement = Boolean(draft.assetPrecisePlacement);
      if (draft.levelExpandX === "left" || draft.levelExpandX === "right") state.levelExpandX = draft.levelExpandX;
      if (draft.levelExpandY === "up" || draft.levelExpandY === "down") state.levelExpandY = draft.levelExpandY;
      if (draft.selectedCharacterId && characterCatalog.some((character) => character.id === draft.selectedCharacterId)) {
        state.selectedCharacterId = draft.selectedCharacterId;
      }
      state.selectedNoteActionId = draft.selectedNoteActionId || null;
      state.rightPanelWidth = Number(draft.rightPanelWidth) || state.rightPanelWidth;
      state.layerPanelPercent = Number(draft.layerPanelPercent) || state.layerPanelPercent;
      state.layersCollapsed = Boolean(draft.layersCollapsed);
      state.propertiesCollapsed = Boolean(draft.propertiesCollapsed);
    }
    state.layers.forEach((layer) => layer.actions.forEach(normalizeAction));
    syncCanvasBoundInputs();
    redraw();
    renderLayers();
    applyPanelLayout();
    if (assetStackInput) assetStackInput.checked = state.assetStack;
    if (assetPrecisePlacementInput) assetPrecisePlacementInput.checked = state.assetPrecisePlacement;
    setAssetTab(state.assetTab);
    syncCharacterControls();
    syncNoteControls();
    updatePropertiesView();
    return true;
  } catch {
    localStorage.removeItem("level0BackgroundDraft");
    return false;
  }
}

function normalizeAction(action) {
  if (action.type === "asset") action.sheet = normalizeAssetPath(action.sheet);
  if (action.type === "hitbox") {
    action.x = Number(action.x) || 0;
    action.y = Number(action.y) || 0;
    action.w = Math.max(8, Number(action.w) || 16);
    action.h = Math.max(8, Number(action.h) || 16);
  }
  if (action.type === "character") {
    const definition = characterDefinitionById(action.characterId);
    action.id = action.id || `character-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    action.sprite = resolvedCharacterSpritePath(definition, action);
    action.w = Number(action.w) || definition.width || 16;
    action.h = Number(action.h) || definition.height || 32;
    action.sourceX = Number.isFinite(Number(action.sourceX)) ? Number(action.sourceX) : Number(definition.sourceX) || 0;
    action.sourceY = Number.isFinite(Number(action.sourceY)) ? Number(action.sourceY) : Number(definition.sourceY) || 0;
    action.sourceW = Number(action.sourceW) || Number(definition.sourceWidth) || action.w;
    action.sourceH = Number(action.sourceH) || Number(definition.sourceHeight) || action.h;
    action.dialogue = action.dialogue || "";
    action.name = action.name || definition.name;
  }
  if (action.type === "note") {
    action.id = action.id || `note-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    action.x = Number(action.x) || 0;
    action.y = Number(action.y) || 0;
    action.title = action.title || "Note";
    action.body = action.body || "";
  }
}

function normalizeAssetPath(path) {
  if (path.startsWith("../Texture/")) return path;
  if (path.startsWith("Texture/")) return `../${path}`;
  return path;
}

function normalizeSpritePath(path) {
  if (path.startsWith("../sprites/")) return path;
  if (path.startsWith("sprites/")) return `../${path}`;
  return path;
}

function resolvedCharacterSpritePath(definition, action = null) {
  const spritePath = normalizeSpritePath(action?.sprite || definition.sprite);
  if (definition.id === "adam" && spritePath.endsWith("/Adam_16x16.png")) {
    return definition.sprite;
  }
  return spritePath;
}

function characterSourceRect(definition, action = null, image = null) {
  const fallbackWidth = definition.sourceWidth || definition.width || 16;
  const fallbackHeight = definition.sourceHeight || definition.height || 32;
  const sw = Number(action?.sourceW) || Number(definition.sourceWidth) || Math.min(fallbackWidth, image?.naturalWidth || fallbackWidth);
  const sh = Number(action?.sourceH) || Number(definition.sourceHeight) || Math.min(fallbackHeight, image?.naturalHeight || fallbackHeight);
  const maxX = Math.max(0, (image?.naturalWidth || sw) - sw);
  const maxY = Math.max(0, (image?.naturalHeight || sh) - sh);
  const sx = Math.max(0, Math.min(Number(action?.sourceX ?? definition.sourceX ?? 0), maxX));
  const sy = Math.max(0, Math.min(Number(action?.sourceY ?? definition.sourceY ?? 0), maxY));
  return { sx, sy, sw, sh };
}

function drawCharacterPreview(preview, definition, image) {
  if (!preview) return;
  preview.innerHTML = "";
  if (!isImageReady(image)) {
    const placeholder = document.createElement("span");
    placeholder.className = "character-placeholder";
    placeholder.textContent = definition.label.slice(0, 2);
    preview.appendChild(placeholder);
    return;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 48;
  canvas.height = 48;
  const previewCtx = canvas.getContext("2d");
  previewCtx.imageSmoothingEnabled = false;
  const { sx, sy, sw, sh } = characterSourceRect(definition, null, image);
  const scale = Math.max(1, Math.floor(Math.min(40 / sw, 40 / sh)));
  const dw = sw * scale;
  const dh = sh * scale;
  const dx = Math.floor((canvas.width - dw) / 2);
  const dy = Math.floor((canvas.height - dh) / 2);
  previewCtx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  preview.appendChild(canvas);
}

async function exportPng() {
  try {
    let serverBlob = null;
    let serverFailed = false;
    try {
      serverBlob = await exportPngThroughServer();
    } catch {
      serverFailed = true;
    }
    if (serverBlob) {
      prepareDownload(serverBlob, "background.png", pngDownloadLink);
      setStatus("PNG ready from local export server. Click Download latest PNG if it did not download automatically.");
      return;
    }
    if (window.location.protocol === "file:") {
      setStatus("PNG export server unavailable. Open http://localhost:8000/LevelDesigner/level-editor.html and try again.");
      return;
    }
    await waitForActionImages();
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    exportCtx.imageSmoothingEnabled = false;
    renderActionsTo(exportCtx, false);
    exportCanvas.toBlob((blob) => {
      if (!blob) {
        setStatus("PNG export failed. Open the editor through a local server instead of file://.");
        return;
      }
      prepareDownload(blob, "background.png", pngDownloadLink);
      setStatus(serverFailed
        ? "PNG ready from browser fallback. The export server was unavailable."
        : "PNG ready. Click Download latest PNG if it did not download automatically.");
    }, "image/png");
  } catch (error) {
    setStatus(`PNG export failed: ${error.message}`);
  }
}

async function exportPngThroughServer() {
  const response = await fetch(`${EXPORT_SERVER_ORIGIN}/export/png`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ width: canvas.width, height: canvas.height, actions: allActions() })
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await response.text());
  return response.blob();
}

async function exportSvg() {
  try {
    await waitForActionImages();
    const body = (await Promise.all(allActions().map(actionToSvg))).join("\n  ");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <rect width="${canvas.width}" height="${canvas.height}" fill="#050505"/>
  ${body}
</svg>
`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    prepareDownload(blob, "background.svg", svgDownloadLink);
    setStatus("SVG ready. Keep the local server running so referenced texture URLs stay visible.");
  } catch (error) {
    setStatus(`SVG export failed: ${error.message}`);
  }
}

async function buildGamePreviewPayload() {
  await waitForActionImages();
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.imageSmoothingEnabled = false;
  renderActionsTo(exportCtx, false);

  const characters = visibleLayers().flatMap((layer) =>
    layer.actions
      .filter((action) => action.type === "character")
      .map((action) => {
        const definition = characterDefinitionById(action.characterId);
        return {
          id: action.id,
          characterId: action.characterId,
          name: action.name || definition.name,
          dialogue: action.dialogue || "",
          x: action.x,
          y: action.y,
          width: action.w,
          height: action.h,
          sourceX: action.sourceX ?? definition.sourceX ?? 0,
          sourceY: action.sourceY ?? definition.sourceY ?? 0,
          sourceWidth: action.sourceW ?? definition.sourceWidth ?? action.w,
          sourceHeight: action.sourceH ?? definition.sourceHeight ?? action.h,
          sprite: resolvedCharacterSpritePath(definition, action).replace(/^\.\.\//, "")
        };
      })
  );

  const hitboxes = visibleLayers().flatMap((layer) =>
    layer.actions
      .filter((action) => action.type === "hitbox")
      .map((action) => ({
        x: action.x,
        y: action.y,
        width: action.w,
        height: action.h
      }))
  );

  const notes = state.layers.flatMap((layer) =>
    layer.actions
      .filter((action) => action.type === "note")
      .map((action) => ({
        id: action.id,
        title: action.title || "Note",
        body: action.body || "",
        x: action.x,
        y: action.y,
        layer: {
          id: layer.id,
          name: layer.name
        }
      }))
  );

  return {
    width: canvas.width,
    height: canvas.height,
    backgroundDataUrl: exportCanvas.toDataURL("image/png"),
    characters,
    hitboxes,
    notes,
    generatedAt: Date.now()
  };
}

async function syncRuntimeLevel(payload) {
  const response = await fetch(`${EXPORT_SERVER_ORIGIN}/sync/runtime`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
}

async function exportBundle() {
  if (window.location.protocol === "file:") {
    setStatus("Bundle export requires the editor to be opened through localhost, not file://.");
    return;
  }
  try {
    const payload = await buildGamePreviewPayload();
    const response = await fetch(`${EXPORT_SERVER_ORIGIN}/export/bundle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(await response.text());
    const blob = await response.blob();
    prepareDownload(blob, "level0-export.zip");
    setStatus("Bundle export ready with background.png, characters.json, hitboxes.json, and notes.json.");
  } catch (error) {
    setStatus(`Bundle export failed: ${error.message}`);
  }
}

async function runGamePreview() {
  if (window.location.protocol === "file:") {
    setStatus("Run preview requires the editor to be opened through localhost, not file://.");
    return;
  }
  try {
    const payload = await buildGamePreviewPayload();
    await syncRuntimeLevel(payload);
    localStorage.setItem(GAME_PREVIEW_STORAGE_KEY, JSON.stringify(payload));
    const url = `${window.location.origin}/index.html?preview=editor&t=${Date.now()}`;
    const previewWindow = window.open(url, "_blank", "noopener");
    if (!previewWindow) window.location.href = url;
    setStatus("Game preview opened and runtime level files were updated.");
  } catch (error) {
    setStatus(`Run preview failed: ${error.message}`);
  }
}

function exportSelectedCharacterJson() {
  const record = selectedCharacterRecord();
  if (!record) {
    setStatus("Select a placed character before exporting JSON.");
    return;
  }
  const action = record.action;
  const definition = characterDefinitionById(action.characterId);
  const payload = {
    type: "character",
    characterId: action.characterId,
    name: action.name || definition.name,
    sprite: resolvedCharacterSpritePath(definition, action).replace(/^\.\.\//, ""),
    source: {
      x: action.sourceX ?? definition.sourceX ?? 0,
      y: action.sourceY ?? definition.sourceY ?? 0,
      width: action.sourceW ?? definition.sourceWidth ?? action.w,
      height: action.sourceH ?? definition.sourceHeight ?? action.h
    },
    position: {
      x: action.x,
      y: action.y
    },
    size: {
      width: action.w,
      height: action.h
    },
    dialogue: action.dialogue || "",
    layer: {
      id: record.layer.id,
      name: record.layer.name
    }
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
  const baseName = (payload.name || payload.characterId || "character")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "character";
  prepareDownload(blob, `${baseName}.json`);
  setStatus(`Character JSON ready for ${payload.name}.`);
}

function exportHitboxesJson() {
  const hitboxes = state.layers.flatMap((layer) =>
    layer.actions
      .filter((action) => action.type === "hitbox")
      .map((action) => ({
        x: action.x,
        y: action.y,
        width: action.w,
        height: action.h,
        layer: {
          id: layer.id,
          name: layer.name
        }
      }))
  );
  const payload = {
    room: "archive",
    level: "level0",
    hitboxes
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
  prepareDownload(blob, "hitboxes.json");
  setStatus(`Hitboxes JSON ready with ${hitboxes.length} box${hitboxes.length === 1 ? "" : "es"}.`);
}

function exportNotesJson() {
  const notes = state.layers.flatMap((layer) =>
    layer.actions
      .filter((action) => action.type === "note")
      .map((action) => ({
        id: action.id,
        title: action.title || "Note",
        body: action.body || "",
        x: action.x,
        y: action.y,
        layer: {
          id: layer.id,
          name: layer.name
        }
      }))
  );
  const payload = {
    room: "archive",
    level: "level0",
    notes
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
  prepareDownload(blob, "notes.json");
  setStatus(`Notes JSON ready with ${notes.length} note${notes.length === 1 ? "" : "s"}.`);
}

function prepareDownload(blob, filename, persistentLink = null) {
  if (persistentLink?.dataset?.url) URL.revokeObjectURL(persistentLink.dataset.url);
  const url = URL.createObjectURL(blob);
  if (persistentLink) {
    persistentLink.href = url;
    persistentLink.dataset.url = url;
    persistentLink.hidden = false;
    persistentLink.download = filename;
  }

  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.remove();
  }, 1000);
}

function renderActionsTo(targetCtx, includeGrid) {
  targetCtx.clearRect(0, 0, canvas.width, canvas.height);
  targetCtx.fillStyle = "#050505";
  targetCtx.fillRect(0, 0, canvas.width, canvas.height);
  visibleLayers().forEach((layer) => layer.actions.forEach((action) => drawActionTo(targetCtx, action)));
  if (includeGrid) drawGridTo(targetCtx);
}

function drawActionTo(targetCtx, action) {
  if (action.type === "template") {
    drawArchiveTemplateTo(targetCtx);
    return;
  }
  if (action.type === "character" || action.type === "hitbox" || action.type === "note") return;
  targetCtx.lineCap = "square";
  targetCtx.lineJoin = "miter";
  targetCtx.strokeStyle = action.color;
  targetCtx.fillStyle = action.color;
  targetCtx.lineWidth = action.size;
  if (action.type === "stroke") {
    targetCtx.beginPath();
    action.points.forEach((point, index) => {
      if (index === 0) targetCtx.moveTo(point.x, point.y);
      else targetCtx.lineTo(point.x, point.y);
    });
    targetCtx.stroke();
  }
  if (action.type === "line") {
    targetCtx.beginPath();
    targetCtx.moveTo(action.from.x, action.from.y);
    targetCtx.lineTo(action.to.x, action.to.y);
    targetCtx.stroke();
  }
  if (action.type === "rect") {
    targetCtx.strokeRect(action.from.x, action.from.y, action.to.x - action.from.x, action.to.y - action.from.y);
  }
  if (action.type === "asset") {
    const image = loadedAssets[action.sheet];
    if (isImageReady(image)) drawRotatedAssetTo(targetCtx, image, action);
  }
}

function drawArchiveTemplateTo(targetCtx) {
  targetCtx.fillStyle = "#050505";
  targetCtx.fillRect(0, 0, targetCtx.canvas.width, targetCtx.canvas.height);
  strokeRectTo(targetCtx, 34, 58, 572, 368, "#f7f7f7", 4);
  strokeRectTo(targetCtx, 88, 92, 464, 82, "#777777", 2);
  strokeRectTo(targetCtx, 88, 194, 464, 82, "#777777", 2);
  strokeRectTo(targetCtx, 88, 296, 464, 82, "#777777", 2);
  strokeRectTo(targetCtx, 258, 184, 124, 92, "#e0c15c", 3);
  fillRectTo(targetCtx, 276, 202, 88, 14, "#e0c15c");
  fillRectTo(targetCtx, 276, 226, 88, 8, "#777777");
  fillRectTo(targetCtx, 276, 244, 88, 8, "#777777");
  drawTextTo(targetCtx, "THE ARCHIVE", 224, 42, "#f7f7f7", 20);
  drawTextTo(targetCtx, "LEVEL 0", 98, 402, "#777777", 12);
}

function drawRotatedAssetTo(targetCtx, image, action) {
  const rotation = action.rotation || 0;
  targetCtx.save();
  targetCtx.translate(action.x + action.dw / 2, action.y + action.dh / 2);
  targetCtx.rotate(rotation * Math.PI / 180);
  targetCtx.drawImage(image, action.sx, action.sy, action.sw, action.sh, -action.dw / 2, -action.dh / 2, action.dw, action.dh);
  targetCtx.restore();
}

function drawGridTo(targetCtx) {
  targetCtx.save();
  targetCtx.strokeStyle = "rgba(255,255,255,0.12)";
  targetCtx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 16) {
    targetCtx.beginPath();
    targetCtx.moveTo(x, 0);
    targetCtx.lineTo(x, canvas.height);
    targetCtx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 16) {
    targetCtx.beginPath();
    targetCtx.moveTo(0, y);
    targetCtx.lineTo(canvas.width, y);
    targetCtx.stroke();
  }
  targetCtx.restore();
}

function strokeRectTo(targetCtx, x, y, w, h, color, width) {
  targetCtx.strokeStyle = color;
  targetCtx.lineWidth = width;
  targetCtx.strokeRect(x, y, w, h);
}

function fillRectTo(targetCtx, x, y, w, h, color) {
  targetCtx.fillStyle = color;
  targetCtx.fillRect(x, y, w, h);
}

function drawTextTo(targetCtx, value, x, y, color, size) {
  targetCtx.fillStyle = color;
  targetCtx.font = `${size}px "Courier New", monospace`;
  targetCtx.fillText(value, x, y);
}

function waitForActionImages() {
  const paths = [...new Set(allActions().filter((action) => action.type === "asset").map((action) => action.sheet))];
  return Promise.all(paths.map(waitForImage));
}

function waitForImage(path) {
  const normalizedPath = normalizeAssetPath(path);
  const image = loadedAssets[normalizedPath] || loadAssetImage({ path: normalizedPath });
  if (isImageReady(image)) return Promise.resolve(image);
  return new Promise((resolve, reject) => {
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", () => reject(new Error(`Could not load ${normalizedPath}`)), { once: true });
  });
}

async function actionToSvg(action) {
  if (action.type === "template") {
    return `<rect x="34" y="58" width="572" height="368" fill="#050505" stroke="#f7f7f7" stroke-width="4"/>
  <rect x="88" y="92" width="464" height="82" fill="#101010" stroke="#777777" stroke-width="2"/>
  <rect x="88" y="194" width="464" height="82" fill="#101010" stroke="#777777" stroke-width="2"/>
  <rect x="88" y="296" width="464" height="82" fill="#101010" stroke="#777777" stroke-width="2"/>
  <rect x="258" y="184" width="124" height="92" fill="#050505" stroke="#e0c15c" stroke-width="3"/>
  <rect x="276" y="202" width="88" height="14" fill="#e0c15c"/>
  <rect x="276" y="226" width="88" height="8" fill="#777777"/>
  <rect x="276" y="244" width="88" height="8" fill="#777777"/>
  <text x="224" y="42" fill="#f7f7f7" font-family="Courier New, monospace" font-size="20">THE ARCHIVE</text>
  <text x="98" y="402" fill="#777777" font-family="Courier New, monospace" font-size="12">LEVEL 0</text>`;
  }
  if (action.type === "character") {
    return "";
  }
  if (action.type === "hitbox") {
    return "";
  }
  if (action.type === "note") {
    return "";
  }
  if (action.type === "stroke") {
    const points = action.points.map((point) => `${point.x},${point.y}`).join(" ");
    return `<polyline points="${points}" fill="none" stroke="${action.color}" stroke-width="${action.size}" stroke-linecap="square" stroke-linejoin="miter"/>`;
  }
  if (action.type === "line") {
    return `<line x1="${action.from.x}" y1="${action.from.y}" x2="${action.to.x}" y2="${action.to.y}" stroke="${action.color}" stroke-width="${action.size}" stroke-linecap="square"/>`;
  }
  if (action.type === "rect") {
    return `<rect x="${action.from.x}" y="${action.from.y}" width="${action.to.x - action.from.x}" height="${action.to.y - action.from.y}" fill="none" stroke="${action.color}" stroke-width="${action.size}"/>`;
  }
  if (action.type === "asset") {
    const rotation = action.rotation || 0;
    const cx = action.x + action.dw / 2;
    const cy = action.y + action.dh / 2;
    const transform = rotation ? ` transform="rotate(${rotation} ${cx} ${cy})"` : "";
    const image = loadedAssets[normalizeAssetPath(action.sheet)];
    const imageWidth = isImageReady(image) ? image.naturalWidth : action.sx + action.sw;
    const imageHeight = isImageReady(image) ? image.naturalHeight : action.sy + action.sh;
    return `<svg x="${action.x}" y="${action.y}" width="${action.dw}" height="${action.dh}" viewBox="${action.sx} ${action.sy} ${action.sw} ${action.sh}" preserveAspectRatio="none"${transform}>
    <image href="${assetHref(action.sheet)}" x="0" y="0" width="${imageWidth}" height="${imageHeight}" image-rendering="pixelated"/>
  </svg>`;
  }
  return "";
}

function assetHref(path) {
  const normalized = normalizeAssetPath(path).replace(/^\.\.\//, "");
  return escapeXml(new URL(normalized, `${EXPORT_SERVER_ORIGIN}/`).href);
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function rotateAsset(delta) {
  const current = Number(assetRotationInput.value);
  const next = (current + delta + 360) % 360;
  assetRotationInput.value = String(next);
}

toolButtons.forEach((button) => {
  button.addEventListener("click", () => setTool(button.dataset.tool));
});

assetTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTool("asset");
    setAssetTab(button.dataset.assetTab);
  });
});

canvas.addEventListener("pointerdown", beginDraw);
canvas.addEventListener("pointermove", moveDraw);
canvas.addEventListener("pointerup", endDraw);
canvas.addEventListener("pointerleave", endDraw);

document.getElementById("gridBtn").addEventListener("click", (event) => {
  state.showGrid = !state.showGrid;
  event.target.textContent = state.showGrid ? "Grid On" : "Grid Off";
  redraw();
});

document.getElementById("undoBtn").addEventListener("click", () => {
  layerActions().pop();
  redraw();
  renderLayers();
  syncCharacterControls();
  syncNoteControls();
  renderCharacterBrowser();
  updatePropertiesView();
  saveDraft();
});

document.getElementById("clearBtn").addEventListener("click", () => {
  activeLayer().actions = [];
  redraw();
  renderLayers();
  syncCharacterControls();
  syncNoteControls();
  renderCharacterBrowser();
  updatePropertiesView();
  saveDraft();
});

document.getElementById("saveBrowserBtn").addEventListener("click", saveDraft);
document.getElementById("exportPngBtn").addEventListener("click", exportPng);
document.getElementById("exportSvgBtn").addEventListener("click", exportSvg);
document.getElementById("rotateLeftBtn").addEventListener("click", () => rotateAsset(-90));
document.getElementById("rotateRightBtn").addEventListener("click", () => rotateAsset(90));
addLayerBtn.addEventListener("click", addLayer);
deleteLayerBtn.addEventListener("click", deleteActiveLayer);
toggleLayersBtn.addEventListener("click", toggleLayersCollapsed);
togglePropertiesBtn.addEventListener("click", togglePropertiesCollapsed);
rightPanelResizeHandle.addEventListener("pointerdown", startPanelResize);
sectionResizeHandle.addEventListener("pointerdown", startSectionResize);

assetSheetSelect.addEventListener("change", () => {
  state.selectedSheet = Number(assetSheetSelect.value);
  state.selectedTile = null;
  state.selectionStart = null;
  tileSizeInput.value = String(currentSheet().tile);
  renderAssetMenu();
  redraw();
});

tileSizeInput.addEventListener("change", () => {
  state.selectedTile = null;
  state.selectionStart = null;
  renderAssetMenu();
  redraw();
});

assetCanvas.addEventListener("click", selectAssetTile);

assetScaleInput.addEventListener("change", redraw);
assetRotationInput.addEventListener("change", redraw);
assetStackInput.addEventListener("change", () => {
  state.assetStack = assetStackInput.checked;
  redraw();
  saveDraft();
});
assetPrecisePlacementInput.addEventListener("change", () => {
  state.assetPrecisePlacement = assetPrecisePlacementInput.checked;
  redraw();
  saveDraft();
});
hitboxWidthInput.addEventListener("input", redraw);
hitboxHeightInput.addEventListener("input", redraw);
hitboxSnapInput.addEventListener("input", redraw);
exportHitboxesJsonBtn.addEventListener("click", exportHitboxesJson);
exportNotesJsonBtn.addEventListener("click", exportNotesJson);

characterSelect.addEventListener("change", () => {
  const definition = characterDefinitionById(characterSelect.value);
  applyCharacterDefinitionToSelection(definition);
  syncCharacterControls();
  renderCharacterBrowser();
  redraw();
  updatePropertiesView();
  saveDraft();
});

characterNameInput.addEventListener("input", () => {
  const action = selectedCharacterAction();
  if (!action) return;
  const definition = characterDefinitionById(action.characterId);
  action.name = characterNameInput.value.trim() || definition.name;
  redraw();
  updatePropertiesView();
  saveDraft();
});

characterDialogueInput.addEventListener("input", () => {
  const action = selectedCharacterAction();
  if (!action) return;
  action.dialogue = characterDialogueInput.value;
  saveDraft();
});

noteTitleInput.addEventListener("input", () => {
  const action = selectedNoteAction();
  if (!action) return;
  action.title = noteTitleInput.value.trim() || "Note";
  redraw();
  syncNoteControls();
  updatePropertiesView();
  saveDraft();
});

noteBodyInput.addEventListener("input", () => {
  const action = selectedNoteAction();
  if (!action) return;
  action.body = noteBodyInput.value;
  saveDraft();
});

characterXInput.addEventListener("change", () => {
  const action = selectedCharacterAction();
  if (!action) return;
  action.x = Math.max(0, Math.min(canvas.width - action.w, Number(characterXInput.value) || 0));
  redraw();
  syncCharacterControls();
  saveDraft();
});

characterYInput.addEventListener("change", () => {
  const action = selectedCharacterAction();
  if (!action) return;
  action.y = Math.max(0, Math.min(canvas.height - action.h, Number(characterYInput.value) || 0));
  redraw();
  syncCharacterControls();
  saveDraft();
});

noteXInput.addEventListener("change", () => {
  const action = selectedNoteAction();
  if (!action) return;
  action.x = Math.max(0, Math.min(canvas.width, Number(noteXInput.value) || 0));
  redraw();
  syncNoteControls();
  saveDraft();
});

noteYInput.addEventListener("change", () => {
  const action = selectedNoteAction();
  if (!action) return;
  action.y = Math.max(0, Math.min(canvas.height, Number(noteYInput.value) || 0));
  redraw();
  syncNoteControls();
  saveDraft();
});

resizeLevelBtn.addEventListener("click", () => {
  resizeLevelCanvas(levelWidthInput.value, levelHeightInput.value);
});

levelWidthInput.addEventListener("change", () => {
  levelWidthInput.value = String(snapLevelDimension(levelWidthInput.value, canvas.width));
});

levelHeightInput.addEventListener("change", () => {
  levelHeightInput.value = String(snapLevelDimension(levelHeightInput.value, canvas.height));
});

levelExpandXInput.addEventListener("change", () => {
  state.levelExpandX = levelExpandXInput.value === "left" ? "left" : "right";
  saveDraft();
});

levelExpandYInput.addEventListener("change", () => {
  state.levelExpandY = levelExpandYInput.value === "up" ? "up" : "down";
  saveDraft();
});

exportCharacterJsonBtn.addEventListener("click", exportSelectedCharacterJson);
deleteCharacterBtn.addEventListener("click", deleteSelectedCharacter);
deleteNoteBtn.addEventListener("click", deleteSelectedNote);
exportBundleBtn.addEventListener("click", exportBundle);
runPreviewBtn.addEventListener("click", runGamePreview);

setupAssetMenu();
setupCharacterMenu();
applyPanelLayout();
syncCanvasBoundInputs();
assetStackInput.checked = state.assetStack;
assetPrecisePlacementInput.checked = state.assetPrecisePlacement;
setAssetTab(state.assetTab);
syncNoteControls();
updatePropertiesView();

if (!loadDraft()) {
  syncCanvasBoundInputs();
  redraw();
  renderLayers();
  applyPanelLayout();
  setAssetTab(state.assetTab);
  syncCharacterControls();
  syncNoteControls();
  updatePropertiesView();
}
