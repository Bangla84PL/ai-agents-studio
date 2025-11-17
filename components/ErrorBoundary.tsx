'use client'

/**
 * Error Boundary Component
 *
 * Catches React errors and displays a fallback UI
 * Prevents entire app from crashing due to component errors
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console
    console.error('Error Boundary caught an error:', error, errorInfo)

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (e.g., Sentry)
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-8 rounded-lg text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-white/70 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                variant="emerald"
                className="w-full"
              >
                Reload Page
              </Button>
              <Button
                onClick={() => (window.location.href = '/dashboard')}
                variant="outline"
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-white/50 hover:text-white/70">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 p-4 bg-black/20 rounded text-xs text-red-400 overflow-auto max-h-48">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Lightweight error boundary for smaller sections
 */
export function SectionErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <ErrorBoundary
      fallback={
        fallback || (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md">
            <p className="text-red-400 text-sm">
              Failed to load this section. Please try refreshing the page.
            </p>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  )
}
