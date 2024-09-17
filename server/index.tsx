import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  // Handle game actions here

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send("Blackjack Backend Server");
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
