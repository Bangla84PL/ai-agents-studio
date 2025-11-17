'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=/dashboard`,
          data: {
            display_name: formData.displayName,
          },
        },
      })

      if (error) throw error

      setMessage({
        type: 'success',
        text: 'Check your email for the magic link to complete signup!',
      })
      setFormData({ email: '', displayName: '' })
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to sign up',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
    setLoading(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=/dashboard`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || `Failed to sign up with ${provider}`,
      })
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Get started with AI Agents Studio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-white mb-2">
              Display Name
            </label>
            <Input
              id="displayName"
              type="text"
              placeholder="John Doe"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" loading={loading} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/15 text-white/70">Or continue with</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignup('google')}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthSignup('github')}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-md text-sm ${
              message.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Login Link */}
        <p className="text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-medium">
            Log in
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center text-xs text-white/60">
          By signing up, you agree to our{' '}
          <a href="#" className="text-white/80 hover:text-white underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-white/80 hover:text-white underline">
            Privacy Policy
          </a>
        </p>
      </CardContent>
    </Card>
  )
}
