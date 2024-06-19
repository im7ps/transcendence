// SETTINGS

import Model from './model.js';
import { change_image } from './settingsUtils.js';

function init()
{
	Model.navbar.navbar.style.display = "flex";
	Model.settings.inputNN.style.display = 'none';
	Model.settings.confirmButton.style.display = 'none';
	Model.settings.propic_grid.style.display = "none";
	console.log("settings initialized!");
}

// Aggiungi un gestore di eventi per il cambio dell'input file
fileInput.addEventListener('change', function() {
	const file = fileInput.files[0]; // Ottieni il primo file caricato (l'utente potrebbe caricare più file)
	
	if (file) {

		console.log('Nome del file:', file.name);
		console.log('Dimensione del file:', file.size);
		console.log('Tipo del file:', file.type);

		const reader = new FileReader();
		reader.onload = function(event) {
			const imageUrl = event.target.result;

			const imgElement = document.createElement('img');
			imgElement.src = imageUrl;
			document.body.appendChild(imgElement);
		};
		reader.readAsDataURL(file);
	}
});

function change_profile_image()
{
	if (Settings.img_counter % 2 == 0)
		Model.settings.propic_grid.style.display = "grid";
	else
		Model.settings.propic_grid.style.display = "none";
	Settings.img_counter++;

	const circles = document.querySelectorAll('.circle');

	circles.forEach(circle => {
		circle.addEventListener('click', function() {
			if (circle.getAttribute("data-bg-img"))
			{
				window.AppData.user.user.profile_image = circle.getAttribute("data-bg-img");
				change_image();
			}
			else
			{
				fileInput.click();
			}
		});
	});
}

function change_username_button()
{
	if (Settings.usr_counter % 2 == 0)
	{
		Model.settings.inputNN.style.display = 'flex';
		Model.settings.confirmButton.style.display = 'flex';
	}
	else
	{
		Model.settings.inputNN.style.display = 'none';
		Model.settings.confirmButton.style.display = 'none';
	}
	Settings.usr_counter++;

	Model.settings.errMess.style.display = 'none';

};

const Settings = 
{
	usr_counter: 0,
	img_counter: 0,
	init: init,
	change_username_button: change_username_button,
	change_profile_image: change_profile_image,
}

export default Settings;