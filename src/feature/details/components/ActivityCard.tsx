import { Card, Column, Divider, Row, SectionHeader, Text } from "@/src/ui";
import { formatDate } from "@/src/utils/formatting";

export default function ActivityCard({
  createdAt,
  updatedAt,
  pushedAt,
}: {
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}) {
  return (
    <Column gap="xs">
      <SectionHeader title="Activity" />
      <Card padding="md">
        <Column gap="sm">
          <Row justify="space-between">
            <Text variant="bodySmall" color="textSecondary">
              Created
            </Text>
            <Text variant="bodySmall">{formatDate(createdAt)}</Text>
          </Row>
          <Divider />
          <Row justify="space-between">
            <Text variant="bodySmall" color="textSecondary">
              Updated
            </Text>
            <Text variant="bodySmall">{formatDate(updatedAt)}</Text>
          </Row>
          <Divider />
          <Row justify="space-between">
            <Text variant="bodySmall" color="textSecondary">
              Last push
            </Text>
            <Text variant="bodySmall">{formatDate(pushedAt)}</Text>
          </Row>
        </Column>
      </Card>
    </Column>
  );
}
