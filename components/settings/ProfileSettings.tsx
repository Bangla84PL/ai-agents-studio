'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { User } from '@supabase/supabase-js'

interface ProfileSettingsProps {
  user: User
  profile: any
}

export function ProfileSettings({ user, profile }: ProfileSettingsProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [displayName, setDisplayName] = useState(profile?.display_name || '')

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name: displayName }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error?.message || 'Failed to update profile')
        return
      }

      router.refresh()
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Profile update error:', error)
      alert('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Email</label>
        <Input value={user.email || ''} disabled />
        <p className="text-xs text-white/50">
          Your email address cannot be changed
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Display Name</label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter your display name"
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          variant="emerald"
          disabled={isSaving}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
