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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export importMesh */
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
/* unused harmony export Room */



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createScene;
// This begins the creation of a function that we will 'call' just after it's built
function createScene(engine) {
    // Now create a basic Babylon Scene object 
    const scene = new THREE.Scene();
    // Enable Collisions
    /*
    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    */

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    const backgroundColor = new THREE.Color(.95, .95, .95);
    // Change the scene background color to green.  
    scene.background = backgroundColor;

    /*
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

    */
    scene.fog = new THREE.FogExp2(backgroundColor);

    return {
        scene: scene,
        camera: camera
    };
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_three___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_three__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scene_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__room_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__importMesh_js__ = __webpack_require__(0);





// Get the canvas element from our HTML above
const canvas = document.getElementById("renderCanvas");
console.log(__WEBPACK_IMPORTED_MODULE_0_three__);
// Load the THREE 3D engine
const engine = new __WEBPACK_IMPORTED_MODULE_0_three__["WebGLRenderer"]({ canvas: canvas });
// Now, call the createScene function that you just finished creating
const scene = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scene_js__["a" /* createScene */])(engine);

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

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map