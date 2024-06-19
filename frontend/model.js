// MODEL


// dentro model non posso dichiarare altro che non siano oggetti che identificano gli elementi all'interno del documento HTML
// altrimenti bisogna comunicare al router il numero di oggetti legati all'HTML da ciclare nella funzione "router()"
const Model = {
	gorilla:
	{
		gorilla: document.getElementById("gorilla"),
	},
	app: 
	{
		app: document.getElementById("app"),
	},
	landing: {
		landing: document.getElementById("landing"),
		btn_landing: document.getElementById("btn-landing"),
		btn_login_submit: document.getElementById("btn-login-submit"),
		btn_registration_submit: document.getElementById("btn-registration-submit"),
	},
	navbar: {
		navbar: document.getElementById("navbar"),
		nav_home: document.getElementById("nav-home"),
		nav_login: document.getElementById("nav-login"),
		nav_login42: document.getElementById("nav-login42"),
		nav_registration: document.getElementById("nav-registration"),
		nav_font: document.getElementById("nav-font"),
		nav_fade_away: document.getElementById("nav-fade_away"),
		nav_userDetails: document.getElementById("nav-userDetails"),
		// navbar_toggle: document.getElementById("navbar_toggle"),
		navbar_navbarNav: document.getElementById("navbarNav"),
	},
	footer: {
		footer: document.getElementById("footer"),
	},
	login: {
		login: document.getElementById("login"),
		login_username: document.getElementById("login_username"),
		login_password: document.getElementById("login_password"),
		btn_login: document.getElementById("btn-login"),
		btn_login_42: document.getElementById("btn-42login"),
	},
	registration: {
		registration: document.getElementById("registration"),
		form_registration: document.getElementById("form_registration"),
		firstName: document.getElementById("firstName"),
		lastName: document.getElementById("lastName"),
		birthDate: document.getElementById("birthDate"),
		email: document.getElementById("email"),
		newUsername: document.getElementById("newUsername"),
		newPassword: document.getElementById("newPassword"),
		btn_registration: document.getElementById("btn-registration"),
	},
	userDetails: {
		userDetails: document.getElementById("userDetails"),
		btn_add_friend: document.getElementById("btn-add_friend"),
		btn_play_pong: document.getElementById("btn-play_pong"),
		btn_play_tournament: document.getElementById("btn-play_tournament"),
		btn_play_space: document.getElementById("btn-play_space"),
		friends_count: document.getElementById("friends_count"),
		

		link_statistics: document.getElementById("link_statistics"),
		link_add_friend: document.getElementById("link_add_friend"),
		link_chat: document.getElementById("link_chat"),
		link_settings: document.getElementById("link_settings"),
		link_logout: document.getElementById("link_logout"),
	},
	statistics: {
		statistics: document.getElementById("statistics"),
		stat_table: document.getElementById("stat_table"),
		game_1: document.getElementById("game_1"),
		game_2: document.getElementById("game_2"),
		game_3: document.getElementById("game_3"),
		game_4: document.getElementById("game_4"),
	},
	insights: {
		insights: document.getElementById("insights"),
	},
	// insights_right: {
	// 	insights_right: document.getElementById("insights-right"),
	// },
	// // graph: {
	// // 	graph: document.getElementById("graph"),
	// // },
	// // podium: {
	// // 	podium: document.getElementById("podium"),
	// // },
	friends: {
		friends: document.getElementById("friends"),
		add_friend: document.getElementById("add_friend"),
		friendUsername: document.getElementById("friendUsername"),
		tourn_alias_input: document.getElementById("tourn_alias_input"),
	},
	game: {
		game: document.getElementById("game"),
	},
	space:{
		space: document.getElementById("space"),
	},
	bong:{
		bong: document.getElementById("bong"),
	},
	chat: {
		chat: document.getElementById("chat"),
	},
	settings: {
		settings: document.getElementById("settings"),
		settingsCard: document.getElementById("settingsCard"),
		inputNN: document.getElementById("inputNN"),
		btn_change_username: document.getElementById("btn-change_nickname"),
		confirmButton: document.getElementById("confirmButton"),
		errMess: document.getElementById("errMess"),

		btn_change_propic: document.getElementById("btn-change_propic"),
		propic_grid: document.getElementById("propic_grid"),
	},
	error_messages: {
		error_messages: document.getElementById("errorMessages"),
	},
};

export default Model ;
