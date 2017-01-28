export class Room {
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
