import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { randomBytes } from 'crypto'

/**
 * POST /api/user/api-key
 * Generate new API key
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

    // Generate new API key
    const apiKey = `aia_${randomBytes(32).toString('hex')}`

    // Update user with new API key
    const { data, error } = await supabase
      .from('agentsapp_users')
      .update({
        api_key: apiKey,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { message: 'Failed to generate API key', details: error } },
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
