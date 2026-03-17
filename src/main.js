import { createScene } from './scene.js';
import { createControls } from './controls.js';
import { createGUI } from './gui.js';
import { openFilePicker } from './loaders.js';

// Boot
const container = document.getElementById('viewport');
const { renderer, scene, camera, DEFAULT_CAM_POSITION, DEFAULT_CAM_TARGET, onFrame } = createScene(container);

// Controls
const controls = createControls(camera, renderer.domElement, { DEFAULT_CAM_POSITION, DEFAULT_CAM_TARGET });

// GUI
const gui = createGUI({
  onOpenFile: () => openFilePicker(scene, onModelLoaded),
  onResetCamera: () => controls.resetCamera(),
});

function onModelLoaded({ fileName, triangles }) {
  gui.setModelInfo(fileName, triangles);
}

// Per-frame updates
onFrame(() => {
  controls.update();
  gui.updateFPS();
});
