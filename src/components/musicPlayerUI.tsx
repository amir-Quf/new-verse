"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as mm from "music-metadata-browser";
import musics from "@/utils/utils";

type RawMusic = { id: number; src: string; text: string };

interface MusicPageProps {
  id: number | string;
}

const filenameToTitle = (src: string) => {
  const base = src.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Unknown";
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const uint8ToBase64 = (u8: Uint8Array) => {
  let bin = "";
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  return typeof window !== "undefined" ? window.btoa(bin) : "";
};

const formatTime = (t: number) => {
  if (!t || Number.isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export default function MusicPage({ id }: MusicPageProps) {
  const numericId = useMemo(
    () => (typeof id === "string" ? parseInt(id, 10) : id),
    [id]
  );

  const raw = useMemo<RawMusic | undefined>(
    () => (musics as RawMusic[]).find((m) => m.id === numericId),
    [numericId]
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);

  const [metaTitle, setMetaTitle] = useState<string | null>(null);
  const [metaArtist, setMetaArtist] = useState<string | null>(null);
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!raw?.src) return;
      try {
        const res = await fetch(raw.src);
        const blob = await res.blob();
        const metadata = await mm.parseBlob(blob);
        if (canceled) return;

        setMetaTitle(metadata.common.title || null);
        setMetaArtist(metadata.common.artist || null);

        const pic = metadata.common.picture?.[0];
        if (pic?.data) {
          const b64 = uint8ToBase64(pic.data);
          setCover(`data:${pic.format};base64,${b64}`);
        } else {
          setCover(null);
        }
      } catch {
        setMetaTitle(null);
        setMetaArtist(null);
        setCover(null);
      }
    };
    run();
    return () => {
      canceled = true;
    };
  }, [raw?.src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((p) => !p);
  };

  const onLoadedMeta = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrent(audioRef.current.currentTime || 0);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const pct = Number(e.target.value);
    const seekTo = (pct / 100) * (duration || 0);
    audioRef.current.currentTime = seekTo;
    setCurrent(seekTo);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const seekBy = (sec: number) => {
    if (!audioRef.current) return;
    const next = Math.min(Math.max(0, audioRef.current.currentTime + sec), duration || 0);
    audioRef.current.currentTime = next;
    setCurrent(next);
  };

  if (!raw) return null;

  const displayTitle = metaTitle || filenameToTitle(raw.src);
  const displayArtist = metaArtist || "Unknown Artist";
  const displayProducer = "Unknown Producer";
  const displayCover = cover || "/images/default-cover.jpg";

  const progressPct = duration ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center blur-lg brightness-50"
        style={{ backgroundImage: "url('/images/new-verse-icon.jpg')" }}
      />
      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="rounded-2xl bg-black/50 shadow-2xl p-6 md:p-8 backdrop-blur-md">
          <div className="flex justify-center">
            <img
              src={displayCover}
              alt={displayTitle}
              className={`w-64 h-64 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border border-white/10 transition-transform duration-700 ease-linear ${
                isPlaying ? "spin-slow" : ""
              }`}
            />
          </div>
          <div className="text-center mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {displayTitle}
            </h1>
            <p className="mt-2 text-gray-300 text-lg">🎤 {displayArtist}</p>
            <p className="text-gray-400 text-sm">🎧 Producer: {displayProducer}</p>
          </div>
          <div className="mt-8 rounded-2xl bg-neutral-900/70 p-4 md:p-5 shadow-inner">
            <audio
              ref={audioRef}
              src={raw.src}
              onLoadedMetadata={onLoadedMeta}
              onTimeUpdate={onTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <button
                onClick={() => seekBy(-10)}
                className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition shadow"
                aria-label="Back 10 seconds"
              >
                ⏪ 10s
              </button>

              <button
                onClick={togglePlay}
                className="px-5 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition shadow-lg font-semibold"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>

              <button
                onClick={() => seekBy(10)}
                className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition shadow"
                aria-label="Forward 10 seconds"
              >
                10s ⏩
              </button>

              <a
                href={raw.src}
                download
                className="ml-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition shadow font-semibold"
              >
                ⬇ Download
              </a>
            </div>
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={100}
                value={progressPct}
                onChange={onSeek}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>{formatTime(current)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-gray-300">
              <span>🔊</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={onVolume}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="tabular-nums w-10 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-neutral-900/70 p-5 shadow-inner">
            <h2 className="text-xl font-semibold mb-3">Lyrics</h2>
            <div className="whitespace-pre-wrap leading-7 text-gray-200">
              {raw.text}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
