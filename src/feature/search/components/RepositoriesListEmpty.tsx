import { View } from "react-native";

import RepositoryListItemSkeleton from "../skeletons/RepositoryListItemSkeleton";

import { EmptyState, ErrorState } from "@/src/ui";

export default function RepositoriesListEmpty({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
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
  return (
    <EmptyState
      icon="search"
      title="Search Repositories"
      description="Enter a query to find GitHub repositories"
    />
  );
}
