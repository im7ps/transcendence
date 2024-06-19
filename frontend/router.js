// ROUTER

import Model from './model.js';
import Statistics from './statistics.js';
import Friends from './friends.js';
import PlayBong from './playbong.js';
// import PlaySpaceInvaders from './playspaceinvaders.js';
import Chat from './chat.js';
import Settings from './settings.js';
import { init_userpage } from './userpage.js';
import { show_home, clearError, resetToggle } from './utils.js';
import { quit_bong } from './pong/Pong.js';
import { init_space} from './playspaceinvaders.js';
import { handleAuthRedirect } from './login42.js';
import { quit_space } from './space_invaders/space_invaders.js';


const model = Model;
const statistics = Statistics;
const friends = Friends;
const bong = PlayBong;
//const space = PlaySpaceInvaders;
const chat = Chat;
const settings = Settings;

const Routes = {
    "landing": show_home,
    "userDetails": init_userpage,
    "statistics": statistics.init,
    "friends": friends.init,
    "bong": bong.init,
    "space": init_space,
    "chat": chat.init,
    "settings": settings.init,
    "insights": statistics.insights,
};

function router(destination) {
    let toggle = 0;
    destination = destination.replace("/ft_transcendence/", "");

    
    if (destination == "") {
        destination = "landing";
    }
        
    for (let key in Model) {
        if (Model.hasOwnProperty(key)) {
            let element = Model[key][key];
            if (element != undefined) {
                if (element.id == destination) {
					if (element.id == "insights")
						element.style.display = "grid";
					else
                    	element.style.display = "flex";
                    toggle = 1;
                    if (Routes[destination]) {
                        Routes[destination]();
                    }
                } else if (element.id != "app" && element.id != "navbar" && element.id != "footer")
                    element.style.display = "none";
            }
        }
    }
    if (toggle == 0) {
        //model.app.app.innerHTML = "<h1>404 Page Not Found.</h1>";
    }
}

function clear_progress_bars()
{
	// let bars = document.getElementsByClassName("progress-bar");
	// if (bard != undefined)
	// {
	// 	Array.from(bars).forEach(bar => {
	// 		bar.remove();
	// 	});
	// }
}

function load_content(path) {
    clearError();
    resetToggle();
	clear_progress_bars();

    if (path)
        router(path);
    else
        model.app.app.innerHTML = "<h1>404 Page Not Found.</h1>";
}

// path verso cui andare, elem del blocco da nascondere, elem del blocco da mostrare
function change_route(destination) {
	Model.app.app.style.display = "flex";
    try {
        Router.load_content(destination);
		history.pushState({}, null, destination);
    } catch (error) {
        console.error('Si è verificato un errore durante il caricamento del contenuto:', error);
    }
}

function bong_version(destination, id) {
    history.pushState({}, null, destination);
    destination = destination.replace("/ft_transcendence/", "");

    Model[destination][destination].style.display = "flex";
    Routes["bong"](id.replace("btn-play_", ""));
}

function init() {
    handleAuthRedirect();
	history.pushState({}, null, window.location.pathname);

    window.addEventListener("popstate", (event) => {
        event.preventDefault();

		app.style.display = "flex";
		gorilla.style.display = "none";

        quit_bong();
        quit_space();
        let dest = window.location.pathname;

        Router.load_content(dest);
    });
}

const Router = {
    init: init,
    change_route: change_route,
    load_content: load_content,
    bong_version: bong_version,
}

export default Router;
