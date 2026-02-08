import { Repository } from "@/src/feature/search/types/repository";
import {
  Avatar,
  Card,
  Column,
  Icon,
  Row,
  Spacer,
  spacing,
  Text,
} from "@/src/ui";
import { formatDate, formatStars } from "@/src/utils/formatting";

export default function RepositoryListItem({
  repository,
  onPress,
}: {
  repository: Repository;
  onPress: (id: number) => void;
}) {
  return (
    <Card padding="md" style={{ marginVertical: spacing.xs }} onPress={onPress}>
      <Row gap="md" align="flex-start">
        <Avatar source={repository.owner.avatar_url} size={40} />

        <Column gap="xs" style={{ flex: 1 }}>
          <Text variant="bodyStrong" numberOfLines={1}>
            {repository.full_name}
          </Text>

          {repository.description != null && (
            <Text variant="bodySmall" color="textSecondary" numberOfLines={2}>
              {repository.description}
            </Text>
          )}

          <Spacer y="xs" />

          <Row gap="md" style={{ flexWrap: "wrap" }} align="center">
            <Row gap="xs" align="center">
              <Icon name="star" size={14} color="#F79009" />
              <Text variant="caption" color="textSecondary">
                {formatStars(repository.stargazers_count)}
              </Text>
            </Row>

            {repository.language != null && (
              <Row gap="xs" align="center">
                <Icon name="ellipse" size={10} color="#2E90FA" />
                <Text variant="caption" color="textSecondary">
                  {repository.language}
                </Text>
              </Row>
            )}

            <Row gap="xs" align="center">
              <Icon name="time-outline" size={14} />
              <Text variant="caption" color="textTertiary">
                {formatDate(repository.updated_at)}
              </Text>
            </Row>
          </Row>
        </Column>
      </Row>
    </Card>
  );
}
