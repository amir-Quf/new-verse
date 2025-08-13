"use client";

import React, { useState, useRef, useEffect } from "react";
import * as mm from "music-metadata-browser";
import { Play, Pause, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface IMusicPlayerProps {
  src: string;
  id: number;
}

export default function MusicPlayer({ src, id }: IMusicPlayerProps) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackTitle, setTrackTitle] = useState("Unknown Track");
  const [artistName, setArtistName] = useState("Unknown Artist");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndPrepare() {
      try {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();

        const metadata = await mm.parseBuffer(
          new Uint8Array(arrayBuffer),
          "audio/mpeg"
        );
        setTrackTitle(metadata.common.title || "Unknown Track");
        setArtistName(metadata.common.artist || "Unknown Artist");

        if (metadata.common.picture?.length) {
          const picture = metadata.common.picture[0];
          const blob = new Blob([picture.data], { type: picture.format });
          setCoverUrl(URL.createObjectURL(blob));
        }

        const audioBlob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        setBlobUrl(URL.createObjectURL(audioBlob));
      } catch (error) {
        console.error("Error reading metadata:", error);
      }
    }

    fetchAndPrepare();

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از هدایت
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // جلوگیری از هدایت
    if (!blobUrl) return;
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = trackTitle + ".mp3";
    link.click();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // جلوگیری از هدایت
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  const handleSelectMusic = () => {
    router.push(`/playList/${id}`);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const seekStopPropagationHandler = (e : React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className="relative p-4 rounded-lg text-white overflow-hidden my-4 cursor-pointer"
      onClick={handleSelectMusic}
      style={{
        backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative flex justify-between items-start z-10">
        <div className="flex items-center gap-3">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={trackTitle}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-600" />
          )}
          <div>
            <h3 className="font-bold">{trackTitle}</h3>
            <p className="text-sm text-gray-300">{artistName}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={togglePlay}
            className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      <div onClick={seekStopPropagationHandler} className="mt-4 relative z-10">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-sm text-gray-300 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={blobUrl || undefined}
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current?.currentTime || 0)
        }
        onLoadedMetadata={() => {
          const dur = audioRef.current?.duration;
          if (dur && !isNaN(dur)) setDuration(dur);
        }}
        preload="metadata"
      />
    </div>
  );
}
