import { useCallback, useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";

import RepositoriesListEmpty from "./components/RepositoriesListEmpty";
import RepositoryListItem from "./components/RepositoryListItem";
import { Repository } from "./types/repository";

import useSearchRepoInfiniteQuery from "@/src/feature/search/api/useSearchRepoInfiniteQuery";
import { useDebouncedCallback } from "@/src/hooks/useDebouncedCallback";
import { List, Screen, SearchBar } from "@/src/ui";

const EMPTY_LIST: Repository[] = [];

const keyExtractor = (item: Repository) => item.id.toString();

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const onSearchChange = useDebouncedCallback(setSearch, 500);

  const router = useRouter();

  const {
    data: repos,
    fetchNextPage,
    isLoading,
    isError,
    refetch,
  } = useSearchRepoInfiniteQuery(search);

  const handleRefresh = useCallback(() => {
    if (!search) return;
    refetch();
  }, [search, refetch]);

  const onRefresh = useDebouncedCallback(handleRefresh, 500);

  const renderRepositoryItem = useCallback(
    ({ item }: { item: Repository }) => {
      const onPress = () => {
        router.push({
          pathname: "/repositories/[id]",
          params: { id: item.id, search },
        });
      };
      return <RepositoryListItem repository={item} onPress={onPress} />;
    },
    [search],
  );

  const listHeader = useMemo(
    () => <SearchBar onChangeText={onSearchChange} />,
    [onSearchChange],
  );

  const listEmpty = useMemo(
    () => (
      <RepositoriesListEmpty
        isLoading={isLoading}
        isError={isError}
        noResults={repos?.length === 0}
      />
    ),
    [isLoading, isError, repos?.length],
  );

  const data = repos ?? EMPTY_LIST;

  return (
    <Screen style={styles.screen} edges={["left", "right"]}>
      <List
        onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        estimatedItemSize={138}
        data={data}
        renderItem={renderRepositoryItem}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 16 },
});
