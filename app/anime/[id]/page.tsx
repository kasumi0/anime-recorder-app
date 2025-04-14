import { AnimeDetail } from "@/app/features/animeDetail/AnimeDetail";
import { notFound } from "next/navigation";

type AnimePageProps = {
  params: { id: string };
};

export default async function AnimePage({ params }: AnimePageProps) {
  const id = parseInt(params.id, 10);
   if (isNaN(id)) notFound();

   return <AnimeDetail id={id} />
}