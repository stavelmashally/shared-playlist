import { createSocketServer } from './lib/SocketServer';
import { createHttpServer } from './lib/HttpServer';
import { createExpressApp } from './lib/ExpressApp';
import { InMemoryPlaylistRepository } from './playlist/playlist.repository';
import registerPlaylistHandlers from './playlist/playlist.handlers';

const PORT = process.env.APP_PORT || 5000;

// Scaling:
// Create multiple server instances.
// Distribute the socket connections between them.
// Use redis/mongo for storing the connections
const expressApp = createExpressApp();
const httpServer = createHttpServer(expressApp);
const socketServer = createSocketServer(httpServer);

// Replace with a real database for production use
const playlistRepository = new InMemoryPlaylistRepository();

httpServer.listen(PORT, () => {
  socketServer.on('connection', clientSocket => {
    registerPlaylistHandlers(socketServer, clientSocket, playlistRepository);
  });
  console.log(`Server listening on port ${PORT}`);
});
