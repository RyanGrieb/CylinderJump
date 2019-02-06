import game from "index";
import * as THREE from "three";

export default class Camera {

    constructor() {
        this.camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
        this.camera.position.z = 150;
        this.camera.position.y = 60;
        this.camera.rotation.set(-0.5, 0, 0);

        this.targetY = this.camera.position.y;
    }

    moveDown() {
        this.targetY = this.camera.position.y - 60;
    }

    shiftDown() {
        if (this.camera.position.y > this.targetY) {
            if (game.gameInstance.ball.verticalSpeed > 0)
                this.camera.position.y -= game.gameInstance.ball.verticalSpeed;
            else {
                if (this.camera.position.y - game.gameInstance.ball.terminalVelocity < this.targetY)
                    this.camera.position.y = this.targetY;
                else
                    this.camera.position.y -= game.gameInstance.ball.terminalVelocity;
            }
        }
    }

    handleInput(velocity) {
        this.camera.position.x += velocity.x;
        this.camera.position.z += velocity.z;
        this.camera.rotation.y += velocity.rotation;
    }

    update() {
        this.shiftDown();
    }
}