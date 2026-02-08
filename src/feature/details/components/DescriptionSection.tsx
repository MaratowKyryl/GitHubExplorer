import { Column, SectionHeader, Text } from "@/src/ui";

export default function DescriptionSection({
  description,
}: {
  description: string;
}) {
  return (
    <Column gap="xs">
      <SectionHeader title="Description" />
      <Text variant="body" color="textSecondary">
        {description}
      </Text>
    </Column>
  );
}
