import game from "index";
import PlayerActions from "./playeractions";

export default class AliveState extends PlayerActions {

    constructor(ball) {
        super();
        this.ball = ball;
    }

    die() {
        var text2 = document.createElement('div');
        text2.id = "respawnText";
        text2.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        text2.style.width = 100;
        text2.style.height = 100;
        text2.style.backgroundColor = "white";
        text2.innerHTML = "You Died!";
        text2.style.top = 200 + 'px';
        text2.style.left = 200 + 'px';
        document.body.appendChild(text2);

        var button = document.createElement('BUTTON');
        button.id = "respawnButton"
        button.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        button.style.width = 100;
        button.style.height = 100;
        button.style.backgroundColor = "white";
        button.innerHTML = "Respawn";
        button.style.top = 220 + 'px';
        button.style.left = 200 + 'px';
        document.body.appendChild(button);

        document.getElementById("respawnButton").addEventListener("click", () => {
            this.ball.currentState.respawn();
        });
    }

    respawn() {
        console.log("already alive.")
    }

    move() {
        this.ball.verticalSpeed += this.ball.gravity;
        if (this.ball.verticalSpeed > this.ball.terminalVelocity)
            this.ball.verticalSpeed = this.ball.terminalVelocity;

        this.ball.gameObject.position.y -= this.ball.verticalSpeed;
    }

    spinPlatforms() {
        if (this.ball.input.vel !== 0)
            for (let i = 0; i < game.gameInstance.platforms.length; i++) {
                var platform = game.gameInstance.platforms[i];
                //Spin the main platform
                platform.platformObject.rotation.y += this.ball.input.velocity.x;

                //Spin obsticals
                if (platform.obsticals !== undefined)
                    for (let i = 0; i < platform.obsticals.length; i++) {
                        platform.obsticals[i].rotation.y += this.ball.input.velocity.x;
                    }
            }
    }

}