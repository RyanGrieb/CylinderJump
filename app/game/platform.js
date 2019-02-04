import * as THREE from "three";
import game from "..";

export default class Platform {

    constructor(x, y, z) {

        let bGeom = new THREE.CylinderGeometry(18, 18, 4, 32, 1, false, 0, Math.PI * 1.7);
        let bMaterial = new THREE.MeshBasicMaterial({ color: 0xFF4500 }); 
        bMaterial.side = THREE.DoubleSide;

        this.mesh = new THREE.Mesh(bGeom, bMaterial);
        game.gameInstance.scene.add(this.mesh);
    }

}