import game from "index";
import * as THREE from "three";
import Camera from "./camera";
import Input from "./input";
import Ball from "./ball";
import Platform from "./platform";

export default class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new Camera();
        //game.update = () => this.update();

        this.input = new Input();
        game.gameInstance = this;

        //Create test platform

        let cGeom = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
        let cMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        let cylinder = new THREE.Mesh(cGeom, cMaterial);
        cylinder.position.y = 0.5;
        this.scene.add(cylinder);

        this.platforms = [];
        this.ball = new Ball(0, 0.5, 0.25);
        this.platforms[0] = new Platform(0, 0, 0);
    }

    handlePlatformSpin() {
        
    }

    update() {
        this.input.update();
    }
}