"use client";

import { useState } from "react";

export default function HeroSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError("");
      setVideoUrl("");
    } catch {
      setError("Unable to read clipboard. Please paste the URL manually.");
    }
  }

  async function handleDownload() {
    if (!url.trim()) {
      setError("Please paste a LinkedIn post URL first.");
      return;
    }

    setLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to extract video. Please try again.");
        return;
      }

      setVideoUrl(data.videoUrl);
      setVideoTitle(data.title || "LinkedIn Video");
    } catch {
      setError("Something went wrong. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  function triggerDownload() {
    if (!videoUrl) return;
    const a = document.createElement("a");
    a.href = videoUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.download = `${videoTitle || "linkedin-video"}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <section className="bg-gradient-to-b from-[var(--color-primary-light)] to-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          LinkedIn Video Downloader
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          Download LinkedIn video in the best quality, no limits and for free.
        </p>

        <div className="mt-8 max-w-2xl mx-auto">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
              setVideoUrl("");
            }}
            placeholder="Paste LinkedIn post URL here..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base"
          />
          <div className="mt-3 flex flex-row gap-3">
            <button
              onClick={handlePaste}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer text-base"
            >
              Paste
            </button>
            <button
              onClick={handleDownload}
              disabled={loading}
              className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-base"
            >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Download"
            )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {videoUrl && (
          <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-lg max-w-2xl mx-auto">
            <p className="text-sm text-gray-500 mb-3">
              {videoTitle || "Video ready for download"}
            </p>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg mb-4 max-h-80"
            />
            <button
              onClick={triggerDownload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Video
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
