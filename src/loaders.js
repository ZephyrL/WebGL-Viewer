import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let currentModel = null;

/**
 * Open a file picker that accepts .fbx and .obj, load the selected file,
 * centre it in the scene, and return metadata.
 */
export function openFilePicker(scene, onLoaded) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.fbx,.obj';
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    loadFile(file, scene, onLoaded);
  });
  input.click();
}

export function loadFile(file, scene, onLoaded) {
  const ext = file.name.split('.').pop().toLowerCase();
  const reader = new FileReader();

  reader.onload = (event) => {
    const data = event.target.result;
    let loader;

    if (ext === 'fbx') {
      loader = new FBXLoader();
      const object = loader.parse(data);
      addModel(object, scene, file.name, onLoaded);
    } else if (ext === 'obj') {
      loader = new OBJLoader();
      const text = new TextDecoder().decode(data);
      const object = loader.parse(text);
      addModel(object, scene, file.name, onLoaded);
    }
  };

  reader.readAsArrayBuffer(file);
}

function addModel(object, scene, fileName, onLoaded) {
  // Remove previous model
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else if (child.material) {
          child.material.dispose();
        }
      }
    });
    currentModel = null;
  }

  // Compute bounding box and centre + normalise
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 4 / maxDim : 1;

  object.position.sub(center);
  object.scale.multiplyScalar(scale);

  // Recompute after transform so we can lift onto the grid
  const box2 = new THREE.Box3().setFromObject(object);
  object.position.y -= box2.min.y;

  scene.add(object);
  currentModel = object;

  // Count triangles
  let triangles = 0;
  object.traverse((child) => {
    if (child.isMesh && child.geometry) {
      const geo = child.geometry;
      if (geo.index) {
        triangles += geo.index.count / 3;
      } else if (geo.attributes.position) {
        triangles += geo.attributes.position.count / 3;
      }
    }
  });

  if (onLoaded) {
    onLoaded({ fileName, triangles: Math.floor(triangles) });
  }
}
