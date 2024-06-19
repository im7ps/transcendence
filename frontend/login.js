import { userpage } from './userpage.js';
import { getCsrfToken, displayError, login_mutex } from './utils.js';
import Model from './model.js';

import Router from './router.js';

async function login() {

    const username = document.getElementById('login_username').value;
    const password = document.getElementById('login_password').value;

    if (!username.trim() || !password.trim()) {
        // alert('Both username and password are required');
		displayError("Both username and password are required");
		Model.error_messages.error_messages.style.position = "fixed";
		Model.error_messages.error_messages.style.marginBottom = "-315px";
		login_mutex.value = 0;
        return;
    }

    const userData = { username, password };
    const csrfToken = getCsrfToken();

    // console.log(userData);

    try {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(userData),
            credentials: 'include'  // Include i cookie nella richiesta per gestire la sessione CSRF
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to login');
        }

        const data = await response.json();
        // console.log('Login successful:', data);
        window.AppData.user = data;
        localStorage.setItem('user', JSON.stringify(data));
		
		Model.navbar.nav_userDetails.removeAttribute('disabled');
        userpage(data.user);  // Chiama una funzione che gestisce la navigazione dell'utente loggato
		Router.change_route("/ft_transcendence/userDetails"); // TESTING by stepis
    }
	catch (error)
	{
		login_mutex.value = 0;
        console.error('Login failed:', error);  // Mostra un messaggio di errore più appropriato
        // alert('Login failed: ' + error.message);  // Avvisa l'utente del fallimento del login
		displayError("Incorrect credentials");
    }
	//login_mutex.value = 0;
}

const Login = {
	login: login,
}

export {Login};

