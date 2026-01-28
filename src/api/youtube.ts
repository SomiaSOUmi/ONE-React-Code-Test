import type { Video, VideoFetcher } from "../types";

type YouTubeSearchResponse = {
  items: Array<{
    id: { videoId?: string };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        medium?: { url: string };
        high?: { url: string };
        default?: { url: string };
      };
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  items: Array<{
    snippet: {
      resourceId: { videoId: string };
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        medium?: { url: string };
        high?: { url: string };
        default?: { url: string };
      };
    };
  }>;
};

function requireEnv(name: string): string {
  const value = import.meta.env[name] as string | undefined;
  return value?.trim() ?? "";
}

function toVideo(
  id: string,
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { medium?: { url: string }; high?: { url: string }; default?: { url: string } };
  }
): Video {
  const thumb =
    snippet.thumbnails?.high?.url ||
    snippet.thumbnails?.medium?.url ||
    snippet.thumbnails?.default?.url ||
    "";

  return {
    id,
    title: snippet.title,
    description: snippet.description,
    publishedAt: snippet.publishedAt,
    thumbnailUrl: thumb,
    url: `https://www.youtube.com/watch?v=${id}`,
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`YouTube API error: ${res.status} ${res.statusText}${body ? ` — ${body}` : ""}`);
  }
  return (await res.json()) as T;
}

export const fetchYouTubeVideos: VideoFetcher = async ({ limit }) => {
  const apiKey = requireEnv("VITE_YOUTUBE_API_KEY");
  if (!apiKey) {
    throw new Error("Missing VITE_YOUTUBE_API_KEY. Copy .env to .env and set your API key.");
  }

  const playlistId = requireEnv("VITE_YOUTUBE_PLAYLIST_ID");
  const query = "Redbull Media";

  if (playlistId) {
    const url =
      "https://www.googleapis.com/youtube/v3/playlistItems" +
      `?key=${encodeURIComponent(apiKey)}` +
      "&part=snippet" +
      `&maxResults=${encodeURIComponent(String(limit))}` +
      `&playlistId=${encodeURIComponent(playlistId)}`;
    const data = await fetchJson<YouTubePlaylistItemsResponse>(url);

    const vids = data.items
      .map((it) => it.snippet)
      .filter((snip) => !!snip?.resourceId?.videoId)
      .map((snip) => toVideo(snip.resourceId.videoId, snip));

    return vids.slice(0, limit);
  }

  // Search endpoint (fallback if playlist not foundd)
  const url =
    "https://www.googleapis.com/youtube/v3/search" +
    `?key=${encodeURIComponent(apiKey)}` +
    "&part=snippet" +
    "&type=video" +
    "&order=date" +
    `&maxResults=${encodeURIComponent(String(limit))}` +
    `&q=${encodeURIComponent(query)}`;

  const data = await fetchJson<YouTubeSearchResponse>(url);

  const vids = data.items
    .map((it) => ({ id: it.id.videoId, snippet: it.snippet }))
    .filter((it) => !!it.id)
    .map((it) => toVideo(it.id!, it.snippet));

  return vids.slice(0, limit);
};
