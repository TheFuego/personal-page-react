import { isPaused, player, bottle, enemy } from "./index.js";

//player controls
export function controlsOne(player) {
	window.addEventListener("keydown", event => {
		switch (event.key) {
			case 'w':
				if (!isPaused) {
					if (!player.isFalling) {
						player.isJumping = true;
					}
				}
				break;
			case 'd':
				if (!isPaused) { player.isMovingRight = true; }
				break;
			case 'a':
				if (!isPaused) { player.isMovingLeft = true; }
				break;
			case 'e':
				if (!isPaused) {
					if (!player.isBlocking && !player.hasTaken) {
						player.isAttacking = true;
					}
				}
				break;
			case 'q':
				if (!isPaused) {
					if (!player.isAttacking) {
						player.isBlocking = true;
					}
				}
				break
			case 's':
					if (!isPaused) {
						if(!player.isFalling && !player.isJumping){
								player.isDucking = true;
							if (player.canTake) {
								bottle.isPickedUp = true;
								player.hasTaken = true
							}
						}
						
					}
				break;
			case 'r':
				if (!isPaused) {
					if (bottle.isPickedUp && player.hasTaken) {
						bottle.isThrown = true;
						player.hasThrown = true
					}
				}
				break;
			case 'f':
				if (!isPaused) {
					if (bottle.isPickedUp && bottle.isDrinkable && player.hasTaken) {
						bottle.isDrinked = true;
					}
				}
				break;
		}
	});

	window.addEventListener("keyup", event => {
		switch (event.key) {
			case 'd':
				player.isMovingRight = false;
				break;
			case 'a':
				player.isMovingLeft = false;
				break;
			case 'q':
				player.isBlocking = false;
				break;
			case 's':
				player.isDucking = false;
				break;
		}
	});

}

export function controlsTwo(player) {
	window.addEventListener("keydown", event => {
		switch (event.key) {
			case 'ArrowUp':
				if (!isPaused) {
					if (!player.isFalling) {
						player.isJumping = true;
					}
				}
				break;
			case 'ArrowRight':
				if (!isPaused) { player.isMovingRight = true; }
				break;
			case 'ArrowLeft':
				if (!isPaused) { player.isMovingLeft = true; }
				break;
			case 'PageDown':
				if (!isPaused) {
					if (!player.isBlocking && !player.hasTaken) {
						player.isAttacking = true;
					}
				}
				break;
			case 'End':
				if (!isPaused) {
					if (!player.isAttacking) {
						player.isBlocking = true;
					}
				}
				break
			case 'ArrowDown':
				if (!isPaused) {
					if(!player.isFalling && !player.isJumping){
							player.isDucking = true;
						if (player.canTake) {
							bottle.isPickedUp = true;
							player.hasTaken = true
						}
					}
					
				}
				break;
			case 'Home':
				if (!isPaused) {
					if (bottle.isPickedUp && player.hasTaken) {
						bottle.isThrown = true;
						player.hasThrown = true
					}
				}
				break;
			case 'PageUp':
				if (!isPaused) {
					if (bottle.isPickedUp && bottle.isDrinkable && player.hasTaken) {
						bottle.isDrinked = true;
					}
				}
				break;
		}
	});

	window.addEventListener("keyup", event => {
		switch (event.key) {
			case 'ArrowRight':
				player.isMovingRight = false;
				break;
			case 'ArrowLeft':
				player.isMovingLeft = false;
				break;
			case 'End':
				player.isBlocking = false;
				break;
			case 'ArrowDown':
				player.isDucking = false;
				break;
		}
	});

}
