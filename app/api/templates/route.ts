import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/templates
 * List all available templates
 */
export async function GET(request: Request) {
  try {
    const supabase = createClient()

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
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')

    // Build query
    let query = supabase
      .from('agentsapp_templates')
      .select('*', { count: 'exact' })
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (tag) {
      query = query.contains('tags', [tag])
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { message: 'Failed to fetch templates', details: error } },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      count: count || 0,
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
 * POST /api/templates
 * Create agent from template
 */
export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: { message: 'Unauthorized' } }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { template_id, name, description } = body

    if (!template_id) {
      return NextResponse.json(
        { error: { message: 'Template ID is required' } },
        { status: 400 }
      )
    }

    // Fetch template
    const { data: template, error: templateError } = await supabase
      .from('agentsapp_templates')
      .select('*')
      .eq('id', template_id)
      .single()

    if (templateError || !template) {
      return NextResponse.json(
        { error: { message: 'Template not found' } },
        { status: 404 }
      )
    }

    // Create agent from template
    const { data: agent, error: createError } = await supabase
      .from('agentsapp_agents')
      .insert({
        user_id: user.id,
        name: name || template.name,
        description: description || template.description,
        type: template.category === 'utility' ? 'workflow' : template.category,
        config: template.config,
        status: 'draft',
      })
      .select()
      .single()

    if (createError) {
      console.error('Database error:', createError)
      return NextResponse.json(
        { error: { message: 'Failed to create agent from template', details: createError } },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: agent }, { status: 201 })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: { message: 'Internal server error', details: error.message } },
      { status: 500 }
    )
  }
}
