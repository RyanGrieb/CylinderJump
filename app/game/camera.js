import game from "index";
import * as THREE from "three";

export default class Camera {

    constructor() {
        this.camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
        this.camera.position.z = 80;
        this.camera.position.y = 40;
        this.camera.rotation.set(-0.5, 0, 0);
    }


    handleInput(velocity) {
        this.camera.position.x += velocity.x;
        this.camera.position.z += velocity.z;
        this.camera.rotation.y += velocity.rotation;
    }

}