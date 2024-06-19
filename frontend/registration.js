import { isValidEmail, isValidName, isAdult, isValidPassword, displayError, clearError } from './utils.js';
import { init_userpage } from './userpage.js';
import { getCsrfToken } from './utils.js';
import Router from './router.js';
import Model from './model.js';

function validateName(element) {
	const input = document.getElementById(element);
	if (!isValidName(input.value)) {
		input.classList.add('invalid');
		displayError('Nome e cognome possono contenere solo lettere e numeri.');
	} else {
		input.classList.remove('invalid');
		clearError();
	}
	checkFormValidity();
}

function validateAge() {
    const input = document.getElementById('birthDate');
    if (!isAdult(input.value)) {
        input.classList.add('invalid');
        displayError('Devi avere almeno 18 anni per registrarti.');
    } else {
        input.classList.remove('invalid');
        clearError();
    }
    checkFormValidity();
}

function validateEmail() {
    const input = document.getElementById('email');
    if (!isValidEmail(input.value)) {
        input.classList.add('invalid');
        displayError('Inserisci un indirizzo email valido.');
    } else {
        input.classList.remove('invalid');
        clearError();
    }
    checkFormValidity();
}

function validatePassword() {

    const input = document.getElementById('newPassword');
    if (!isValidPassword(input.value)) {
        input.classList.add('invalid');

        displayError('La password deve contenere almeno 6 caratteri, di cui almeno una maiuscola e un numero.');
    } else {
        input.classList.remove('invalid');
        clearError();
    }
    checkFormValidity();
}

function checkFormValidity() {
    const inputs = document.querySelectorAll('#firstName, #lastName, #birthDate, #email, #newUsername, #newPassword');
    const allValid = Array.from(inputs).every(input => {
        return input.value.trim() !== "" && !input.classList.contains('invalid');
    });

    const btn_registration = document.getElementById('btn-registration');
	if (allValid == true)
		clearError();
    btn_registration.disabled = !allValid;

    // console.log('Register button enabled:', !btn_registration.disabled);
}


async function register() {
    event.preventDefault();
    if (document.getElementById('btn-registration').disabled) {
        alert('Correggi gli errori nel form prima di registrarti.');
        return;
    }

    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        birthDate: document.getElementById('birthDate').value,
        email: document.getElementById('email').value,
        username: document.getElementById('newUsername').value,
        password: document.getElementById('newPassword').value,
    };

    const csrfToken = getCsrfToken();

    try {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });
    
        if (!response.ok) {
			console.log("Failed");
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to register');
        }

        const data = await response.json();
        window.AppData.user = data;
        console.log(data);

		Model.navbar.nav_userDetails.removeAttribute('disabled');
        init_userpage(window.AppData.user.user);  // Chiama una funzione che gestisce la navigazione dell'utente loggato
		Router.change_route("/ft_transcendence/userDetails"); // TESTING by stepis. ATT: il cambio di url va fatto necessariamente dopo la chiamata a userpage o si perderà di contesto il document
    }
	catch (error) 
	{
        alert('Registration failed: ' + error.message);  // Avvisa l'utente del fallimento del login
    }
}

const Registration = {
	validateName: validateName,
	validateAge: validateAge,
	validateEmail: validateEmail,
	validatePassword: validatePassword,
	register: register,
}

export {Registration};