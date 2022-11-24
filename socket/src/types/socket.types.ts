import { Socket } from 'socket.io';

interface SocketWithUserId extends Socket {
  userId?: string;
}

export { SocketWithUserId };
