import {
  Flex,
  List,
  ListItem,
  Text,
  Heading,
  ListIcon,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Video } from '../../interfaces/video';

interface VideoListProps {
  videos: Video[];
  selectedVideoId?: string;
  onDelete: (id: string) => void;
}

const VideoList = ({ videos, onDelete, selectedVideoId }: VideoListProps) => {
  return (
    <List overflow='auto'>
      {videos.map(video => (
        <VideoItem
          key={video.id}
          video={video}
          active={video.id === selectedVideoId}
          onDelete={() => onDelete(video.id)}
        />
      ))}
    </List>
  );
};

interface VideoItemProps {
  video: Video;
  active?: boolean;
  onDelete: () => void;
}

const VideoItem = ({ video, active, onDelete }: VideoItemProps) => {
  return (
    <ListItem
      px={6}
      py={4}
      borderTop='1px'
      borderColor='gray.500'
      cursor='pointer'
      bg={active ? 'gray.200' : 'white'}
      _hover={{ bg: 'gray.200' }}
    >
      <Flex justify='space-between' alignItems='center' gap={4}>
        <Heading as='h3' size='sm' noOfLines={1}>
          {video.name}
        </Heading>
        <Text fontSize='sm'>02:50</Text>
        <ListIcon
          as={DeleteIcon}
          color='gray.500'
          _hover={{
            color: 'gray.700',
          }}
          onClick={onDelete}
        />
      </Flex>
    </ListItem>
  );
};

export default VideoList;
