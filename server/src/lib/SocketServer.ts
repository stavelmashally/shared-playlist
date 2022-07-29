import { Server, Socket } from 'socket.io';
import type { Server as HttpsServer } from 'http';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../events';

const config = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
};

const createSocketServer = (server: HttpsServer) => {
  const socketServer = new Server<ClientToServerEvents, ServerToClientEvents>(
    server,
    config
  );

  return socketServer;
};

type SocketServer = ReturnType<typeof createSocketServer>;
type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export { createSocketServer, SocketServer, AppSocket };
