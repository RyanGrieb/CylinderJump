import PlayerActions from "./playeractions";
import game from "../../../..";

export default class DeadState extends PlayerActions {

    constructor(ball) {
        super();
        this.ball = ball;
    }

    die() {

    }

    respawn() {
        game.gameInstance.resetPlatforms();

        var element = document.getElementById("respawnText");
        element.parentNode.removeChild(element);

        var element = document.getElementById("respawnButton");
        element.parentNode.removeChild(element);


        game.gameInstance.camera.camera.position.y = 60;
        game.gameInstance.camera.targetY = game.gameInstance.camera.camera.position.y;
        this.ball.gameObject.position.y = 25;
        this.ball.verticalSpeed = 0;
        this.ball.currentPlatform = { platform: game.gameInstance.platforms[0], index: 0 };

        game.gameInstance.scoreText.setScore(0);

        this.ball.currentState = this.ball.aliveState;
    }

    move() {
        //console.log("can't, you're dead");
    }

    platformSpin() {
        console.log("no")
    }

}