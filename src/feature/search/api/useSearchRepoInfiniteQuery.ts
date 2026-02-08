import { useInfiniteQuery } from "@tanstack/react-query";

import { Repository } from "@/src/feature/search/types/repository";
import { getRequestUnauthorized } from "@/src/utils/http";

const GITHUB_SEARCH_REPOS_URL = "https://api.github.com/search/repositories";

const PER_PAGE = 10;

export const getSearchRepoQueryKey = (search: string, perPage = PER_PAGE) => [
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
  perPage = PER_PAGE,
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

const getReposByQuery = (
  search: string,
  signal: AbortSignal,
  pageParam: number,
  perPage: number,
): Promise<SearchRepositoriesReturnType> => {
  return getRequestUnauthorized<SearchRepositoriesReturnType>(
    GITHUB_SEARCH_REPOS_URL,
    {
      params: {
        q: search,
        page: String(pageParam),
        per_page: String(perPage),
      },
      signal,
    },
  );
};
