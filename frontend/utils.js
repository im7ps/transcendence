export var login_mutex = { value: 0 };

export function tournament_list(username, alias)
{
	if (!window.AppData.tournamentPlayerList)
		window.AppData.tournamentPlayerList = [];
	window.AppData.tournamentPlayerList.push({"username": username, "alias": alias});
}

export function getCurrentPageFromURL() 
{
    let params = new URLSearchParams(window.location.search);
    return parseInt(params.get('page')) || 1;
}

export function resetToggle() {
	let menu = document.getElementById('userActionsMenu');

	menu.classList = "menu";
}

export function clearError() {
    let errorDiv = document.getElementById('errorMessages');
    errorDiv.innerText = '';
    errorDiv.style.display = 'none';
	errorDiv.style.position = '';
	errorDiv.style.marginBottom = '';
}

export function displayError(message) {
    const errorDiv = document.getElementById('errorMessages');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block';
}

// funzione per mostrare il contenuto della hompage
export function show_home() {
	let landing = document.getElementById("landing");
	landing.style.display = "flex";
}

// funzione per imitare il comportamento delle variabili statiche di c, utile per gestire condizioni pari/dispari
export function static_counter() {

		if ( typeof static_counter.counter == 'undefined' ) {
			static_counter.counter = 0;
		}
	
		return(++static_counter.counter);
}

export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

export function isValidName(name) {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(name);
}

export function isAdult(birthDate) {
    const currentDate = new Date();
    const eighteenthBirthday = new Date(birthDate);
    eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);

    return currentDate >= eighteenthBirthday;
}

export function isValidPassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return re.test(password);
}

export function getCsrfToken() {

    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1]; 
}

export function getSessionID() {

    return document.cookie.split('; ')
        .find(row => row.startsWith('sessionid='))
        ?.split('=')[1] || undefined;
}

// da fixare

// async function tryLogin() {
// 	console.log("try login!");

// 	try {
// 		const response = fetch('/api/check_session', {
// 			method: 'GET',
// 			credentials: 'include',
// 		});

// 		const data = await response.json();
//         if (response.ok)
// 		{
//             console.log('DONE');
// 			Router.change_route("/ft_transcendence/userDetails");
//             return ;
//         }
// 		else
// 		{
//             console.error('LE RROTTE SONO RROTTE');
//             throw new Error(data.detail || 'Unknown error');
//         }
// 	}
// 	catch (error)
// 	{
//         console.error('Error refreshing access token:', error);
//     }
// }


export async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch('/api/token/refreshtoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
			// body: JSON.stringify({ refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNDgwOTU3MCwiaWF0IjoxNzE0NzIzMTcwLCJqdGkiOiJhOWY3ZWFiMDRlMGI0NWNiODM1NmMzZWJmNDBjMWVhMyIsInVzZXJfaWQiOjF9.mzGI6pQbjSudgbbUDw1oxGwlnHYQLRX8jpAKyD3be6U' })
			// da fixare
			body: JSON.stringify({ refresh: refreshToken })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Token refreshed successfully');
            window.AppData.user.refresh = data.refresh;
            return data.access;  // Ritorna il nuovo access token
        } else {
            console.error('Failed to refresh token:', data);
            throw new Error(data.detail || 'Unknown error');
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}

export function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }


// const Utils = {
// 	tryLogin: tryLogin,
// }

// export default Utils;