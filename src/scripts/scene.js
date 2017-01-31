// This begins the creation of a function that we will 'call' just after it's built
export function createScene(canvas, engine) {
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