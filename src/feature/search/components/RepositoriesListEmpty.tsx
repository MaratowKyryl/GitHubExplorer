import { View } from "react-native";

import RepositoryListItemSkeleton from "../skeletons/RepositoryListItemSkeleton";

import { EmptyState, ErrorState } from "@/src/ui";

export default function RepositoriesListEmpty({
  isLoading,
  isError,
  noResults,
}: {
  isLoading: boolean;
  isError: boolean;
  noResults: boolean;
}) {
  if (isLoading) {
    return (
      <View>
        {Array.from({ length: 5 }, (_, i) => (
          <RepositoryListItemSkeleton key={i} />
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Something went wrong..."
        description="Please try again later."
      />
    );
  }

  if (noResults) {
    return (
      <EmptyState
        icon="file-tray-outline"
        title="No repositories found"
        description="Try a different search term or check the spelling"
      />
    );
  }

  return (
    <EmptyState
      icon="search"
      title="Search Repositories"
      description="Enter a query to find GitHub repositories"
    />
  );
}
