let http = require('http');
let PORT = 8000;
let express = require('express');
let app = express();

let server = http.createServer(app).listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

app.use(express.static('public'));

let io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
	console.log(socket.id + 'just connected');

	socket.on('info', (data) => {
		console.log(`Incoming data: ${data}`);

		let message = {
			id   : socket.id,
			data : data
		};

		io.sockets.emit('message', message);
		// socket.broadcast.emit('message', message);
	});

	//listen for socket disconnecting
	socket.on('disconnect', () => {
		console.log(socket.id + 'just disconnected');
	});
});
