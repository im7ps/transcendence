import { getCsrfToken } from './utils.js';
import './app.js';
import { init_userpage } from './userpage.js';
import Router from './router.js';

document.getElementById('btn-42login').addEventListener('click', login42);

async function login42(event) {
    event.preventDefault();

    const csrfToken = getCsrfToken();

    try {
        const response = await fetch('/api/42oauth_start', {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrfToken
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to initiate login with 42');
        }

        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed: ' + error.message);
    }
}

export async function handleAuthRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
        try {
            const csrfToken = getCsrfToken();
            const response = await fetch(`/42oauth?code=${code}&state=${state}`, {
                method: 'GET',
                headers: {
                    'X-CSRFToken': csrfToken,
                    },
                    credentials: 'include'
            });
            if (!response.ok) {
				console.log(response);
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();

            console.log('Authenticated:', data);
            window.AppData.user = data;
            init_userpage(data.user);
			// window.location.pathname = '/ft_transcendence';
            Router.change_route('/ft_transcendence/userDetails');
        } catch (error) {
            console.error('Authentication failed:', error);
            alert()
            Router.change_route('/ft_trascendence');    
        }
    }
}

// window.addEventListener('load', handleAuthRedirect);

export default login42;
