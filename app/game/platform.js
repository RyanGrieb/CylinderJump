import * as THREE from "three";
import game from "..";

export default class Platform {

    constructor(id, x, y, z) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;

        var rndRadType = Math.floor((Math.random() * 4));
        //console.log(rndRadType);

        this.createBasePlatform();
        if (this.id !== 0)
            this.addObsticals();
    }

    createBasePlatform() {
        let bGeom = new THREE.CylinderGeometry(18, 18, 4, 32, 1, false, 0, Math.PI * 1.7);

        let bMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
        // let bMaterial = new THREE.MeshBasicMaterial({ color: Math.random()*0xFFFFFF});
        bMaterial.side = THREE.DoubleSide;

        this.mesh = new THREE.Mesh(bGeom, bMaterial);
        //this.mesh.rotation.y = (Math.random() * (Math.PI * 2 - 0 + 1) + 0); //6.28319 is 360 in radians.
        this.mesh.position.set(this.x, this.y, this.z);
        game.gameInstance.scene.add(this.mesh);
    }

    addObsticals() {
        this.obsticals = [];
        let bGeom = new THREE.CylinderGeometry(18.1, 18.1, 5, 32, 1, false, 0, Math.PI * 0.15);
        let bMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        bMaterial.side = THREE.DoubleSide;

        for (var i = 0; i < 2; i++) {
            var mesh = new THREE.Mesh(bGeom, bMaterial);
            mesh.position.set(this.x, this.y, this.z);//(Math.random() * (Math.PI * 1.7 - (Math.PI * 0.3) + 1) + (Math.PI * 0.3));
            mesh.rotation.y = Math.random() * ((Math.PI * 1.55 + this.mesh.rotation.y) - this.mesh.rotation.y) + this.mesh.rotation.y;
            this.obsticals.push(mesh);
            game.gameInstance.scene.add(mesh);
        }
    }

    removeIfOutsideScreen() {
        if (game.gameInstance.camera.camera.position.y - this.mesh.position.y <= 0) {
            this.kill();
            game.gameInstance.removePlatform(this);
        }
    }

    kill() {
        game.gameInstance.scene.remove(this.mesh);

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