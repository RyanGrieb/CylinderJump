import game from "index";
import * as THREE from "three";

export default class Camera {

    constructor() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 1.5;
        this.camera.position.y = 1;
        this.camera.rotation.set(-0.5, 0, 0);
    }


    handleInput(velocity) {
        this.camera.position.x += velocity.x;
        this.camera.position.z += velocity.z;
        this.camera.rotation.y += velocity.rotation;
    }

}