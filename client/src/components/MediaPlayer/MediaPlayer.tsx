import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { usePlaylist } from '../../providers/PlaylistProvider';

const MediaPlayer = () => {
  const { selectedVideo, onVideoEnded } = usePlaylist();
  const playerRef = useRef<ReactPlayer>(null);

  return (
    <Flex
      w='100%'
      minW={500}
      h={700}
      border='1px'
      borderColor='gray.300'
      borderRadius={8}
      justifyContent='center'
      alignItems='center'
    >
      {selectedVideo ? (
        <ReactPlayer
          ref={playerRef}
          playing
          controls
          width='100%'
          height={700}
          url={selectedVideo?.url}
          onEnded={() => onVideoEnded(selectedVideo?.id)}
        />
      ) : (
        <Box p={8}>
          <Heading as='h3' size='md' color='gray.600'>
            No videos yet.
          </Heading>
          <Text color='gray.500'>Add a video to get started.</Text>
        </Box>
      )}
    </Flex>
  );
};

export default MediaPlayer;
