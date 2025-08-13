import { notFound } from "next/navigation";

interface MusicPageProps {
  params: { id: string };
}

export default function MusicPage({ params }: MusicPageProps) {
  if (parseInt(params.id) > 10) {
    notFound();
  }

  return <div className="text-white text-2xl pt-15">music{params.id}</div>;
}
