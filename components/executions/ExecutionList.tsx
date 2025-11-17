'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'

interface ExecutionWithAgent {
  id: string
  agent_id: string
  status: string
  trigger_type: string | null
  started_at: string
  completed_at: string | null
  duration_ms: number | null
  error_message: string | null
  agentsapp_agents: {
    name: string
    type: string
  } | null
}

interface ExecutionListProps {
  executions: ExecutionWithAgent[]
}

export function ExecutionList({ executions }: ExecutionListProps) {
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

  const formatDuration = (durationMs: number | null) => {
    if (!durationMs) return 'N/A'

    if (durationMs < 1000) return `${durationMs}ms`
    if (durationMs < 60000) return `${(durationMs / 1000).toFixed(2)}s`
    return `${(durationMs / 60000).toFixed(2)}m`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  if (executions.length === 0) {
    return (
      <div className="glass-card rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No executions found
        </h3>
        <p className="text-white/70">
          Execute an agent to see execution history here
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-sm font-medium text-white/70">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-white/70">
                Agent
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-white/70">
                Type
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-white/70">
                Trigger
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-white/70">
                Duration
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-white/70">
                Started
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-white/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {executions.map((execution) => (
              <tr
                key={execution.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <Badge variant={getStatusVariant(execution.status)}>
                    <span className="mr-1">{getStatusIcon(execution.status)}</span>
                    {execution.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/agents/${execution.agent_id}`}
                    className="text-white hover:text-emerald-500 font-medium transition-colors"
                  >
                    {execution.agentsapp_agents?.name || 'Unknown Agent'}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/70 text-sm">
                    {execution.agentsapp_agents?.type || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/70 text-sm">
                    {execution.trigger_type || 'manual'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/70 text-sm font-mono">
                    {formatDuration(execution.duration_ms)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/70 text-sm">
                    {formatDate(execution.started_at)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/executions/${execution.id}`}
                    className="text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
