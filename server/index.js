const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');

const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",

    }
  })
app.use(cors())
app.use(router)

//client side socket
io.on('connection', ( (socket) => {
    console.log('we have a new conncetion!!!!!');

    socket.on('join', ({name, room}, callback) => {
        console.log(name, room);

        const error = true

        // if (error) {
        //     callback({error: 'error'}); 
        // }

    });

    socket.on('disconnect', () => {
        console.log('user has left!!!');
    });
}))



server.listen(PORT, () =>console.log(`server hast started on port ${PORT}`));