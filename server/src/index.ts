import { createSocketServer } from './lib/SocketServer';
import { createHttpServer } from './lib/HttpServer';
import { createExpressApp } from './lib/ExpressApp';
import { InMemoryPlaylistRepository } from './playlist/playlist.repository';
import registerPlaylistHandlers from './playlist/playlist.handlers';

const PORT = process.env.APP_PORT || 5000;

const expressApp = createExpressApp();
const httpServer = createHttpServer(expressApp);
const socketServer = createSocketServer(httpServer);
const playlistRepository = new InMemoryPlaylistRepository();

socketServer.on('connection', clientSocket => {
  registerPlaylistHandlers(socketServer, clientSocket, playlistRepository);
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
