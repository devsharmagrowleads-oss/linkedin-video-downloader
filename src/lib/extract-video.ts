import * as cheerio from "cheerio";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function isValidLinkedInUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "www.linkedin.com" ||
      parsed.hostname === "linkedin.com"
    );
  } catch {
    return false;
  }
}

export interface VideoResult {
  videoUrl: string;
  title?: string;
}

export async function extractVideoUrl(url: string): Promise<VideoResult> {
  if (!isValidLinkedInUrl(url)) {
    throw new Error("Invalid LinkedIn URL. Please provide a valid LinkedIn post link.");
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch LinkedIn page (status ${response.status}).`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Strategy 1: og:video meta tag
  const ogVideo =
    $('meta[property="og:video"]').attr("content") ||
    $('meta[property="og:video:url"]').attr("content") ||
    $('meta[property="og:video:secure_url"]').attr("content");

  if (ogVideo) {
    const title = $('meta[property="og:title"]').attr("content") || undefined;
    return { videoUrl: ogVideo, title };
  }

  // Strategy 2: JSON-LD VideoObject
  const jsonLdScripts = $('script[type="application/ld+json"]');
  for (let i = 0; i < jsonLdScripts.length; i++) {
    try {
      const data = JSON.parse($(jsonLdScripts[i]).html() || "");
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item["@type"] === "VideoObject" && item.contentUrl) {
          return { videoUrl: item.contentUrl, title: item.name };
        }
      }
    } catch {
      // skip invalid JSON
    }
  }

  // Strategy 3: data-sources attribute on video elements
  const dataSources = $("video[data-sources]").attr("data-sources");
  if (dataSources) {
    try {
      const sources = JSON.parse(dataSources);
      if (Array.isArray(sources) && sources.length > 0) {
        const best = sources.reduce(
          (a: { data: { width: number } }, b: { data: { width: number } }) =>
            (b.data?.width || 0) > (a.data?.width || 0) ? b : a,
          sources[0]
        );
        if (best.src) {
          return { videoUrl: best.src };
        }
      }
    } catch {
      // skip
    }
  }

  // Strategy 4: video source tags
  const videoSrc =
    $("video source").attr("src") || $("video").attr("src");
  if (videoSrc) {
    return { videoUrl: videoSrc };
  }

  // Strategy 5: regex scan for LinkedIn CDN video URLs
  const cdnPattern =
    /https?:\/\/[a-zA-Z0-9\-_.]+(?:licdn\.com|linkedin\.com)[^\s"'<>]*\.mp4[^\s"'<>]*/g;
  const matches = html.match(cdnPattern);
  if (matches && matches.length > 0) {
    // Decode HTML entities
    const decoded = matches[0].replace(/&amp;/g, "&");
    return { videoUrl: decoded };
  }

  throw new Error(
    "No video found in this LinkedIn post. Make sure the post contains a video and is publicly accessible."
  );
}
