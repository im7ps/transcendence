// GAME

import { BALL_WIDTH, BALL_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, OFFSET, BACKGROUND_COLOR, PLAYER_COLOR, BALL_COLOR } from './constants.js';

const canvas = document.getElementById("canvas_pong_2D");
canvas.context = canvas.getContext("2d");
canvas.context.font = '500px Arial';
canvas.context.fillStyle = 'black';

let interval = "";
canvas.height = 580;
canvas.width = 800;

const play_again = document.getElementById("play_again_2D");
play_again.addEventListener("click", () => {init_2D()})


const Game =
{	
	players: [],
	player_active: 0,
	middle: canvas.width / 2,
	init_2D: init_2D,
	start_game: start_game,
};

Game.Player = class {
	constructor(id, width, height, pos_x, pos_y, score)
	{
		this.id = id;
		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.width = width;
		this.height = height;
		this.speed = 30;
		this.score = 0;
		this.angle = 0;
		this.score = score;
	}
}

Game.Ball = class {
	constructor(width, height, pos_x, pos_y, dir_y, speed, dir)
	{
		this.pos_x = pos_x;
		this.pos_y = pos_y;
		this.dir_y = dir_y
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.dir = dir;
	}
}


Game.ball = new Game.Ball(BALL_WIDTH, BALL_HEIGHT, canvas.width/2, canvas.height/2, 0, 10, 1)
Game.players.push(new Game.Player(0, PLAYER_WIDTH, PLAYER_HEIGHT, OFFSET, canvas.height / 2 - PLAYER_HEIGHT / 2, 0));
Game.players.push(new Game.Player(1, PLAYER_WIDTH, PLAYER_HEIGHT, (canvas.width - PLAYER_WIDTH) - OFFSET, canvas.height / 2 - PLAYER_HEIGHT / 2, 0));


function check_collisions()
{		
	const dir = Game.ball.dir;
	const players = Game.players;

	if (dir == 1 && (Game.ball.pos_y < players[1].pos_y || Game.ball.pos_y > players[1].pos_y + players[1].height))
	{
		return false;
	}
	else if (dir == -1 && (Game.ball.pos_y < players[0].pos_y || Game.ball.pos_y > players[0].pos_y + players[0].height))
	{
		return false;
	}
	return true;
}
	
function reset_game() {
	clearInterval(interval);
	console.log("Resetting game...");

	
	if (Game.players[Game.player_active].score != 3)
	{
		// console.log("uuu")
		canvas.context.fillStyle = BACKGROUND_COLOR;
		canvas.context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.context.fillRect(0, 0, canvas.width, canvas.height);
	
		// Game.ball = new Game.Ball(BALL_WIDTH, BALL_HEIGHT, canvas.width/2, canvas.height/2, 0, 10, 1)
		Game.ball.pos_x = canvas.width/2;
		Game.ball.pos_y = canvas.height/2
		Game.ball.dir_y = 0
		Game.ball.speed = 10
		Game.ball.dir = 1
		canvas.context.fillRect(Game.ball.pos_x, Game.ball.pos_y, Game.ball.width, Game.ball.height);
	
		Game.players[1].pos_x = (canvas.width - PLAYER_WIDTH) - OFFSET
		Game.players[1].pos_y = canvas.height / 2 - PLAYER_HEIGHT / 2
	
		Game.players[0].pos_x = OFFSET
		Game.players[0].pos_y = canvas.height / 2 - PLAYER_HEIGHT / 2
	
		canvas.context.fillStyle = PLAYER_COLOR;
		canvas.context.fillRect(Game.players[0].pos_x, Game.players[0].pos_y, Game.players[0].width, Game.players[0].height);
		canvas.context.fillRect(Game.players[1].pos_x, Game.players[1].pos_y, Game.players[1].width, Game.players[1].height);
	
		interval = setInterval(game_loop, 1000/30);
	}
	else if (Game.players[Game.player_active].score == 3)
	{
		document.getElementById("play_again_2D").style.display = "flex";
		canvas.context.fillStyle = BACKGROUND_COLOR;
		canvas.context.fillRect(canvas.width/2, 20, 50, 30);
		canvas.context.fillStyle = 'black';
		canvas.context.fillText(Game.players[0].score, canvas.width / 2 + 10, 30);
		canvas.context.fillText(Game.players[1].score, canvas.width / 2 + 30, 30);

		Game.players[0].score = 0;
		Game.players[1].score = 0;
		interval = "";
	}
}
	
function calc_angle(ball_y, paddle_bottom, paddle_top)
{
	const section_num = 5
	const section_lenght = (paddle_top - paddle_bottom) / section_num
	const middle = paddle_top - ((paddle_top - paddle_bottom) / 2)
	let angle = 0
	
	
	let i = 1;
	while (i < section_num + 3) // +3 per i bordi e il bordo estremo,
	{
		if (ball_y < middle + (i * (section_lenght / 2)) && ball_y > middle - (i * (section_lenght / 2)))
		{
			angle = (90 / i) // -1 per non avere angoli di 90° che buggano la palla
			if (ball_y < middle)
				Game.ball.dir_y = -1
			else
				Game.ball.dir_y = 1
			return angle
		}
		i++
	}
	return -1;
}

function game_loop()
{
	let players = Game.players;
	canvas.context.fillText(players[0].score, canvas.width / 2 + 10, 30);
	canvas.context.fillText(players[1].score, canvas.width / 2 + 30, 30);

	canvas.context.fillStyle = BACKGROUND_COLOR;
	canvas.context.fillRect(Game.ball.pos_x, Game.ball.pos_y, Game.ball.width, Game.ball.height);

	if (Game.ball.pos_x > players[1].pos_x - players[1].width - 1 || Game.ball.pos_x < players[0].pos_x + players[0].width + 1)
	{
		if (Game.ball.pos_x > Game.middle)
			Game.player_active = 1
		else
			Game.player_active = 0

		if (check_collisions())
		{
			players[0].angle = 90 - calc_angle(Game.ball.pos_y, players[Game.player_active].pos_y, players[Game.player_active].pos_y + players[Game.player_active].height);
			Game.ball.dir *= -1
		}
		else
		{
			Game.players[Game.player_active].score++;
			reset_game();
		}
	}
	else if (Game.ball.pos_y < 0 || Game.ball.pos_y > canvas.height)
	{
		Game.ball.dir_y *= -1
	}

	Game.ball.pos_x += Game.ball.speed * Game.ball.dir;
	Game.ball.pos_y = Game.ball.pos_y + (players[0].angle / 15) * Game.ball.dir_y

	canvas.context.fillStyle = BALL_COLOR;
	canvas.context.fillRect(Game.ball.pos_x, Game.ball.pos_y, Game.ball.width, Game.ball.height);

}

function init_canvas()
{
	canvas.context.fillStyle = BACKGROUND_COLOR;
	canvas.context.clearRect(0, 0, canvas.width, canvas.height);
	canvas.context.fillRect(0, 0, canvas.width, canvas.height);
}

function init_ball()
{

	Game.ball.pos_x = canvas.width/2;
	Game.ball.pos_y = canvas.height/2
	Game.ball.dir_y = 0
	Game.ball.speed = 10
	Game.ball.dir = 1

	canvas.context.fillStyle = BALL_COLOR;
	canvas.context.fillRect(Game.ball.pos_x, Game.ball.pos_y, Game.ball.width, Game.ball.height);
}

function init_players()
{
	Game.players[1].pos_x = (canvas.width - PLAYER_WIDTH) - OFFSET
	Game.players[1].pos_y = canvas.height / 2 - PLAYER_HEIGHT / 2

	Game.players[0].pos_x = OFFSET
	Game.players[0].pos_y = canvas.height / 2 - PLAYER_HEIGHT / 2

	// Game.players[0].score = 0;
	// Game.players[1].score = 0;

	canvas.context.fillStyle = PLAYER_COLOR;
	canvas.context.fillRect(Game.players[0].pos_x, Game.players[0].pos_y, Game.players[0].width, Game.players[0].height);
	canvas.context.fillRect(Game.players[1].pos_x, Game.players[1].pos_y, Game.players[1].width, Game.players[1].height);
}

function update_player(player, dir)
{
	canvas.context.fillStyle = BACKGROUND_COLOR;
	canvas.context.fillRect(player.pos_x, player.pos_y, player.width, player.height);

	player.pos_y += 10 * dir;
	canvas.context.fillStyle = PLAYER_COLOR;
	canvas.context.fillRect(player.pos_x, player.pos_y, player.width, player.height);
}

window.addEventListener("keydown", (event) => {
	if (window.location.pathname === "/ft_transcendence/chat")
	{
		event.preventDefault();

		switch (event.code) {
			case "ArrowUp":
				update_player(Game.players[0], -1);
				break;
			case "ArrowDown":
				update_player(Game.players[0], 1);
				break;
			case "KeyS":
				update_player(Game.players[1], 1);
				break;
			case "KeyW":
				update_player(Game.players[1], -1);
				break;
			}
		}
	}
);

function start_game()
{
	play_again.style.display = "none";
	canvas.context.fillStyle = 'black';
	if (Game.players)
	{
		Game.players[0].score = 0;
		Game.players[1].score = 0;
	}
	canvas.context.fillText(Game.players[0].score, canvas.width / 2 + 10, 30);
	canvas.context.fillText(Game.players[1].score, canvas.width / 2 + 30, 30);
	if (canvas.getContext)
	{
		init_canvas();
		init_ball();
		init_players();
	}
	else
	{
		console.log("Canvas not supported on this browser.\n");
	}

}

export function init_2D()
{
	if (canvas) {
		start_game();
		if (interval == "")
			interval = setInterval(game_loop, 1000/30); //30 frame per second
	}
}

export default Game;