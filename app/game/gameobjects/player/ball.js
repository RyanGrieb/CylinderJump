import * as THREE from "three";
import game from "index";
import GameObject from "../gameobject";
import AliveState from "./states/alivestate";
import DeadState from "./states/deadstate";
import Input from "../../input";

export default class Ball {

    constructor(x, y, z) {
        //Input
        this.input = new Input();

        //Define states
        this.aliveState = new AliveState(this);
        this.deadState = new DeadState(this);
        this.currentState = this.aliveState;

        this.gameObject = new GameObject(new THREE.SphereGeometry(2, 10, 30), 0xff0000, x, y, z);

        this.currentPlatform = undefined;
        this.falling = true;
        this.gravity = 0.1;
        this.verticalSpeed = 0;
        this.terminalVelocity = 3;
    }


    checkCollision() {

        if (this.gameObject.isColliding(game.gameInstance.obsticaleMeshList)) {
            this.onDeath();
        }

        if (this.gameObject.isColliding(game.gameInstance.collidableMeshList)) {
            this.onCollided();
        }
    }

    onCollided() {
        this.verticalSpeed = -2;
    }

    onDeath() {
        this.gameObject.position.y = (this.currentPlatform.platform.platformObject.position.y + 4);
        this.currentState.die();
        this.currentState = this.deadState;
    }

    checkPlatformPass() {
        //if ((this.currentPlatform.index + 1) < game.gameInstance.totalPlatformsMade)

        // console.log(Math.round(this.gameObject.position.y) + "," + this.currentPlatform.platform.mesh.position.y)
        if (this.gameObject.position.y < this.currentPlatform.platform.platformObject.position.y - 5) {
            var index = this.currentPlatform.index + 1;


            //Create game method to find a platform the next level down from the origional
            this.currentPlatform = { platform: game.gameInstance.findNextPlatformFrom(this.currentPlatform.platform), index: index };
            //console.log(this.gameObject.position.y + "," + this.currentPlatform.platform.mesh.position.y + "|" + this.currentPlatform.index);
            game.gameInstance.camera.moveDown();
            game.gameInstance.scoreText.setScore(game.gameInstance.scoreText.score + 10);
        }
    }

    update() {
        this.input.update();

        this.checkCollision();
        this.checkPlatformPass();

        //Move & spin platforms
        this.currentState.move();
        this.currentState.spinPlatforms();
    }
}