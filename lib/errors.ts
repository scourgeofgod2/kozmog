/**
 * Error classification system for API client
 * Provides structured error handling with user-friendly Turkish messages
 */

/**
 * Error type classification for API client errors
 */
export enum ErrorType {
  /** Configuration errors (missing API keys, invalid settings) */
  CONFIGURATION = "CONFIGURATION",
  /** Network connectivity errors (DNS, connection timeout) */
  NETWORK = "NETWORK",
  /** Rate limit exceeded errors (429 status) */
  RATE_LIMIT = "RATE_LIMIT",
  /** Input validation errors (invalid format, missing fields) */
  VALIDATION = "VALIDATION",
  /** Request timeout errors (exceeds 30s) */
  TIMEOUT = "TIMEOUT",
  /** API-specific errors (4xx, 5xx responses) */
  API_ERROR = "API_ERROR",
  /** Unknown or unexpected errors */
  UNKNOWN = "UNKNOWN",
}

/**
 * Custom error class for API client errors
 * Extends Error with additional metadata for error handling
 */
export class APIClientError extends Error {
  /**
   * Creates a new APIClientError
   * @param type - The error type classification
   * @param message - Detailed error message for logging
   * @param provider - The AI provider that generated the error (optional)
   * @param retryable - Whether the error is retryable (default: false)
   * @param originalError - The original error object if available (optional)
   */
  constructor(
    public type: ErrorType,
    message: string,
    public provider?: "claude" | "gemini",
    public retryable: boolean = false,
    public originalError?: Error
  ) {
    super(message);
    this.name = "APIClientError";
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIClientError);
    }
  }
}

/**
 * User-friendly error messages in Turkish for each error type
 * These messages are displayed to end users
 */
const ERROR_MESSAGES: Record<ErrorType, string> = {
  [ErrorType.CONFIGURATION]:
    "Sistem yapılandırması eksik. Lütfen yöneticinizle iletişime geçin.",
  [ErrorType.NETWORK]:
    "İnternet bağlantınızı kontrol edin ve tekrar deneyin.",
  [ErrorType.RATE_LIMIT]:
    "Günlük istek limitine ulaşıldı. Lütfen daha sonra tekrar deneyin.",
  [ErrorType.VALIDATION]:
    "Girdiğiniz bilgileri kontrol edin ve tekrar deneyin.",
  [ErrorType.TIMEOUT]:
    "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.",
  [ErrorType.API_ERROR]:
    "Geçici bir hata oluştu. Lütfen tekrar deneyin.",
  [ErrorType.UNKNOWN]:
    "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
};

/**
 * Converts an APIClientError to a user-friendly Turkish message
 * @param error - The APIClientError to convert
 * @returns User-friendly error message in Turkish
 */
export function getUserFriendlyError(error: APIClientError): string {
  return ERROR_MESSAGES[error.type] || ERROR_MESSAGES[ErrorType.UNKNOWN];
}
