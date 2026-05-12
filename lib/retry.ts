// Retry logic with exponential backoff
// Handles failed API requests with configurable retry attempts and delays

/**
 * Options for retry behavior
 */
export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Base delay in milliseconds for exponential backoff (default: 2000ms) */
  baseDelay?: number;
  /** Function to determine if an error should be retried */
  shouldRetry?: (error: Error, attempt: number) => boolean;
}

/**
 * Default function to determine if an error should be retried
 * Skips retries for client errors (4xx except 429 rate limit)
 */
function defaultShouldRetry(error: Error): boolean {
  // Check if error message contains HTTP status code
  const statusMatch = error.message.match(/HTTP (\d{3})/);
  
  if (statusMatch) {
    const status = parseInt(statusMatch[1], 10);
    
    // Don't retry client errors (4xx) except 429 (rate limit)
    if (status >= 400 && status < 500 && status !== 429) {
      return false;
    }
  }
  
  // Retry all other errors (network errors, 5xx, 429, etc.)
  return true;
}

/**
 * Retries an async operation with exponential backoff
 * 
 * @param operation - The async function to retry
 * @param options - Retry configuration options
 * @returns The result of the successful operation
 * @throws The last error if all retries fail
 * 
 * @example
 * ```typescript
 * const result = await retryWithBackoff(
 *   async () => await callAPI(),
 *   { maxRetries: 3, baseDelay: 2000 }
 * );
 * ```
 * 
 * Retry delays with default settings:
 * - Attempt 1: immediate
 * - Attempt 2: 2 seconds delay
 * - Attempt 3: 4 seconds delay
 * - Attempt 4: 8 seconds delay
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 2000,
    shouldRetry = defaultShouldRetry,
  } = options;

  let lastError: Error | null = null;

  // Initial attempt + retries
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Check if we should retry this error
      if (!shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      // If this was the last attempt, throw the error
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Calculate exponential backoff delay: 2s, 4s, 8s
      const delay = baseDelay * Math.pow(2, attempt);

      // Wait before next retry
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError ?? new Error("Retry failed with unknown error");
}

/**
 * Creates a custom shouldRetry function that checks for specific error patterns
 * 
 * @param patterns - Array of regex patterns or strings to match against error messages
 * @returns A shouldRetry function that returns false if error matches any pattern
 * 
 * @example
 * ```typescript
 * const shouldRetry = createShouldRetryFn([/rate limit/i, /429/]);
 * await retryWithBackoff(operation, { shouldRetry });
 * ```
 */
export function createShouldRetryFn(
  patterns: Array<string | RegExp>
): (error: Error) => boolean {
  return (error: Error) => {
    // First check default retry logic
    if (!defaultShouldRetry(error)) {
      return false;
    }

    // Then check custom patterns
    for (const pattern of patterns) {
      if (typeof pattern === "string") {
        if (error.message.includes(pattern)) {
          return false;
        }
      } else {
        if (pattern.test(error.message)) {
          return false;
        }
      }
    }

    return true;
  };
}
