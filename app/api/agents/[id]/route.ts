import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateAgentSchema } from '@/lib/validators/agent'

/**
 * GET /api/agents/[id]
 * Get agent by ID
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const { data, error } = await supabase
      .from('agentsapp_agents')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: { message: 'Agent not found' } }, { status: 404 })
      }
      return NextResponse.json(
        { error: { message: 'Failed to fetch agent', details: error } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/agents/[id]
 * Update agent
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    // Parse and validate request body
    const body = await request.json()
    const validation = updateAgentSchema.safeParse(body)

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

    // Update agent
    const { data, error } = await supabase
      .from('agentsapp_agents')
      .update(validation.data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: { message: 'Agent not found' } }, { status: 404 })
      }
      return NextResponse.json(
        { error: { message: 'Failed to update agent', details: error } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/agents/[id]
 * Delete agent
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

    // Delete agent (cascades to executions via FK)
    const { error } = await supabase
      .from('agentsapp_agents')
      .delete()
      .eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: { message: 'Agent not found' } }, { status: 404 })
      }
      return NextResponse.json(
        { error: { message: 'Failed to delete agent', details: error } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: { success: true } })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}
