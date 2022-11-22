import * as socketIo from 'socket.io';
import http from 'http';
import { SocketCarrier } from './utils/util';
import KeywordController from './controller/Keyword.Controller';

export default class App {
  httpServer: http.Server;
  io: socketIo.Server;

  constructor() {
    this.httpServer = http.createServer();
    this.io = new socketIo.Server(this.httpServer, {});
    this.io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId as string;
      const socketCarrier = new SocketCarrier(socket, userId);

      KeywordController.register(socketCarrier);
    });
  }

  listen(port: number) {
    this.httpServer.listen(port);
  }
}
