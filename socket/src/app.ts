import { ControllerInterface } from './controller/controller.interface';
import * as socketIo from 'socket.io';
import http from 'http';
import dataSource from './repository/data-source';
import { SocketWithUserId } from './types/socket.types';

export default class App {
  dataSource = dataSource;
  httpServer: http.Server;
  io: socketIo.Server;

  constructor(controllers: ControllerInterface[]) {
    this.httpServer = http.createServer();
    this.io = new socketIo.Server(this.httpServer, {});

    this.io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId;
      if (Array.isArray(userId)) {
        socket.disconnect();
        return;
      }

      const mySocket = <SocketWithUserId>socket;
      mySocket.userId = userId;

      controllers.forEach((controller) => {
        controller.register(mySocket);
      });
    });
  }

  listen(port: number) {
    this.dataSource.initialize().then(() => {
      this.httpServer.listen(port);
    });
  }
}
