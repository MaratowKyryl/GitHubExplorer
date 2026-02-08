import { RepositoryOwner } from "@/src/feature/search/types/repository";
import { Avatar, Card, Column, Row, Text } from "@/src/ui";

export default function OwnerCard({ owner }: { owner: RepositoryOwner }) {
  return (
    <Card padding="md">
      <Row gap="md" align="center">
        <Avatar source={owner.avatar_url} size={56} />
        <Column gap="xs" style={{ flex: 1 }}>
          <Text variant="bodyStrong">{owner.login}</Text>
          <Text variant="caption" color="textSecondary">
            {owner.type}
          </Text>
        </Column>
      </Row>
    </Card>
  );
}
