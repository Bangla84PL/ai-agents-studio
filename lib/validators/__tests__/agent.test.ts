/**
 * Unit tests for agent validation schemas
 */

import {
  agentConfigSchema,
  createAgentSchema,
  updateAgentSchema,
  executeAgentSchema,
} from '../agent'

describe('agentConfigSchema', () => {
  it('should validate empty config', () => {
    const result = agentConfigSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should validate config with nodes and edges', () => {
    const config = {
      nodes: [
        {
          id: 'node1',
          type: 'start',
          position: { x: 100, y: 100 },
          data: { label: 'Start' },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
        },
      ],
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })

  it('should validate config with code', () => {
    const config = {
      code: 'console.log("Hello World")',
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })

  it('should validate config with n8n integration', () => {
    const config = {
      n8n: {
        webhookUrl: 'https://n8n.example.com/webhook/test',
        enabled: true,
      },
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })

  it('should reject invalid n8n webhook URL', () => {
    const config = {
      n8n: {
        webhookUrl: 'not-a-url',
        enabled: true,
      },
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(false)
  })

  it('should validate config with flowise integration', () => {
    const config = {
      flowise: {
        chatflowId: 'chatflow-123',
        enabled: true,
      },
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })

  it('should validate execution settings', () => {
    const config = {
      timeout: 30000,
      retries: 3,
      maxConcurrency: 5,
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })

  it('should reject negative timeout', () => {
    const config = {
      timeout: -100,
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(false)
  })

  it('should reject retries > 5', () => {
    const config = {
      retries: 10,
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(false)
  })

  it('should allow arbitrary metadata', () => {
    const config = {
      metadata: {
        customField: 'value',
        nested: {
          data: 123,
        },
      },
    }

    const result = agentConfigSchema.safeParse(config)
    expect(result.success).toBe(true)
  })
})

describe('createAgentSchema', () => {
  it('should validate valid agent creation data', () => {
    const data = {
      name: 'Test Agent',
      description: 'A test agent',
      type: 'chat' as const,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should apply default config', () => {
    const data = {
      name: 'Test Agent',
      type: 'workflow' as const,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.config).toEqual({})
    }
  })

  it('should apply default status', () => {
    const data = {
      name: 'Test Agent',
      type: 'hybrid' as const,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.status).toBe('draft')
    }
  })

  it('should reject empty name', () => {
    const data = {
      name: '',
      type: 'chat' as const,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should reject name > 100 chars', () => {
    const data = {
      name: 'a'.repeat(101),
      type: 'chat' as const,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should reject description > 500 chars', () => {
    const data = {
      name: 'Test',
      description: 'a'.repeat(501),
      type: 'chat' as const,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should reject invalid agent type', () => {
    const data = {
      name: 'Test',
      type: 'invalid' as any,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should validate all agent types', () => {
    const types = ['chat', 'workflow', 'hybrid'] as const

    types.forEach((type) => {
      const result = createAgentSchema.safeParse({
        name: 'Test',
        type,
      })
      expect(result.success).toBe(true)
    })
  })

  it('should reject invalid status', () => {
    const data = {
      name: 'Test',
      type: 'chat' as const,
      status: 'invalid' as any,
    }

    const result = createAgentSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should validate all statuses', () => {
    const statuses = ['draft', 'active', 'paused', 'archived'] as const

    statuses.forEach((status) => {
      const result = createAgentSchema.safeParse({
        name: 'Test',
        type: 'chat' as const,
        status,
      })
      expect(result.success).toBe(true)
    })
  })
})

describe('updateAgentSchema', () => {
  it('should validate partial updates', () => {
    const data = {
      name: 'Updated Name',
    }

    const result = updateAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should allow null description', () => {
    const data = {
      description: null,
    }

    const result = updateAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should validate status update', () => {
    const data = {
      status: 'active' as const,
    }

    const result = updateAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should validate config update', () => {
    const data = {
      config: {
        timeout: 60000,
      },
    }

    const result = updateAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should validate empty update', () => {
    const result = updateAgentSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should reject invalid field values', () => {
    const data = {
      name: '',
    }

    const result = updateAgentSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe('executeAgentSchema', () => {
  it('should validate empty input_data', () => {
    const result = executeAgentSchema.safeParse({})
    expect(result.success).toBe(true)
  })

  it('should validate with input_data', () => {
    const data = {
      input_data: {
        message: 'Hello',
        userId: 123,
      },
    }

    const result = executeAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should allow arbitrary input_data structure', () => {
    const data = {
      input_data: {
        nested: {
          deeply: {
            structured: ['array', 'of', 'data'],
          },
        },
      },
    }

    const result = executeAgentSchema.safeParse(data)
    expect(result.success).toBe(true)
  })
})
