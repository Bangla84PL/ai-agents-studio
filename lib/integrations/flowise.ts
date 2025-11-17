/**
 * Flowise Integration Utilities
 *
 * Provides functions to interact with Flowise chatflows
 * https://flowise.smartcamp.ai
 */

export interface FlowiseChatConfig {
  chatflowId: string
  apiKey?: string
  baseUrl?: string
}

export interface FlowiseChatRequest {
  question: string
  overrideConfig?: Record<string, unknown>
  sessionId?: string
}

export interface FlowiseChatResponse {
  text: string
  question?: string
  chatId?: string
  chatMessageId?: string
  metadata?: Record<string, unknown>
}

/**
 * Send a message to a Flowise chatflow
 */
export async function sendFlowiseMessage(
  config: FlowiseChatConfig,
  request: FlowiseChatRequest
): Promise<FlowiseChatResponse> {
  const baseUrl = config.baseUrl || process.env.NEXT_PUBLIC_FLOWISE_URL || 'https://flowise.smartcamp.ai'
  const url = `${baseUrl}/api/v1/prediction/${config.chatflowId}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error(`Flowise request failed with status ${response.status}`)
  }

  const data = await response.json()
  return data as FlowiseChatResponse
}

/**
 * Test Flowise chatflow connectivity
 */
export async function testFlowiseChatflow(config: FlowiseChatConfig): Promise<boolean> {
  try {
    await sendFlowiseMessage(config, {
      question: 'Hello, this is a test message.',
    })
    return true
  } catch (error) {
    return false
  }
}

/**
 * Get chatflow details
 */
export async function getFlowiseChatflow(
  chatflowId: string,
  apiKey?: string
): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_FLOWISE_URL || 'https://flowise.smartcamp.ai'
  const url = `${baseUrl}/api/v1/chatflows/${chatflowId}`

  const headers: Record<string, string> = {}

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch chatflow: ${response.status}`)
  }

  return response.json()
}

/**
 * Stream a message to a Flowise chatflow
 */
export async function streamFlowiseMessage(
  config: FlowiseChatConfig,
  request: FlowiseChatRequest,
  onChunk: (chunk: string) => void
): Promise<void> {
  const baseUrl = config.baseUrl || process.env.NEXT_PUBLIC_FLOWISE_URL || 'https://flowise.smartcamp.ai'
  const url = `${baseUrl}/api/v1/prediction/${config.chatflowId}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (config.apiKey) {
    headers['Authorization'] = `Bearer ${config.apiKey}`
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...request,
      streaming: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`Flowise stream request failed with status ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('No response body available')
  }

  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    const chunk = decoder.decode(value)
    onChunk(chunk)
  }
}
