import game from "index";
import * as THREE from "three";
import Camera from "./camera";
import Input from "./input";
import Cylinder from "./gameobjects/world/cylinder";
import ScoreText from "./ui/scoretext";
import Platform from "./gameobjects/world/platform";
import Ball from "./gameobjects/player/ball";

export default class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x00112d);

        game.gameInstance = this;


        //Lighting
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(0, 100, 100);
        //light.rotation.z = 100;
        light.castShadow = true;            // default false

        this.scene.add(light);

        //Create test platform
        this.cylinders = [];
        this.cylinders.push(new Cylinder(0, 120, 0));
        this.cylinders.push(new Cylinder(0, -120, 0));

        this.totalPlatformsMade = 0;
        this.platforms = [];
        this.ball = new Ball(0, 25, 10);
        this.camera = new Camera();
        this.scoreText = new ScoreText();

        this.generatePlatforms(0, 4);
        this.ball.currentPlatform = { platform: this.platforms[0], index: 0 };

        //console.log(this.platforms[1].mesh.position.y);
    }

    generatePlatforms(startingY, amount) {
        for (let i = 0; i < amount; i++) {
            this.platforms.push(new Platform(this.totalPlatformsMade, 0, startingY + (i * (-60)), 0));
            this.totalPlatformsMade++;
        }
    }

    generateFuturePlatforms() {
        //3 == last platform
        if (this.ball.currentPlatform.index >= (this.totalPlatformsMade - 2)) {
            this.generatePlatforms(-60 * (this.totalPlatformsMade), 2);
            this.cylinders.push(new Cylinder(0, -60 * (this.totalPlatformsMade), 0));
        }
    }

    findNextPlatformFrom(platform) {
        for (let i = 0; i < this.platforms.length; i++) {
            if (platform.platformObject.position.y - this.platforms[i].platformObject.position.y === 60)
                return this.platforms[i];
        }
    }

    removePlatform(platform) {
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i] === platform)
                this.platforms.splice(i, 1);
        }
    }

    removeCylinder(cylinder) {
        for (let i = 0; i < this.cylinders.length; i++) {
            if (this.cylinders[i] === cylinder)
                this.cylinders.splice(i, 1);
        }
    }

    handleRespawn() {

    }

    resetPlatforms() {
        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].kill();
        }
        this.platforms = [];

        for (var i = 0; i < this.cylinders.length; i++) {
            this.cylinders[i].kill();
        }
        this.cylinders = [];

        this.totalPlatformsMade = 0;
        this.generatePlatforms(0, 4);
        this.cylinders.push(new Cylinder(0, 120, 0));
        this.cylinders.push(new Cylinder(0, -120, 0));
    }

    get collidableMeshList() {
        var mesh = [];
        for (var i = 0; i < this.platforms.length; i++) {
            mesh.push(this.platforms[i].platformObject);
        }
        return mesh;
    }

    get obsticaleMeshList() {
        var mesh = [];
        for (let i = 0; i < this.platforms.length; i++) {

            if (this.platforms[i].obsticals !== undefined)
                for (let f = 0; f < this.platforms[i].obsticals.length; f++)
                    mesh.push(this.platforms[i].obsticals[f]);
        }
        return mesh;
    }

    update() {

        this.camera.update();
        this.generateFuturePlatforms();

        this.ball.update();


        for (let i = 0; i < this.platforms.length; i++)
            this.platforms[i].update();
        for (let i = 0; i < this.cylinders.length; i++)
            this.cylinders[i].update();

    }
}