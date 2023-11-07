import { c, canvas, player, enemy } from "./index.js";

export function healthBar() {
	c.fillStyle = 'yellow';
	c.fillRect(50, 50, canvas.width - 100, 50);
	c.fillRect(462, 35, 100, 105);
	c.fillStyle = 'gray';
	c.fillRect(472, 45, 80, 60);
	//player health bar
	c.fillRect(61, 60, 150 * (400 / 150), 30);
	//enemy health bar
	c.fillRect(562, 60, 150 * (400 / 150), 30);
	c.fillStyle = 'red';
	c.fillRect(472, 45, 80, 85);
	//player health bar
	c.fillRect(61 + 400 - player.health * (400 / player.startHealth), 60, player.health * (400 / player.startHealth), 30);
	//enemy health bar
	c.fillRect(562, 60, enemy.health * (400 / enemy.startHealth), 30);

	if (player.health < 0) {
		player.health = 0;
	} if (enemy.health < 0) {
		enemy.health = 0;
	}

	c.fillStyle = 'yellow';
	c.fillRect(150, 95, 322, 35);
	//enemy combo bar
	c.fillRect(552, 95, 322, 35);
	c.fillStyle = 'gray';
	//player combo bar
	c.fillRect(161, 100, 300, 20);
	//enemy combo bar
	c.fillRect(562, 100, 300, 20);
	c.fillStyle = 'blue';
	//player combo bar
	c.fillRect(161, 100, player.comboMeter * 3, 20);
	//enemy combo bar
	c.fillRect(562 + 300 - enemy.comboMeter * 3, 100, enemy.comboMeter * 3, 20);
}
