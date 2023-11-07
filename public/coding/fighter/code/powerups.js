const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

import {Powerup} from "./classes.js"
import { player } from "./index.js"
var background = {width: 1538, height: 768}

function inRange(player, powerup){
	if (powerup.isSpawned) {
	    if (
			player.position.y + player.size.height >= powerup.position.y && player.position.y + player.size.height <= powerup.position.y + powerup.size.height && player.position.x <= powerup.position.x + powerup.size.width && player.position.x + player.size.width >= powerup.position.x ||
			player.position.x < powerup.position.x + powerup.size.width && player.position.x + player.size.width > powerup.position.x && player.position.y + player.size.height >= powerup.position.y && player.size.height <= powerup.position.y + powerup.size.height
		)
		{
			powerup.inRange = true
            player.canTake = true
		}else{
            powerup.inRange = false
            player.canTake = false
        }
	}
}

export function spawn(powerup, position) {
    if(!powerup.isSpawned){
        powerup.startPosition.x = position
        setTimeout(function(){powerup.isSpawned = true}, powerup.respawnTime * 1000)
    }
}

function pickUp(powerup, pl, en) {
    if(powerup.isPickedUp && pl.hasTaken) {
        if(pl.position.x > en.position.x){
            powerup.position.x = pl.position.x
            powerup.position.y = pl.position.y+150
        }
        if(pl.position.x <= en.position.x){
            powerup.position.x = pl.position.x+pl.size.width-powerup.size.width
            powerup.position.y = pl.position.y+150
        }
    }
}

function enemyHit(pl, powerup){
	if (powerup.isSpawned) {
	    if (
			pl.position.y + pl.size.height >= powerup.position.y && pl.position.y + pl.size.height <= powerup.position.y + powerup.size.height && pl.position.x <= powerup.position.x + powerup.size.width && pl.position.x + pl.size.width >= powerup.position.x ||
			pl.position.x < powerup.position.x + powerup.size.width && pl.position.x + pl.size.width > powerup.position.x && pl.position.y + pl.size.height >= powerup.position.y && pl.size.height <= powerup.position.y + powerup.size.height
		)
		{
			pl.inRange = true
		}else{
            pl.inRange = false
        }
	}
}

function throwAt(powerup, pl, en) {
    if(powerup.isThrown && pl.hasThrown) {
        if(pl.position.x > en.position.x){
            powerup.velocity -=  12
            powerup.position.x += powerup.velocity
        }
        if(pl.position.x <= en.position.x){
            powerup.velocity +=  12
            powerup.position.x += powerup.velocity
        }
        enemyHit(en, powerup)
    
        if(en.inRange){
            if(en.isBlocking){
                en.health -= powerup.damage/5
            }if(!en.isBlocking){
                en.health -= powerup.damage
            }
            powerup.isThrown = false
            powerup.isPickedUp = false
            powerup.isSpawned = false
            pl.hasThrown = false
		    pl.hasTaken = false
            powerup.velocity = 0
            powerup.position.y = 0; powerup.position.x = 0 
            powerup.position.y += powerup.startPosition.y; powerup.position.x += powerup.startPosition.x
        }

        if(powerup.position.x < 0 || powerup.position.x > background.width){
            powerup.isThrown = false
            powerup.isPickedUp = false
            powerup.isSpawned = false
            pl.hasThrown = false
		    pl.hasTaken = false
            powerup.velocity = 0
            powerup.position.y = 0; powerup.position.x = 0 
            powerup.position.y += powerup.startPosition.y; powerup.position.x += powerup.startPosition.x
        }
    }
    
}

//effectID 0 = health, 1 = attack, 2 = jump

function drink(powerup, pl) {
    if(powerup.isPickedUp && pl.hasTaken && powerup.isDrinked){
        if(powerup.effectID == 0){
            pl.health += powerup.effectNum
        }if(powerup.effectID == 1){
            pl.strength += powerup.effectNum
        }if(powerup.effectID == 2){
            pl.jumpHeight += powerup.effectNum
        }
        powerup.isThrown = false
        powerup.isPickedUp = false
        powerup.isSpawned = false
        powerup.isDrinked = false
        pl.hasThrown = false
		pl.hasTaken = false
        powerup.position.y = 0; powerup.position.x = 0 
        powerup.position.y += powerup.startPosition.y; powerup.position.x += powerup.startPosition.x
        if(pl.health > pl.startHealth){
            pl.health = pl.startHealth
        }
    }
}

export function checkPowerup(powerup, pl, en){
    inRange(pl, powerup)
    pickUp(powerup, pl, en)
    throwAt(powerup, pl, en)
    drink(powerup, pl)

    //console.log(powerup.isThrown)
}

