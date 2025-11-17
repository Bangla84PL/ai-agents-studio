/**
 * Unit tests for n8n integration utilities
 */

import {
  triggerN8nWorkflow,
  testN8nWebhook,
  buildN8nWebhookUrl,
} from '../n8n'

// Mock fetch globally
global.fetch = jest.fn()

describe('triggerN8nWorkflow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should trigger n8n workflow successfully', async () => {
    const mockResponse = { result: 'success', data: { id: '123' } }
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const config = {
      webhookUrl: 'https://n8n.test.com/webhook/test-workflow',
    }
    const payload = { input: 'test data' }

    const result = await triggerN8nWorkflow(config, payload)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockResponse)
    expect(global.fetch).toHaveBeenCalledWith(
      config.webhookUrl,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
      })
    )
  })

  it('should include custom headers', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const config = {
      webhookUrl: 'https://n8n.test.com/webhook/test',
      headers: {
        'X-Custom-Header': 'custom-value',
        'Authorization': 'Bearer token',
      },
    }

    await triggerN8nWorkflow(config, {})

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value',
          'Authorization': 'Bearer token',
        }),
      })
    )
  })

  it('should handle HTTP errors', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    const config = {
      webhookUrl: 'https://n8n.test.com/webhook/test',
    }

    const result = await triggerN8nWorkflow(config, {})

    expect(result.success).toBe(false)
    expect(result.error).toContain('500')
  })

  it('should handle network errors', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const config = {
      webhookUrl: 'https://n8n.test.com/webhook/test',
    }

    const result = await triggerN8nWorkflow(config, {})

    expect(result.success).toBe(false)
    expect(result.error).toContain('Network error')
  })

  it('should handle fetch exceptions without message', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce({})

    const config = {
      webhookUrl: 'https://n8n.test.com/webhook/test',
    }

    const result = await triggerN8nWorkflow(config, {})

    expect(result.success).toBe(false)
    expect(result.error).toBe('Failed to trigger n8n workflow')
  })
})

describe('testN8nWebhook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return true for successful connection', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    })

    const result = await testN8nWebhook('https://n8n.test.com/webhook/test')

    expect(result).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://n8n.test.com/webhook/test',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"test":true'),
      })
    )
  })

  it('should return false for failed connection', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    })

    const result = await testN8nWebhook('https://n8n.test.com/webhook/test')

    expect(result).toBe(false)
  })

  it('should return false on error', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'))

    const result = await testN8nWebhook('https://n8n.test.com/webhook/test')

    expect(result).toBe(false)
  })
})

describe('buildN8nWebhookUrl', () => {
  it('should build production webhook URL', () => {
    const url = buildN8nWebhookUrl('my-workflow-id', false)

    expect(url).toBe('https://n8n.smartcamp.ai/webhook/my-workflow-id')
  })

  it('should build test webhook URL', () => {
    const url = buildN8nWebhookUrl('my-workflow-id', true)

    expect(url).toBe('https://n8n.smartcamp.ai/webhook-test/my-workflow-id')
  })

  it('should use environment variable if set', () => {
    process.env.NEXT_PUBLIC_N8N_URL = 'https://custom-n8n.com'

    const url = buildN8nWebhookUrl('workflow-123', false)

    expect(url).toBe('https://custom-n8n.com/webhook/workflow-123')

    // Clean up
    delete process.env.NEXT_PUBLIC_N8N_URL
  })

  it('should handle workflow IDs with special characters', () => {
    const url = buildN8nWebhookUrl('workflow-with-dashes_and_underscores', false)

    expect(url).toContain('workflow-with-dashes_and_underscores')
  })
})
