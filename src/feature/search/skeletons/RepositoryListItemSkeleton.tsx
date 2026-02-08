import { Card, Column, Row, Skeleton, Spacer, spacing } from "@/src/ui";

export default function RepositoryListItemSkeleton() {
  return (
    <Card padding="md" style={{ marginVertical: spacing.xs }}>
      <Row gap="md" align="flex-start">
        <Skeleton circle height={40} />

        <Column gap="xs" style={{ flex: 1 }}>
          <Skeleton width={180} height={16} />
          <Skeleton height={14} />
          <Skeleton width={140} height={14} />

          <Spacer y="xs" />

          <Row gap="md" align="center">
            <Skeleton width={50} height={12} />
            <Skeleton width={70} height={12} />
            <Skeleton width={80} height={12} />
          </Row>
        </Column>
      </Row>
    </Card>
  );
}
