import { getCsrfToken } from './utils.js';

async function update_pong_stats() {

	const csrfToken = getCsrfToken();
	const jwtToken = window.AppData.user.access;
	const userUpdated = [window.AppData.user.user.pongGamesPlayed, window.AppData.user.user.pongWins, window.AppData.user.user.pongLosses, window.AppData.user.user.pongTie]
	const tournamentStats = window.AppData.tournamentStats;

	try {
		const response = await fetch('/api/login/update_pong_stats', {
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

export default update_pong_stats;