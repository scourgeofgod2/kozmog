// Claude API client
// Communicates with Claude API via claude.gg gateway using OpenAI-compatible format

// ─── Type Definitions ─────────────────────────────────────────────────────

export interface ClaudeClientConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
  timeout: number;
}

export interface ClaudeMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ClaudeRequest {
  model: string;
  messages: ClaudeMessage[];
  temperature: number;
  max_tokens: number;
  stream?: boolean;
}

export interface ClaudeResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
}

// ─── Configuration ────────────────────────────────────────────────────────

const CORTEX_KEY = process.env.CORTEX_KEY ?? "";
const CLAUDE_MODEL = "claude-sonnet-4-6";
const CLAUDE_BASE_URL = "https://claude.gg/v1/chat/completions";
const CLAUDE_TIMEOUT = 90000; // 90 seconds

/**
 * Validates that the CORTEX_KEY environment variable is configured
 * @throws {Error} If CORTEX_KEY is missing or empty
 */
function validateConfig(): void {
  if (!CORTEX_KEY || CORTEX_KEY.trim().length === 0) {
    throw new Error(
      "CORTEX_KEY environment variable is not configured. Please set CORTEX_KEY in your .env.local file."
    );
  }
}

/**
 * Gets the Claude client configuration
 * @returns {ClaudeClientConfig} The configuration object
 * @throws {Error} If configuration is invalid
 */
export function getClaudeConfig(): ClaudeClientConfig {
  validateConfig();
  
  return {
    apiKey: CORTEX_KEY,
    model: CLAUDE_MODEL,
    baseUrl: CLAUDE_BASE_URL,
    timeout: CLAUDE_TIMEOUT,
  };
}

// ─── API Client Functions ─────────────────────────────────────────────────

/**
 * Calls Claude API with the given prompts
 * @param systemPrompt - The system prompt to set context
 * @param userQuery - The user's query
 * @param options - Optional configuration (stream mode, etc.)
 * @returns The generated text response
 * @throws {Error} If the API call fails or returns invalid data
 */
export async function callClaude(
  systemPrompt: string,
  userQuery: string,
  options?: { stream?: boolean }
): Promise<string> {
  validateConfig();

  const config = getClaudeConfig();
  
  const requestBody: ClaudeRequest = {
    model: config.model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
    temperature: 0.7,
    max_tokens: 8000,
    stream: options?.stream ?? false,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData?.error?.message ?? `HTTP ${response.status}`;
      throw new Error(`Claude API error: ${errorMessage}`);
    }

    const data: ClaudeResponse = await response.json();
    
    // Extract the message content from the response
    const text = data?.choices?.[0]?.message?.content ?? "";

    if (!text || text.trim().length === 0) {
      throw new Error("Claude API returned empty response.");
    }

    return text;
  } catch (err) {
    clearTimeout(timeoutId);
    
    if (err instanceof Error) {
      // Handle abort/timeout errors
      if (err.name === "AbortError") {
        throw new Error(
          `Claude API request timed out after ${config.timeout / 1000} seconds.`
        );
      }
      throw err;
    }
    
    throw new Error("Unknown error occurred while calling Claude API.");
  }
}

/**
 * Calls Claude API with streaming support
 * @param systemPrompt - The system prompt to set context
 * @param userQuery - The user's query
 * @param onChunk - Callback function called for each chunk of text
 * @returns The complete generated text
 * @throws {Error} If the API call fails or returns invalid data
 */
export async function callClaudeStream(
  systemPrompt: string,
  userQuery: string,
  onChunk: (text: string) => void
): Promise<string> {
  validateConfig();

  const config = getClaudeConfig();
  
  const requestBody: ClaudeRequest = {
    model: config.model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
    temperature: 0.7,
    max_tokens: 8000,
    stream: true,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData?.error?.message ?? `HTTP ${response.status}`;
      throw new Error(`Claude API error: ${errorMessage}`);
    }

    if (!response.body) {
      throw new Error("Claude API response body is null.");
    }

    // Process the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          
          if (data === "[DONE]") {
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed?.choices?.[0]?.delta?.content ?? "";
            
            if (content) {
              fullText += content;
              onChunk(content);
            }
          } catch {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    }

    if (!fullText || fullText.trim().length === 0) {
      throw new Error("Claude API returned empty streaming response.");
    }

    return fullText;
  } catch (err) {
    clearTimeout(timeoutId);
    
    if (err instanceof Error) {
      // Handle abort/timeout errors
      if (err.name === "AbortError") {
        throw new Error(
          `Claude API streaming request timed out after ${config.timeout / 1000} seconds.`
        );
      }
      throw err;
    }
    
    throw new Error("Unknown error occurred while streaming from Claude API.");
  }
}
