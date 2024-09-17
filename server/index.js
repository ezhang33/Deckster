const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle game actions here

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send("Blackjack Backend Server");
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
