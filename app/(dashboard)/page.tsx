import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default async function DashboardPage() {
  const supabase = createClient()

  // Fetch dashboard stats
  const { data: agents } = await supabase
    .from('agentsapp_agents')
    .select('id, status')
    .throwOnError()

  const { data: executions } = await supabase
    .from('agentsapp_executions')
    .select('id, status, started_at')
    .throwOnError()

  const totalAgents = agents?.length || 0
  const activeAgents = agents?.filter((a) => a.status === 'active').length || 0
  const totalExecutions = executions?.length || 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const executionsToday =
    executions?.filter((e) => new Date(e.started_at) >= today).length || 0

  const successfulExecutions = executions?.filter((e) => e.status === 'success').length || 0
  const successRate =
    totalExecutions > 0 ? Math.round((successfulExecutions / totalExecutions) * 100) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/70">Welcome to your AI Agents Studio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardDescription>Total Agents</CardDescription>
            <CardTitle className="text-4xl">{totalAgents}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">{activeAgents} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Executions</CardDescription>
            <CardTitle className="text-4xl">{totalExecutions}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">{executionsToday} today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Success Rate</CardDescription>
            <CardTitle className="text-4xl">{successRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">{successfulExecutions} successful</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Executions Today</CardDescription>
            <CardTitle className="text-4xl">{executionsToday}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/agents/new">
              <div className="glass-card-subtle p-6 hover:bg-white/15 transition-all cursor-pointer border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white">Create Agent</h3>
                </div>
                <p className="text-sm text-white/70">Build a new AI agent from scratch</p>
              </div>
            </Link>

            <Link href="/dashboard/templates">
              <div className="glass-card-subtle p-6 hover:bg-white/15 transition-all cursor-pointer border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white">Browse Templates</h3>
                </div>
                <p className="text-sm text-white/70">Start with pre-built agent templates</p>
              </div>
            </Link>

            <Link href="/dashboard/executions">
              <div className="glass-card-subtle p-6 hover:bg-white/15 transition-all cursor-pointer border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white">View Executions</h3>
                </div>
                <p className="text-sm text-white/70">Monitor agent performance and logs</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest agent executions</CardDescription>
        </CardHeader>
        <CardContent>
          {totalExecutions === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-white/70 mb-4">No executions yet</p>
              <Link href="/dashboard/agents/new">
                <Button variant="emerald">Create Your First Agent</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {executions?.slice(0, 5).map((execution) => (
                <Link
                  key={execution.id}
                  href={`/dashboard/executions/${execution.id}`}
                  className="block p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          execution.status === 'success'
                            ? 'success'
                            : execution.status === 'failed'
                            ? 'error'
                            : execution.status === 'running'
                            ? 'info'
                            : 'default'
                        }
                      >
                        {execution.status}
                      </Badge>
                      <span className="text-sm text-white/80">Execution {execution.id.slice(0, 8)}</span>
                    </div>
                    <span className="text-sm text-white/60">
                      {new Date(execution.started_at).toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
