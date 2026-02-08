import useSearchRepoInfiniteQuery from "@/src/feature/search/api/useSearchRepoInfiniteQuery";

export default function useRepoDetailsFromQueryCache(
  id: string,
  search: string,
) {
  const { data } = useSearchRepoInfiniteQuery(search);
  // console.log(data?.find((item) => item.id.toString() === id));

  return data?.find((item) => item.id.toString() === id);
}
