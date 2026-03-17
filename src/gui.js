import GUI from 'lil-gui';

export function createGUI({ onOpenFile, onResetCamera }) {
  const gui = new GUI({ title: 'Debug Panel', width: 260 });

  const state = {
    fileName: 'No file loaded',
    polygons: 0,
    fps: 0,
    openFile() { onOpenFile(); },
    resetCamera() { onResetCamera(); },
  };

  // Scene info folder
  const info = gui.addFolder('Scene Info');
  const fileCtrl = info.add(state, 'fileName').name('File').disable();
  const polyCtrl = info.add(state, 'polygons').name('Polygons').disable();
  const fpsCtrl = info.add(state, 'fps').name('FPS').disable();

  // Actions folder
  const actions = gui.addFolder('Actions');
  actions.add(state, 'openFile').name('Open File');
  actions.add(state, 'resetCamera').name('Reset Camera');

  // FPS tracking
  let frames = 0;
  let lastTime = performance.now();

  function updateFPS() {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      state.fps = frames;
      fpsCtrl.updateDisplay();
      frames = 0;
      lastTime = now;
    }
  }

  function setModelInfo(fileName, triangles) {
    state.fileName = fileName;
    state.polygons = triangles;
    fileCtrl.updateDisplay();
    polyCtrl.updateDisplay();
  }

  // Prevent orbit controls from firing when interacting with the panel
  const guiDom = gui.domElement;
  guiDom.addEventListener('pointerdown', (e) => e.stopPropagation());
  guiDom.addEventListener('wheel', (e) => e.stopPropagation());

  return { gui, updateFPS, setModelInfo };
}
