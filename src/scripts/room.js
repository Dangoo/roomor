export class Room {
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
