import { z } from 'zod'

/**
 * Zod schemas for agent validation
 */

export const agentConfigSchema = z.object({
  nodes: z.array(z.object({
    id: z.string(),
    type: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    data: z.record(z.unknown()),
  })).optional(),
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
  })).optional(),
  code: z.string().optional(),
  n8n: z.object({
    webhookUrl: z.string().url(),
    enabled: z.boolean(),
  }).optional(),
  flowise: z.object({
    chatflowId: z.string(),
    enabled: z.boolean(),
  }).optional(),
  timeout: z.number().positive().optional(),
  retries: z.number().min(0).max(5).optional(),
  maxConcurrency: z.number().positive().optional(),
  metadata: z.record(z.unknown()).optional(),
}).passthrough()

export const createAgentSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['chat', 'workflow', 'hybrid']),
  config: agentConfigSchema.optional().default({}),
  status: z.enum(['draft', 'active', 'paused', 'archived']).optional().default('draft'),
})

export const updateAgentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional().nullable(),
  type: z.enum(['chat', 'workflow', 'hybrid']).optional(),
  config: agentConfigSchema.optional(),
  status: z.enum(['draft', 'active', 'paused', 'archived']).optional(),
})

export const executeAgentSchema = z.object({
  input_data: z.record(z.unknown()).optional(),
})
