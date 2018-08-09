/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = importMesh;
function importMesh(name, scene, config) {
    BABYLON.SceneLoader.ImportMesh(
        name,
        config.path,
        config.fileName,
        scene,
        function (meshes) {
            const mesh = meshes[0];
            const bbox = mesh.getBoundingInfo().boundingBox;

            mesh.material = new BABYLON.StandardMaterial("Material." + name, scene);
            mesh.position = new BABYLON.Vector3(
                config.position.x || 0,
                config.position.y || .005,
                config.position.z || 0
            );
            mesh.checkCollisions = true;
            mesh.applyGravity = true;
            mesh.ellipsoid = new BABYLON.Vector3(
                (bbox.maximum.x - bbox.minimum.x) * mesh.scaling.x * .5,
                .01,
                (bbox.maximum.z - bbox.minimum.z) * mesh.scaling.z * .5
            );

            config.shadowGenerator.getShadowMap().renderList.push(mesh);
        }
    );
}

/***/ }),
/* 1 */
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

        this.roomLight = new BABYLON.PointLight("roomLight", new BABYLON.Vector3(0, 2.5, 0), scene);
        this.roomLight.diffuse = new BABYLON.Color3(1, .945, .878);
        this.roomLight.intensity = 0.5;

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

        const verticesCount = room.getTotalVertices();

        room.isPickable = false;
        room.checkCollisions = true;
        room.subMeshes=[];

        room.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 0, 30, room));
        room.subMeshes.push(new BABYLON.SubMesh(0, 5, verticesCount, 30, 6, room));

        const roomMaterial = new BABYLON.MultiMaterial('roomMaterial', scene);
        const floorMaterial = new BABYLON.StandardMaterial("floorMaterial", scene);
        floorMaterial.specularPower = 10;
        floorMaterial.diffuseTexture = new BABYLON.Texture('./lib/floor.jpg', scene);
        floorMaterial.diffuseTexture.uScale = 4;
        floorMaterial.diffuseTexture.vScale = 4;

        const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
        wallMaterial.specularPower = 10;

        roomMaterial.subMaterials.push(floorMaterial);
        roomMaterial.subMaterials.push(wallMaterial);

        room.material = roomMaterial;

        return room;
    }

    remove() {
        this.roomLight.dispose();
        return this.room.dispose();
    }

    update(size) {
        const adjustGroundHeight = 0.001;

        if (this.room) {
            this.room.dispose();
        }

        this.size = Object.assign(this.size, size);
        this.room = this.createRoom(this.size, this.scene);

        // Move the room upward 1/2 its height
        this.room.position.y = (this.size.height / 2) + adjustGroundHeight;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Room;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createScene;
// This begins the creation of a function that we will 'call' just after it's built
function createScene(canvas, engine) {
    // Now create a basic Babylon Scene object 
    const scene = new BABYLON.Scene(engine);
    // Enable Collisions
    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

    const backgroundColor = new BABYLON.Color3(.95, .95, .95);
    // Change the scene background color to green.
    scene.clearColor = backgroundColor;

    // This creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    const skyLight = new BABYLON.HemisphericLight("skyLight", new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount
    skyLight.intensity = .5;

    // Create grid ground material
    const gridMaterial = new BABYLON.GridMaterial("gridMaterial", scene);
    gridMaterial.gridRatio = 0.1;
    gridMaterial.mainColor = new BABYLON.Color3(.8, .8, .8);
    gridMaterial.lineColor = new BABYLON.Color3(.8, .8, .8);
    gridMaterial.opacity = .99;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    const ground = BABYLON.Mesh.CreateGround("worldGrid", 25, 25, 0, scene);
    ground.material = gridMaterial;
    ground.isPickable = false;

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = backgroundColor;

    // Enable moving of elements
    var startingPoint;
    var currentMesh;

    var getGroundPosition = function () {
        // Use a predicate to get position on the ground
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }

        return null;
    }

    var onPointerDown = function (evt) {
        if (evt.button !== 0) {
            return;
        }

        // check if we are under a mesh
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY);

        if (pickInfo.hit) {
            currentMesh = pickInfo.pickedMesh;

            //currentMesh.enableEdgesRendering(.9999);
            currentMesh.edgesWidth = 3;
            currentMesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);

            startingPoint = getGroundPosition(evt);

            if (startingPoint) { // we need to disconnect camera from canvas
                setTimeout(function () {
                    camera.detachControl(canvas);
                }, 0);
            }
        }
    }

    var onPointerUp = function () {
        if (startingPoint) {
            camera.attachControl(canvas, true);
            startingPoint = null;
            //currentMesh.disableEdgesRendering();
            currentMesh = null;
            return;
        }
    }

    var onPointerMove = function (evt) {
        if (!startingPoint) {
            return;
        }

        var current = getGroundPosition(evt);

        if (!current) {
            return;
        }

        var diff = current.subtract(startingPoint);
        currentMesh.moveWithCollisions(diff);

        startingPoint = current;

    }

    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointermove", onPointerMove);
    }

    return scene;
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = BABYLON;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babylonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babylonjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babylonjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__room_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__importMesh_js__ = __webpack_require__(0);





// Get the canvas element from our HTML above
const canvas = document.getElementById("renderCanvas");
// Load the BABYLON 3D engine
const engine = new __WEBPACK_IMPORTED_MODULE_0_babylonjs___default.a.Engine(canvas, true);
// Now, call the createScene function that you just finished creating
const scene = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* createScene */])(canvas, engine);

function roomComplete(room) {
    // Shadow
    const shadowGenerator = new __WEBPACK_IMPORTED_MODULE_0_babylonjs___default.a.ShadowGenerator(1024, room.roomLight);
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

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__importMesh_js__["a" /* importMesh */])('model', scene, paxConfig);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__importMesh_js__["a" /* importMesh */])('strandmon', scene, strandmonConfig);
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
        room = new __WEBPACK_IMPORTED_MODULE_2__room_js__["a" /* Room */](roomSize, scene);
    }

    room.room.receiveShadows = true;

    roomComplete(room);
});

console.log(scene);

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map