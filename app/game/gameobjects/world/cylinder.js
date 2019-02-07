import * as THREE from "three";
import game from "index";
import GameObject from "../gameobject";


export default class Cylinder {

    constructor(x, y, z) {
        this.gameObject = new GameObject(new THREE.CylinderGeometry(5, 5, 240, 32), 0xD3D3D3, x, y, z);
    }

    removeIfOutsideScreen() {
        if (this.gameObject.position.y - game.gameInstance.ball.gameObject.position.y > 240) {
            game.gameInstance.removeCylinder(this);
            this.kill();
        }
    }

    kill() {
        //Call on game method to remove cylinder.
        game.gameInstance.scene.remove(this.gameObject);
    }

    update() {
        this.removeIfOutsideScreen();
    }
}