import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
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
  const searchInputRef = useRef<TextInput>(null);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      return () => {
        searchInputRef.current?.blur();
      };
    }, []),
  );

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

  const handleRepositoryPress = useCallback(
    (repository: Repository) => {
      searchInputRef.current?.blur();
      router.push({
        pathname: "/repositories/[id]",
        params: { id: repository.id, search },
      });
    },
    [router, search],
  );

  const renderRepositoryItem = useCallback(
    ({ item }: { item: Repository }) => {
      return (
        <RepositoryListItem
          repository={item}
          onPress={() => handleRepositoryPress(item)}
        />
      );
    },
    [handleRepositoryPress],
  );

  const listHeader = useMemo(
    () => <SearchBar ref={searchInputRef} onChangeText={onSearchChange} />,
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
