import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  // Theme
  useTheme,
  type ThemeOverride,

  // Primitives
  Text,
  Row,
  Column,
  Spacer,
  Divider,
  PressableScale,

  // Components
  Icon,
  Badge,
  Avatar,
  Skeleton,
  SearchBar,
  TextField,
  Card,
  SectionHeader,
  EmptyState,
  ErrorState,
  Button,
  IconButton,
  ListSeparator,
  ListFooterLoading,
  ListFooterEnd,
} from '@/src/ui';

// ─── Demo data ──────────────────────────────────────────────────

const SAMPLE_REPOS = [
  {
    id: '1',
    name: 'react-native',
    owner: 'facebook',
    avatar: 'https://avatars.githubusercontent.com/u/69631?v=4',
    description: 'A framework for building native applications using React.',
    language: 'JavaScript',
    stars: 121_000,
    forks: 24_200,
  },
  {
    id: '2',
    name: 'typescript',
    owner: 'microsoft',
    avatar: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    language: 'TypeScript',
    stars: 102_000,
    forks: 12_500,
  },
  {
    id: '3',
    name: 'flash-list',
    owner: 'shopify',
    avatar: null,
    description: 'A better list for React Native. Fast & performant.',
    language: 'TypeScript',
    stars: 5_800,
    forks: 520,
  },
];

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ─── Screen ─────────────────────────────────────────────────────

export default function UIShowcase() {
  const { colors, spacing, colorScheme, themeOverride, setThemeOverride } =
    useTheme();

  const [search, setSearch] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const cycleTheme = useCallback(() => {
    const order: ThemeOverride[] = ['system', 'light', 'dark'];
    const next = order[(order.indexOf(themeOverride) + 1) % order.length];
    setThemeOverride(next);
  }, [themeOverride, setThemeOverride]);

  const themeLabel =
    themeOverride === 'system'
      ? `System (${colorScheme})`
      : themeOverride === 'light'
        ? 'Light'
        : 'Dark';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingHorizontal: spacing.md },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────────────────── */}
        <Spacer y="sm" />
        <Row align="center" justify="space-between">
          <Column>
            <Text variant="display">UI Kit</Text>
            <Text variant="bodySmall" color="textSecondary">
              Design System Showcase
            </Text>
          </Column>
          <IconButton
            name={colorScheme === 'dark' ? 'sunny' : 'moon'}
            accessibilityLabel="Toggle theme"
            onPress={cycleTheme}
            variant="primary"
          />
        </Row>
        <Spacer y="2xs" />
        <Badge label={themeLabel} variant="primary" />

        {/* ── Typography ──────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Typography" />
        <Spacer y="sm" />
        <Card padding="md">
          <Text variant="display">Display</Text>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Spacer y="xs" />
          <Text variant="body">Body — The quick brown fox jumps over the lazy dog.</Text>
          <Text variant="bodyStrong">Body Strong</Text>
          <Text variant="bodySmall" color="textSecondary">Body Small (secondary)</Text>
          <Spacer y="xs" />
          <Text variant="caption" color="textTertiary">Caption — metadata, timestamps</Text>
          <Text variant="captionStrong" color="primary">Caption Strong</Text>
          <Text variant="mono" color="textSecondary">
            {'const x = 42; // mono'}
          </Text>
        </Card>

        {/* ── Buttons ─────────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Buttons" />
        <Spacer y="sm" />
        <Card padding="md">
          <Row gap="sm" wrap>
            <Button title="Primary" variant="primary" />
            <Button title="Secondary" variant="secondary" />
            <Button title="Ghost" variant="ghost" />
            <Button title="Danger" variant="danger" />
          </Row>
          <Spacer y="md" />
          <Text variant="captionStrong" color="textSecondary">Sizes</Text>
          <Spacer y="xs" />
          <Row gap="sm" align="center" wrap>
            <Button title="Small" size="sm" variant="secondary" />
            <Button title="Medium" size="md" />
            <Button title="Large" size="lg" variant="secondary" />
          </Row>
          <Spacer y="md" />
          <Text variant="captionStrong" color="textSecondary">States</Text>
          <Spacer y="xs" />
          <Row gap="sm" wrap>
            <Button title="Loading…" loading />
            <Button title="Disabled" disabled />
          </Row>
          <Spacer y="md" />
          <Text variant="captionStrong" color="textSecondary">With icons</Text>
          <Spacer y="xs" />
          <Button
            title="Star Repo"
            variant="secondary"
            leftIcon={<Icon name="star" size={16} color={colors.primary} />}
          />
          <Spacer y="md" />
          <Text variant="captionStrong" color="textSecondary">Icon Buttons</Text>
          <Spacer y="xs" />
          <Row gap="xs" align="center">
            <IconButton name="heart-outline" accessibilityLabel="Like" />
            <IconButton name="share-outline" accessibilityLabel="Share" />
            <IconButton name="bookmark-outline" accessibilityLabel="Save" />
            <IconButton name="ellipsis-horizontal" accessibilityLabel="More" />
            <IconButton name="trash-outline" accessibilityLabel="Delete" variant="danger" />
          </Row>
        </Card>

        {/* ── Badges ──────────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Badges" />
        <Spacer y="sm" />
        <Card padding="md">
          <Row gap="sm" wrap>
            <Badge label="Default" />
            <Badge label="Primary" variant="primary" />
            <Badge label="Success" variant="success" />
            <Badge label="Warning" variant="warning" />
            <Badge label="Danger" variant="danger" />
          </Row>
          <Spacer y="sm" />
          <Row gap="sm" wrap>
            <Badge
              label="TypeScript"
              variant="primary"
              icon={<Icon name="code-slash" size={12} color={colors.primary} />}
            />
            <Badge
              label="5.8k"
              icon={<Icon name="star" size={12} color={colors.textSecondary} />}
            />
            <Badge
              label="MIT"
              variant="success"
              icon={<Icon name="shield-checkmark" size={12} color={colors.success} />}
            />
          </Row>
        </Card>

        {/* ── Avatars ─────────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Avatars" />
        <Spacer y="sm" />
        <Card padding="md">
          <Row gap="md" align="center">
            <Avatar
              source="https://avatars.githubusercontent.com/u/69631?v=4"
              name="Facebook"
              size={48}
            />
            <Avatar
              source="https://avatars.githubusercontent.com/u/6154722?v=4"
              name="Microsoft"
              size={48}
            />
            <Avatar name="Shopify" size={48} />
            <Avatar name="John Doe" size={48} />
            <Avatar size={48} />
          </Row>
          <Spacer y="sm" />
          <Text variant="caption" color="textSecondary">
            Image + initials fallback + unknown fallback
          </Text>
        </Card>

        {/* ── Form Controls ───────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Form Controls" />
        <Spacer y="sm" />
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search repositories…"
        />
        <Spacer y="md" />
        <TextField
          label="Repository name"
          placeholder="e.g. react-native"
          value={fieldValue}
          onChangeText={setFieldValue}
          leftIcon="logo-github"
          clearable
        />
        <Spacer y="md" />
        <TextField
          label="With error"
          placeholder="Type something…"
          value=""
          error="This field is required"
        />
        <Spacer y="md" />
        <TextField
          label="Loading state"
          placeholder="Searching…"
          value="flash-list"
          loading
        />

        {/* ── Cards ───────────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Cards — Repo List" />
        <Spacer y="sm" />
        {SAMPLE_REPOS.map((repo) => (
          <React.Fragment key={repo.id}>
            <Card padding="md" onPress={() => {}}>
              <Row gap="sm" align="center">
                <Avatar source={repo.avatar} name={repo.owner} size={36} />
                <Column style={styles.flex}>
                  <Text variant="bodyStrong" numberOfLines={1}>
                    {repo.owner}/{repo.name}
                  </Text>
                  <Text variant="caption" color="textSecondary">
                    {repo.owner}
                  </Text>
                </Column>
                <Icon name="chevron-forward" size={18} color={colors.iconMuted} />
              </Row>
              <Spacer y="sm" />
              <Text variant="bodySmall" color="textSecondary" numberOfLines={2}>
                {repo.description}
              </Text>
              <Spacer y="sm" />
              <Row gap="sm" wrap>
                <Badge label={repo.language} variant="primary" />
                <Badge
                  label={formatCount(repo.stars)}
                  icon={<Icon name="star" size={12} color={colors.textSecondary} />}
                />
                <Badge
                  label={formatCount(repo.forks)}
                  icon={<Icon name="git-branch" size={12} color={colors.textSecondary} />}
                />
              </Row>
            </Card>
            <Spacer y="sm" />
          </React.Fragment>
        ))}

        {/* ── Pressable Scale ─────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Pressable Scale" />
        <Spacer y="sm" />
        <PressableScale onPress={() => {}}>
          <Card padding="md">
            <Row gap="sm" align="center">
              <Icon name="finger-print" size={24} color={colors.primary} />
              <Column style={styles.flex}>
                <Text variant="bodyStrong">Press and hold me</Text>
                <Text variant="caption" color="textSecondary">
                  Smooth native-driver spring scale feedback
                </Text>
              </Column>
            </Row>
          </Card>
        </PressableScale>

        {/* ── Skeleton Loading ────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Skeleton Loading" />
        <Spacer y="sm" />
        <Card padding="md">
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <Row gap="sm" align="center">
                <Skeleton circle height={36} />
                <Column gap="xs" style={styles.flex}>
                  <Skeleton height={16} width={160} />
                  <Skeleton height={12} width={100} />
                </Column>
              </Row>
              {i < 2 && <Spacer y="md" />}
            </React.Fragment>
          ))}
          <Spacer y="md" />
          <Skeleton height={14} />
          <Spacer y="xs" />
          <Skeleton height={14} width={220} />
          <Spacer y="sm" />
          <Row gap="sm">
            <Skeleton height={24} width={80} radius={12} />
            <Skeleton height={24} width={60} radius={12} />
          </Row>
        </Card>

        {/* ── List Accessories ────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="List Accessories" />
        <Spacer y="sm" />
        <Card padding="none">
          <View style={{ padding: spacing.md }}>
            <Text variant="bodySmall">Item 1</Text>
          </View>
          <ListSeparator indent={spacing.md} />
          <View style={{ padding: spacing.md }}>
            <Text variant="bodySmall">Item 2</Text>
          </View>
          <ListSeparator indent={spacing.md} />
          <View style={{ padding: spacing.md }}>
            <Text variant="bodySmall">Item 3</Text>
          </View>
        </Card>
        <Spacer y="sm" />
        <Card padding="none">
          <ListFooterLoading />
        </Card>
        <Spacer y="sm" />
        <Card padding="none">
          <ListFooterEnd />
        </Card>

        {/* ── Divider ─────────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader title="Divider" />
        <Spacer y="sm" />
        <Text variant="bodySmall" color="textSecondary">Above the divider</Text>
        <Spacer y="sm" />
        <Divider />
        <Spacer y="sm" />
        <Text variant="bodySmall" color="textSecondary">Below the divider</Text>

        {/* ── States ──────────────────────────────── */}
        <Spacer y="xl" />
        <SectionHeader
          title="States"
          trailing={
            <Row gap="sm">
              <Button
                title="Empty"
                variant={showEmpty ? 'primary' : 'ghost'}
                size="sm"
                onPress={() => {
                  setShowEmpty(!showEmpty);
                  setShowError(false);
                }}
              />
              <Button
                title="Error"
                variant={showError ? 'danger' : 'ghost'}
                size="sm"
                onPress={() => {
                  setShowError(!showError);
                  setShowEmpty(false);
                }}
              />
            </Row>
          }
        />
        <Spacer y="sm" />
        {showEmpty && (
          <Card padding="none">
            <EmptyState
              icon="search-outline"
              title="No results found"
              description="Try adjusting your search to find what you're looking for."
              action={
                <Button
                  title="Clear search"
                  variant="secondary"
                  onPress={() => setShowEmpty(false)}
                />
              }
            />
          </Card>
        )}
        {showError && (
          <Card padding="none">
            <ErrorState
              title="Failed to load"
              description="Could not fetch repositories. Please check your connection."
              onRetry={() => setShowError(false)}
            />
          </Card>
        )}
        {!showEmpty && !showError && (
          <Card padding="md">
            <Text variant="bodySmall" color="textSecondary" align="center">
              Tap "Empty" or "Error" above to preview states
            </Text>
          </Card>
        )}

        <Spacer y="3xl" />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  flex: {
    flex: 1,
  },
});
