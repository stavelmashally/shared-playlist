import { Video } from './playlist/interfaces';

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
