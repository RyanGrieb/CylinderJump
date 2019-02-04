import * as THREE from "three";
import game from "..";

export default class Ball {

    constructor(x, y, z) {
        let bGeom = new THREE.SphereGeometry(3, 25, 15);
        let bMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        this.mesh = new THREE.Mesh(bGeom, bMaterial);
        this.mesh.position.set(x, y, z);
        game.gameInstance.scene.add(this.mesh);

        this.falling = true;
        this.yVelocity = -0.05;
        this.xAxisGraphVal = 0; //y=20
    }


    checkCollision() {
        var originPoint = this.mesh.position.clone();
        for (var vertexIndex = 0; vertexIndex < this.mesh.geometry.vertices.length; vertexIndex++) {
            var localVertex = this.mesh.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(this.mesh.matrix);
            var directionVector = globalVertex.sub(this.mesh.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var collisionResults1 = ray.intersectObjects(game.gameInstance.collidableMeshList);
            if (collisionResults1.length > 0 && collisionResults1[0].distance < directionVector.length() && this.falling) {
                this.onCollided();
            }
        }
    }

    onCollided() {

        this.mesh.material.color.setHex(Math.random() * 0xFFFFFF);
        this.xAxisGraphVal = -5; //y=0
        this.falling = false;
    }


    update() {
        this.checkCollision();

        if (this.xAxisGraphVal > 0)
            this.falling = true;

        //-x^2+(15)
        this.mesh.position.y = -Math.pow(this.xAxisGraphVal, 2) + 30

        this.xAxisGraphVal += 0.2;
        // if (this.falling)
        //    this.mesh.position.y -= 0.05;
        // else
        //    this.mesh.position.y += 0.05;
    }
}