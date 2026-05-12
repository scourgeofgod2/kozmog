// Unit tests for retry logic with exponential backoff

import { retryWithBackoff, createShouldRetryFn } from "./retry";

describe("retryWithBackoff", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return result on first successful attempt", async () => {
    const operation = jest.fn().mockResolvedValue("success");

    const promise = retryWithBackoff(operation);
    const result = await promise;

    expect(result).toBe("success");
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it("should retry up to 3 times with exponential backoff", async () => {
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("Network error"))
      .mockRejectedValueOnce(new Error("Network error"))
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce("success");

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    // Fast-forward through all delays
    await jest.runAllTimersAsync();

    const result = await promise;

    expect(result).toBe("success");
    expect(operation).toHaveBeenCalledTimes(4); // Initial + 3 retries
  });

  it("should use exponential backoff delays: 2s, 4s, 8s", async () => {
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("Network error"))
      .mockRejectedValueOnce(new Error("Network error"))
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce("success");

    const promise = retryWithBackoff(operation, {
      maxRetries: 3,
      baseDelay: 2000,
    });

    // First attempt fails immediately
    await Promise.resolve();
    expect(operation).toHaveBeenCalledTimes(1);

    // Wait 2 seconds for first retry
    await jest.advanceTimersByTimeAsync(2000);
    expect(operation).toHaveBeenCalledTimes(2);

    // Wait 4 seconds for second retry
    await jest.advanceTimersByTimeAsync(4000);
    expect(operation).toHaveBeenCalledTimes(3);

    // Wait 8 seconds for third retry
    await jest.advanceTimersByTimeAsync(8000);
    expect(operation).toHaveBeenCalledTimes(4);

    const result = await promise;
    expect(result).toBe("success");
  });

  it("should throw last error if all retries fail", async () => {
    const lastError = new Error("Final error");
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("Error 1"))
      .mockRejectedValueOnce(new Error("Error 2"))
      .mockRejectedValueOnce(new Error("Error 3"))
      .mockRejectedValueOnce(lastError);

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    // Fast-forward through all delays
    await jest.runAllTimersAsync();

    await expect(promise).rejects.toThrow("Final error");
    expect(operation).toHaveBeenCalledTimes(4);
  });

  it("should not retry on 4xx client errors (except 429)", async () => {
    const error = new Error("Claude API error: HTTP 400");
    const operation = jest.fn().mockRejectedValue(error);

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    await expect(promise).rejects.toThrow("HTTP 400");
    expect(operation).toHaveBeenCalledTimes(1); // No retries
  });

  it("should not retry on 404 errors", async () => {
    const error = new Error("Claude API error: HTTP 404");
    const operation = jest.fn().mockRejectedValue(error);

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    await expect(promise).rejects.toThrow("HTTP 404");
    expect(operation).toHaveBeenCalledTimes(1); // No retries
  });

  it("should retry on 429 rate limit errors", async () => {
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("Claude API error: HTTP 429"))
      .mockResolvedValueOnce("success");

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    // Fast-forward through delay
    await jest.runAllTimersAsync();

    const result = await promise;

    expect(result).toBe("success");
    expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });

  it("should retry on 5xx server errors", async () => {
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("Claude API error: HTTP 500"))
      .mockResolvedValueOnce("success");

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    // Fast-forward through delay
    await jest.runAllTimersAsync();

    const result = await promise;

    expect(result).toBe("success");
    expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });

  it("should retry on network errors without status code", async () => {
    const operation = jest
      .fn()
      .mockRejectedValueOnce(new Error("Network connection failed"))
      .mockResolvedValueOnce("success");

    const promise = retryWithBackoff(operation, { maxRetries: 3 });

    // Fast-forward through delay
    await jest.runAllTimersAsync();

    const result = await promise;

    expect(result).toBe("success");
    expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });

  it("should use custom shouldRetry function", async () => {
    const operation = jest
      .fn()
      .mockRejectedValue(new Error("Custom error"));

    const shouldRetry = jest.fn().mockReturnValue(false);

    const promise = retryWithBackoff(operation, {
      maxRetries: 3,
      shouldRetry,
    });

    await expect(promise).rejects.toThrow("Custom error");
    expect(operation).toHaveBeenCalledTimes(1); // No retries
    expect(shouldRetry).toHaveBeenCalledWith(expect.any(Error), 0);
  });

  it("should handle non-Error objects", async () => {
    const operation = jest.fn().mockRejectedValue("string error");

    const promise = retryWithBackoff(operation, { maxRetries: 1 });

    // Fast-forward through delay
    await jest.runAllTimersAsync();

    await expect(promise).rejects.toThrow("string error");
    expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
  });
});

describe("createShouldRetryFn", () => {
  it("should not retry when error matches string pattern", () => {
    const shouldRetry = createShouldRetryFn(["rate limit"]);
    const error = new Error("API rate limit exceeded");

    expect(shouldRetry(error)).toBe(false);
  });

  it("should not retry when error matches regex pattern", () => {
    const shouldRetry = createShouldRetryFn([/rate limit/i]);
    const error = new Error("API RATE LIMIT exceeded");

    expect(shouldRetry(error)).toBe(false);
  });

  it("should retry when error does not match any pattern", () => {
    const shouldRetry = createShouldRetryFn(["rate limit"]);
    const error = new Error("Network timeout");

    expect(shouldRetry(error)).toBe(true);
  });

  it("should not retry 4xx errors even if not in custom patterns", () => {
    const shouldRetry = createShouldRetryFn(["custom error"]);
    const error = new Error("Claude API error: HTTP 403");

    expect(shouldRetry(error)).toBe(false);
  });

  it("should handle multiple patterns", () => {
    const shouldRetry = createShouldRetryFn([
      "rate limit",
      /quota exceeded/i,
      "maintenance",
    ]);

    expect(shouldRetry(new Error("API rate limit"))).toBe(false);
    expect(shouldRetry(new Error("Quota Exceeded"))).toBe(false);
    expect(shouldRetry(new Error("Under maintenance"))).toBe(false);
    expect(shouldRetry(new Error("Network error"))).toBe(true);
  });
});
