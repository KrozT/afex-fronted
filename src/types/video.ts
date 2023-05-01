export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

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
