import { player, enemy, camera, canvas } from "./index.js";

export function cameraRender() {
	var playerDistance = Math.abs(player.position.x - enemy.position.x) + player.size.width;

	if (player.position.x < enemy.position.x) {
		camera.position = (player.position.x + playerDistance / 2) - canvas.width / 2;
	} if (player.position.x >= enemy.position.x) {
		camera.position = (enemy.position.x + playerDistance / 2) - canvas.width / 2;
	}

	if (camera.position < camera.minPosition) { camera.position = camera.minPosition; }
	if (camera.position > camera.maxPosition) { camera.position = camera.maxPosition; }

	//console.log(playerDistance)
}
