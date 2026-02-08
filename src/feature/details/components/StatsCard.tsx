import { Repository } from "@/src/feature/search/types/repossitory";
import { Card, Column, Icon, Row, Text } from "@/src/ui";
import { formatStars } from "@/src/utils/formatting";

function StatItem({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentProps<typeof Icon>["name"];
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <Column align="center" gap="xs" style={{ flex: 1 }}>
      <Icon name={icon} size={20} color={color} />
      <Text variant="bodyStrong">{value}</Text>
      <Text variant="caption" color="textTertiary">
        {label}
      </Text>
    </Column>
  );
}

export default function StatsCard({
  repository,
}: {
  repository: Repository;
}) {
  return (
    <Card padding="md">
      <Row>
        <StatItem
          icon="star"
          label="Stars"
          value={formatStars(repository.stargazers_count)}
          color="#F79009"
        />
        <StatItem
          icon="git-network-outline"
          label="Forks"
          value={formatStars(repository.forks_count)}
        />
        <StatItem
          icon="eye-outline"
          label="Watchers"
          value={formatStars(repository.watchers_count)}
        />
        <StatItem
          icon="alert-circle-outline"
          label="Issues"
          value={String(repository.open_issues_count)}
        />
      </Row>
    </Card>
  );
}
