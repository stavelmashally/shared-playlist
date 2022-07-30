import {
  List,
  ListItem,
  Text,
  Heading,
  ListIcon,
  Grid,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Video } from '../../interfaces/video';

interface VideoListProps {
  videos: Video[];
  selectedVideoId?: string;
  onSelect: (videoId: string) => void;
  onDelete: (id: string) => void;
}

const VideoList = ({
  videos,
  onDelete,
  onSelect,
  selectedVideoId,
}: VideoListProps) => {
  return (
    <List overflow='auto'>
      {videos.map(video => (
        <VideoItem
          key={video.id}
          video={video}
          active={video.id === selectedVideoId}
          onClick={() => onSelect(video.id)}
          onDelete={() => onDelete(video.id)}
        />
      ))}
    </List>
  );
};

interface VideoItemProps {
  video: Video;
  active?: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const VideoItem = ({ video, active, onDelete, onClick }: VideoItemProps) => {
  return (
    <ListItem
      px={6}
      py={4}
      borderTop='1px'
      borderColor='gray.500'
      cursor='pointer'
      bg={active ? 'gray.200' : 'white'}
      _hover={{ bg: 'gray.200' }}
      onClick={onClick}
    >
      <Grid templateColumns='8fr 2fr 1fr' alignItems='center' gap={2}>
        <Heading as='h3' size='sm' noOfLines={1}>
          {video.name}
        </Heading>
        <Text fontSize='sm'>{video.duration}</Text>
        <ListIcon
          as={DeleteIcon}
          color='gray.500'
          _hover={{
            color: 'gray.700',
          }}
          onClick={onDelete}
        />
      </Grid>
    </ListItem>
  );
};

export default VideoList;
