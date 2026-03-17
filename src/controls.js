import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const PAN_SPEED = 0.05;

export function createControls(camera, domElement, defaults) {
  const orbit = new OrbitControls(camera, domElement);
  orbit.enableDamping = true;
  orbit.dampingFactor = 0.1;
  orbit.target.copy(defaults.DEFAULT_CAM_TARGET);

  // Track pressed keys
  const keys = {};
  window.addEventListener('keydown', (e) => { keys[e.code] = true; });
  window.addEventListener('keyup', (e) => { keys[e.code] = false; });

  // Reset function
  function resetCamera() {
    camera.position.copy(defaults.DEFAULT_CAM_POSITION);
    orbit.target.copy(defaults.DEFAULT_CAM_TARGET);
    orbit.update();
  }

  // Home key binding
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Home') resetCamera();
  });

  // Per-frame keyboard pan
  function update() {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    if (keys['KeyW'] || keys['ArrowUp']) {
      camera.position.addScaledVector(forward, PAN_SPEED);
      orbit.target.addScaledVector(forward, PAN_SPEED);
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      camera.position.addScaledVector(forward, -PAN_SPEED);
      orbit.target.addScaledVector(forward, -PAN_SPEED);
    }
    if (keys['KeyA'] || keys['ArrowLeft']) {
      camera.position.addScaledVector(right, -PAN_SPEED);
      orbit.target.addScaledVector(right, -PAN_SPEED);
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      camera.position.addScaledVector(right, PAN_SPEED);
      orbit.target.addScaledVector(right, PAN_SPEED);
    }
    if (keys['KeyQ']) {
      camera.position.y -= PAN_SPEED;
      orbit.target.y -= PAN_SPEED;
    }
    if (keys['KeyE']) {
      camera.position.y += PAN_SPEED;
      orbit.target.y += PAN_SPEED;
    }

    orbit.update();
  }

  return { orbit, update, resetCamera };
}
