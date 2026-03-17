import * as THREE from 'three';

const DEFAULT_CAM_POSITION = new THREE.Vector3(5, 4, 5);
const DEFAULT_CAM_TARGET = new THREE.Vector3(0, 0, 0);

export function createScene(container) {
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x222222);
  container.appendChild(renderer.domElement);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.copy(DEFAULT_CAM_POSITION);
  camera.lookAt(DEFAULT_CAM_TARGET);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 10, 7);
  scene.add(directional);

  // Ground grid
  const grid = new THREE.GridHelper(20, 20, 0x444444, 0x333333);
  scene.add(grid);

  // Resize handler
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', onResize);

  // Render loop
  const clock = new THREE.Clock();
  let animationId;
  const frameCallbacks = [];

  function animate() {
    animationId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    for (const cb of frameCallbacks) cb(delta);
    renderer.render(scene, camera);
  }
  animate();

  return {
    renderer,
    scene,
    camera,
    DEFAULT_CAM_POSITION,
    DEFAULT_CAM_TARGET,
    onFrame(cb) { frameCallbacks.push(cb); },
  };
}
