import * as socketIo from 'socket.io';

class SocketCarrier {
  constructor(readonly socket: socketIo.Socket, readonly userId: string) {}
}

const createSuccessfulResponseTemplate = (data: any) => ({
  success: true,
  data,
});

const createFailedResponseTemplate = (error: any) => ({
  success: false,
  error,
});

export { SocketCarrier, createSuccessfulResponseTemplate, createFailedResponseTemplate };
