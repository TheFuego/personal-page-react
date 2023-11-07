export const canvas = document.querySelector('canvas')
export const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

var time = 120
export var isPaused = false
var gameOver = false
var gameStatusString = ""

function timer() {
	setTimeout(timer, 1000)
	if(time > 0) {
		if(!isPaused){time --}
		document.querySelector('#time').innerHTML = time
	}
}

var background = {width: 1538, height: 768}

export var camera = { 
	position: (background.width - canvas.width) / 2,
	minPosition: 0, maxPosition: (background.width - canvas.width),
	zoom: 1,
	offset: (background.height-canvas.height)/40
}

import { cameraRender } from "./cameraRender.js"
import {Player} from "./classes.js"; 
import {Object} from "./classes.js"; 
import {Attackbox} from "./classes.js"
import {Powerup} from "./classes.js"
import { combo } from "./combo.js"
import {controlsOne} from "./controls.js"
import {controlsTwo} from "./controls.js"

export var player = new Player ({x: 400, y: 200}, {width: 210, height: 350}, 20, 150, 20)
export var enemy = new Player ({x: 1100, y: 200}, {width: 210, height: 350}, 25, 150, 20)
player.color = 'blue'

var floor = new Object ({x: 0, y: 668}, {width: background.width*2, height: 100})
var platform = new Object ({x: 10, y: 500}, {width: 200, height: 60})
var bench = new Object ({x: 640, y: 560}, {width: 360, height: 40})

var attackboxPlayer = new Attackbox ({x: player.position.x, y: player.position.y}, {width: 320, height: 80}, 20)
var attackboxEnemy = new Attackbox ({x: enemy.position.x, y: enemy.position.y}, {width: 320, height: 80}, 20)

export var bottle = new Powerup ({x: bottleNum(), y: 593}, {x: 300, y: 593}, {width: 45, height: 75}, true, 6, 30)
bottle.effectID = 0
bottle.effectNum = 50

function bottleNum() {
	return Math.round(Math.random() * background.width)
}

function bg() {
	c.fillStyle = 'aqua'
	c.fillRect(0, 0, background.width, background.height)
}

function pause() {
	c.fillStyle = 'rgb(255, 255, 255, 0.5)'
	c.fillRect(0, 0, background.width, background.height)
}

function drawPlayer(player) {
	c.fillStyle = player.color
	c.fillRect(player.position.x-camera.position, player.position.y, player.size.width*camera.zoom, player.size.height*camera.zoom)
}

function drawPowerup(powerup){
    if (powerup.isSpawned){
		c.fillStyle = 'green';
		c.fillRect(powerup.position.x-camera.position, powerup.position.y, powerup.size.width, powerup.size.height)
	}
}

function drawObject(object) {
	c.fillStyle = 'black'
	c.fillRect(object.position.x-camera.position, object.position.y, object.size.width*camera.zoom, object.size.height*camera.zoom)
}

function gameStatus() {
	if(!gameOver && isPaused){
		gameStatusString = "PAUSED"
	}
	if(time <= 0 || player.health <= 0 || enemy.health <= 0){
		//isPaused = true
		gameOver = true
	}
	if(player.health <= 0){
		gameStatusString = "PLAYER 2 WINS"
	}
	if(enemy.health <= 0){
		gameStatusString = "PLAYER 1 WINS"
	}if(time <= 0){
		if(player.health > enemy.health){
			gameStatusString = "PLAYER 1 WINS"
		}
		if(enemy.health > player.health){
			gameStatusString = "PLAYER 2 WINS"
		}if(enemy.health == player.health){
			gameStatusString = "TIE"
		}
	}
	if(!gameOver && !isPaused){
		gameStatusString = ""
	}
	document.querySelector('#gameStatus').innerHTML = gameStatusString
}

import {checkCollisions, duck} from "./gameFunctions.js"
import {borders} from "./gameFunctions.js"
import {gravity} from "./gameFunctions.js"
import {move} from "./gameFunctions.js"
import {jump} from "./gameFunctions.js"
import {attackboxCalc} from "./gameFunctions.js"
import {attack} from "./gameFunctions.js"
import {healthBar} from "./healthBar.js"

import {checkPowerup} from "./powerups.js"
import {spawn} from "./powerups.js"

timer()
combo()

function update() {
	borders(player); borders(enemy) 
	if(!isPaused){
		gravity(player); gravity(enemy)
		jump(player); jump(enemy);
		move(player); move(enemy)
		if(!bottle.isSpawned){spawn(bottle, bottleNum())}
		if(bottle.isSpawned){checkPowerup(bottle, player, enemy)}
		if(bottle.isSpawned){checkPowerup(bottle, enemy, player)}
	}
	
	//checkCollisions(player, platform); checkCollisions(enemy, platform)
	checkCollisions(player, bench); checkCollisions(enemy, bench)
	attackboxCalc(player, enemy, attackboxPlayer); attackboxCalc(enemy, player, attackboxEnemy)
	attack(player, enemy, attackboxPlayer); attack(enemy, player, attackboxEnemy)
	duck(player); duck(enemy)
	gameStatus()
	
}

function render() {
	cameraRender()
	bg()
	drawPlayer(player); drawPlayer(enemy)
	drawObject(floor); /*drawObject(platform);*/ drawObject(bench)
	if(player.isAttacking){drawPlayer(attackboxPlayer)}; if(enemy.isAttacking){drawPlayer(attackboxEnemy)}
	drawPowerup(bottle)
	healthBar()
	if(isPaused || gameOver){
		pause()
	}
}

controlsOne(player)      
controlsTwo(enemy)                                   

window.addEventListener("keydown", event => {
	switch (event.key) {
		case 'p':
			if (!isPaused) { isPaused = true; }
		break;
		case 'o':
			if (isPaused) { isPaused = false; }
		break;
	}
})

function main() {
	requestAnimationFrame(main)
	c.clearRect(0, 0, canvas.width, canvas.height)
	
	update()
	render()

	console.log(player.isJumping)
}

main()