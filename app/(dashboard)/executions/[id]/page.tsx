import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface ExecutionPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ExecutionPage({ params }: ExecutionPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/dashboard/executions/' + id)
  }

  // Fetch execution with agent details
  const { data: execution, error } = await supabase
    .from('agentsapp_executions')
    .select('*, agentsapp_agents(id, name, type, status)')
    .eq('id', id)
    .single()

  if (error || !execution) {
    notFound()
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

  const formatDuration = (durationMs: number | null) => {
    if (!durationMs) return 'N/A'
    if (durationMs < 1000) return `${durationMs}ms`
    if (durationMs < 60000) return `${(durationMs / 1000).toFixed(2)}s`
    return `${(durationMs / 60000).toFixed(2)}m`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/executions">
              <Button variant="ghost" size="sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Executions
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Execution Details
          </h1>
          <p className="text-white/70 text-sm font-mono">#{id.slice(0, 8)}</p>
        </div>

        <Badge variant={getStatusVariant(execution.status)} className="text-lg px-4 py-2">
          <span className="mr-2">{getStatusIcon(execution.status)}</span>
          {execution.status}
        </Badge>
      </div>

      {/* Overview */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-white/50 text-sm mb-1">Agent</div>
            <Link
              href={`/dashboard/agents/${execution.agentsapp_agents.id}`}
              className="text-white hover:text-emerald-500 font-medium transition-colors"
            >
              {execution.agentsapp_agents.name}
            </Link>
          </div>

          <div>
            <div className="text-white/50 text-sm mb-1">Agent Type</div>
            <div className="text-white">{execution.agentsapp_agents.type}</div>
          </div>

          <div>
            <div className="text-white/50 text-sm mb-1">Trigger Type</div>
            <div className="text-white">{execution.trigger_type || 'manual'}</div>
          </div>

          <div>
            <div className="text-white/50 text-sm mb-1">Duration</div>
            <div className="text-white font-mono">
              {formatDuration(execution.duration_ms)}
            </div>
          </div>

          <div>
            <div className="text-white/50 text-sm mb-1">Started At</div>
            <div className="text-white">
              {new Date(execution.started_at).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'medium',
              })}
            </div>
          </div>

          <div>
            <div className="text-white/50 text-sm mb-1">Completed At</div>
            <div className="text-white">
              {execution.completed_at
                ? new Date(execution.completed_at).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                  })
                : 'In progress...'}
            </div>
          </div>

          <div>
            <div className="text-white/50 text-sm mb-1">Created At</div>
            <div className="text-white">
              {new Date(execution.created_at).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'medium',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Input Data */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Input Data</h2>
        {execution.input_data ? (
          <div className="bg-black/20 border border-white/10 rounded-md p-4 max-h-96 overflow-auto">
            <pre className="text-sm text-white/80 font-mono">
              {JSON.stringify(execution.input_data, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-white/50 text-sm">No input data</div>
        )}
      </div>

      {/* Output Data */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Output Data</h2>
        {execution.output_data ? (
          <div className="bg-black/20 border border-white/10 rounded-md p-4 max-h-96 overflow-auto">
            <pre className="text-sm text-white/80 font-mono">
              {JSON.stringify(execution.output_data, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-white/50 text-sm">
            {execution.status === 'running' || execution.status === 'pending'
              ? 'Execution in progress...'
              : 'No output data'}
          </div>
        )}
      </div>

      {/* Error Message */}
      {execution.error_message && (
        <div className="glass-card rounded-lg p-6 border-2 border-red-500/30">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Error</h2>
          <div className="bg-red-500/10 border border-red-500/20 rounded-md p-4">
            <pre className="text-sm text-red-300 font-mono whitespace-pre-wrap">
              {execution.error_message}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
