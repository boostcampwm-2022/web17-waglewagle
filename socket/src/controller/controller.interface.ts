import { SocketCarrier } from '../utils/util';

export interface ControllerInterface {
  register(socketCarrier: SocketCarrier): void;
}
