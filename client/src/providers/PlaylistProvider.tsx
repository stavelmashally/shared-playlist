import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import socket from '../lib/websocket';
import { Video } from '../interfaces/video';

interface PlaylistState {
  videos: Video[];
  selectedVideo?: Video;
  addVideo: (videoUrl: string) => void;
  deleteVideo: (videoId: string) => void;
  onVideoEnded: (videoId: string) => void;
}

const PlaylistContext = createContext<PlaylistState>(undefined!);

interface PlaylistProviderProps {
  children: React.ReactNode;
}

export function PlaylistProvider({ children }: PlaylistProviderProps) {
  const [videos, setVideos] = useState<Video[]>([]);

  const addVideo = useCallback((videoUrl: string) => {
    socket.emit('addVideo', videoUrl);
  }, []);

  const deleteVideo = useCallback((videoId: string) => {
    setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    socket.emit('deleteVideo', videoId);
  }, []);

  const onVideoEnded = useCallback((videoId: string) => {
    setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    socket.emit('deleteVideo', videoId);
  }, []);

  const value = useMemo(
    () => ({
      videos,
      addVideo,
      deleteVideo,
      onVideoEnded,
      selectedVideo: videos[0],
    }),
    [videos]
  );

  useEffect(() => {
    socket.emit('getPlaylist');

    socket.on('getPlaylist', playlist => {
      setVideos(playlist);
    });

    socket.on('addVideo', newVideo => {
      setVideos(prevVideos => [...prevVideos, newVideo]);
    });

    socket.on('deleteVideo', videoId => {
      setVideos(prevVideos => prevVideos.filter(video => video.id !== videoId));
    });

    return () => {
      socket.off('getPlaylist');
      socket.off('addVideo');
      socket.off('deleteVideo');
    };
  }, []);

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
}

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};
