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
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/my_socket',
  });
  res.socket.server.io = io;

  const onConnection = (socket: Socket) => {
    sockets[socket.id] = socket;

    socket.on('disconnect', () => {
      delete sockets[socket.id];
    });

    socket.on('sendData', (user) => {
      socket.broadcast.emit('infoUser', user);
    });
  };

  io.on('connection', onConnection);
  res.end();
}
