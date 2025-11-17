'use client'

/**
 * Global Error Page
 * Catches errors in the root layout and pages
 */

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console or error tracking service
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-lg text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-white/70 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="space-y-3">
          <Button onClick={() => reset()} variant="emerald" className="w-full">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/dashboard')}
            variant="outline"
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-white/50 hover:text-white/70">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-4 bg-black/20 rounded text-xs text-red-400 overflow-auto max-h-48">
              {error.stack}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-white/50">Error ID: {error.digest}</p>
            )}
          </details>
        )}
      </div>
    </div>
  )
}
