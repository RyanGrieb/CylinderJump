import * as THREE from "three";
import game from "..";

export default class Ball {

    constructor(x, y, z) {
        let bGeom = new THREE.SphereGeometry(2, 10, 30);
        let bMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        this.mesh = new THREE.Mesh(bGeom, bMaterial);
        this.mesh.position.set(x, y, z);
        game.gameInstance.scene.add(this.mesh);

        this.dead = false;

        this.currentPlatform = undefined;
        this.falling = true;
        this.gravity = 0.1;
        this.verticalSpeed = 0;
        this.terminalVelocity = 3;
    }


    checkCollision() {
        var originPoint = this.mesh.position.clone();
        for (var vertexIndex = 0; vertexIndex < this.mesh.geometry.vertices.length; vertexIndex++) {
            var localVertex = this.mesh.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(this.mesh.matrix);
            var directionVector = globalVertex.sub(this.mesh.position);

            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            var normalCollisionResults = ray.intersectObjects(game.gameInstance.collidableMeshList);
            if (normalCollisionResults.length > 0 && normalCollisionResults[0].distance < directionVector.length()) {
                this.onCollided();
            }

            var obsticalCollisionResults = ray.intersectObjects(game.gameInstance.obsticaleMeshList);
            if (obsticalCollisionResults.length > 0 && obsticalCollisionResults[0].distance < directionVector.length() && !this.dead) {
                this.onDeath();
            }
        }
    }

    onCollided() {
        this.verticalSpeed = -2;
    }

    onDeath() {
        game.gameInstance.handleDeath();
        this.dead = true;
    }

    checkPlatformPass() {
        //if ((this.currentPlatform.index + 1) < game.gameInstance.totalPlatformsMade)

        // console.log(Math.round(this.mesh.position.y) + "," + this.currentPlatform.platform.mesh.position.y)
        if (this.mesh.position.y < this.currentPlatform.platform.mesh.position.y - 5) {
            var index = this.currentPlatform.index + 1;


            //Create game method to find a platform the next level down from the origional
            this.currentPlatform = { platform: game.gameInstance.findNextPlatformFrom(this.currentPlatform.platform), index: index };
            //console.log(this.mesh.position.y + "," + this.currentPlatform.platform.mesh.position.y + "|" + this.currentPlatform.index);
            game.gameInstance.camera.moveDown();
        }
    }

    update() {
        console.log(Math.round(this.mesh.position.y));
        this.checkCollision();
        this.checkPlatformPass();

        if (this.dead)
            return;

        this.verticalSpeed += this.gravity;
        if (this.verticalSpeed > this.terminalVelocity)
            this.verticalSpeed = this.terminalVelocity;

        this.mesh.position.y -= this.verticalSpeed;

        // this.mesh.position.y = -Math.pow(this.xAxisGraphVal, 2) + (this.yAxisGraphVal);
        //this.xAxisGraphVal += 0.2;
    }
}