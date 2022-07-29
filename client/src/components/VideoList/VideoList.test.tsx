import { fireEvent, render } from '@testing-library/react';
import { Video } from '../../interfaces/video';
import VideoList from './VideoList';

describe('VideoList', () => {
  const videos: Video[] = [
    {
      id: '1',
      name: 'Video 1',
      duration: '1:00',
      url: 'https://www.youtube.com/watch?v=1',
    },
    {
      id: '2',
      name: 'Video 2',
      duration: '2:00',
      url: 'https://www.youtube.com/watch?v=2',
    },
  ];

  it('renders', () => {
    const { getByRole } = render(
      <VideoList videos={[]} onSelect={() => {}} onDelete={() => {}} />
    );

    expect(getByRole('list')).toBeInTheDocument();
  });

  it('renders video list items', () => {
    const { getAllByRole } = render(
      <VideoList videos={videos} onSelect={() => {}} onDelete={() => {}} />
    );

    expect(getAllByRole('listitem')).toHaveLength(2);
  });
});
