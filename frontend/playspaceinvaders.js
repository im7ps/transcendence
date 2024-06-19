//import Router from './router.js';
import { game, quit_space } from './space_invaders/space_invaders.js';
import { getCsrfToken } from './utils.js';
import { getCurrentPageFromURL } from '../utils.js'
import Model from './model.js';

export function mostraMenu() {
    const menu = document.getElementById('menu');
    const startButton = document.getElementById('start-game');
    const exitButton = document.getElementById('exit-game');
	const navbar = document.getElementById('navbar')

    menu.style.display = 'block';
	navbar.style.display = 'none';


    startButton.addEventListener('click', () => {
        menu.style.display = 'none';
        game();
    });

    exitButton.addEventListener('click', () => {
        //menu.style.display = 'none';
		//userDetails.userDetails.style.display = 'flex';
		
		
		window.dispatchEvent(new PopStateEvent('popstate', { state: { page: getCurrentPageFromURL() } }));
		history.pushState("", {}, "/ft_transcendence/userDetails");
		quit_space();
		//menu.style.display = 'none';
		//navbar.style.display = 'block';
		Model.userDetails.userDetails.style.display = "flex";
		Model.space.space.style.display = "none";
        console.log('QUITTALOOO');
		//Router.change_route("/ft_transcendence/userDetails");
    });
}




// export function quit_space(){
		
// 		menu.style.display = 'none';
// 		navbar.style.display = 'block';
// 		// Router.change_route("/ft_transcendence/userDetails"); // non va bene perchè parte ogni volta che vengono premute le frecce per tornare indietro
// }

export function init_space() {
	    mostraMenu();
}

export async function update_spaceinvaders_stats() {

	const csrfToken = getCsrfToken();
	const jwtToken = window.AppData.user.access;
	const userUpdated = [window.AppData.user.user.spaceInvadersGamesPlayed, window.AppData.user.user.spaceInvadersWins, window.AppData.user.user.spaceInvadersLosses, window.AppData.user.user.spaceInvadersTie]
	const tournamentStats = window.AppData.tournamentStats;

	try {
		const response = await fetch('/api/login/update_spaceinvaders_stats', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`,
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({ userStats: userUpdated, tournamentStats: tournamentStats }),
			credentials: 'include'
		});

		if (response.ok) {
			console.log("ok");
			} else {
			console.log("errore")
		}
	} catch (error) {
		console.error('Error during the fetch operation:', error);
		throw error;
	}
};

const PlaySpaceInvaders = {
    init_space: init_space,
	update_spaceinvaders_stats: update_spaceinvaders_stats,
	mostraMenu : mostraMenu
}

export default PlaySpaceInvaders;