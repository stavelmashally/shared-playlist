import axios from 'axios';
import { URL, URLSearchParams } from 'url';

// store in .env file
const API_KEY = 'AIzaSyDIr1SMlEzWe_z-sRf6tDMUgWT5IAuctkM';

const getDuration = (durationString = '') => {
  const durationParts = durationString
    .replace('PT', '')
    .replace('H', ':')
    .replace('M', ':')
    .replace('S', '')
    .split(':');

  if (durationParts.length === 3) {
    return `${durationParts[0]}:${durationParts[1]}:${durationParts[2]}`;
  }

  if (durationParts.length === 2) {
    return `${durationParts[0]}:${durationParts[1]}`;
  }

  return `00:${durationParts[0]}`;
};

export const getYouTubeId = (url: string) => {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
};

export const getVideoDetails = async (youtubeVideoUrl = '') => {
  const youtubeVideoId = getYouTubeId(youtubeVideoUrl);
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.search = new URLSearchParams({
    key: API_KEY,
    part: 'snippet,contentDetails',
    id: youtubeVideoId,
  }).toString();

  try {
    const { data } = await axios.get(url.toString());
    const video = data?.items[0] || [];
    const title: string = video.snippet?.title || '';
    const duration = getDuration(video.contentDetails?.duration);
    return { id: youtubeVideoId, title, duration };
  } catch (error) {
    console.warn(error);
    return { id: youtubeVideoUrl, title: youtubeVideoUrl, duration: '' };
  }
};
