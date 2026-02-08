import { useQuery } from "@tanstack/react-query";

import { Repository } from "@/src/feature/search/types/repossitory";

const getSearchRepoQueryKey = (search: string) => ["searchRepo", search];

interface SearchRepositoriesReturnType {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export default function useSearchRepoQuery(search: string) {
  return useQuery({
    queryKey: getSearchRepoQueryKey(search),
    queryFn: ({ signal }) => getReposByQuery(search, signal),
    enabled: !!search,
  });
}

const getReposByQuery = async (
  search: string,
  signal: AbortSignal,
  perPage = 100,
): Promise<SearchRepositoriesReturnType> => {
  const url = new URL("https://api.github.com/search/repositories");

  url.searchParams.set("q", search);
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url, { signal });
  return await response.json();
};
