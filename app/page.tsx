import { Top } from "./features/top/Top";

type SearchParamsType = {
  searchParams?: { query?: string };
};

export default function Home({ searchParams }: SearchParamsType) {
  return <Top searchParams={searchParams} />;
}
