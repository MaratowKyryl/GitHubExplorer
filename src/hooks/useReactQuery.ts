import { useState } from "react";

import { QueryClient } from "@tanstack/query-core";

import CustomFetchError from "@/src/errors/CustomFetchError";

const MAX_RETRIES = 3;

export function useReactQuery() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: configureRetries,
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 60 * 12, // 12 hours
          },
        },
      }),
  );
  return queryClient;
}

function configureRetries(failureCount: number, error: Error) {
  if (failureCount >= MAX_RETRIES) {
    return false;
  }

  return !(error instanceof CustomFetchError && error.isRateLimited);
}
