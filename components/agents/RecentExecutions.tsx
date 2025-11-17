'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { Execution } from '@/lib/types'

interface RecentExecutionsProps {
  executions: Execution[]
}

export function RecentExecutions({ executions }: RecentExecutionsProps) {
  if (executions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-white mb-2">
          No executions yet
        </h3>
        <p className="text-white/70">
          Execute this agent to see execution history here
        </p>
      </div>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success':
        return 'success'
      case 'failed':
        return 'error'
      case 'running':
        return 'info'
      case 'timeout':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'failed':
        return '✗'
      case 'running':
        return '⟳'
      case 'timeout':
        return '⏱'
      default:
        return '○'
    }
  }

  const formatDuration = (startedAt: string, completedAt: string | null) => {
    if (!completedAt) return 'In progress...'

    const start = new Date(startedAt).getTime()
    const end = new Date(completedAt).getTime()
    const durationMs = end - start

    if (durationMs < 1000) return `${durationMs}ms`
    if (durationMs < 60000) return `${(durationMs / 1000).toFixed(2)}s`
    return `${(durationMs / 60000).toFixed(2)}m`
  }

  return (
    <div className="space-y-3">
      {executions.map((execution) => (
        <Link
          key={execution.id}
          href={`/dashboard/executions/${execution.id}`}
          className="block p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Status Badge */}
              <Badge variant={getStatusVariant(execution.status)}>
                <span className="mr-1">{getStatusIcon(execution.status)}</span>
                {execution.status}
              </Badge>

              {/* Execution Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    Execution #{execution.id.slice(0, 8)}
                  </span>
                  {execution.trigger_type && (
                    <span className="text-xs text-white/50">
                      via {execution.trigger_type}
                    </span>
                  )}
                </div>

                {execution.error_message && (
                  <p className="text-xs text-red-400 mt-1 truncate">
                    {execution.error_message}
                  </p>
                )}
              </div>
            </div>

            {/* Timing Info */}
            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="text-right">
                <div className="text-xs text-white/50">Duration</div>
                <div className="font-mono">
                  {formatDuration(execution.started_at, execution.completed_at)}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-white/50">Started</div>
                <div>
                  {new Date(execution.started_at).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              {/* Arrow Icon */}
              <svg
                className="w-5 h-5 text-white/30 group-hover:text-emerald-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
