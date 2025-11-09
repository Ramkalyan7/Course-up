import axios from 'axios';

interface YoutubeVideo {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  url: string;
}

export async function fetchYoutubeVideos(
  searchTerm: string,
  maxResults: number = 2
): Promise<YoutubeVideo[]> {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error('YOUTUBE_API_KEY is not set in environment variables');
    }

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          q: searchTerm,
          type: 'video',
          maxResults: maxResults,
          order: 'relevance',
          key: process.env.YOUTUBE_API_KEY
        },
        timeout: 10000 
      }
    );

    if (!response.data.items || response.data.items.length === 0) {
      console.warn(`No videos found for search term: "${searchTerm}"`);
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('YouTube API: Access forbidden. Check your API key.');
      }
      if (error.response?.status === 400) {
        throw new Error(`YouTube API: Bad request for search term "${searchTerm}"`);
      }
      if (error.code === 'ECONNABORTED') {
        throw new Error('YouTube API: Request timeout');
      }
      throw new Error(`YouTube API error: ${error.message}`);
    }
    throw error;
  }
}
