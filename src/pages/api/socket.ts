import { Server, Socket } from 'socket.io';
import axios from 'axios';

const sockets: Record<string, Socket> = {};

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Server already started!');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/my_socket',
  });
  res.socket.server.io = io;

  const onConnection = (socket: Socket) => {
    console.log('Usuario conectado:', socket.id);
    // Almacenar el socket en un objeto para su referencia posterior
    sockets[socket.id] = socket;

    // Manejar eventos
    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
      delete sockets[socket.id];
    });

    // Escuchar la API y emitir cambios a los clientes
    setInterval(async () => {
      try {
        const response = await axios.get('https://api-services-kfmf.onrender.com/cards/4/movements');
        const data = response.data;

        io.emit('movementsChange', data);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    }, 5000);
  };

  io.on('connection', onConnection);

  console.log('Socket server started successfully!');
  res.end();
}
