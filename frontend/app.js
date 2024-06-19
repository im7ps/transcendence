
import { getCsrfToken } from './utils.js'

window.AppData = {
    user: null,
	tournamentPlayerList: [],
    pongTournamentStats: [
        {username: 'pozzolo1', stats: []},
        {username: 'pozzolo2', stats: []},
        {username: 'pozzolo3', stats: []}
    ],

    spaceInvadersTournamentStats: [
        {username: 'pozzolo4', stats: [0,0,0,0]},
        {username: 'pozzolo5', stats: [0,0,0,0]},
        {username: 'pozzolo6', stats: [0,0,0,0]}
    ]
}

let csrfToken;

window.onload = function() {
    if (!getCsrfToken()) {
        fetch('/api/csrf/', { credentials: 'include' })  // Assicurati che le credenziali includano i cookie
        .then(response => response.json())
        .then(data => {
            csrfToken = data.csrfToken;  // Salva il token CSRF
        });
    }
};

