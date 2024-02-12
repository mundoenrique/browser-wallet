/**
 * Web socket configuration.
 *
 * @param res - Request.
 * @returns Events.
 * @throws An error occurs when not pointing to the web socket path..
 */

import { Server, Socket } from 'socket.io';

const sockets: Record<string, Socket> = {};

export default function handler(req: any, res: any) {
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
    // Store the socket in an object for later reference
    sockets[socket.id] = socket;

    // Manejar eventos
    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
      delete sockets[socket.id];
    });

    socket.on('sendData', (user) => {
      console.log('Datos del cliente - socket:', user);
      socket.broadcast.emit('infoUser', user);
    });
  };

  io.on('connection', onConnection);
  console.log('Socket server started successfully!');
  res.end();
}
