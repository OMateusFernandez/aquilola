const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function normalizeVideoId(value) {
  if (!value || typeof value !== 'string') return null;

  const candidate = value.trim();
  return YOUTUBE_ID_PATTERN.test(candidate) ? candidate : null;
}

export function getYouTubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;

  const directId = normalizeVideoId(url);
  if (directId) return directId;

  try {
    const parsedUrl = new URL(url.trim(), 'https://www.youtube.com');
    const host = parsedUrl.hostname.replace(/^www\./, '');
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

    if (host === 'youtu.be') {
      return normalizeVideoId(pathParts[0]);
    }

    if (host.endsWith('youtube.com')) {
      const watchId = parsedUrl.searchParams.get('v');
      if (watchId) return normalizeVideoId(watchId);

      if (pathParts[0] === 'embed' || pathParts[0] === 'shorts') {
        return normalizeVideoId(pathParts[1]);
      }
    }
  } catch {
    return null;
  }

  const fallbackMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );

  return normalizeVideoId(fallbackMatch?.[1]);
}

export function getYouTubeEmbedUrl(url, origin = '') {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    enablejsapi: '1',
    playsinline: '1',
    mute: '1',
    vq: 'hd1080',
  });

  if (origin) {
    params.set('origin', origin);
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function getYouTubeThumbnailUrl(url) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}
