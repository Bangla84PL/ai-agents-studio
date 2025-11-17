import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAgentSchema } from '@/lib/validators/agent'

/**
 * GET /api/agents
 * List all agents for the authenticated user
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = Math.min(parseInt(searchParams.get('pageSize') || '20'), 100)

    // Build query
    let query = supabase
      .from('agentsapp_agents')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (type) {
      query = query.eq('type', type)
    }

    // Pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { message: 'Failed to fetch agents', details: error } },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        pageSize,
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      },
    })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}

/**
 * POST /api/agents
 * Create a new agent
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient()

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
    const validation = createAgentSchema.safeParse(body)

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

    const { name, description, type, config, status } = validation.data

    // Insert agent
    const { data, error } = await supabase
      .from('agentsapp_agents')
      .insert({
        user_id: user.id,
        name,
        description: description || null,
        type,
        config,
        status,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { message: 'Failed to create agent', details: error } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}
