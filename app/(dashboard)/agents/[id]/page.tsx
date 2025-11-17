import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AgentEditor } from '@/components/agents/AgentEditor'
import { RecentExecutions } from '@/components/agents/RecentExecutions'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface AgentPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { id } = await params
  const supabase = createClient()

  // Verify authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/dashboard/agents/' + id)
  }

  // Fetch agent
  const { data: agent, error } = await supabase
    .from('agentsapp_agents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !agent) {
    notFound()
  }

  // Fetch recent executions
  const { data: executions } = await supabase
    .from('agentsapp_executions')
    .select('*')
    .eq('agent_id', id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/agents">
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
                Back to Agents
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
          {agent.description && (
            <p className="text-white/70 text-lg">{agent.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <form action={`/api/agents/${id}/execute`} method="POST">
            <Button type="submit" variant="emerald" size="lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Execute Agent
            </Button>
          </form>
        </div>
      </div>

      {/* Agent Editor */}
      <AgentEditor agent={agent} />

      {/* Recent Executions */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Executions
        </h2>
        <RecentExecutions executions={executions || []} />
      </div>
    </div>
  )
}
