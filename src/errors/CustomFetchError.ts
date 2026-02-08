/**
 * Custom error class for failed HTTP responses.
 * Carries the status code and parsed response body for downstream handling.
 */
export default class CustomFetchError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly body: unknown;

  constructor(status: number, statusText: string, body: unknown) {
    const message = `HTTP ${status} ${statusText}`;
    super(message);
    this.name = "CustomFetchError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }

  /** Returns true when the server says we hit a rate limit (GitHub: 403 / 429). */
  get isRateLimited(): boolean {
    return this.status === 403 || this.status === 429;
  }
}
