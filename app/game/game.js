import game from "index";
import * as THREE from "three";
import Camera from "./camera";
import Input from "./input";
import Ball from "./ball";
import Platform from "./platform";
import Cylinder from "./cylinder";

export default class Game {

    constructor() {

        this.scene = new THREE.Scene();
        //game.update = () => this.update();

        this.input = new Input();
        game.gameInstance = this;


        //Lighting
        var light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 10, 0);
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
            if (platform.mesh.position.y - this.platforms[i].mesh.position.y === 60)
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

    handlePlatformSpin(vel) {
        if (vel !== 0)
            for (let i = 0; i < this.platforms.length; i++) {
                var platform = this.platforms[i];
                //Spin the main platform
                platform.mesh.rotation.y += vel.x;

                //Spin obsticals
                if (platform.obsticals !== undefined)
                    for (let i = 0; i < platform.obsticals.length; i++) {
                        platform.obsticals[i].rotation.y += vel.x;
                    }
            }
    }

    handleDeath() {
        var text2 = document.createElement('div');
        text2.id = "respawnText";
        text2.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        text2.style.width = 100;
        text2.style.height = 100;
        text2.style.backgroundColor = "white";
        text2.innerHTML = "You Died!";
        text2.style.top = 200 + 'px';
        text2.style.left = 200 + 'px';
        document.body.appendChild(text2);

        var button = document.createElement('BUTTON');
        button.id = "respawnButton"
        button.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        button.style.width = 100;
        button.style.height = 100;
        button.style.backgroundColor = "white";
        button.innerHTML = "Respawn";
        button.style.top = 220 + 'px';
        button.style.left = 200 + 'px';
        document.body.appendChild(button);

        document.getElementById("respawnButton").addEventListener("click", () => {
            this.handleRespawn();
        });

        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].kill();
        }
        this.platforms = [];

        for (var i = 0; i < this.cylinders.length; i++) {
            this.cylinders[i].kill();
        }
        this.cylinders = [];
    }

    handleRespawn() {
        var element = document.getElementById("respawnText");
        element.parentNode.removeChild(element);

        var element = document.getElementById("respawnButton");
        element.parentNode.removeChild(element);

        this.totalPlatformsMade = 0;
        this.generatePlatforms(0, 4);
        this.camera.camera.position.y = 60;
        this.camera.targetY = this.camera.camera.position.y;
        this.ball.mesh.position.y = 25;
        this.ball.verticalSpeed = 2;
        this.ball.currentPlatform = { platform: this.platforms[0], index: 0 };

        this.cylinders.push(new Cylinder(0, 120, 0));
        this.cylinders.push(new Cylinder(0, -120, 0));
        this.ball.dead = false;
    }

    get collidableMeshList() {
        var mesh = [];
        for (var i = 0; i < this.platforms.length; i++) {
            mesh.push(this.platforms[i].mesh);
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
        if (game.gameInstance.ball.dead)
            return;

        this.input.update();
        this.camera.update();
        this.generateFuturePlatforms();

        this.ball.update();


        for (let i = 0; i < this.platforms.length; i++)
            this.platforms[i].update();
        for (let i = 0; i < this.cylinders.length; i++)
            this.cylinders[i].update();

    }
}