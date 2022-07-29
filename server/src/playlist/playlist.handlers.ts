import { google } from 'googleapis';
import { Video } from './interfaces';
import type { AppSocket, SocketServer } from '../lib/SocketServer';
import { InMemoryPlaylistRepository } from './playlist.repository';
import { getYouTubeId } from '../utils';

// store in .env file
const API_KEY = 'AIzaSyDIr1SMlEzWe_z-sRf6tDMUgWT5IAuctkM';

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

export default (
  socketServer: SocketServer,
  clientSocket: AppSocket,
  playlistRepository: InMemoryPlaylistRepository
) => {
  clientSocket.on('getPlaylist', async () => {
    try {
      const videos = await playlistRepository.getAll();
      clientSocket.emit('getPlaylist', videos);
    } catch (error) {}
  });

  clientSocket.on('addVideo', async videoUrl => {
    const id = getYouTubeId(videoUrl);

    try {
      const { data } = await youtube.search.list({
        q: id,
        part: ['snippet'],
        type: ['video'],
      });

      const newVideo: Video = {
        id,
        name: data.items![0]!.snippet!.title ?? videoUrl,
        url: videoUrl,
        duration: '02:00',
      };

      await playlistRepository.add(newVideo);
      socketServer.emit('addVideo', newVideo);
    } catch (error) {}
  });

  clientSocket.on('deleteVideo', async videoId => {
    try {
      await playlistRepository.deleteById(videoId);
      clientSocket.broadcast.emit('deleteVideo', videoId);
    } catch (error) {}
  });
};
