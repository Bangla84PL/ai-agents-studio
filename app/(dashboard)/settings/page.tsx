import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProfileSettings } from '@/components/settings/ProfileSettings'
import { ApiKeySettings } from '@/components/settings/ApiKeySettings'
import { IntegrationSettings } from '@/components/settings/IntegrationSettings'

export default async function SettingsPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirectTo=/dashboard/settings')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('agentsapp_users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/70 text-lg">
          Manage your account and integration preferences
        </p>
      </div>

      {/* Profile Settings */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
        <ProfileSettings user={user} profile={profile} />
      </div>

      {/* API Key Settings */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">API Access</h2>
        <ApiKeySettings profile={profile} />
      </div>

      {/* Integration Settings */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Integrations</h2>
        <IntegrationSettings />
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-lg p-6 border-2 border-red-500/30">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Delete Account</div>
              <div className="text-white/70 text-sm">
                Permanently delete your account and all associated data
              </div>
            </div>
            <button
              disabled
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
