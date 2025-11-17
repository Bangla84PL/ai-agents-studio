'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { AgentType, AgentStatus } from '@/lib/types'

export default function NewAgentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'chat' as AgentType,
    status: 'draft' as AgentStatus,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          config: {},
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error?.message || 'Failed to create agent')
      }

      const data = await response.json()
      router.push(`/dashboard/agents/${data.data.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard/agents" className="text-sm text-emerald-500 hover:text-emerald-400 mb-4 inline-block">
          ← Back to Agents
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Create New Agent</h1>
        <p className="text-white/70">Configure your AI agent settings</p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Details</CardTitle>
          <CardDescription>Provide basic information about your agent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Agent Name *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="My AI Agent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="flex w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/70 backdrop-blur-sm focus:outline-none focus:border-2 focus:border-white/50 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe what this agent does..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-white mb-2">
                Agent Type *
              </label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm focus:outline-none focus:border-2 focus:border-white/50 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as AgentType })}
                disabled={loading}
              >
                <option value="chat">Chat - Conversational agent</option>
                <option value="workflow">Workflow - Process automation</option>
                <option value="hybrid">Hybrid - Chat + Workflow</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                Initial Status *
              </label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm focus:outline-none focus:border-2 focus:border-white/50 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as AgentStatus })}
                disabled={loading}
              >
                <option value="draft">Draft - Not yet active</option>
                <option value="active">Active - Ready to execute</option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-md text-sm bg-red-500/20 text-red-400 border border-red-500/30">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button type="submit" variant="emerald" loading={loading} disabled={loading} className="flex-1">
                Create Agent
              </Button>
              <Link href="/dashboard/agents">
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
