import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TemplateGrid } from '@/components/templates/TemplateGrid'
import { TemplateFilters } from '@/components/templates/TemplateFilters'

export default async function TemplatesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/dashboard/templates')
  }

  // Fetch all templates
  const { data: templates } = await supabase
    .from('agentsapp_templates')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Template Library</h1>
        <p className="text-white/70 text-lg">
          Start building faster with pre-configured agent templates
        </p>
      </div>

      {/* Filters */}
      <TemplateFilters />

      {/* Template Grid */}
      <TemplateGrid templates={templates || []} />
    </div>
  )
}
