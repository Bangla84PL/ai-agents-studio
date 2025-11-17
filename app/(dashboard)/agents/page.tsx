import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatRelativeTime } from '@/lib/utils'
import type { Agent } from '@/lib/types'

export default async function AgentsPage() {
  const supabase = await createClient()

  const { data: agents, error } = await supabase
    .from('agentsapp_agents')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Agents</h1>
          <p className="text-white/70">Manage your AI agents</p>
        </div>
        <Link href="/dashboard/agents/new">
          <Button variant="emerald">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Agent
          </Button>
        </Link>
      </div>

      {/* Agents Grid */}
      {error ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <p className="text-red-400">Failed to load agents: {error.message}</p>
            </div>
          </CardContent>
        </Card>
      ) : agents && agents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: Agent) => (
            <Link key={agent.id} href={`/dashboard/agents/${agent.id}`}>
              <Card className="hover:bg-white/20 transition-all cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant={
                        agent.status === 'active'
                          ? 'success'
                          : agent.status === 'draft'
                          ? 'default'
                          : agent.status === 'paused'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {agent.status}
                    </Badge>
                    <Badge variant="info">{agent.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{agent.name}</CardTitle>
                  {agent.description && (
                    <CardDescription className="line-clamp-2">
                      {agent.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">
                      Created {formatRelativeTime(agent.created_at)}
                    </span>
                    <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">No agents yet</h3>
              <p className="text-white/70 mb-6">Get started by creating your first AI agent</p>
              <Link href="/dashboard/agents/new">
                <Button variant="emerald">Create Your First Agent</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
