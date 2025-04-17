import { AnimeDetail } from "@/app/features/animeDetail/AnimeDetail";

type AnimePageProps = {
  params: { id: string };
};

export default async function AnimePage({ params }: AnimePageProps) {
  const id = parseInt(params.id, 10);

   return <AnimeDetail id={id} />
}