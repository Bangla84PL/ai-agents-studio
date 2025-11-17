/**
 * n8n Integration Utilities
 *
 * Provides functions to interact with n8n workflows via webhooks
 * https://n8n.smartcamp.ai
 */

export interface N8nWebhookConfig {
  webhookUrl: string
  headers?: Record<string, string>
}

export interface N8nWebhookResponse {
  success: boolean
  data?: unknown
  error?: string
}

/**
 * Trigger an n8n workflow via webhook
 */
export async function triggerN8nWorkflow(
  config: N8nWebhookConfig,
  payload: Record<string, unknown>
): Promise<N8nWebhookResponse> {
  try {
    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return {
        success: false,
        error: `n8n webhook request failed with status ${response.status}`,
      }
    }

    const data = await response.json()

    return {
      success: true,
      data,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to trigger n8n workflow',
    }
  }
}

/**
 * Test n8n webhook connectivity
 */
export async function testN8nWebhook(webhookUrl: string): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
      }),
    })

    return response.ok
  } catch (error) {
    return false
  }
}

/**
 * Build n8n webhook URL from workflow ID
 */
export function buildN8nWebhookUrl(workflowId: string, testWebhook = false): string {
  const baseUrl = process.env.NEXT_PUBLIC_N8N_URL || 'https://n8n.smartcamp.ai'
  const path = testWebhook ? 'webhook-test' : 'webhook'
  return `${baseUrl}/${path}/${workflowId}`
}
