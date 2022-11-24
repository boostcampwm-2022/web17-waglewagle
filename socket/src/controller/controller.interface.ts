import { SocketWithUserId } from '../types/socket.types';

export interface ControllerInterface {
  register(socket: SocketWithUserId): void;
}
