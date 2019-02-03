import * as THREE from "three";
import game from "..";

export default class Platform {

    constructor(x, y, z) {

        let bGeom = new THREE.BoxGeometry(1, 0.1, 1);
        let bMaterial = new THREE.MeshNormalMaterial();

        let mesh = new THREE.Mesh(bGeom, bMaterial);
        game.gameInstance.scene.add(mesh);
    }

}