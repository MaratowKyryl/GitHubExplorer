# GitHub Repos Explorer

A cross-platform React Native mobile application for searching and exploring GitHub repositories. Built with TypeScript (strict mode), Expo SDK 54, and modern React Native tooling.

## Features

- **Search** — find GitHub repositories by keyword with debounced input
- **Infinite scroll** — paginated results loaded automatically on scroll
- **Repository details** — owner info, stats (stars, forks, watchers, issues), description, topics, activity dates
- **Dark mode** — system-aware theme with manual toggle
- **Pull-to-refresh** — swipe down to reload results
- **Skeleton loaders** — smooth loading placeholders animated on the UI thread
- **Error handling** — typed HTTP errors with smart retry logic (no retry on rate limit)

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Expo SDK 54, React Native 0.81 (New Architecture) |
| Language | TypeScript 5.9, strict mode |
| Navigation | Expo Router (file-based) |
| Data fetching | TanStack React Query v5 |
| List | @shopify/flash-list 2.0 |
| Animations | react-native-reanimated 4 |
| Styling | Custom UI kit with design tokens |
| Linting | ESLint + unused-imports + import-order + @tanstack/query plugin |

## Setup

### Prerequisites

- Node.js (LTS)
- npm / yarn / pnpm

### Installation

```bash
npm install
```

### Running the app

Start the dev server:

```bash
npm run start
```

Run on a device or emulator:

```bash
# Android (Android Studio + emulator required)
npm run android

# iOS (macOS + Xcode required)
npm run ios
```

### Useful commands

| Command | Description |
|---|---|
| `npx expo start -c` | Start with cleared cache |
| `npm run lint` | Run ESLint |
| `npm run web` | Run in browser |

## Project Structure

```
app/                        # Expo Router screens (file-based routing)
  _layout.tsx               # Root layout, providers, navigation stack
  index.tsx                 # Search screen entry
  repositories/[id].tsx     # Repository details entry

src/
  feature/
    search/                 # Search feature module
      api/                  #   API hooks (useSearchRepoInfiniteQuery)
      components/           #   List item, empty state
      context/              #   Selected repository context
      skeletons/            #   Loading skeletons
      types/                #   Repository & Owner interfaces
      SearchScreen.tsx
    details/                # Details feature module
      components/           #   OwnerCard, StatsCard, Header, Topics, Activity
      RepositoryDetailsScreen.tsx
  errors/                   # CustomFetchError class
  hooks/                    # Shared hooks (useDebouncedCallback, useReactQuery)
  utils/                    # HTTP client, date/number formatting
  ui/                       # Reusable UI kit
    primitives/             #   Text, Row, Column, Spacer, Divider, Pressables
    components/             #   Button, Card, Avatar, Badge, SearchBar, List, Skeleton...
    providers/              #   ThemeProvider, ThemeContext
    theme/                  #   Design tokens: colors, typography, spacing, shadows
```

## Key Decisions

### Expo

Chosen for rapid development on a time-boxed assignment. Expo is an excellent fit for apps that don't require complex native SDK integrations. Its built-in package manager simplifies dependency resolution and upgrades. The rich out-of-the-box ecosystem (splash screen, status bar, image handling, linking) reduces boilerplate and setup time significantly.

### Expo Router

File-based routing provides a more readable and intuitive navigation structure compared to raw React Navigation configuration. Routes map directly to the file system, making the navigation hierarchy immediately clear to any developer opening the project.

### React Native Reanimated

All animations (skeleton pulse, press scale) run on the **UI thread**, keeping the JS thread free for data processing and rendering. This directly contributes to maintaining 60 FPS during interactions and scroll.

### TanStack React Query

A near-ultimate solution for server-state management. Provides:
- Automatic caching with configurable `staleTime` (5 min) and `gcTime` (12 h)
- Built-in infinite query support for paginated GitHub API
- Smart retry logic — custom `configureRetries` skips retries on rate-limit errors (403/429)
- Request deduplication and background refetching

### @shopify/flash-list

A high-performance drop-in replacement for FlatList. The community consistently reports fewer blank cells during fast scrolling and less FPS degradation on large lists. FlashList achieves this through built-in cell recycling (reuses elements instead of destroying them), fewer live elements outside the viewport, and internal memoization.

### Custom HTTP Layer

HTTP errors are handled through a `CustomFetchError` class that carries `status`, `statusText`, and the parsed response body. The `throwIfNotSuccessful` utility validates every response before JSON parsing, ensuring non-2xx responses are caught early with structured error information rather than silently returning malformed data.

### Custom UI Kit

The UI layer is built as a standalone kit with design tokens (colors, typography, spacing, radii, shadows) and reusable primitives. Every interactive component uses `React.memo`, and providers are memoized with `useMemo`/`useCallback` to prevent unnecessary re-renders down the tree.

## What I Would Improve with More Time

- **Deep linking on Details screen** — currently the selected repository is passed via Context, which means deep linking to `/repositories/:id` won't load data. I would add a `useRepoDetailsById` hook that fetches repository data by ID from the GitHub API, using the context value as an optimistic cache and the API call as a fallback. Context is generally an anti-pattern for navigation data, but given the current scope and the single-source API response, it works without measurable performance cost.

- **UI kit review** — the current UI kit was AI-generated with strict criteria: lightweight optimized primitives, deep reusability across the project, and adaptability for scaling. With more time I would audit each component for edge cases, add prop documentation, and ensure consistent accessibility support.

- **Unit & integration tests** — add tests for utility functions (`formatDate`, `formatStars`), custom hooks (`useDebouncedCallback`, `useSearchRepoInfiniteQuery`), and the `CustomFetchError` class. Integration tests for the search flow with MSW for API mocking.

- **Offline-first mode** — leverage React Query's `gcTime` + `@react-native-community/netinfo` to show cached data when offline with a connectivity banner.

- **Performance profiling** — capture Flipper/React DevTools screenshots demonstrating 60 FPS scrolling, memory usage, and render counts under load.

- **Accessibility** — full VoiceOver/TalkBack audit, semantic roles on all interactive elements, proper focus order.

## APK

The release APK is available in the repository root: [`app-release.apk`](./app-release.apk).
