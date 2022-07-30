import { Video } from './interfaces';

export class InMemoryPlaylistRepository {
  private readonly playlist: Map<string, Video> = new Map();

  add(video: Video): Promise<void> {
    this.playlist.set(video.id, video);
    return Promise.resolve();
  }

  getAll(): Promise<Video[]> {
    const videos = Array.from(this.playlist.values());
    return Promise.resolve(videos);
  }

  getById(id: string): Promise<Video | undefined> {
    const video = this.playlist.get(id);
    return Promise.resolve(video);
  }

  deleteById(id: string): Promise<void> {
    const deleted = this.playlist.delete(id);
    if (deleted) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Video not found'));
  }
}
