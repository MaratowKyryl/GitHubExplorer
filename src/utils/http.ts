import CustomFetchError from "@/src/errors/CustomFetchError";

/**
 * Throws a `CustomFetchError` if the response status is not in the 2xx range.
 * Attempts to parse the body as JSON so the error carries structured details.
 */
async function throwIfNotSuccessful(response: Response): Promise<void> {
  if (response.ok) return;

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    body = await response.text().catch(() => null);
  }

  throw new CustomFetchError(response.status, response.statusText, body);
}

interface GetRequestOptions {
  /** Query-string parameters appended to the URL. */
  params?: Record<string, string>;
  /** AbortSignal for request cancellation. */
  signal?: AbortSignal;
}

/**
 * Performs a GET request without authentication.
 * Validates the response and returns the parsed JSON body.
 *
 * @template T - Expected shape of the JSON response.
 * @param baseUrl - The base URL to fetch.
 * @param options - Optional params and abort signal.
 * @returns Parsed JSON response of type `T`.
 * @throws {CustomFetchError} When the response status is not 2xx.
 */
export async function getRequestUnauthorized<T>(
  baseUrl: string,
  options?: GetRequestOptions,
): Promise<T> {
  const url = new URL(baseUrl);

  if (options?.params) {
    for (const [key, value] of Object.entries(options.params)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal: options?.signal,
  });

  await throwIfNotSuccessful(response);

  return (await response.json()) as T;
}
