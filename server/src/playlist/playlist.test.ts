import { Server as HttpServer } from 'http';
import { AddressInfo } from 'net';
import { Server } from 'socket.io';
import { io as Client, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../events';
import { createExpressApp } from '../lib/ExpressApp';
import { createHttpServer } from '../lib/HttpServer';
import { createSocketServer, AppSocket } from '../lib/SocketServer';
import { Video } from './interfaces';

describe('playlist', () => {
  let httpServer: HttpServer,
    io: Server<ServerToClientEvents, ClientToServerEvents>,
    serverSocket: AppSocket,
    clientSocket: Socket<ServerToClientEvents, ClientToServerEvents>;

  beforeAll(done => {
    httpServer = createHttpServer(createExpressApp());
    io = createSocketServer(httpServer);

    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = Client(`http://localhost:${port}`);

      io.on('connection', socket => {
        serverSocket = socket;
      });

      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should get a playlist', done => {
    const videos: Video[] = [
      {
        id: '1',
        name: 'test',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '02:00',
      },
    ];
    clientSocket.on('getPlaylist', playlist => {
      expect(playlist).toEqual(videos);
      done();
    });
    serverSocket.emit('getPlaylist', videos);
  });

  it('should delete a video', done => {
    const videoId = '123';
    clientSocket.on('deleteVideo', id => {
      expect(id).toBe(videoId);
      done();
    });
    serverSocket.emit('deleteVideo', videoId);
  });
});
