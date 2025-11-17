/**
 * Standardized API Response Utilities
 *
 * Provides consistent response formats for all API routes
 */

import { NextResponse } from 'next/server'

// Standard error codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES]

// Standard error response format
export interface ApiError {
  message: string
  code?: ErrorCode
  details?: unknown
  timestamp?: string
}

// Standard success response format
export interface ApiSuccess<T = unknown> {
  data: T
  message?: string
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  message: string,
  status: number,
  code?: ErrorCode,
  details?: unknown
): NextResponse {
  const error: ApiError = {
    message,
    code,
    timestamp: new Date().toISOString(),
  }

  // Only include details in development or if not sensitive
  if (details && (process.env.NODE_ENV === 'development' || status === 400)) {
    error.details = details
  }

  // Log error server-side
  console.error(`[API Error ${status}]`, { message, code, details })

  return NextResponse.json({ error }, { status })
}

/**
 * Create a standardized success response
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
  message?: string
): NextResponse {
  const response: ApiSuccess<T> = { data }

  if (message) {
    response.message = message
  }

  return NextResponse.json(response, { status })
}

/**
 * Common error responses
 */
export const apiErrors = {
  unauthorized: (message = 'Unauthorized') =>
    errorResponse(message, 401, ERROR_CODES.UNAUTHORIZED),

  forbidden: (message = 'Forbidden') =>
    errorResponse(message, 403, ERROR_CODES.FORBIDDEN),

  notFound: (resource = 'Resource', details?: unknown) =>
    errorResponse(`${resource} not found`, 404, ERROR_CODES.NOT_FOUND, details),

  validationError: (details: unknown) =>
    errorResponse('Validation failed', 400, ERROR_CODES.VALIDATION_ERROR, details),

  badRequest: (message: string, details?: unknown) =>
    errorResponse(message, 400, ERROR_CODES.BAD_REQUEST, details),

  databaseError: (details?: unknown) =>
    errorResponse(
      'Database operation failed',
      500,
      ERROR_CODES.DATABASE_ERROR,
      details
    ),

  internalError: (message = 'Internal server error', details?: unknown) =>
    errorResponse(message, 500, ERROR_CODES.INTERNAL_ERROR, details),

  rateLimitExceeded: () =>
    errorResponse(
      'Rate limit exceeded. Please try again later.',
      429,
      ERROR_CODES.RATE_LIMIT_EXCEEDED
    ),
}

/**
 * Wrap an API route handler with error handling
 */
export function withErrorHandling<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>
): (...args: T) => Promise<NextResponse> {
  return async (...args: T) => {
    try {
      return await handler(...args)
    } catch (error: unknown) {
      console.error('Unhandled API error:', error)

      if (error instanceof Error) {
        return apiErrors.internalError(error.message)
      }

      return apiErrors.internalError()
    }
  }
}

/**
 * Pagination helper
 */
export interface PaginationParams {
  page?: number
  pageSize?: number
  maxPageSize?: number
}

export interface PaginationMeta {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function parsePaginationParams(
  searchParams: URLSearchParams,
  defaults: { page?: number; pageSize?: number; maxPageSize?: number } = {}
): { page: number; pageSize: number; from: number; to: number } {
  const page = Math.max(1, parseInt(searchParams.get('page') || String(defaults.page || 1)))
  const requestedPageSize = parseInt(searchParams.get('pageSize') || String(defaults.pageSize || 20))
  const maxPageSize = defaults.maxPageSize || 100
  const pageSize = Math.min(requestedPageSize, maxPageSize)

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  return { page, pageSize, from, to }
}

export function createPaginationMeta(
  page: number,
  pageSize: number,
  totalCount: number
): PaginationMeta {
  const totalPages = Math.ceil(totalCount / pageSize)

  return {
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}
