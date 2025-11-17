'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import type { Agent } from '@/lib/types'

interface AgentEditorProps {
  agent: Agent
}

type TabType = 'configure' | 'build' | 'test'

export function AgentEditor({ agent }: AgentEditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('configure')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [formData, setFormData] = useState({
    name: agent.name,
    description: agent.description || '',
    type: agent.type,
    status: agent.status,
    config: agent.config,
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error?.message || 'Failed to update agent')
        return
      }

      router.refresh()
      alert('Agent updated successfully!')
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to update agent')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this agent? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error?.message || 'Failed to delete agent')
        return
      }

      router.push('/dashboard/agents')
      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete agent')
      setIsDeleting(false)
    }
  }

  const tabs = [
    { id: 'configure' as TabType, name: 'Configure', icon: '⚙️' },
    { id: 'build' as TabType, name: 'Build', icon: '🔧' },
    { id: 'test' as TabType, name: 'Test', icon: '🧪' },
  ]

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white/10 text-emerald-500 border-b-2 border-emerald-500'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'configure' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Agent name"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'chat' | 'workflow' | 'hybrid',
                    })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="chat">Chat</option>
                  <option value="workflow">Workflow</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as
                        | 'draft'
                        | 'active'
                        | 'paused'
                        | 'archived',
                    })
                  }
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Created */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Created</label>
                <div className="text-white/70 text-sm">
                  {new Date(agent.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what this agent does..."
                rows={3}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Configuration Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Configuration (JSON)
              </label>
              <div className="bg-black/20 border border-white/20 rounded-md p-4 max-h-64 overflow-auto">
                <pre className="text-xs text-white/80 font-mono">
                  {JSON.stringify(formData.config, null, 2)}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={isDeleting}
                loading={isDeleting}
              >
                Delete Agent
              </Button>

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
        )}

        {activeTab === 'build' && (
          <div className="space-y-4">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Visual Builder
              </h3>
              <p className="text-white/70 mb-6">
                Drag-and-drop workflow builder coming soon
              </p>
              <div className="flex justify-center gap-3">
                <Badge variant="info">React Flow Integration</Badge>
                <Badge variant="info">Node-based Editor</Badge>
                <Badge variant="info">Real-time Preview</Badge>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="space-y-4">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧪</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Test Console
              </h3>
              <p className="text-white/70 mb-6">
                Interactive testing environment coming soon
              </p>
              <div className="flex justify-center gap-3">
                <Badge variant="info">Input Playground</Badge>
                <Badge variant="info">Live Execution</Badge>
                <Badge variant="info">Debug Logs</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
