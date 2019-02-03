import * as THREE from "three";
import game from "..";

export default class Ball {

    constructor(x, y, z) {
        let bGeom = new THREE.SphereGeometry(0.1, 0.1, 0.1);
        let bMaterial = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(bGeom, bMaterial);
        this.mesh.position.set(x, y, z);
        game.gameInstance.scene.add(this.mesh);
    }

}