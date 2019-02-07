import * as THREE from "three";
import game from "index";

export default class GameObject extends THREE.Mesh {

    constructor(geometry, color, x, y, z) {

        var material = new THREE.MeshPhongMaterial({ color: color });
        material.side = THREE.DoubleSide;

        super(geometry, material);

        this.position.set(x, y, z);
        //this.castShadow = true;
        //this.receiveShadow = true;

        game.gameInstance.scene.add(this);
    }

    isColliding(meshList) {
        //Attempt 1
        var originPoint = this.position.clone();
        for (var vertexIndex = 0; vertexIndex < this.geometry.vertices.length; vertexIndex++) {
            var localVertex = this.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(this.matrix);
            var directionVector = globalVertex.sub(this.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var normalCollisionResults = ray.intersectObjects(meshList);
            if (normalCollisionResults.length > 0 && normalCollisionResults[0].distance < directionVector.length())
                return true;
        }
        return false;
    }

}