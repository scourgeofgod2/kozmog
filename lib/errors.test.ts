/**
 * Unit tests for error classification system
 */

import { describe, it, expect } from "vitest";
import { ErrorType, APIClientError, getUserFriendlyError } from "./errors";

describe("ErrorType enum", () => {
  it("should have all required error types", () => {
    expect(ErrorType.CONFIGURATION).toBe("CONFIGURATION");
    expect(ErrorType.NETWORK).toBe("NETWORK");
    expect(ErrorType.RATE_LIMIT).toBe("RATE_LIMIT");
    expect(ErrorType.VALIDATION).toBe("VALIDATION");
    expect(ErrorType.TIMEOUT).toBe("TIMEOUT");
    expect(ErrorType.API_ERROR).toBe("API_ERROR");
    expect(ErrorType.UNKNOWN).toBe("UNKNOWN");
  });
});

describe("APIClientError", () => {
  it("should create error with type and message", () => {
    const error = new APIClientError(
      ErrorType.CONFIGURATION,
      "Missing API key"
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(APIClientError);
    expect(error.name).toBe("APIClientError");
    expect(error.type).toBe(ErrorType.CONFIGURATION);
    expect(error.message).toBe("Missing API key");
    expect(error.retryable).toBe(false);
    expect(error.provider).toBeUndefined();
    expect(error.originalError).toBeUndefined();
  });

  it("should create error with provider", () => {
    const error = new APIClientError(
      ErrorType.RATE_LIMIT,
      "Rate limit exceeded",
      "claude"
    );

    expect(error.type).toBe(ErrorType.RATE_LIMIT);
    expect(error.provider).toBe("claude");
  });

  it("should create retryable error", () => {
    const error = new APIClientError(
      ErrorType.NETWORK,
      "Connection timeout",
      "gemini",
      true
    );

    expect(error.type).toBe(ErrorType.NETWORK);
    expect(error.retryable).toBe(true);
  });

  it("should store original error", () => {
    const originalError = new Error("Original error");
    const error = new APIClientError(
      ErrorType.API_ERROR,
      "API request failed",
      "claude",
      false,
      originalError
    );

    expect(error.originalError).toBe(originalError);
  });

  it("should have proper stack trace", () => {
    const error = new APIClientError(
      ErrorType.UNKNOWN,
      "Unknown error"
    );

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("APIClientError");
  });
});

describe("getUserFriendlyError", () => {
  it("should return Turkish message for CONFIGURATION error", () => {
    const error = new APIClientError(
      ErrorType.CONFIGURATION,
      "Missing API key"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "Sistem yapılandırması eksik. Lütfen yöneticinizle iletişime geçin."
    );
  });

  it("should return Turkish message for NETWORK error", () => {
    const error = new APIClientError(
      ErrorType.NETWORK,
      "Connection failed"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "İnternet bağlantınızı kontrol edin ve tekrar deneyin."
    );
  });

  it("should return Turkish message for RATE_LIMIT error", () => {
    const error = new APIClientError(
      ErrorType.RATE_LIMIT,
      "Rate limit exceeded"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "Günlük istek limitine ulaşıldı. Lütfen daha sonra tekrar deneyin."
    );
  });

  it("should return Turkish message for VALIDATION error", () => {
    const error = new APIClientError(
      ErrorType.VALIDATION,
      "Invalid input"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "Girdiğiniz bilgileri kontrol edin ve tekrar deneyin."
    );
  });

  it("should return Turkish message for TIMEOUT error", () => {
    const error = new APIClientError(
      ErrorType.TIMEOUT,
      "Request timeout"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "İstek zaman aşımına uğradı. Lütfen tekrar deneyin."
    );
  });

  it("should return Turkish message for API_ERROR", () => {
    const error = new APIClientError(
      ErrorType.API_ERROR,
      "API error"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "Geçici bir hata oluştu. Lütfen tekrar deneyin."
    );
  });

  it("should return Turkish message for UNKNOWN error", () => {
    const error = new APIClientError(
      ErrorType.UNKNOWN,
      "Unknown error"
    );
    const message = getUserFriendlyError(error);

    expect(message).toBe(
      "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."
    );
  });

  it("should handle all error types", () => {
    const errorTypes = Object.values(ErrorType);
    
    errorTypes.forEach((type) => {
      const error = new APIClientError(type, "Test error");
      const message = getUserFriendlyError(error);
      
      expect(message).toBeDefined();
      expect(message.length).toBeGreaterThan(0);
      expect(message).toMatch(/[a-zA-ZğüşıöçĞÜŞİÖÇ]/); // Contains Turkish characters
    });
  });
});
