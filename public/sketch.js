//Create socket
let socket = io();
let users = [];

socket.on('connect', () => {
	console.log('Connected to server');
});

socket.on('message', (message) => {
	let id = message.id;
	let data = message.data;

	// console.log(data);
	users[id] = { u_name: data.name, u_guess: data.rent };

	// is the new user a member of the users array
	// if not, add them & also render to the html
	// if so, update the html guess value, and users array guess value
	console.log(users[id]);
	let newP = document.createElement('li');
	newP.setAttribute('id', id);
	document.getElementById('answer_list').appendChild(newP);

	document.getElementById(id).innerHTML = `${users[id].u_name}: $${users[id].u_guess}`;
});

socket.on('disconnected', (id) => {
	delete users[id];
});

const $button = document.querySelector('#myButton');
$button.addEventListener('click', getValue);

function getValue() {
	let name = document.getElementById('user_name').value;
	let rent = document.getElementById('user_guess').value;
	// document.getElementById('guess_value').innerHTML = `${name}: $${rent}`;

	socket.emit('info', { name, rent });
}

function popping() {
	let popup = document.getElementById('myPopup');
	popup.classList.toggle('show');
}
