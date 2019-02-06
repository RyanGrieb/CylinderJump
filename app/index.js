import 'styles/index.scss';
import * as THREE from "three";
import Game from './game/game';


var game = {};
var camera, scene, renderer;
var geometry, material, mesh;
export default game;


//Fps limiter varaibles
let clock = new THREE.Clock();
let delta = 0;
let interval = 1 / 60;

init();
animate();

function init() {
    new Game();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;
    renderer.render(game.gameInstance.scene, game.gameInstance.camera.camera);

    delta += clock.getDelta();
    if (delta > interval) {
        game.gameInstance.update();
        delta = delta % interval;
    }
}