import { useInfiniteQuery } from "@tanstack/react-query";

import { Repository } from "@/src/feature/search/types/repossitory";

const getSearchRepoQueryKey = (search: string, perPage: number) => [
  "searchRepo",
  search,
  perPage,
];

interface SearchRepositoriesReturnType {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export default function useSearchRepoInfiniteQuery(
  search: string,
  perPage = 10,
) {
  return useInfiniteQuery({
    queryKey: getSearchRepoQueryKey(search, perPage),
    queryFn: ({ signal, pageParam }) =>
      getReposByQuery(search, signal, pageParam, perPage),
    initialPageParam: 1,
    select: (data) => {
      return data?.pages.flatMap((page) => page.items) ?? [];
    },
    getNextPageParam: (lastPage, allPages, page) => {
      const loadedItemsAproximateCount = allPages.length * perPage;
      return lastPage.total_count > loadedItemsAproximateCount
        ? page + 1
        : undefined;
    },
    enabled: !!search,
  });
}

const getReposByQuery = async (
  search: string,
  signal: AbortSignal,
  pageParam: number,
  perPage = 100,
): Promise<SearchRepositoriesReturnType> => {
  const url = new URL("https://api.github.com/search/repositories");

  url.searchParams.set("q", search);
  url.searchParams.set("page", String(pageParam));
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url, { signal });
  return await response.json();
};
