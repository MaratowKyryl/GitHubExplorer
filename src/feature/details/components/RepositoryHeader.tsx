import { Repository } from "@/src/feature/search/types/repository";
import { Badge, Column, Row, Text } from "@/src/ui";

export default function RepositoryHeader({
  repository,
}: {
  repository: Repository;
}) {
  return (
    <Column gap="sm">
      <Text variant="bodyStrong">{repository.name}</Text>
      <Text variant="bodySmall" color="textSecondary">
        {repository.full_name}
      </Text>
      <Row gap="xs" style={{ flexWrap: "wrap" }}>
        <Badge
          label={repository.visibility}
          variant={repository.visibility === "public" ? "success" : "default"}
        />
        {repository.language != null && (
          <Badge label={repository.language} variant="primary" />
        )}
        {repository.license != null && (
          <Badge label={repository.license.spdx_id} />
        )}
        {repository.archived && <Badge label="Archived" variant="warning" />}
        {repository.fork && <Badge label="Fork" />}
      </Row>
    </Column>
  );
}
