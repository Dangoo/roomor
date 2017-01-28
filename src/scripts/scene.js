// This begins the creation of a function that we will 'call' just after it's built
export function createScene (BABYLON, engine, canvas) {
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