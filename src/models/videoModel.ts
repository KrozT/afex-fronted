import { Thumbnail } from '@/models/thumbModel';

export type Video = {
  id: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: Date;
    thumbnail: Thumbnail;
    title: string;
  };
  contentDetails: {
    duration: string;
  };
  addedAt: Date;
};
