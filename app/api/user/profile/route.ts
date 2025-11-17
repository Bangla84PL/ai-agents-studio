import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * PUT /api/user/profile
 * Update user profile
 */
export async function PUT(request: Request) {
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

    // Parse request body
    const body = await request.json()
    const { display_name, avatar_url, preferences } = body

    // Update profile
    const { data, error } = await supabase
      .from('agentsapp_users')
      .update({
        display_name: display_name !== undefined ? display_name : undefined,
        avatar_url: avatar_url !== undefined ? avatar_url : undefined,
        preferences: preferences !== undefined ? preferences : undefined,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { message: 'Failed to update profile', details: error } },
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
