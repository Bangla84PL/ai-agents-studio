'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface ApiKeySettingsProps {
  profile: any
}

export function ApiKeySettings({ profile }: ApiKeySettingsProps) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const apiKey = profile?.api_key

  const handleGenerate = async () => {
    if (apiKey && !confirm('This will invalidate your existing API key. Continue?')) {
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/user/api-key', {
        method: 'POST',
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error?.message || 'Failed to generate API key')
        return
      }

      router.refresh()
      alert('API key generated successfully!')
      setShowKey(true)
    } catch (error) {
      console.error('API key generation error:', error)
      alert('Failed to generate API key')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
      alert('API key copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-white/70 text-sm">
        Use this API key to authenticate requests to the AI Agents Studio API.
      </p>

      {apiKey ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="font-mono"
            />
            <Button
              onClick={() => setShowKey(!showKey)}
              variant="outline"
              size="sm"
            >
              {showKey ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </Button>
            <Button onClick={handleCopy} variant="outline" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleGenerate}
              variant="outline"
              disabled={isGenerating}
              loading={isGenerating}
            >
              Regenerate API Key
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-white/50 mb-4">No API key generated yet</p>
          <Button
            onClick={handleGenerate}
            variant="emerald"
            disabled={isGenerating}
            loading={isGenerating}
          >
            Generate API Key
          </Button>
        </div>
      )}

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-4">
        <div className="flex gap-2">
          <svg
            className="w-5 h-5 text-yellow-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <div className="text-yellow-500 text-sm font-medium mb-1">
              Keep your API key secure
            </div>
            <div className="text-yellow-500/80 text-xs">
              Do not share your API key or commit it to version control. Treat it like a password.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
