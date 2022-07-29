import { Flex } from '@chakra-ui/react';
import MediaPlayer from './components/MediaPlayer';
import Playlist from './components/Playlist';
import { PlaylistProvider } from './providers/PlaylistProvider';

function App() {
  return (
    <Flex h='100vh' m='0 auto' alignItems='center' gap={8} py={12} px={16}>
      <PlaylistProvider>
        <Playlist />
        <MediaPlayer />
      </PlaylistProvider>
    </Flex>
  );
}

export default App;
