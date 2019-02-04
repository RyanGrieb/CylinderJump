import game from "..";

export default class Input {

    constructor() {
        this.defineKeys();

        this.heldKeys = [];
        this.velocity = { x: 0, z: 0, rotation: 0 };
    }

    handleInput() {
        for (var i = 0; i < this.heldKeys.length; i++) {
            if (this.heldKeys[i] === "a") {
                this.velocity.x = -0.15;
            }
            if (this.heldKeys[i] === "d") {
                this.velocity.x = 0.15;
            }
            if (this.heldKeys[i] === "w") {
                this.velocity.z = -0.5;
            }
            if (this.heldKeys[i] === "s") {
                this.velocity.z = 0.5;
            }

            if (this.heldKeys[i] === "q") {
                this.velocity.rotation = 0.05;
            }
            if (this.heldKeys[i] === "e") {
                this.velocity.rotation = -0.05;
            }
        }
    }

    defineKeys() {
        document.onkeypress = (e) => {
            if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "q" || e.key === "e") {
                if (!this.heldKeys.includes(e.key))
                    this.heldKeys.push(e.key);
            }
        };

        document.onkeyup = (e) => {
            if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.key === "q" || e.key === "e") {

                if (e.key === "w" || e.key === "s")
                    this.velocity.z = 0;

                if (e.key === "a" || e.key === "d")
                    this.velocity.x = 0;

                if (e.key === "q" || e.key === "e")
                    this.velocity.rotation = 0;

                this.removeKey(e.key);
            }
        }
    }

    get getHeldKey() {
        return this.heldKeys[this.heldKeys.length - 1];
    }

    removeKey(key) {
        for (var i = 0; i < this.heldKeys.length; i++)
            if (this.heldKeys[i] === key)
                this.heldKeys.splice(i, 1);
    }

    update() {
        this.handleInput();
        game.gameInstance.handlePlatformSpin(this.velocity);
    }
}