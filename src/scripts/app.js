import BABYLON from 'babylonjs';
import { createScene } from './scene.js';
import { Room } from './room.js';

// Get the canvas element from our HTML above
const canvas = document.getElementById("renderCanvas");

const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");

// Load the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

// Now, call the createScene function that you just finished creating
const scene = createScene(BABYLON, engine, canvas);




// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

let room = undefined;

window.addEventListener("submit", function (e) {
    e.preventDefault();

    const target = e.target;
    const data = new FormData(target);

    console.log(data, room);

    const roomSize = {
        width: data.get('x'),
        depth: data.get('z'),
        height: 2.2
    };

    if (room) {
        room.update(roomSize);
    } else {
        room = new Room(roomSize, scene);
    }
    /*
        // const isNode = target.nodeName === 'INPUT';
    
        if (isNode) {
            room.geometry.extend.maximum[target.name] = target.value / 2;
            room.geometry.extend.minimum[target.name] = - target.value / 2;
        }*/
});


console.log(room);