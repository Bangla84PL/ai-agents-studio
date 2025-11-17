import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { executeAgentSchema } from '@/lib/validators/agent'

/**
 * POST /api/agents/[id]/execute
 * Execute an agent
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = createClient()

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
    }

    // Fetch agent
    const { data: agent, error: agentError } = await supabase
      .from('agentsapp_agents')
      .select('*')
      .eq('id', id)
      .single()

    if (agentError || !agent) {
      return NextResponse.json({ error: { message: 'Agent not found' } }, { status: 404 })
    }

    // Check agent status
    if (agent.status !== 'active' && agent.status !== 'draft') {
      return NextResponse.json(
        { error: { message: 'Agent is not active' } },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json().catch(() => ({}))
    const validation = executeAgentSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: {
            message: 'Validation failed',
            details: validation.error.format(),
          },
        },
        { status: 400 }
      )
    }

    // Create execution record
    const { data: execution, error: executionError } = await supabase
      .from('agentsapp_executions')
      .insert({
        agent_id: agent.id,
        user_id: user.id,
        input_data: validation.data.input_data || null,
        status: 'pending',
        trigger_type: 'manual',
        started_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (executionError) {
      console.error('Database error:', executionError)
      return NextResponse.json(
        { error: { message: 'Failed to create execution', details: executionError } },
        { status: 500 }
      )
    }

    // Start execution asynchronously (fire and forget)
    // In a production environment, this would be handled by a job queue
    executeAgent(execution.id, agent, validation.data.input_data || {})
      .catch((error) => {
        console.error('Execution error:', error)
      })

    return NextResponse.json({ data: execution }, { status: 201 })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}

/**
 * Execute agent logic (simplified implementation)
 * In production, this would be in a separate service/worker
 */
async function executeAgent(
  executionId: string,
  agent: any,
  inputData: Record<string, unknown>
) {
  const supabase = createClient()

  try {
    // Update status to running
    await supabase
      .from('agentsapp_executions')
      .update({ status: 'running' })
      .eq('id', executionId)

    const startTime = Date.now()

    // Simulate agent execution based on type
    let outputData: Record<string, unknown> = {}

    switch (agent.type) {
      case 'chat':
        // Integrate with Flowise if configured
        if (agent.config?.flowise?.enabled) {
          // TODO: Call Flowise API
          outputData = {
            message: 'Chat agent execution (Flowise integration pending)',
            input: inputData,
          }
        } else {
          outputData = {
            message: 'Chat agent executed successfully (mock)',
            input: inputData,
          }
        }
        break

      case 'workflow':
        // Integrate with n8n if configured
        if (agent.config?.n8n?.enabled) {
          // TODO: Call n8n webhook
          outputData = {
            message: 'Workflow agent execution (n8n integration pending)',
            input: inputData,
          }
        } else {
          outputData = {
            message: 'Workflow agent executed successfully (mock)',
            input: inputData,
          }
        }
        break

      case 'hybrid':
        // Combine both approaches
        outputData = {
          message: 'Hybrid agent executed successfully (mock)',
          input: inputData,
        }
        break

      default:
        throw new Error(`Unknown agent type: ${agent.type}`)
    }

    const durationMs = Date.now() - startTime

    // Update execution with success
    await supabase
      .from('agentsapp_executions')
      .update({
        status: 'success',
        output_data: outputData,
        duration_ms: durationMs,
        completed_at: new Date().toISOString(),
      })
      .eq('id', executionId)
  } catch (error: any) {
    console.error('Agent execution error:', error)

    // Update execution with failure
    await supabase
      .from('agentsapp_executions')
      .update({
        status: 'failed',
        error_message: error.message || 'Unknown error',
        completed_at: new Date().toISOString(),
      })
      .eq('id', executionId)
  }
}
