import * as THREE from "three";
import game from "..";

export default class Cylinder {

    constructor(x, y, z) {
        let cGeom = new THREE.CylinderGeometry(5, 5, 120, 32);
        let cMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 });;
        let cylinder = new THREE.Mesh(cGeom, cMaterial);
        cylinder.position.y = y;
        this.mesh = cylinder;
        game.gameInstance.scene.add(cylinder);
    }


    kill() {
        //Call on game method to remove cylinder.
        game.gameInstance.scene.remove(this.mesh);
    }
}