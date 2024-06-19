// CONTROLLER

import Model from "./model.js";
import Router from "./router.js";
import Settings from "./settings.js";
import { executeLogout } from './logout.js';
import { Registration } from './registration.js';
import  View  from './view.js';
import Friends from "./friends.js";
import login42 from "./login42.js";
import { Login } from './login.js';
import change_username from "./settingsUtils.js";

const model = Model;
const view = View;
const router = Router;
const settings = Settings;
const registration = Registration;
const login = Login;
const friends = Friends;

const Controller = {
        on_click_actions: {
			"change_route": router.change_route,
			"bong_version": router.bong_version,

			"show_card_settings": settings.change_username_button,
			"change_username": change_username,
			"change_propic": settings.change_profile_image,

			"logout": executeLogout,
			"login": login.login,

			"validate_name": registration.validateName,
			"validate_age": registration.validateAge,
			"validate_email": registration.validateEmail,
			"validate_password": registration.validatePassword,
			"registration": registration.register,

			"welcome_transcendence": view.welcome,
			"change_font": view.font,
			"auto_enter": view.auto_enter,
			"fade_away": view.fade_away,
			"show_statistics": view.show_statistics,
			"show_navbar": view.show_navbar,

			"change_page": friends.show_page,
			"add_friend": friends.add_friend,
			"login_42": login42,
        },

        init: function ()
        {
			// cerca di prevenire qualsiasi ricarica dal sito verso il browser, quindi anche il bottone di ricarica della pagina o di chisura della scheda (tutto quello che cambia il context del browser e che viene attivato tramite un elemento del browser)
			// window.addEventListener('beforeunload', function(event) {
			// 	event.preventDefault();
			// });

			window.addEventListener("keydown", (event) => {
				if (event.code == "F5")
				{
					event.preventDefault();
					friends.refresh_page(window.location.pathname);
					router.load_content(window.location.pathname);
				}
				else if (event.code == "Enter" && window.location.pathname == "/ft_transcendence/login")
				{
					Controller.onClick("login", [event], event);
				}
				else if (event.code == "Enter" && window.location.pathname == "/ft_transcendence/registration")
				{
					Controller.onClick("registration", [event], event);
				}
			})

			const gorilla_fingers = document.getElementsByClassName("gorilla_finger");
			for (const element of gorilla_fingers) {
				element.addEventListener("click", function () {
					const app = document.getElementById("app");
					const gorilla = document.getElementById("gorilla");

					app.style.display = "none";
					gorilla.style.display = "block";
					history.pushState("", {}, "/ft_transcendence/");
				})
			}
			
			model.navbar.nav_home.addEventListener("click", () => Controller.onClick("change_route", [model.navbar.nav_home.getAttribute("destination")], null));
			model.navbar.nav_login.addEventListener("click", () => Controller.onClick("change_route", [model.navbar.nav_login.getAttribute("destination")], null));
			model.navbar.nav_login42.addEventListener("click", (event) => Controller.onClick("login_42", [event], event));
			model.navbar.nav_registration.addEventListener("click", () => Controller.onClick("change_route", [model.navbar.nav_registration.getAttribute("destination")], null));
			model.navbar.nav_userDetails.addEventListener("click", () => Controller.onClick("change_route", [model.navbar.nav_userDetails.getAttribute("destination")], null));
			model.navbar.nav_font.addEventListener("click", () => Controller.onClick("change_font", [], null));
			model.navbar.nav_fade_away.addEventListener("click", () => Controller.onClick("fade_away", [window.location.pathname.replace("/ft_transcendence/", "")], null));


			model.landing.btn_landing.addEventListener("click", (event) => Controller.onClick("welcome_transcendence", [], event));
			model.landing.btn_login_submit.addEventListener("click", (event) => Controller.onClick("change_route", [model.landing.btn_login_submit.getAttribute("destination")], event));
			model.landing.btn_registration_submit.addEventListener("click", (event) => Controller.onClick("change_route", [model.landing.btn_registration_submit.getAttribute("destination")], event));
			
			model.login.login_password.addEventListener("mouseover", () => Controller.onClick("auto_enter", [model.login.login_password], null))
			model.login.btn_login.addEventListener("click", (event) => Controller.onClick("login", [event], event));
			
			model.userDetails.btn_add_friend.addEventListener("click", () => Controller.onClick("add_friend", [document.getElementById("friendUsername").value], null));
			model.userDetails.btn_play_pong.addEventListener("click", (event) => Controller.onClick("bong_version", [model.userDetails.btn_play_pong.getAttribute("destination"), model.userDetails.btn_play_pong.getAttribute("id")], event));
			model.userDetails.btn_play_tournament.addEventListener("click", (event) => Controller.onClick("bong_version", [model.userDetails.btn_play_tournament.getAttribute("destination"), model.userDetails.btn_play_tournament.getAttribute("id")], event));
			model.userDetails.btn_play_space.addEventListener("click", (event) => Controller.onClick("change_route", [model.userDetails.btn_play_space.getAttribute("destination")], event));
			
			model.userDetails.link_statistics.addEventListener("click", (event) => Controller.onClick("change_route", [model.userDetails.link_statistics.getAttribute("href")], event));
			model.userDetails.link_add_friend.addEventListener("click", (event) => Controller.onClick("change_route", [model.userDetails.link_add_friend.getAttribute("href")], event));
			model.userDetails.link_chat.addEventListener("click", (event) => Controller.onClick("change_route", [model.userDetails.link_chat.getAttribute("href")], event));
			model.userDetails.link_settings.addEventListener("click", (event) => Controller.onClick("change_route", [model.userDetails.link_settings.getAttribute("href")], event));
			model.userDetails.link_logout.addEventListener("click", (event) => Controller.onClick("logout", [], event));
			
			model.settings.btn_change_username.addEventListener("click", (event) => Controller.onClick("show_card_settings", [], event));
			model.settings.confirmButton.addEventListener("click", (event) => Controller.onClick("change_username", [], event));
			model.settings.btn_change_propic.addEventListener("click", () => Controller.onClick("change_propic", [], null));
			
			model.registration.firstName.addEventListener('focusout', () => Controller.onClick("validate_name", ["firstName"], null));
			model.registration.lastName.addEventListener('focusout', () => Controller.onClick("validate_name", ["lastName"], null));
			model.registration.birthDate.addEventListener('focusout', () => Controller.onClick("validate_age", [], null));
			model.registration.email.addEventListener('focusout', () => Controller.onClick("validate_email", [], null));
			model.registration.newUsername.addEventListener('focusout', () => Controller.onClick("validate_name", ["newUsername"], null));
			model.registration.newPassword.addEventListener('input', () => Controller.onClick("validate_password", [], null));
			model.registration.btn_registration.addEventListener('click', () => Controller.onClick("registration", [], null));
		
			model.statistics.game_1.addEventListener('click', (event) => Controller.onClick("change_route", [model.statistics.game_1.getAttribute("destination")], event));
			model.statistics.game_2.addEventListener('click', (event) => Controller.onClick("change_route", [model.statistics.game_2.getAttribute("destination")], event));
			model.statistics.game_3.addEventListener('click', (event) => Controller.onClick("change_route", [model.statistics.game_3.getAttribute("destination")], event));
			model.statistics.game_4.addEventListener('click', (event) => Controller.onClick("change_route", [model.statistics.game_4.getAttribute("destination")], event));

		},

        onClick: function (action, params, event) 
		{
			if (event)
				event.preventDefault();
			if (typeof(this.on_click_actions[action]) === 'function')
				this.on_click_actions[action].apply(null, params, event);
			else
			console.error("Azione non valida: " + action);
        }
};

export default Controller;