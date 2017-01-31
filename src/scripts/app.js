import * as THREE from 'three';
import { createScene } from './scene.js';
import { Room } from './room.js';
import { importMesh } from './importMesh.js'

// Get the canvas element from our HTML above
const canvas = document.getElementById("renderCanvas");
console.log(THREE);
// Load the THREE 3D engine
const engine = new THREE.WebGLRenderer({ canvas: canvas });
// Now, call the createScene function that you just finished creating
const scene = createScene(engine);

/*
function roomComplete(room) {
    // Shadow
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, room.roomLight);
    shadowGenerator.useBlurVarianceShadowMap = true;
    shadowGenerator.blurScale = 2;
    // shadowGenerator.bias = 0.005;
    // shadowGenerator.usePoissonSampling = true;

    const paxConfig = {
        path: '/dist/lib/',
        fileName: 'pax.babylon',
        position: {
            x: 2,
            z: 2
        },
        shadowGenerator: shadowGenerator
    };

    const strandmonConfig = {
        path: '/dist/lib/',
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
*/

// Register a render loop to repeatedly render the scene
function render() {
    requestAnimationFrame( render );

    engine.render(scene.scene, scene.camera);
}

render();

/*
// Watch for browser/canvas resize events
window.addEventListener("resize", () => {
    scene.render();
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
*/

console.log(scene);