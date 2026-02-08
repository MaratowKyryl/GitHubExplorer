import { useState } from "react";

import RepositoriesListEmpty from "./components/RepositoriesListEmpty";
import RepositoryListItem from "./components/RepositoryListItem";
import { Repository } from "./types/repossitory";

import useSearchRepoInfiniteQuery from "@/src/feature/search/api/useSearchRepoInfiniteQuery";
import { useDebouncedCallback } from "@/src/hooks/useDebouncedCallback";
import { List, Screen, SearchBar } from "@/src/ui";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const onSearchChange = useDebouncedCallback(setSearch, 500);

  const {
    data: repos,
    fetchNextPage,
    isLoading,
    isError,
  } = useSearchRepoInfiniteQuery(search);

  const renderRepositoryItem = ({ item }: { item: Repository }) => (
    <RepositoryListItem repository={item as Repository} />
  );

  return (
    <Screen style={{ padding: 16 }} edges={["left", "right", "bottom"]}>
      <List
        ListHeaderComponent={<SearchBar onChangeText={onSearchChange} />}
        ListEmptyComponent={
          <RepositoriesListEmpty
            isLoading={isLoading}
            isError={isError}
            noResults={repos?.length === 0}
          />
        }
        estimatedItemSize={138}
        data={repos || []}
        renderItem={renderRepositoryItem}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
      />
    </Screen>
  );
}
