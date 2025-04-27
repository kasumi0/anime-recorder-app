import { AnimeDetail } from "@/app/features/animeDetail/AnimeDetail";

type AnimePageProps = {
  params: Promise<{ id: string }>;
};

export default async function AnimePage({ params }: AnimePageProps) {
  const {id} = await params;

  return <AnimeDetail id={parseInt(id, 10)} />;
}
