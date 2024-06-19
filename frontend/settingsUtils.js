import Model from "./model.js";
import Router from "./router.js";
import { getCsrfToken, refreshAccessToken } from './utils.js'

// Gestisce il click del bottone di conferma (confirmButton.onclick)
async function change_username()
 {
	 const newUsername = Model.settings.inputNN.value.trim();
	 if (!newUsername) {
		 Model.settings.errMess.textContent = 'Username cannot be empty';
		 Model.settings.errMess.style.display = 'block';
		 return;
	 }
 
	 const csrfToken = getCsrfToken();
	 const jwtToken = window.AppData.user.access;
 
	 try {
		 const response = await fetch('/api/login/changeusername', {
			 method: 'POST',
			 headers: {
				 'Content-Type': 'application/json',
				 'Authorization': `Bearer ${jwtToken}`,
				 'X-CSRFToken': csrfToken
			 },
			 body: JSON.stringify({ username: newUsername }),
			 credentials: 'include'
		 });
		 
		 if (response.ok) {
			 const data = await response.json();
			 window.AppData.user.user.username = data.new_username;
			 Router.change_route("/ft_transcendence/userDetails");
		 } else if (response.status === 409) {
			 const errorData = await response.json();
			 Model.settings.inputNN.placeholder = 'This username is already taken';
			 Model.settings.inputNN.value = '';
			 Model.settings.errMess.textContent = errorData.error || "Username is already taken";
			 Model.settings.errMess.style.display = 'block';
		 } else if (response.status === 401) {
			 // Prova a rinnovare il token
			 const newAccessToken = await refreshAccessToken(window.AppData.user.refresh);
			 if (newAccessToken) {
				 window.AppData.user.access = newAccessToken;
				 return 
			 } else {
				 alert('Session expired. Please log in again.');
			 }
		 } else {
			 const errorData = await response.json();
			 console.error('Failed to change username:', errorData);
			 throw new Error(errorData.error);
		 }
	 } 
	 catch (error) 
	 {
		 console.error('Error during the fetch operation:', error);
		 throw error;
	 }
};

export async function change_image()
 {
	 const csrfToken = getCsrfToken();
	 const jwtToken = window.AppData.user.access;
 
	 try {
		 const response = await fetch('/api/login/changeimage', {
			 method: 'POST',
			 headers: {
				 'Content-Type': 'application/json',
				 'Authorization': `Bearer ${jwtToken}`,
				 'X-CSRFToken': csrfToken
			 },
			 body: JSON.stringify({ profile_image: window.AppData.user.user.profile_image }),
			 credentials: 'include'
		 });
		 
		 if (response.ok) {
			 const data = await response.json();
			 //window.AppData.user.user.username = data.new_username;
			 Router.change_route("/ft_transcendence/userDetails");
		 } else if (response.status === 409) {
			 const errorData = await response.json();
			// Model.settings.inputNN.placeholder = 'This username is already taken';
			// Model.settings.inputNN.value = '';
			// Model.settings.errMess.textContent = errorData.error || "Username is already taken";
			// Model.settings.errMess.style.display = 'block';
		 } else if (response.status === 401) {
			 // Prova a rinnovare il token
			 const newAccessToken = await refreshAccessToken(window.AppData.user.refresh);
			 if (newAccessToken) {
				 window.AppData.user.access = newAccessToken;
				 return 
			 } else {
				 alert('Session expired. Please log in again.');
			 }
		 } else {
			 const errorData = await response.json();
			 console.error('Failed to change username:', errorData);
			 throw new Error(errorData.error);
		 }
	 } 
	 catch (error) 
	 {
		 console.error('Error during the fetch operation:', error);
		 throw error;
	 }
};


export default change_username;