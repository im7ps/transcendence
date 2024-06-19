import Router from './router.js';
import View from './view.js';
import Controller from './controller.js';

import './app.js';
import './login.js';
import './login42.js';

const controller = Controller;
const router = Router;
const view = View;

// document.addEventListener('DOMContentLoaded', function() {

	console.log("LINK STARTO!");

	router.init();
	view.init();
	controller.init();

	if (localStorage.getItem('user')) {
		window.AppData = {
			user: JSON.parse(localStorage.getItem('user'))
		};
	}

	if (window.location.pathname == "/ft_trascendence/42oauth")
	{
		console.log("beccato");
		window.location.pathname = "/ft_transcendence/userDetails";
	}

	router.change_route(window.location.pathname);

// });

export {controller, router, view};


