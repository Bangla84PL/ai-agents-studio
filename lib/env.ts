/**
 * Environment Variable Validation
 *
 * Validates all required environment variables on application startup
 * Provides type-safe access to environment variables
 */

import { z } from 'zod'

// Define the schema for environment variables
const envSchema = z.object({
  // Next.js
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Supabase (Public)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Supabase (Private - Server only)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Integration URLs
  NEXT_PUBLIC_N8N_URL: z.string().url().optional(),
  NEXT_PUBLIC_FLOWISE_URL: z.string().url().optional(),
  NEXT_PUBLIC_GOTENBERG_URL: z.string().url().optional(),

  // Application URL
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
})

// Export the type
export type Env = z.infer<typeof envSchema>

// Validate environment variables
function validateEnv(): Env {
  try {
    const parsed = envSchema.parse(process.env)
    return parsed
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => {
        const path = err.path.join('.')
        return `  - ${path}: ${err.message}`
      })

      console.error('❌ Invalid environment variables:\n' + missingVars.join('\n'))

      throw new Error(
        'Invalid environment variables. Please check your .env file.\n' +
          missingVars.join('\n')
      )
    }

    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Helper to check if we're in production
export const isProd = env.NODE_ENV === 'production'
export const isDev = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'

// Log successful validation (only in development)
if (isDev && typeof window === 'undefined') {
  console.log('✅ Environment variables validated successfully')
}
