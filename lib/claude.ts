// Inworld Router AI client
// OpenAI-compatible chat completions via https://api.inworld.ai/v1

export interface InworldClientConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
  timeout: number;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// ─── Configuration ────────────────────────────────────────────────────────

const INWORLD_API_KEY = process.env.INWORLD_API_KEY ?? "";
const INWORLD_MODEL = "deepinfra/deepseek-v4-flash";
const INWORLD_BASE_URL = "https://api.inworld.ai/v1/chat/completions";
const INWORLD_TIMEOUT = 60000;

function validateConfig(): void {
  if (!INWORLD_API_KEY || INWORLD_API_KEY.trim().length === 0) {
    throw new Error(
      "INWORLD_API_KEY environment variable is not configured."
    );
  }
}

export function getInworldConfig(): InworldClientConfig {
  validateConfig();
  return {
    apiKey: INWORLD_API_KEY,
    model: INWORLD_MODEL,
    baseUrl: INWORLD_BASE_URL,
    timeout: INWORLD_TIMEOUT,
  };
}

// ─── Non-streaming call ───────────────────────────────────────────────────

export async function callInworld(
  systemPrompt: string,
  userQuery: string
): Promise<string> {
  validateConfig();
  const config = getInworldConfig();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(config.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuery },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: false,
        chat_template_kwargs: { enable_thinking: false },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(`Inworld API error: ${err?.error?.message ?? `HTTP ${response.status}`}`);
    }

    const data = await response.json();
    const text: string = data?.choices?.[0]?.message?.content ?? "";

    if (!text.trim()) {
      throw new Error("Inworld API returned empty response.");
    }

    return text;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw new Error(`Inworld API request timed out after ${config.timeout / 1000} seconds.`);
      }
      throw err;
    }
    throw new Error("Unknown error while calling Inworld API.");
  }
}

// ─── Streaming call (returns a ReadableStream of text chunks) ─────────────

export async function callInworldStream(
  systemPrompt: string,
  userQuery: string
): Promise<ReadableStream<string>> {
  validateConfig();
  const config = getInworldConfig();

  const response = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuery },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      stream: true,
      chat_template_kwargs: { enable_thinking: false },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Inworld API error: ${err?.error?.message ?? `HTTP ${response.status}`}`);
  }

  if (!response.body) {
    throw new Error("Inworld API response body is null.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let lineBuffer = "";
  let thinkBuffer = "";
  let insideThink = false;

  function filterThinkTags(raw: string): string {
    let result = "";
    let text = thinkBuffer + raw;
    thinkBuffer = "";

    while (text.length > 0) {
      if (insideThink) {
        const closeIdx = text.indexOf("</think>");
        if (closeIdx === -1) {
          thinkBuffer = text;
          break;
        }
        text = text.slice(closeIdx + 8);
        insideThink = false;
      } else {
        const openIdx = text.indexOf("<think>");
        if (openIdx === -1) {
          result += text;
          break;
        }
        result += text.slice(0, openIdx);
        text = text.slice(openIdx + 7);
        insideThink = true;
      }
    }
    return result;
  }

  return new ReadableStream<string>({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          controller.close();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const combined = lineBuffer + chunk;
        const lines = combined.split("\n");
        lineBuffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6);
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const delta = parsed?.choices?.[0]?.delta ?? {};
            const raw: string = delta.content ?? "";
            if (raw) {
              const content = filterThinkTags(raw);
              if (content) {
                controller.enqueue(content);
              }
            }
          } catch {
            // incomplete line — will be retried in next chunk via lineBuffer
          }
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

// ─── Legacy exports (kept for any existing callClaude references) ─────────

export const callClaude = callInworld;