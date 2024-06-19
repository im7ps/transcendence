// PLAY BONG

import * as GAME from './pong/Pong.js';
import Model from './model.js';

function init(type)
{
	var isTourn = true 
	if (type == "pong")
		isTourn = false
	Model.game.game.style.display = "flex";
	const game = document.getElementById("bong");
	document.getElementById("userDetails").style.display = 'none'
	
	if (isTourn == true) {
		GAME.hideUI()
		GAME.startAsTurnament(window.AppData.tournamentPlayerList)
	} else {
		GAME.showUI()
		GAME.setPlayerName(window.AppData.user.user.username)
		document.getElementById("gameTitle").textContent = 'Trascendence Pong 3D'
	}
	GAME.handleResize()
	game.appendChild(GAME.renderer.domElement);
	if (isTourn == true)
		GAME.startTurnament()
}

const PlayBong = 
{
	init: init,
};

export default PlayBong;
