import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ExecutionList } from '@/components/executions/ExecutionList'
import { ExecutionFilters } from '@/components/executions/ExecutionFilters'

export default async function ExecutionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/dashboard/executions')
  }

  // Fetch all executions
  const { data: executions } = await supabase
    .from('agentsapp_executions')
    .select('*, agentsapp_agents(name, type)')
    .order('created_at', { ascending: false })
    .limit(50)

  // Calculate stats
  const stats = {
    total: executions?.length || 0,
    success: executions?.filter((e) => e.status === 'success').length || 0,
    failed: executions?.filter((e) => e.status === 'failed').length || 0,
    running: executions?.filter((e) => e.status === 'running').length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Execution History</h1>
        <p className="text-white/70 text-lg">
          Monitor and analyze your agent execution runs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg p-4">
          <div className="text-white/70 text-sm mb-1">Total Executions</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="glass-card rounded-lg p-4">
          <div className="text-white/70 text-sm mb-1">Successful</div>
          <div className="text-3xl font-bold text-emerald-500">{stats.success}</div>
        </div>
        <div className="glass-card rounded-lg p-4">
          <div className="text-white/70 text-sm mb-1">Failed</div>
          <div className="text-3xl font-bold text-red-400">{stats.failed}</div>
        </div>
        <div className="glass-card rounded-lg p-4">
          <div className="text-white/70 text-sm mb-1">Running</div>
          <div className="text-3xl font-bold text-blue-400">{stats.running}</div>
        </div>
      </div>

      {/* Filters */}
      <ExecutionFilters />

      {/* Execution List */}
      <ExecutionList executions={executions || []} />
    </div>
  )
}
