import { static_counter, login_mutex } from './utils.js';
import Model from './model.js';
import { Login } from './login.js';

// VIEW

function router(action, params)
{
	if (typeof(this.actions[action]) === 'function')
	{
		this.actions[action].apply(null, params);
	}
}

function show_home()
{
	Model.landing.landing.style.display = "flex";
}

function welcome()
{
	Model.landing.btn_login_submit.style.display = "flex";
	Model.landing.btn_registration_submit.style.display = "flex";
	Model.landing.btn_landing.style.display = "none";
}

function font()
{
	let i = static_counter();
	
	switch (i)
	{
		case(1):
			document.body.style.fontFamily = '"Poetsen One", sans-serif';
			break;
		case(2):
			document.body.style.fontFamily = '"Montserrat", sans-serif';
			break;
		case(3):
			document.body.style.fontFamily = '"Kanit", sans-serif';
			break;
		case(4):
			document.body.style.fontFamily = '"Jaro", sans-serif';
			break;
		case(5):
			document.body.style.fontFamily = '"Sedan SC", sans-serif';
			break;
		case(6):
			document.body.style.fontFamily = '"Retro Pixel", sans-serif';
			break;
		case(7):
			document.body.style.fontFamily = '"Segoe UI", sans-serif';
			static_counter.counter = 0;
			break;
		default:
			document.body.style.fontFamily = '"sans-serif", sans-serif';
			break;
	}
}


function show_navbar()
{
	const i = static_counter();
	if (i % 2 == 1)
	{
		Model.navbar.navbar.style.height = "30%";
		Model.navbar.navbar_navbarNav.style.display = "flex";
	}
	else
	{
		Model.navbar.navbar.style.height = "10%";
		Model.navbar.navbar_navbarNav.style.display = "none";
	}
}

function fade_away(target)
{
	if (target == "")
		target = "landing";
	if (target == "userDetails")
	{
		Model.userDetails.userDetails.style.transition = '';
	}
	Model[target][target].classList.add('fade-out');
}

function auto_enter() 
{
	if (!login_mutex.value)
	{
		login_mutex.value = 1;
		Login.login();
	}
}

function show_statistics(game_id)
{
	Model.insights.insights.style.display = 'grid';
	// Router.change_route()
}

function init()
{
	
}

const View = {
	actions: {
		
	},
	init: init,
	router: router,
	welcome: welcome,
	font: font,
	show_home: show_home,
	auto_enter: auto_enter,
	fade_away: fade_away,
	show_statistics: show_statistics,
	show_navbar: show_navbar,
}

export default View;
