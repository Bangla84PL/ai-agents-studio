/**
 * Core TypeScript types for AI Agents Studio
 */

// ============================================================================
// Agent Types
// ============================================================================

export type AgentType = 'chat' | 'workflow' | 'hybrid'
export type AgentStatus = 'draft' | 'active' | 'paused' | 'archived'

export interface AgentConfig {
  // Visual builder state (if using visual editor)
  nodes?: Array<{
    id: string
    type: string
    position: { x: number; y: number }
    data: Record<string, unknown>
  }>
  edges?: Array<{
    id: string
    source: string
    target: string
  }>

  // Code editor state (if using code mode)
  code?: string

  // Integrations
  n8n?: {
    webhookUrl: string
    enabled: boolean
  }
  flowise?: {
    chatflowId: string
    enabled: boolean
  }

  // Execution settings
  timeout?: number // milliseconds
  retries?: number
  maxConcurrency?: number

  // Custom metadata
  metadata?: Record<string, unknown>
}

export interface Agent {
  id: string
  user_id: string
  name: string
  description: string | null
  type: AgentType
  config: AgentConfig
  status: AgentStatus
  created_at: string
  updated_at: string
}

export interface CreateAgentInput {
  name: string
  description?: string
  type: AgentType
  config?: AgentConfig
  status?: AgentStatus
}

export interface UpdateAgentInput {
  name?: string
  description?: string
  type?: AgentType
  config?: AgentConfig
  status?: AgentStatus
}

// ============================================================================
// Execution Types
// ============================================================================

export type ExecutionStatus = 'pending' | 'running' | 'success' | 'failed' | 'timeout'

export interface Execution {
  id: string
  agent_id: string
  user_id: string
  input_data: Record<string, unknown> | null
  output_data: Record<string, unknown> | null
  status: ExecutionStatus
  trigger_type: string | null
  duration_ms: number | null
  error_message: string | null
  started_at: string
  completed_at: string | null
  created_at: string
}

export interface ExecuteAgentInput {
  input_data?: Record<string, unknown>
}

// ============================================================================
// Template Types
// ============================================================================

export type TemplateCategory = 'chat' | 'workflow' | 'hybrid' | 'utility'

export interface Template {
  id: string
  name: string
  description: string | null
  category: TemplateCategory
  config: AgentConfig
  tags: string[]
  is_public: boolean
  created_at: string
  updated_at: string
}

// ============================================================================
// User Types
// ============================================================================

export interface User {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  api_key: string | null
  preferences: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface UpdateUserInput {
  display_name?: string
  avatar_url?: string
  preferences?: Record<string, unknown>
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  data?: T
  error?: {
    message: string
    code?: string
    details?: unknown
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
  }
}

// ============================================================================
// Form Types
// ============================================================================

export interface FormError {
  field: string
  message: string
}

export interface FormState {
  isSubmitting: boolean
  errors: FormError[]
  isDirty: boolean
}

// ============================================================================
// UI Component Types
// ============================================================================

export type ButtonVariant = 'default' | 'jungle' | 'outline' | 'ghost' | 'emerald' | 'destructive'
export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

export type CardVariant = 'default' | 'subtle' | 'enhanced'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

// ============================================================================
// Analytics Types
// ============================================================================

export interface AgentMetrics {
  total_executions: number
  successful_executions: number
  failed_executions: number
  average_duration_ms: number
  success_rate: number
}

export interface DashboardStats {
  total_agents: number
  active_agents: number
  total_executions: number
  executions_today: number
  success_rate: number
}

// ============================================================================
// Integration Types
// ============================================================================

export interface N8nWebhookResponse {
  success: boolean
  data?: unknown
  error?: string
}

export interface FlowiseChatResponse {
  text: string
  metadata?: Record<string, unknown>
}

export interface GotenbergPdfOptions {
  paperFormat?: 'A4' | 'Letter'
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  landscape?: boolean
}
