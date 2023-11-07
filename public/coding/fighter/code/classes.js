export class Player {
	constructor(position, size, jumpHeight, health, strength) {
		this.position = position;
		this.size = size;
		this.color = 'red';
		this.isFalling = false; this.isJumping = false;
		this.isColliding = false;
		this.velocity = 0; this.gnum = 0;
		this.isMovingLeft = false; this.isMovingRight = false;
		this.jumpHeight = jumpHeight;
		this.isAttacking = false;
		this.isBlocking = false;
		this.isDucking = false;
		this.isHolding = false;
		this.startHealth = health
		this.health = this.startHealth;
		this.tempJumpHeight = this.jumpHeight;
		this.inRange = false
		this.canTake = false
		this.hasThrown = false
		this.hasTaken = false
		this.strength = strength
		this.comboMeter = 0
		this.isComboMax = false
	}
}

export class Object {
	constructor(position, size){
		this.position = position
		this.size = size
	}
}

export class Attackbox {
	constructor(position, size, damage) {
		this.position = position;
		this.size = size;
		this.damage = damage;
		this.color = 'yellow';
		this.isHitting = false;
	}
}

export class Powerup {
	constructor(startPosition, position, size, drinkable, respawn, damage){
		this.startPosition = startPosition
		this.position = position;
		this.size = size
		this.isDrinkable = drinkable
		this.isDrinked = false
		this.inRange = false
		this.isPickedUp = false
		this.isThrown = false
		this.isSpawned = false
		this.respawnTime = respawn
		this.effectID
		this.effectNum
		this.damage = damage
		this.velocity = 0
	}
}