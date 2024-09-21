const express = require('express');
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

//Socket.io
io.on('connection', (socket) => {
    //if message came from client, send to other ws connections
    socket.on("user_message", (message) => {
        io.emit('message', message);
    });
});

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
});

server.listen(8080, () => {
    console.log("Server started at 8080...");
});
