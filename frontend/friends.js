// ADD FRIEND

import { getCsrfToken, getCurrentPageFromURL, tournament_list } from './utils.js';
import Model from './model.js';
import { quit_bong } from './pong/Pong.js';
import PlayBong from './playbong.js'
import Router from './router.js';

const RECORDS_PER_PAGE = 3;

function revert_all_faded()
{
	// Model.userDetails.userDetails.style.opacity = 1;
	for (let key in Model) 
	{
		if (Model[key][key]) 
		{
			Model[key][key].classList.remove('fade-out');
		}
	}
}

function refresh_page(path) {
	path = path.replace("/ft_transcendence/", "");
	revert_all_faded();
	if (path == "login")
	{
		Model.login.login_username.value = "";
		Model.login.login_password.value = "";
	}
	else if (path == "registration")
	{
		Model.registration.firstName.value = "";
		Model.registration.lastName.value = "";
		Model.registration.birthDate.value = "";
		Model.registration.email.value = "";
		Model.registration.newUsername.value = "";
		Model.registration.newPassword.value = "";
	}
	else if (path == "space")
	{
		// console.log("restarting");
	}
	else if (path == "bong")
	{
		quit_bong()
		PlayBong.init()
	}
	else if (path == "settings")
	{
		Model.settings.inputNN.value = "";
	}
	else if (path == "friends")
	{
		Model.friends.friendUsername.value = "";
		Friends.show_page(0);
	}
}

function show_page_buttons(friends_lenght)
{
	friends_lenght = Math.ceil(friends_lenght / RECORDS_PER_PAGE);
	let tableFooter = document.getElementById('friends_table_footer');
	tableFooter.innerHTML = '';

	if (friends_lenght < 0)
	{
		console.log("Error friend's list too short");
		return ;
	}

	
	let i = 0;
	const row = document.createElement('tr');
	while (i < friends_lenght)
	{		
		const cellActions = document.createElement('td');
        const paginationButton = document.createElement('button');
        paginationButton.textContent = i + 1;
		paginationButton.style.margin = '10px 10px';
		paginationButton.style.boxSizing = 'border-box';
		paginationButton.style.backgroundColor = 'transparent';
		paginationButton.style.outline = 'none';
		paginationButton.style.transition = 'background-color 0.1s, border-color 0.1s, transform 0.1s';
		paginationButton.style.border = '2px solid transparent';
		paginationButton.style.borderRadius = '50%';
		paginationButton.style.backgroundColor = "white";

		paginationButton.addEventListener('mouseenter', function() {
			paginationButton.style.transform = 'scale(1.1)';
			paginationButton.style.boxShadow = '-10px -10px 15px rgba(255, 255, 255, 0.5), ' +
												'10px 10px 15px rgba(70, 70, 70, 0.12), ' +
												'inset -10px -10px 15px rgba(255, 255, 255, 0.5), ' +
												'inset 10px 10px 15px rgba(70, 70, 70, 0.12)';
			paginationButton.style.color = 'black';
		});
		
		paginationButton.addEventListener('mouseleave', function() {
			paginationButton.style.transform = 'scale(1)';
			paginationButton.style.boxShadow = 'none';
			paginationButton.style.color = '';
		});

		paginationButton.addEventListener("click", () => show_page(paginationButton.textContent - 1));
        cellActions.appendChild(paginationButton);
        row.appendChild(cellActions);
		tableFooter.appendChild(row);
		i += 1;
	}
}

function show_page(startIndex) {

	let index = startIndex;
	const data = window.AppData.user.user.friends;

	index = index * RECORDS_PER_PAGE;
	let tableBody = document.getElementById('friends_table_body');
	tableBody.innerHTML = '';

    if (index < 0 || index >= data.length) {
        console.log("Invalid start index.");
        return;
    }

    let endIndex = Math.min(index + RECORDS_PER_PAGE, data.length);

    for (let i = index; i < endIndex; i++) 
	{
		if (!data[i])
			return ;

        const row = document.createElement('tr');
		row.style.width = "100%";
		row.style.display = "flex";
		row.style.alignItems = "center";
		row.style.justifyContent = "center";
        
        const cellName = document.createElement('td');
        cellName.textContent = data[i].username;
		cellName.style.padding = "20px 10px";
		cellName.style.width = "70px";
        row.appendChild(cellName);

        const cellStatus = document.createElement('td');
		if (data[i].status == true)
        	cellStatus.textContent = "online";
		else
			cellStatus.textContent = "offline";
		cellStatus.style.padding = "20px 10px";
		cellStatus.style.width = "70px";
        row.appendChild(cellStatus);

        const cellActions = document.createElement('td');

		const tournAliasInput = document.createElement('input');
		tournAliasInput.id = "tourn_alias_input";
		tournAliasInput.placeholder = "Insert tournament alias";
		cellActions.appendChild(tournAliasInput);
        
        const actionButton = document.createElement('button');
		actionButton.id = 'bong_invite';
        actionButton.textContent = 'Bong!';
		cellActions.appendChild(actionButton);
		actionButton.addEventListener("click",  function () {
			//history.pushState("", {}, "/ft_transcendence/bong");
			Model.friends.friends.style.display = "none";
			tournament_list(data[i].username, data[i].username);
			//window.dispatchEvent(new PopStateEvent('popstate', { state: { page: getCurrentPageFromURL() } }));
			Router.change_route('/ft_transcendence/bong')
		});

        const actionButton2 = document.createElement('button');
		actionButton2.id = 'space_invite';
        actionButton2.textContent = 'Space!';
		cellActions.appendChild(actionButton2);
		actionButton2.addEventListener("click",  function () {
			history.pushState("", {}, "/ft_transcendence/space");
			Model.friends.friends.style.display = "none";
			window.dispatchEvent(new PopStateEvent('popstate', { state: { page: getCurrentPageFromURL() } }));
		});

        const actionButton3 = document.createElement('button');
		actionButton3.id = 'tournament_invite';
        actionButton3.textContent = '1v7!';
		cellActions.appendChild(actionButton3);
	
		let tempAlias = tournAliasInput.value;
		actionButton3.addEventListener("click",  function () {
			if (window.AppData.tournamentPlayerList != undefined )
			{
				window.AppData.tournamentPlayerList.forEach((item, i) => { 
					if (item.alias === tempAlias) {
						tempAlias = tournAliasInput.value + "#" + i.toString();
					}
				});
			}
			Model.userDetails.btn_play_tournament.removeAttribute('disabled');
			tournament_list(data[i].username, tempAlias);
		});

        row.appendChild(cellActions);
        
        tableBody.appendChild(row);
    }

}

function init()
{
	console.log("Add Friend initialized!");
	let friends = document.getElementById("friends");
	friends.style.display = "flex";
	
	show_page(0);
	show_page_buttons(window.AppData.user.user.friends.length);
}

async function add_friend(newFriend) {

	if (!newFriend) {
		Model.settings.errMess.textContent = 'Friend cannot be empty';
		Model.settings.errMess.style.display = 'block';
		return;
	}

	const csrfToken = getCsrfToken();
	const jwtToken = window.AppData.user.access;

	try {
		const response = await fetch('/api/login/add_friend', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwtToken}`,
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({ friend: newFriend }),
			credentials: 'include'
		});

		if (response.ok) {
			const data = await response.json();
			window.AppData.user.user.friends = data.friends;
			} else {
			console.log("errore")
		}

	} catch (error) {
		console.error('Error during the fetch operation:', error);
		throw error;
	}

	refresh_page("friends");
};

export const Friends = 
{
	init: init,
	show_page: show_page,
	add_friend: add_friend,
	refresh_page: refresh_page,
};

export default Friends;