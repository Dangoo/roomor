export function importMesh(name, scene, config) {
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