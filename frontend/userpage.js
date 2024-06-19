import Model from "./model.js";

function init_userpage()
{
	if (window.AppData.user.user)
		userpage(window.AppData.user.user);
}

async function userpage(user) {
	let menu = document.getElementById('userActionsMenu');
    const toggle = document.getElementById('userMenuToggle');

	Model.userDetails.link_settings.style.display = "none";
	Model.userDetails.link_chat.style.display = "none";
	Model.userDetails.link_add_friend.style.display = "none";
	Model.userDetails.link_statistics.style.display = "none";

	Model.userDetails.userDetails.style.transition = 'transform 1s';

	// aggiorna counter degli amici online nella card dell'utente
	const friendsIconContainer = document.getElementById('friends_count');
	let i = 0;
	let count = 0;
	while (i < window.AppData.user.user.friends.length)
	{
		if (window.AppData.user.user.friends[i].status == true)
			count += 1;
		i += 1;
	}
	if (friendsIconContainer != null)
		friendsIconContainer.innerText = count;
	
	// apri 4 opzioni con animazione figa
	toggle.onclick = () => {
		menu.classList.toggle('active');
		
		const isActive = menu.classList.contains('active');
		
		if (isActive)
		{
			Model.userDetails.userDetails.style.transform = 'translateY(100px)';
			Model.userDetails.link_settings.style.display = "flex";
			Model.userDetails.link_chat.style.display = "flex";
			Model.userDetails.link_add_friend.style.display = "flex";
			Model.userDetails.link_statistics.style.display = "flex";
		}
		else
		{
			Model.userDetails.userDetails.style.transform = 'translateY(-1px)';
			Model.userDetails.link_settings.style.display = "none";
			Model.userDetails.link_chat.style.display = "none";
			Model.userDetails.link_add_friend.style.display = "none";
			Model.userDetails.link_statistics.style.display = "none";
		} 
	};				
				
	const usern = document.getElementById("usern");
	usern.textContent = user.username;

	const games_played = document.getElementById("games_played_placeholder");
	games_played.textContent = user.spaceInvadersGamesPlayed + user.pongGamesPlayed;

	const games_won = document.getElementById("games_won_placeholder");
	games_won.textContent = user.spaceInvadersWins + user.pongWins;;
	
	const games_lost = document.getElementById("games_lost_placeholder");
	games_lost.textContent = user.spaceInvadersLosses + user.pongLosses;
	
	const draws = document.getElementById("draws_placeholder");
	draws.textContent = user.spaceInvadersTie + user.pongTie;

	const img_profile = document.getElementById("imgBox");
	var img = document.createElement("img");
	
	img.src = user.profile_image
	img.alt = "Profile Picture";
	imgBox.appendChild(img);
}

export { userpage, init_userpage };
