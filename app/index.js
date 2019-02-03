import 'styles/index.scss';
import * as THREE from "three";
import Game from './game/game';


var game = {};
var camera, scene, renderer;
var geometry, material, mesh;
export default game;

init();
animate();

function init() {
    new Game();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}
//test
function animate() {

    requestAnimationFrame(animate);

    //mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;
    renderer.render(game.gameInstance.scene, game.gameInstance.camera.camera);
    game.gameInstance.update();
}