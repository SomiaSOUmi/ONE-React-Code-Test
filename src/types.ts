export type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  url: string;
};

export type VideoFetchParams = {
  limit: number;
};

export type VideoFetcher = (params: VideoFetchParams) => Promise<Video[]>;
