const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Admin';

// run when client connect
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room}) => {
        
        //Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to LiveChat'));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'New user has joined the chat')
    );
    });

    //Runs when disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'User has left the chat'));
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('User', msg));
    });

});

const PORT = process.env.PORT||3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));