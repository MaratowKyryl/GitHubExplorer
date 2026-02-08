import { Linking } from "react-native";

import { useLocalSearchParams } from "expo-router";

import ActivityCard from "./components/ActivityCard";
import DescriptionSection from "./components/DescriptionSection";
import OwnerCard from "./components/OwnerCard";
import RepositoryHeader from "./components/RepositoryHeader";
import StatsCard from "./components/StatsCard";
import TopicsSection from "./components/TopicsSection";

import useRepoDetailsFromQueryCache from "@/src/feature/details/hooks/useRepoDetailsFromQueryCache";
import { Button, Column, Screen, Spacer } from "@/src/ui";

export default function RepositoryDetailsScreen() {
  const { id, search } = useLocalSearchParams();

  const repo = useRepoDetailsFromQueryCache(id, search);

  if (repo == null) {
    return null;
  }

  return (
    <Screen scroll edges={["left", "right", "bottom"]}>
      <Column p="md" gap="lg">
        <OwnerCard owner={repo.owner} />
        <RepositoryHeader repository={repo} />
        <StatsCard repository={repo} />
        {repo.description != null && (
          <DescriptionSection description={repo.description} />
        )}
        {repo.topics.length > 0 && <TopicsSection topics={repo.topics} />}
        <ActivityCard
          createdAt={repo.created_at}
          updatedAt={repo.updated_at}
          pushedAt={repo.pushed_at}
        />
        <Button
          title="Open on GitHub"
          onPress={() => Linking.openURL(repo.html_url)}
        />
        <Spacer y="md" />
      </Column>
    </Screen>
  );
}
