import { useState } from "react";

import RepositoriesListEmpty from "./components/RepositoriesListEmpty";
import RepositoryListItem from "./components/RepositoryListItem";
import { Repository } from "./types/repossitory";

import useSearchRepoQuery from "@/src/feature/search/api/useSearchRepoQuery";
import { useDebouncedCallback } from "@/src/hooks/useDebouncedCallback";
import { List, Screen, SearchBar } from "@/src/ui";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const onSearchChange = useDebouncedCallback(setSearch, 500);

  const { data: repos, isLoading, isError } = useSearchRepoQuery(search);

  return (
    <Screen style={{ padding: 16 }} edges={["left", "right", "bottom"]}>
      <List
        ListHeaderComponent={<SearchBar onChangeText={onSearchChange} />}
        ListEmptyComponent={
          <RepositoriesListEmpty isLoading={isLoading} isError={isError} />
        }
        estimatedItemSize={138}
        data={repos?.items || []}
        renderItem={({ item }) => (
          <RepositoryListItem repository={item as Repository} />
        )}
      />
    </Screen>
  );
}
