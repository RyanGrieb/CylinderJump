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


        //Lighting
        var light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 10, 0);
        light.castShadow = true;            // default false
        this.scene.add(light);


        //Create test platform

        let cGeom = new THREE.CylinderGeometry(5, 5, 1000, 32);
        let cMaterial = new THREE.MeshBasicMaterial({ color: 0xD3D3D3 });;
        let cylinder = new THREE.Mesh(cGeom, cMaterial);
        cylinder.position.y = 0.5;
        this.scene.add(cylinder);

        this.platforms = [];
        this.ball = new Ball(0, 25, 10);
        this.platforms[0] = new Platform(0, 0, 0);
    }

    handlePlatformSpin(vel) {
        for (var i = 0; i < this.platforms.length; i++)
            this.platforms[i].mesh.rotation.y += vel.x;
    }

    get collidableMeshList() {
        var mesh = [];
        for (var i = 0; i < this.platforms.length; i++) {
            mesh.push(this.platforms[i].mesh);
        }
        return mesh;
    }

    update() {
        this.input.update();

        this.ball.update();
    }
}