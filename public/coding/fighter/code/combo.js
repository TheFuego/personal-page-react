import { player, enemy, isPaused } from "./index.js";

export function combo() {
	if(!isPaused){
		if (!player.isComboMax) {
		player.comboMeter -= 1;
		} if (player.comboMeter >= 100) {
			player.isComboMax = true;
			player.comboMeter = 100;
		} if (player.comboMeter < 0) {
			player.comboMeter = 0;
		}

		if (!enemy.isComboMax) {
			enemy.comboMeter -= 1;
		} if (enemy.comboMeter >= 100) {
			enemy.isComboMax = true;
			enemy.comboMeter = 100;
		} if (enemy.comboMeter < 0) {
			enemy.comboMeter = 0;
		}
	}

	setTimeout(combo, 400)

}
