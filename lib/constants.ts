/**
 * Application Constants
 *
 * Centralized constants to avoid magic numbers and strings
 */

// Agent Types
export const AGENT_TYPES = {
  CHAT: 'chat',
  WORKFLOW: 'workflow',
  HYBRID: 'hybrid',
} as const

export type AgentType = (typeof AGENT_TYPES)[keyof typeof AGENT_TYPES]

// Agent Statuses
export const AGENT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  ARCHIVED: 'archived',
} as const

export type AgentStatus = (typeof AGENT_STATUS)[keyof typeof AGENT_STATUS]

// Execution Statuses
export const EXECUTION_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILED: 'failed',
  TIMEOUT: 'timeout',
} as const

export type ExecutionStatus = (typeof EXECUTION_STATUS)[keyof typeof EXECUTION_STATUS]

// Template Categories
export const TEMPLATE_CATEGORIES = {
  CHAT: 'chat',
  WORKFLOW: 'workflow',
  HYBRID: 'hybrid',
  UTILITY: 'utility',
} as const

export type TemplateCategory = (typeof TEMPLATE_CATEGORIES)[keyof typeof TEMPLATE_CATEGORIES]

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const

// File Upload Limits
export const FILE_LIMITS = {
  MAX_UPLOAD_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_AGENT_ASSET_SIZE: 5 * 1024 * 1024, // 5MB
} as const

// Execution Settings
export const EXECUTION_DEFAULTS = {
  TIMEOUT_MS: 30000, // 30 seconds
  MAX_RETRIES: 3,
  MAX_CONCURRENCY: 5,
} as const

// Rate Limiting
export const RATE_LIMITS = {
  REQUESTS_PER_MINUTE: 60,
  REQUESTS_PER_HOUR: 1000,
} as const

// Cache TTL (Time To Live)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
} as const

// Application Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  AGENTS: '/dashboard/agents',
  TEMPLATES: '/dashboard/templates',
  EXECUTIONS: '/dashboard/executions',
  SETTINGS: '/dashboard/settings',
} as const

// External Service URLs (fallbacks)
export const SERVICES = {
  N8N_DEFAULT_URL: 'https://n8n.smartcamp.ai',
  FLOWISE_DEFAULT_URL: 'https://flowise.smartcamp.ai',
  GOTENBERG_DEFAULT_URL: 'https://gotenberg.smartcamp.ai',
} as const

// Database Table Names
export const TABLES = {
  USERS: 'agentsapp_users',
  AGENTS: 'agentsapp_agents',
  EXECUTIONS: 'agentsapp_executions',
  TEMPLATES: 'agentsapp_templates',
} as const

// Storage Buckets
export const STORAGE_BUCKETS = {
  UPLOADS: 'agentsapp-uploads',
  AGENT_ASSETS: 'agentsapp-agent-assets',
} as const
