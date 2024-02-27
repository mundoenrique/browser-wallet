import { Server, Socket } from 'socket.io';

/**
 * Web socket configuration.
 *
 * @param res - Request.
 * @returns Events.
 * @throws An error occurs when not pointing to the web socket path..
 */
export default function handler(req: any, res: any) {
  const sockets: Record<string, Socket> = {};
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
    console.log('Logged in user:', socket.id);
    sockets[socket.id] = socket;

    socket.on('disconnect', () => {
      console.log('Disconnected user:', socket.id);
      delete sockets[socket.id];
    });

    socket.on('sendData', (user) => {
      console.log('Client data - socket:', user);
      socket.broadcast.emit('infoUser', user);
    });
  };

  io.on('connection', onConnection);
  console.log('Socket server started successfully!');
  res.end();
}
