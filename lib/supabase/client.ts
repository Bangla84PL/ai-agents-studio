/**
 * Supabase Client (Browser)
 *
 * This client is used in client-side components and pages.
 * It uses the anon key and respects RLS policies.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
