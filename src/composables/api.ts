import axios from 'axios';
import { Thumbnail } from '@/models/videoModel';

/**
 * YouTube API
 * @see https://developers.google.com/youtube/v3/docs
 */
export function useApi() {
  /**
   * Google Services API Key
   */
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  /**
   * Base URL for the YouTube Data API
   */
  const baseUrl = 'https://www.googleapis.com/youtube/v3';

  /**
   * Regex for matching the Video ID from a YouTube URL
   */
  const regExp = /^(?:https?:\/\/|\/)?(?:www\.|m\.|.+\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|feeds\/api\/videos\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?![\w-])/;

  /**
   * Resolves the video ID from a YouTube URL (Supports most YouTube URLs)
   * @param url - The YouTube URL
   */
  const resolveVideoId = (url: string) => {
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  /**
   * Gets the video information by ID from the YouTube Data API
   * @param videoId - The YouTube video ID
   */
  const getVideoById = async (videoId: string) => {
    const url = `${baseUrl}/videos?part=snippet&part=contentDetails&id=${videoId}&key=${apiKey}`;
    return axios.get(url);
  };

  /**
   * Gets the video information by URL from the YouTube Data API
   * @param url - The YouTube URL
   */
  const getVideoByURL = async (url: string) => {
    const videoId = resolveVideoId(url);
    if (!videoId) throw new Error('Invalid YouTube URL');

    return getVideoById(videoId);
  };

  /**
   * Formats the ISO 8601 duration given by the YouTube API for its correct display format.
   * @param duration - The ISO 8601 duration given by the YouTube API
   */
  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    /**
     * If the duration is invalid, throw an error (should never happen)
     */
    if (!match) {
      throw new Error(`Invalid YouTube video duration: ${duration}`);
    }

    /**
     * Parse the duration into hours, minutes, and seconds (if applicable)
     */
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    /**
     * Format the duration into a string with hours, minutes, and seconds (if applicable)
     */
    const hourString = hours ? `${hours}:` : '';
    const minuteString = `${hours && minutes < 10 ? '0' : ''}${minutes}:`;
    const secondString = `${seconds < 10 ? '0' : ''}${seconds}`;

    return `${hourString}${minuteString}${secondString}`;
  };

  /**
   * Resolves the thumbnail from the YouTube API response
   * Ever return the highest quality thumbnail available
   * @param thumbnails - The thumbnails object from the YouTube API response
   */
  const resolveThumbnail = (thumbnails: Partial<{ maxres: Thumbnail; standard: Thumbnail;
    high: Thumbnail; medium: Thumbnail; default: Thumbnail; }>) => thumbnails.maxres || thumbnails.standard
    || thumbnails.high || thumbnails.medium || thumbnails.default;

  /**
   * Resolves the YouTube URL from the video ID
   * @param videoId - The YouTube video ID
   */
  const resolveURL = (videoId: string): string => `https://www.youtube-nocookie.com/embed/${videoId}`;

  return {
    resolveVideoId, getVideoById, getVideoByURL, formatDuration, resolveThumbnail, resolveURL,
  };
}
