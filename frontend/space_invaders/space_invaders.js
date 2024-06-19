import box from './box.js';
import bulletController from './bulletController.js';
import playerController from './playerController.js';
import opponentController from './opponentController.js';
import PlaySpaceInvaders from '../playspaceinvaders.js';
import Statistics, { currentStatisticsIndex, increaseCurrStatIndex } from '../statistics.js'

const matchesStatisticsElements = document.getElementsByClassName("statistic-butt")

const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

let statsPlayer1 = 0;
let statsPlayer2 = 0;

const spaceStats = [
	{ name: "space_invaders", value: 0 },
	{ name: "p1_hp_win", value: 0 },
	{ name: "p1_hit_taken", value: 0 },
	{ name: "p1_box_hit", value: 0 },
	{ name: "p1_box_destroyed", value: 0 },
	{ name: "p1_accuracy", value: 0 },
	{ name: "p1_bullet_total", value: 0 },

	{ name: "p2_hp_win", value: 0 },
	{ name: "p2_hit_taken", value: 0 },
	{ name: "p2_box_hit", value: 0 },
	{ name: "p2_box_destroyed", value: 0 },
	{ name: "p2_accuracy", value: 0 },
	{ name: "p2_bullet_total", value: 0 },
]

const background = new Image();
background.src = './space_invaders/images/canvas_image.jpg';


const boxes = [];
var gameOver = false;


boxes.push(new box(10, 100)); 
boxes.push(new box(10 + (60 *2), 100));
boxes.push(new box(10 + (60 *4), 100));
boxes.push(new box(10 + (60 *6), 100));
boxes.push(new box(10 + (60 *8), 100));

boxes.push(new box(10  + 60, (600 - 150))); 
boxes.push(new box(10  + (60 * 3), 600 - 150));
boxes.push(new box(10  + (60 * 5), 600 - 150));
boxes.push(new box(10  + (60 * 7), 600 - 150));

let playerBulletController = new bulletController(canvas, 10, "red", true);
let player1 = new playerController(canvas, playerBulletController);
let player2 = new opponentController(canvas, playerBulletController);

let gameInterval = null;

function incrementSpaceStat(statName) {
    const stat = spaceStats.find(s => s.name === statName);
    if (stat) {
        stat.value++;
    } else {
        console.error(`Stat with name "${statName}" not found.`);
    }
}

function setSpaceStat(statName, value) {
    const stat = spaceStats.find(s => s.name === statName);
    if (stat) {
        stat.value = value;
    } else {
        console.error(`Stat with name "${statName}" not found.`);
    }
}

function restartGame() {
	gameOver = false;
    playerBulletController = new bulletController(canvas, 10, "red", true);
    player1 = new playerController(canvas, playerBulletController)
    player2 = new opponentController(canvas, playerBulletController);


	boxes.push(new box(10, 100)); 
	boxes.push(new box(10 + (60 *2), 100));
	boxes.push(new box(10 + (60 *4), 100));
	boxes.push(new box(10 + (60 *6), 100));
	boxes.push(new box(10 + (60 *8), 100));

	boxes.push(new box(10  + 60, (600 - 150))); 
	boxes.push(new box(10  + (60 * 3), 600 - 150));
	boxes.push(new box(10  + (60 * 5), 600 - 150));
	boxes.push(new box(10  + (60 * 7), 600 - 150));
}

export function game(){

    if(window.AppData.user.user.friends[0])
        player2.name = window.AppData.user.user.friends[0].username;

	if (!gameOver && (window.location.pathname === "/ft_transcendence/space")) 
	{
		if (gameInterval === null)
			gameInterval = setInterval(game, 1000 / 60)

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
		boxes.forEach(box => {
            box.draw(ctx);
        });
        
        player1.draw(ctx);
        player2.draw(ctx); 
        playerBulletController.draw(ctx);
        boxGetHitByPlayer();
        boxGetHitByOpponent();
        displayNames();
        statsPlayer1 = ((player1.bulletOnPlayer + player1.bulletOnBox) / player1.bulletController.bulletCount) * 100;
        statsPlayer2 =  ((player2.bulletOnPlayer + player2.bulletOnBox) / player2.bulletController.bulletCount) * 100;
        player2.bulletController.bullets.forEach((bullet, index) => {
            if (
                bullet.x > player1.player.x &&
                bullet.x < player1.player.x + player1.player.width &&
                 bullet.y > player1.player.y &&
                 bullet.y < player1.player.y + player1.player.height
            ) {
				// aggiungere modo tenere conto hit prese dal player per statistiche giocatore STEPIS
				incrementSpaceStat("p1_hit_taken");
                player2.bulletOnPlayer++;
                player2.bulletController.bullets.splice(index, 1);
                player1.player.health--;
                if(player1.player.health <= 0)
				{
					setSpaceStat("p2_hp_win", player2.opponent.health);
					window.AppData.user.user.spaceInvadersLosses++;
					window.AppData.user.user.spaceInvadersGamesPlayed++;
					if(player2.name != "Opponent")
						window.AppData.tournamentStats = [{username: player2.name, stats: [1, 1, 0, 0]}]
					player1.bulletController.bullets.splice(0, player1.bulletController.bullets.length)
					player2.bulletController.bullets.splice(0, player2.bulletController.bullets.length)
					boxes.splice(0, boxes.length);
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
					endGame();

					// show the match history button
					console.log("quii");
					matchesStatisticsElements[currentStatisticsIndex].textContent = window.AppData.user.user.username + " won!";
					increaseCurrStatIndex();

					// update insights
					setSpaceStat("p1_bullet_total", Math.ceil(player1.bulletController.bulletCount / 10));
					setSpaceStat("p2_bullet_total", Math.ceil(player2.bulletController.bulletCount / 10));
					setSpaceStat("p1_accuracy", Math.floor(statsPlayer1));
					setSpaceStat("p2_accuracy", Math.floor(statsPlayer2));
					console.log("space stats updated!");
					Statistics.stats = spaceStats;

					ctx.fillText(window.AppData.user.user.username + " ha vinto", 150 , 200);
					gameOver = true;
				}
            }
        });
        player1.bulletController.bullets.forEach((bullet, index) => {
            if (
                bullet.x > player2.opponent.x &&
                bullet.x < player2.opponent.x + player2.opponent.width &&
                 bullet.y > player2.opponent.y &&
                 bullet.y < player2.opponent.y + player2.opponent.height
            ) {
				// aggiungere modo tenere conto hit prese dal player per statistiche giocatore STEPIS
				incrementSpaceStat("p2_hit_taken");
                player1.bulletOnPlayer++;
                player1.bulletController.bullets.splice(index, 1);
                player2.opponent.health--;
                if(player2.opponent.health <= 0)
                    {
						setSpaceStat("p1_hp_win", player1.player.health);
						if(player2.name != "Opponent")
                        	window.AppData.tournamentStats = [{username: player2.name, stats: [1, 0, 1, 0]}]
                        window.AppData.user.user.spaceInvadersWins++;
                        window.AppData.user.user.spaceInvadersGamesPlayed++;
                        player1.bulletController.bullets.splice(0, player1.bulletController.bullets.length)
                        player2.bulletController.bullets.splice(0, player2.bulletController.bullets.length)
                        boxes.splice(0, boxes.length);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        endGame();

						// show the match history button
						console.log("quii");
						matchesStatisticsElements[currentStatisticsIndex].textContent = window.AppData.user.user.username + " won!";
						increaseCurrStatIndex();

						// update insights
						setSpaceStat("p1_bullet_total", player1.bulletController.bulletCount);
						setSpaceStat("p2_bullet_total", player1.bulletController.bulletCount);
						setSpaceStat("p1_accuracy", Math.floor(statsPlayer1));
						setSpaceStat("p2_accuracy", Math.floor(statsPlayer2));
						Statistics.stats = spaceStats;

                        ctx.fillText(window.AppData.user.user.username + " ha vinto", 150 , 200);
                        gameOver = true;
				}
            }
        });
    } 
	else 
	{
            if(window.location.pathname === "/ft_transcendence/space")
                PlaySpaceInvaders.mostraMenu();
            restartGame();
            clearInterval(gameInterval);
            gameInterval = null;
        // Ritardo di 2 secondi (2000 millisecondi)
    }
}

function boxGetHitByPlayer() {
    // Per ogni box
    player1.bulletController.bullets.forEach((bullet, index) => {
        // Per ogni bullet
        boxes.forEach((box, index2) => {
            // Controlla se le coordinate del bullet corrispondono a quelle del box
            if (
                bullet.x > box.x &&
                bullet.x < box.x + box.width &&
                bullet.y > box.y &&
                bullet.y < box.y + box.height
            ) {
                player1.bulletController.bullets.splice(index, 1);
                boxes[index2].health--;
				// aggiungere modo tenere conto hit del player1 contro le box per statistiche giocatore STEPIS
				incrementSpaceStat("p1_box_hit");
                player1.bulletOnBox++
                if(boxes[index2].health <= 0){
					incrementSpaceStat("p1_box_destroyed");
                    boxes.splice(index2, 1);
                }   
            }
        });
    });
}

function boxGetHitByOpponent() {
    // Per ogni box
    player2.bulletController.bullets.forEach((bullet, index) => {
        // Per ogni bullet
        boxes.forEach((box, index2) => {
            // Controlla se le coordinate del bullet corrispondono a quelle del box
            if (
                bullet.x > box.x &&
                bullet.x < box.x + box.width &&
                bullet.y > box.y &&
                bullet.y < box.y + box.height
            ) {
                player2.bulletController.bullets.splice(index, 1);
                boxes[index2].health--;
				// aggiungere modo tenere conto hit del player2 contro le box per statistiche giocatore STEPIS
				incrementSpaceStat("p2_box_hit");
                player2.bulletOnBox++;
                if(boxes[index2].health <= 0){
					incrementSpaceStat("p2_box_destroyed");
                    boxes.splice(index2, 1);
                }
            }
        });
    });
}

function endGame() {
    ctx.textAlign = "left"; // Imposta il testo centrato rispetto all'asse x
    ctx.textBaseline = "middle"; // Imposta il testo centrato rispetto all'asse y
    ctx.fillStyle = "white";
    ctx.font = "48px 'Press Start 2P'";
    PlaySpaceInvaders.update_spaceinvaders_stats();
    
}

function displayNames() {
	const userName = window.AppData.user.user.username;
	const opponentName = player2.name;
	const displayTextPlayer1 = `${userName} (${statsPlayer1.toFixed(2)}%)`;
	const displayTextPlayer2 = `${opponentName} (${statsPlayer2.toFixed(2)}%)`;

	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "white";
	ctx.font = "14px 'Press Start 2P'";
	ctx.fillText(displayTextPlayer2, 50, 60);
	ctx.fillText(displayTextPlayer1, 50, 540);
}

export function quit_space(){
    menu.style.display = 'none';
    navbar.style.display = 'block';
    player1.bulletController.bullets.splice(0, player1.bulletController.bullets.length)
    player2.bulletController.bullets.splice(0, player2.bulletController.bullets.length)
    boxes.splice(0, boxes.length);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restartGame();
    clearInterval(gameInterval);
    gameInterval = null;
}