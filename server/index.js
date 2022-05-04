const express = require("express")
const { Server } = require("socket.io");
var http = require('http');
const cors = require("cors")

const app = express()
app.use(cors())

var server = http.createServer(app);
let clientsInRoom = 0;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {res.send("Chat by MC SCRUM"); res.end()})

io.on("connection", (socket) => {
  
  console.log(socket.id)
  

 // socket.on(eventName, listener) listener function
  socket.on("joinRoom", room => {
		socket.join(room)

if (io.sockets.adapter.rooms.has(room)) clientsInRoom = io.sockets.adapter.rooms.get(room).size
    
    socket.broadcast.emit('newclientconnect',{ description: clientsInRoom+ ' users'})
  })

  // when someone disconnects from the chat
  socket.on('disconnect', () => {
    console.log('A disconnection has been made')
    clientsInRoom--
    console.log(clientsInRoom);
  })

  // sends message to all clients in that specific room
  socket.on("newMessage", ({newMessage, room}) => {
    io.in(room).emit("getLatestMessage", newMessage)
  })

});



const port = process.env.PORT || 9000

server.listen(port, console.log(`App started at port ${port}`))