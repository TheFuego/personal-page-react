import {Player} from "./classes.js"; 
import {Object} from "./classes.js"; 
import {Attackbox} from "./classes.js"

var background = {width: 1538, height: 768}

var player = new Player ({x: 400, y: 200}, {width: 120, height: 200}, 30, 100, 20)
var enemy = new Player ({x: 1100, y: 200}, {width: 120, height: 200}, 30, 300, 20)

var floor = new Object ({x: 0, y: 668}, {width: background.width*2, height: 100})
var platform = new Object ({x: 10, y: 500}, {width: 200, height: 60})

var attackboxPlayer = new Attackbox ({x: player.position.x, y: player.position.y}, {width: 180, height: 60}, 20)
var attackboxEnemy = new Attackbox ({x: enemy.position.x, y: enemy.position.y}, {width: 180, height: 60}, 20)

var gravityNum = 1

export function checkCollisions (player, object) {
	if (!player.isJumping && player.position.y + player.size.height >= object.position.y && player.position.y + player.size.height <= object.position.y + object.size.height && player.position.x <= object.position.x + object.size.width && player.position.x + player.size.width >= object.position.x){
		player.isColliding = true
		player.position.y = object.position.y-player.size.height
	}if (player.position.y + player.size.height < object.position.y || player.position.y + player.size.height > object.position.y + object.size.height || player.position.x > object.position.x + object.size.width || player.position.x + player.size.width < object.position.x){
		player.isColliding = false
	}
}

export function borders(player) {
	if(player.position.x < 0){
		player.position.x = 0
	}
	if(player.position.x > background.width-player.size.width){
		player.position.x = background.width-player.size.width
	}
}

export function gravity(player) {
	if (player.position.y+player.size.height < floor.position.y && !player.isJumping  && !player.isColliding) {
		player.isFalling = true
		player.velocity = player.velocity + gravityNum*player.gnum;
		player.gnum += 0.1
		player.position.y += player.velocity 
	} else {
		player.isFalling = false
	} 
	
	if(player.position.y+player.size.height > floor.position.y){
		player.position.y = floor.position.y-player.size.height
	}
	if (!player.isFalling){
		player.velocity = 0
		player.gnum = 0
	}
}

export function move(player) {
	if(player.isMovingLeft){
		player.position.x -= 6
	} 	
	if(player.isMovingRight){
		player.position.x += 6
	} 	
}

export function jump(player) {
	if (player.isJumping) {
		player.position.y -= player.tempJumpHeight
		player.tempJumpHeight -= 1
	} 
	if (player.isJumping && player.tempJumpHeight < 0.1 ) {
		player.isJumping = false
		player.isFalling = true
		player.tempJumpHeight += player.jumpHeight
	}
}

export function attackboxCalc(pl, en, Attackbox){
    if(pl.position.x < en.position.x){
        Attackbox.position.x = pl.position.x
        Attackbox.position.y = pl.position.y+95
        if(Attackbox.position.x+Attackbox.size.width > en.position.x && Attackbox.position.y < en.position.y+en.size.height && Attackbox.position.y+Attackbox.size.height > en.position.y ){
            Attackbox.isHitting = true
        }if(Attackbox.position.x+Attackbox.size.width < en.position.x || Attackbox.position.y > en.position.y+en.size.height || Attackbox.position.y+Attackbox.size.height < en.position.y ){
            Attackbox.isHitting = false
        }
    }if(pl.position.x > en.position.x){
        Attackbox.position.x = pl.position.x-pl.size.width/2
        Attackbox.position.y = pl.position.y+95
        if(Attackbox.position.x < en.position.x+en.size.width && Attackbox.position.y < en.position.y+en.size.height && Attackbox.position.y+Attackbox.size.height > en.position.y ){
            Attackbox.isHitting = true
        }if(Attackbox.position.x > en.position.x+en.size.width || Attackbox.position.y > en.position.y+en.size.height || Attackbox.position.y+Attackbox.size.height < en.position.y ){
            Attackbox.isHitting = false
        }
    }if(pl.isDucking){
		Attackbox.position.y = 580
	}
}

export function attack(pl, en, Attackbox) {
    if(pl.isAttacking && Attackbox.isHitting) {
        if(pl.isDucking && !en.isDucking || !en.isBlocking){
			en.health -= pl.strength
			if(!pl.isComboMax){
				if(pl.comboMeter > 70){	
					pl.comboMeter = 100
					pl.isComboMax = true
				}else(pl.comboMeter += 30)
			}if(!en.isComboMax){
				if(en.comboMeter < 10){
					en.comboMeter = 0
				}else(en.comboMeter -= 10)
			}
        	setTimeout(function(){ pl.isAttacking = false }, 10)
		}
		if(pl.isDucking && !en.isDucking || en.isBlocking){
			en.health -= pl.strength/5
			if(!pl.isComboMax){
				if(pl.comboMeter > 70){	
					pl.comboMeter = 100
					pl.isComboMax = true
				}else(pl.comboMeter += 5)
			}if(!en.isComboMax){
				if(en.comboMeter < 10){
					en.comboMeter = 0
				}else(en.comboMeter -= 10)
			}
        	setTimeout(function(){ pl.isAttacking = false }, 10)
		}	
    }

    if(pl.isAttacking) {
        setTimeout(function(){ pl.isAttacking = false }, 500)
    }   
}

export function block(pl) {
    if(pl.isBlocking){
        setTimeout(function(){pl.isBlocking = false }, 1000)
    }
}

export function duck(player) {
	if(player.isDucking){
		player.position.y += 110
	}
}