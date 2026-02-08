import {QueryClient} from "@tanstack/query-core";

export function useReactQuery() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
                retry: 3,
                staleTime: 1000 * 60 * 5, // 5 minutes
                gcTime: 1000 * 60 * 60 * 12, // 12 hours
            }
        }
    })
}
