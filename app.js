const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const socketIo = require('socket.io');

const io = socketIo(server);

server.listen(3000, () => {
    console.log("running")
})


app.use(express.static(__dirname + "/public"))

io.on('connection', (socket) => {
    console.log('Nova conexão')

    socket.on('mensagem', () => {
    console.log("mensagem recebida")
    io.emit('resposta');
    })

        socket.on('desenhar',(linha) => {
            io.emit('desenhar', linha)
        })


})