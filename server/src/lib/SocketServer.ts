import { Server, Socket } from 'socket.io';
import type { Server as HttpsServer } from 'http';
import type { Video } from '../playlist/interfaces';

export interface ClientToServerEvents {
  getPlaylist: () => void;
  addVideo: (videoUrl: string) => void;
  deleteVideo: (videoId: string) => void;
}

export interface ServerToClientEvents {
  getPlaylist: (playlist: Video[]) => void;
  addVideo: (videoUrl: Video) => void;
  deleteVideo: (videoId: string) => void;
}

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
