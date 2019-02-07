import * as THREE from "three";
import game from "index";
import GameObject from "../gameobject";

export default class Platform {

    constructor(id, x, y, z) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;

        this.randomColor = Math.random() * 0xFFFFFF;
        //console.log(rndRadType);

        this.createBasePlatform();
        if (this.id !== 0)
            this.addObsticals();
    }

    createBasePlatform() {
        this.platformObject = new GameObject(
            new THREE.CylinderGeometry(18, 18, 4, 32, 1, false, 0, Math.PI * 1.7),
            this.randomColor, this.x, this.y, this.z);
        this.platformObject.rotation.y = (Math.random() * (Math.PI * 2 - 0 + 1) + 0);
    }

    addObsticals() {
        this.obsticals = [];

        for (var i = 0; i < 2; i++) {

            var obsticalObj = new GameObject(
                new THREE.CylinderGeometry(18.1, 18.1, 4.1, 32, 1, false, 0, Math.PI * 0.15),
                0xffffff ^ this.randomColor, this.x, this.y, this.z);
            obsticalObj.rotation.y = Math.random() *
                ((Math.PI * 1.55 + this.platformObject.rotation.y) - this.platformObject.rotation.y) + this.platformObject.rotation.y;

            this.obsticals.push(obsticalObj);
        }
    }

    removeIfOutsideScreen() {
        if (game.gameInstance.camera.camera.position.y - this.platformObject.position.y <= 0) {
            this.kill();
            game.gameInstance.removePlatform(this);
        }
    }

    kill() {
        game.gameInstance.scene.remove(this.platformObject);

        //Remove obsticals
        if (this.obsticals !== undefined)
            for (var i = 0; i < this.obsticals.length; i++) {
                game.gameInstance.scene.remove(this.obsticals[i]);
            }
    }

    update() {
        this.removeIfOutsideScreen();
    }
}