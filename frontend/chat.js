// CHAT

// import Model from './model.js';
import {init_2D} from './pong2D.js'

function init()
{
	// Model.navbar.navbar.style.display = "flex";
	console.log("Chat initialized!");
	const pong = document.getElementById("canvas_pong_2D");
	pong.style.display = 'flex';
	init_2D()

}

const Chat = 
{
	init: init,
};

export default Chat;