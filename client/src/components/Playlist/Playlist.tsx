import { Flex } from '@chakra-ui/react';
import { usePlaylist } from '../../providers/PlaylistProvider';
import AddSongForm from '../AddVideoForm';
import VideoList from '../VideoList';

const Playlist = () => {
  const { videos, addVideo, selectedVideo, deleteVideo } = usePlaylist();

  return (
    <Flex
      h={700}
      w={['100%', '100%', '50%', '50%']}
      py={8}
      direction='column'
      gap='8'
      border='1px'
      borderColor='gray.500'
      borderRadius='lg'
    >
      <AddSongForm onSubmit={addVideo} />
      <VideoList
        videos={videos}
        selectedVideoId={selectedVideo?.id}
        onSelect={() => {}}
        onDelete={deleteVideo}
      />
    </Flex>
  );
};

export default Playlist;
