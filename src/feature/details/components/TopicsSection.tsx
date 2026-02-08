import { Badge, Column, Row, SectionHeader } from "@/src/ui";

export default function TopicsSection({ topics }: { topics: string[] }) {
  return (
    <Column gap="xs">
      <SectionHeader title="Topics" />
      <Row gap="xs" style={{ flexWrap: "wrap" }}>
        {topics.map((topic) => (
          <Badge key={topic} label={topic} variant="primary" />
        ))}
      </Row>
    </Column>
  );
}
