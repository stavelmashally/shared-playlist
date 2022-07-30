import { Video } from './interfaces';
import type { AppSocket, SocketServer } from '../lib/SocketServer';
import { InMemoryPlaylistRepository } from './playlist.repository';
import * as YoutubeService from '../services/YoutubeService';

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
    try {
      const { id, title, duration } = await YoutubeService.getVideoDetails(
        videoUrl
      );

      const exists = await playlistRepository.getById(id);
      if (exists) return;

      const newVideo: Video = {
        id,
        name: title,
        duration,
        url: videoUrl,
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
