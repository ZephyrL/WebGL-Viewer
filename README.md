# WebGL Viewer

A lightweight, browser-based 3D model viewer built with **Three.js** and **Vite**. Load and inspect FBX and OBJ 3D mesh files with intuitive camera controls and a debug panel.

## Features

- 🎨 **WebGL2 Rendering**: Modern 3D graphics with ambient and directional lighting
- 📁 **Multi-format Support**: Load FBX and OBJ mesh files directly from your disk
- 🎮 **Intuitive Controls**:
  - **Mouse**: Orbit (left-click drag), Pan (right-click drag), Zoom (scroll wheel)
  - **Keyboard**: WASD / Arrow keys for directional pan, Q/E for vertical movement, Home to reset camera
- 🛠️ **Debug Panel**: Real-time scene info (loaded file, polygon count, FPS) with action buttons
- ⚡ **Lightning-fast Development**: Vite dev server with hot module replacement
- 📦 **Production Ready**: Optimized build output for deployment

## Installation

### Prerequisites

- **Node.js** ≥ 18 and **npm** (or yarn)
- A modern web browser with WebGL2 support (Chrome, Firefox, Safari, Edge)

### Setup

```bash
# Clone the repository
git clone git@github.com:ZephyrL/WebGL-Viewer.git
cd WebGLViewer

# Install dependencies
npm install
```

## Usage

### Development Server

Run the app locally with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Production Build

Build for deployment:

```bash
npm run build
```

Output is generated in the `dist/` directory. Serve it with any static web server:

```bash
npm run preview
```

## How to Use

1. **Open a Model**: Click the **"Open File"** button in the debug panel (right side) or use the file picker to select a `.fbx` or `.obj` file from your disk.

2. **Navigate the Scene**:
   - **Orbit**: Left-click and drag to rotate around the model
   - **Pan**: Right-click and drag (or middle-click) to move the camera
   - **Zoom**: Scroll your mouse wheel to get closer or farther
   - **Keyboard Navigation**:
     - `W` / ↑ — Move forward
     - `S` / ↓ — Move backward
     - `A` / ← — Move left
     - `D` / → — Move right
     - `Q` — Move down
     - `E` — Move up
     - `Home` — Reset camera to default position

3. **Monitor Performance**: The debug panel displays:
   - **File**: Name of the currently loaded model
   - **Polygons**: Triangle count in the mesh
   - **FPS**: Real-time frame rate

4. **Reset View**: Click **"Reset Camera"** in the debug panel to return to the default camera position.

## Project Structure

```
WebGLViewer/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── .gitignore              # Git ignore rules
├── src/
│   ├── main.js             # Application entry point
│   ├── scene.js            # Three.js scene, renderer, lights, grid
│   ├── loaders.js          # FBX/OBJ file loading and mesh processing
│   ├── controls.js         # Camera controls (orbit + keyboard)
│   └── gui.js              # Debug panel (lil-gui)
└── dist/                   # Production build output
```

## Dependencies

- **three** — 3D graphics library
- **lil-gui** — Lightweight debug/settings panel
- **vite** — Fast build tool and dev server

## Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v15+)
- ✅ Edge (v90+)

Requires **WebGL2** support.

## Known Limitations

- **FBX Compatibility**: FBXLoader handles most FBX file variants but may fail on certain binary FBX 7.x files with complex rigs.
- **Large Files**: Very large meshes (millions of polygons) may cause performance issues on lower-end hardware.
- **Materials**: The viewer focuses on geometry; materials and textures from OBJ files are not fully imported.

## Future Enhancements

- [ ] Support for additional formats (glTF, STL)
- [ ] Model statistics and optimization tools
- [ ] Wireframe and point cloud rendering modes
- [ ] Export to common formats
- [ ] Animation playback for rigged models

## Development

### Running Tests

(No tests currently configured)

### Building & Deployment

The production build is fully optimized and can be deployed to any static hosting service (GitHub Pages, Verifier, AWS S3, etc.).

## License

This project is part of the AgentWorkspace framework.

## Credits

Built with [Three.js](https://threejs.org/), [Vite](https://vitejs.dev/), and [lil-gui](https://github.com/georgealways/lil-gui).

---

**Questions or Issues?** Feel free to open an issue on GitHub or contribute via pull requests.
