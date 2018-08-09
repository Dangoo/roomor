import BABYLON from 'babylonjs';
import { createScene } from './scene.js';
import { Room } from './room.js';
import { importMesh } from './importMesh.js'

// Get the canvas element from our HTML above
const canvas = document.getElementById("renderCanvas");
// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);
// Now, call the createScene function that you just finished creating
const scene = createScene(canvas, engine);

function roomComplete(room) {
    // Shadow
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, room.roomLight);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 2;
    // shadowGenerator.bias = 0.005;
    // shadowGenerator.usePoissonSampling = true;

    const paxConfig = {
        path: '/lib/',
        fileName: 'pax.babylon',
        position: {
            x: 2,
            z: 2
        },
        shadowGenerator: shadowGenerator
    };

    const strandmonConfig = {
        path: '/lib/',
        fileName: 'strandmon.babylon',
        position: {
            x: -2,
            y: .5,
            z: -2
        },
        shadowGenerator: shadowGenerator
    };

    importMesh('model', scene, paxConfig);
    importMesh('strandmon', scene, strandmonConfig);
}

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
    engine.resize();
});

let room = undefined;

window.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target;
    const data = new FormData(target);

    const roomSize = {
        width: data.get('x') || 2,
        height: data.get('y') || 2.6,
        depth: data.get('z') || 2
    };

    if (room) {
        room.update(roomSize);
    } else {
        room = new Room(roomSize, scene);
    }

    room.room.receiveShadows = true;

    roomComplete(room);
});

console.log(scene);