import * as THREE from './node_modules/three/src/Three.js'
import { RoundedBoxGeometry } from './node_modules/three/examples/jsm/Addons.js'
import Ball from './src/Ball.js'
import Paddle from './src/Paddle.js'
import AiController from './src/AiController.js'
import lights from './src/Lights.js'

import { currentStatisticsIndex, increaseCurrStatIndex } from '../statistics.js'
import { shuffle, getCurrentPageFromURL } from '../utils.js'
import update_pong_stats from '../pongUtils.js'
import Model from '../model.js'
import Statistics from '../statistics.js'

/**
 * globals
 */

var playerList = []
var dataToExport = []
const bongStats = [
	{ name: "bong", value: 0 },
	{ name: "ball_bounces", value: 0},
	
	{ name: "p1_gol", value: 0 },
	{ name: "p1_gol_taken", value: 0 },
	{ name: "p1_distance", value: 0},

	{ name: "p2_gol", value: 0 },
	{ name: "p2_gol_taken", value: 0 },
	{ name: "p2_distance", value: 0},
]

const sessionData = {
	winsp1: 0,
	winsp2: 0,
	ties: 0,
	played: 0,
}


const scores = {
	player1 : 0,
	player2 : 0
}

export const ss = document.getElementById("score")
ss.style.display = 'none'

const gameCntnr = document.getElementById("game")
const BtnVsAi = document.getElementById("gameButton1")
const BtnVsG2 = document.getElementById("gameButton2")
const BtnQuit = document.getElementById("gameButton3")
const gameInfo = document.getElementById("gameTitle")

const matchesStatisticsElements = document.getElementsByClassName("statistic-butt")

var player1Name = 'G1';
var player2Name = 'G2';

var playerMoveUp = false
var playerMoveDown = false
var player2MoveUp = false
var player2MoveDown = false

export const STATE = {
	START: 0,
	PLAY : 1,
	STOP : 2,
	TOURNAMENT: 3,
	STARTING: 4,
}

let currentState = STATE.START

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * World
 */
const boundaries = new THREE.Vector2(10, 16)

const boundGeometry = new RoundedBoxGeometry(1, 2, boundaries.y * 2, 20, 20)
const boundMaterial = new THREE.MeshStandardMaterial({
	color : 0x808080,
	emissive : 0xffffff
})

var leftBound = null
var rightBound = null
var ground = null

/**
 * Actors
 */

var player1 = null
var player2 = null
var ball = null
var controller = null;
var userInstance1 = null;
var userInstance2 = null;

/**
 * render sizes
 */
const sizes = {
	width: gameCntnr.clientWidth,
	height: gameCntnr.clientHeight,
}
/**
 * Camera
 */
const fov = 60
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, 0.1)
camera.position.set(14, 20, 0)
// camera.rotateOnAxis("y", Math.PI/2)
// camera.rotateY(-Math.PI * 0.5)
// scene.rotateY(-Math.PI * 0.5)
camera.lookAt(new THREE.Vector3(0, 0, 0))
// camera.lookAt(new THREE.Vector3(6, 2, 0))

/**
 * Show the axes of coordinates system
 */
/* const axesHelper = new THREE.AxesHelper(3)
* scene.add(axesHelper)
*/
/**
 * renderer
 */
export const renderer = new THREE.WebGLRenderer({
	antialias: window.devicePixelRatio < 2,
	logarithmicDepthBuffer: true,
})

// renderer.shadowMap.enabled = true
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1.2
// renderer.shadowMap.type = THREE.VSMShadowMap

/**
 * OrbitControls
*/
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

var isTurnament = false

/**
 * Three js Clock
 */
const clock = new THREE.Clock()
var timeEnd = 0
var timeStarting = 0
var timeLeft = '0'

function setBongStat(statName, value) {
    const stat = bongStats.find(s => s.name === statName);
    if (stat) {
        stat.value = value;
    } else {
        console.error(`Stat with name "${statName}" not found.`);
    }
}

/**
 * frame loop
*/
function run() {
	/**
	 * tempo trascorso dal frame precedente
	*/
	const deltaTime = clock.getDelta()
	/**
	 * tempo totale trascorso dall'inizio
	*/
	const time = clock.getElapsedTime()
	
	
	switch (currentState) {
		case STATE.PLAY :
			timeLeft = (60 - (time - timeStarting) + 0.5).toFixed(0).toString()
			updateHtmlScores()
			if (scores.player1 == 3 || scores.player2 == 3
				|| (time - timeStarting >= 60) ) {
					currentState = STATE.STOP
			}
			const ballDt = deltaTime / 5
			for (let i = 0; i < 5; i++) {
				ball.update(ballDt)
			}
			// player movements
			// 1
			if (playerMoveUp == true) {
				player1.velocity.x = -1
			} else if (playerMoveDown == true) {
				player1.velocity.x = 1	
			} else {
				player1.velocity.x = 0
			}
			player1.update(deltaTime)
			// 2
			if (player2.cpu == false) {
				if (player2MoveUp == true) {
					player2.velocity.x = -1
				} else if (player2MoveDown == true) {
					player2.velocity.x = 1	
				} else {
					player2.velocity.x = 0
				}
				player2.update(deltaTime)
			} else {
				const aiRefresh = 1
				if (time - timeEnd >= aiRefresh) {
					controller.setTarget()
					timeEnd = time
				}
				controller.update(deltaTime)
			}
			
			// bounds effects
			if (leftBound.material.emissiveIntensity > 0)
				leftBound.material.emissiveIntensity = THREE.MathUtils.lerp(leftBound.material.emissiveIntensity, 0, 0.1)
			if (rightBound.material.emissiveIntensity > 0)
				rightBound.material.emissiveIntensity = THREE.MathUtils.lerp(rightBound.material.emissiveIntensity, 0, 0.1)
			renderer.render(scene, camera)
			requestAnimationFrame(run)
			break;
		case STATE.START:
			currentState = STATE.STARTING
			timeStarting = time
			gameInfo.style.display = 'block'
			renderer.render(scene, camera)
			requestAnimationFrame(run)
			break;
		case STATE.STOP:
			var winner = userInstance1
			if (scores.player1 < scores.player2) {
				winner = userInstance2
				if (userInstance2 != undefined ) { 
					if ('stats' in userInstance2) {
						userInstance2.stats[1] += 1
						if ('stats' in userInstance1)
							userInstance1.stats[2] += 1;
						else userInstance1.pongLosses += 1
					}
					else {
						userInstance2.pongWins += 1
					}
				}
				else if (scores.player1 == scores.player2) {
					if ('pongTies' in userInstance1)
						userInstance1.pongTies += 1
					else
						userInstance1.stats[3] += 1
					if (userInstance2 != undefined) {
						if ('stats' in userInstance2)
							userInstance2.stats[3] += 1
						else userInstance2.pongTies += 1
					}
				}
			} else {
				if ('stats' in userInstance1) {
					userInstance1.stats[1] += 1
					if ('stats' in userInstance2)
						userInstance2.stats[2] += 1;
					else userInstance2.pongLosses += 1
				}
				else	
					userInstance1.pongWins += 1
			}
			if ('pongGamesPlayed' in userInstance1)
				userInstance1.pongGamesPlayed += 1
			else
				userInstance1.stats[0] += 1
			if (userInstance2 != undefined && 'stats' in userInstance2)
				userInstance2.stats[0] += 1
			
			matchesStatisticsElements[currentStatisticsIndex].textContent = player1Name + '  ' + scores.player1.toString() + ' - ' + scores.player2.toString() + '  ' + player2Name
			increaseCurrStatIndex()
			
			if (isTurnament == true) {
				playerList.unshift(winner)
				if (winner == userInstance1) {
					if (userInstance2 != window.AppData.user.user && ! 'dummy' in userInstance2 )
						dataToExport.push(userInstance2)
				}
				else {
					if (userInstance1 != window.AppData.user.user)
						dataToExport.push(userInstance1)
				}
				currentState = STATE.TOURNAMENT
			}


			gameInfo.textContent = winner.username + ' wins!!!'

			setBongStat("p1_gol", scores.player1);
			setBongStat("p2_gol", scores.player2);

			setBongStat("p1_gol_taken", scores.player2);
			setBongStat("p2_gol_taken", scores.player1);

			setBongStat("p1_distance", player1.distance);
			setBongStat("p2_distance", player2.distance);

			Statistics.bongStats = bongStats;
			console.log(scores.player1);
			console.log(scores.player2);

			Object.keys(scores).forEach(key => scores[key] = 0)
			controller = null
			if (isTurnament == false) {
				showUI()
			} else {
				gameInfo.style.display = 'block'
			}
			if (isTurnament == true) {
				if (playerList.length <= 1) {
					isTurnament = false
					if (window.AppData.user.user != winner && ! 'dummy' in winner)
						dataToExport.push(winner)
					window.AppData.tournamentStats = dataToExport
					BtnQuit.style.display = 'block'
					} else requestAnimationFrame(run)
			}
			update_pong_stats()

			break;
		case STATE.TOURNAMENT:
			clearScene()
			userInstance1 = playerList.pop()
			if (userInstance1.alias != undefined)
				player1Name = userInstance1.alias
			else
				player1Name = userInstance1.username
			userInstance2 = playerList.pop()
			if (userInstance2 == undefined) {
				populateGame({username : 'Bot', stats:[0,0,0,0], dummy:true})
			} else {
				controller = null
				console.log(userInstance2)
				if (userInstance2.alias != undefined)
					player2Name = userInstance2.alias
				else
					player2Name = userInstance2.username
				populateGame(userInstance2)
			}
			Object.keys(scores).forEach(key => scores[key] = 0)
			currentState = STATE.START
			requestAnimationFrame(run)
			break;
		case STATE.STARTING:
			gameInfo.textContent = (3 - (time - timeStarting)).toFixed(0).toString()
			if (time - timeStarting >= 3) {
				currentState = STATE.PLAY
				hideUI()
				updateHtmlScores()
				timeStarting = time
			}
			requestAnimationFrame(run)
			break;
	}
	
}

/*
 interface functions
*/

export function hideUI() {
	BtnVsAi.style.display = 'none'
	BtnVsG2.style.display = 'none'
	BtnQuit.style.display = 'none'
	gameInfo.style.display = 'none'
}

export function showUI() {
	BtnVsAi.style.display = 'block'
	BtnVsG2.style.display = 'block'
	BtnQuit.style.display = 'block'
	gameInfo.style.display = 'block'
}

export function setPlayerName(name) {
	player1Name = name
}

export function handleResize() {
	sizes.width = gameCntnr.clientWidth
	sizes.height = gameCntnr.clientHeight
	
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	
	renderer.setSize(sizes.width, sizes.height)
	
	const pixelRatio = Math.min(window.devicePixelRatio, 2)
	renderer.setPixelRatio(pixelRatio)
	renderer.render(scene, camera)
}

function updateHtmlScores() {
	if (currentState === STATE.PLAY) {
		if (ss.style.display === 'none')
			ss.style.display = 'flex'
		if (ss)
			ss.textContent = player1Name + '  ' + scores.player1.toString() + ' - ' + timeLeft + ' -  ' + scores.player2.toString() + '  ' + player2Name
	} else if (ss.style.display === 'flex')
		ss.style.display = 'none'
}

/*
initialization functions 
*/

export function defineGround() {
	const groundMaterial = new THREE.MeshStandardMaterial({ 
		color: 0x0a0a0a,
		//wireframe: true
	})
	const groundGeometry = new THREE.PlaneGeometry(boundaries.x * 10, boundaries.y * 10,
		boundaries.x * 2, boundaries.y * 2)
	groundGeometry.rotateX(-Math.PI * 0.5)
	ground = new THREE.Mesh(groundGeometry, groundMaterial)
	ground.position.set(0, -1, 0)
	ground.castShadow = false
	ground.receiveShadow = true

	scene.add(ground)
	renderer.render(scene, camera)
}

function initElements() {
	// world
	defineGround()
	// players
	player1 = new Paddle(scene, new THREE.Vector3(0, 0, boundaries.y - 2), boundaries);
	player2 = new Paddle(scene, new THREE.Vector3(0, 0, 2 - boundaries.y), boundaries);
	// boundaries mesh
	leftBound =  new THREE.Mesh(boundGeometry.clone(), boundMaterial.clone())
	leftBound.position.copy(new THREE.Vector3((boundaries.x + 0.5), 0, 0))
	leftBound.castShadow = true
	leftBound.receiveShadow = true
	rightBound = new THREE.Mesh(boundGeometry.clone(), boundMaterial.clone())
	rightBound.position.copy(new THREE.Vector3(-(boundaries.x + 0.5), 0, 0))
	rightBound.castShadow = true
	rightBound.receiveShadow = true
	// ball
	ball = new Ball(scene, boundaries, [player1, player2]);
	
	// scene components
	scene.background = new THREE.Color(0x202020)
	// scene.fog = new THREE.Fog(0xcc920a, 10, 100)
	scene.add(...lights)
	const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
	// const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5)
	// directionalLight.position.set(3, 10, 7)
	// scene.add(ambientLight, directionalLight)
	scene.add(ambientLight)
	
	// event listeners	
	ball.addEventListener('goal', (e) => {
		scores[e.message] += 1
		updateHtmlScores()
	})

	ball.addEventListener('wallbounce', (e) => {
		if (e.message == 'up') {
			leftBound.material.emissiveIntensity = 10
		} else {
			rightBound.material.emissiveIntensity = 10
		}
	})
}

function populateGame(opponentType) {
	initElements()
	scene.add(leftBound)
	scene.add(rightBound)
	scene.add(player1.mesh)
	scene.add(player2.mesh)
	if ('Bot' == opponentType.username) {
		controller = new AiController(scene, player2, ball)
	}
	userInstance2 = opponentType
	player2Name = opponentType.username
	scene.add(ball.mesh)
}

export function startTurnament() {
	requestAnimationFrame(run)
}

function populatePlayerList(pL) {
	playerList = []
	if (!pL) {
		history.pushState("", {}, "/ft_transcendence/userDetails");
		window.dispatchEvent(new PopStateEvent('popstate', { state: { page: getCurrentPageFromURL() } }));
	}
	pL.map(user => (
		playerList.push(
			{
				username: user.username,
				alias: user.alias,
				stats: [0, 0, 0, 0] // [pongGamesPlayed, pongWins, pongLosses, pongTie]
			}
		)))
}

export function startAsTurnament(pL) {
	playerList = []
	isTurnament = true
	currentState = STATE.TOURNAMENT
	populatePlayerList(pL)
	playerList = playerList.concat([window.AppData.user.user])
	console.log(playerList)
	if (playerList.length == 1) {
		currentState = STATE.START
		populateGame({username : 'Bot', stats: [0,0,0,0], dummy:true})
	} 
	shuffle(playerList)
}

/**
 * Event listeners
 */

window.addEventListener('keydown', function(event) { 
	if (event.code == "KeyW")
		playerMoveUp = true
	if (event.code == "KeyS")
		playerMoveDown = true;
	if (event.code == "ArrowDown")
		player2MoveDown = true
	if (event.code == "ArrowUp")
		player2MoveUp = true
})

window.addEventListener('keyup', function(event) { 
	if (event.code == "KeyW")
		playerMoveUp = false;
	if (event.code == "KeyS")
		playerMoveDown = false;
	if (event.code == "ArrowDown")
		player2MoveDown = false
	if (event.code == "ArrowUp")
		player2MoveUp = false
})

BtnVsAi.addEventListener('click', () => {
	currentState = STATE.START
	hideUI()
	scene.clear()
	userInstance1 = window.AppData.user.user
	populateGame({username: 'Bot', stats: [0, 0, 0, 0], dummy : true})
	updateHtmlScores()
	requestAnimationFrame(run)
})

BtnVsG2.addEventListener('click', () => {
	currentState = STATE.START
	hideUI()
	scene.clear()
	userInstance1 = window.AppData.user.user
	populatePlayerList(userInstance1.friends)
	userInstance2 = playerList.pop()
	if (userInstance2 != undefined)
		populateGame(userInstance2)
	else 
		populateGame({username: 'G2', stats: [0, 0, 0, 0], dummy : true})
	updateHtmlScores()
	requestAnimationFrame(run)
})

function clearScene() {
	scene.clear()
	renderer.render(scene, camera)
}

export function quit_bong()
{
	window.AppData.tournamentPlayerList = [];
	hideUI()
	updateHtmlScores()
	clearScene()
	Object.keys(sessionData).forEach(key => sessionData[key] = 0)
	currentState = STATE.STOP
}

BtnQuit.addEventListener('click', () => {
	quit_bong();

	history.pushState("", {}, "/ft_transcendence/userDetails");
	Model.bong.bong.style.display = "none";
	window.dispatchEvent(new PopStateEvent('popstate', { state: { page: getCurrentPageFromURL() } }));

})

window.addEventListener('resize', handleResize)