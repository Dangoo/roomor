// This begins the creation of a function that we will 'call' just after it's built
export function createScene(engine) {
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