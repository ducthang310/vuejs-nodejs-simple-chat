var http = require('http').createServer({
    origins: ['localhost','null',null]
});
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi, welcome to live chat');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', {socket_id: socket.id, message});
    });
})



http.listen(3000, () => {
    console.log('listening on port 3000');
});
