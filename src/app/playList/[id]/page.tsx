import Container from "@/components/container";
import { notFound } from "next/navigation";
import musics from "@/utils/utils";
import * as mm from "music-metadata-browser";
import fs from "fs";
import path from "path";
import MusicPlayerUI from "@/components/musicPlayerUI";

export interface IParameter {
  title: string;
  artist: string;
  producer: string;
  lyrics?: string;
  audioSrc: string;
  cover?: string;
}

export interface IMusicItem {
  id: number;
  title: string;
  artist: string;
  producer: string;
  lyrics?: string;
  src: string; // مسیر فایل mp3
}



function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary, 'binary').toString('base64');
}

interface PageProps {
  params: { id: string };
}

export default async function MusicPage({ params }: PageProps) {
  const musicSelected: IMusicItem | undefined = musics.find(
    (music) => music.id === parseInt(params.id)
  );

  if (!musicSelected) {
    notFound();
  }

  // مسیر فایل mp3
  const filePath = path.join(process.cwd(), "public", musicSelected.src);
  const fileBuffer = fs.readFileSync(filePath);

  // استخراج کاور از فایل
  const metadata = await mm.parseBuffer(new Uint8Array(fileBuffer), "audio/mpeg");
  let coverSrc: string | undefined;
  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const picture = metadata.common.picture[0];
    coverSrc = `data:${picture.format};base64,${arrayBufferToBase64(picture.data)}`;
  }

  // آبجکت Type-safe
  const paramsData: IParameter = {
    title: musicSelected.title,
    artist: musicSelected.artist,
    producer: musicSelected.producer,
    lyrics: musicSelected.lyrics,
    audioSrc: musicSelected.src,
    cover: coverSrc,
  };

  return (
    <Container>
      <MusicPlayerUI id={parseInt(params.id)}/>
    </Container>
  );
}
