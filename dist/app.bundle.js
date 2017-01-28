/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Room {
    constructor(options, scene) {
        this.size = {
            width: options.width,
            height: options.height,
            depth: options.depth
        }

        this.scene = scene;

        this.update(this.size);
    }

    createRoom(options, scene) {
        // Let's try our built-in 'box' shape. Params: name, size, scene, updatable, sideOrientation
        const room = BABYLON.MeshBuilder.CreateBox(
            "room",
            {
                width: options.width,
                height: options.height,
                depth: options.depth,
                sideOrientation: BABYLON.Mesh.BACKSIDE
            },
            scene
        );

        return room;
    }

    remove() {
        return this.room.dispose();
    }

    update(size) {
        const adjustGroundHeight = 0.001;

        if(this.room) {
            this.remove();
        }

        this.size = Object.assign(this.size, size);
        this.room = this.createRoom(this.size, this.scene);

        // Move the room upward 1/2 its height
        this.room.position.y = (this.size.height / 2) + adjustGroundHeight;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Room;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createScene;
// This begins the creation of a function that we will 'call' just after it's built
function createScene (BABYLON, engine, canvas) {
    const backgroundColor = new BABYLON.Color3(.95, .95, .95);

    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to green.
    scene.clearColor = backgroundColor;

    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount
    light.intensity = .5;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 25, 25, 0, scene);

    const grid = new BABYLON.GridMaterial("groundMaterial", scene);
    grid.gridRatio = 0.1;
    grid.mainColor = new BABYLON.Color3(.8, .8, .8);
    grid.lineColor = new BABYLON.Color3(.8, .8, .8);
    grid.opacity = .99;

    ground.material = grid;

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //scene.fogDensity = 0.25;
    scene.fogColor = backgroundColor;


    // Leave this function
    return scene;

};  // End of createScene function

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = BABYLON;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babylonjs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babylonjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babylonjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__room_js__ = __webpack_require__(0);




// Get the canvas element from our HTML above
const canvas = document.getElementById("renderCanvas");

const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");

// Load the BABYLON 3D engine
const engine = new __WEBPACK_IMPORTED_MODULE_0_babylonjs___default.a.Engine(canvas, true);

// Now, call the createScene function that you just finished creating
const scene = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* createScene */])(__WEBPACK_IMPORTED_MODULE_0_babylonjs___default.a, engine, canvas);




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
        room = new __WEBPACK_IMPORTED_MODULE_2__room_js__["a" /* Room */](roomSize, scene);
    }
    /*
        // const isNode = target.nodeName === 'INPUT';
    
        if (isNode) {
            room.geometry.extend.maximum[target.name] = target.value / 2;
            room.geometry.extend.minimum[target.name] = - target.value / 2;
        }*/
});


console.log(room);

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map