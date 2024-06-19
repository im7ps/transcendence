import { getCsrfToken } from './utils.js'
import Router from './router.js';
import Model from './model.js';

export function executeLogout() {
    const csrfToken = getCsrfToken();

    if (!csrfToken) {
        console.error('CSRF token not found. Please make sure you are logged in.');
        return;
    }

    fetch('/api/logout/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken
        },
        credentials: 'include' // Ensure cookies are included with the request
    })
    .then(response => {
        if (response.ok) {
            console.log("Logout successful");
			Model.navbar.nav_userDetails.setAttribute("disabled", "");
			Router.change_route("login");

        } else {
            console.error("Logout failed", response.status);
        }
    })
    .catch(error => console.error('Error during logout:', error));
}
