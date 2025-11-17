'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Template } from '@/lib/types'

interface TemplateGridProps {
  templates: Template[]
}

export function TemplateGrid({ templates }: TemplateGridProps) {
  const router = useRouter()
  const [loadingTemplateId, setLoadingTemplateId] = useState<string | null>(null)

  const handleUseTemplate = async (templateId: string) => {
    setLoadingTemplateId(templateId)
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_id: templateId }),
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.error?.message || 'Failed to create agent from template')
        return
      }

      const { data: agent } = await response.json()

      // Redirect to the new agent
      router.push(`/dashboard/agents/${agent.id}`)
      router.refresh()
    } catch (error) {
      console.error('Template error:', error)
      alert('Failed to create agent from template')
    } finally {
      setLoadingTemplateId(null)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'chat':
        return '💬'
      case 'workflow':
        return '⚙️'
      case 'hybrid':
        return '🔀'
      case 'utility':
        return '🔧'
      default:
        return '📦'
    }
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No templates found
        </h3>
        <p className="text-white/70">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="flex flex-col h-full">
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{getCategoryIcon(template.category)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {template.name}
                  </h3>
                  <Badge variant="info" className="mt-1">
                    {template.category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            {template.description && (
              <p className="text-white/70 text-sm line-clamp-3">
                {template.description}
              </p>
            )}

            {/* Tags */}
            {template.tags && template.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="default" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Config Preview */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50">
                Configuration
              </label>
              <div className="bg-black/20 border border-white/10 rounded p-2 max-h-32 overflow-auto">
                <pre className="text-[10px] text-white/60 font-mono">
                  {JSON.stringify(template.config, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <Button
              onClick={() => handleUseTemplate(template.id)}
              variant="emerald"
              className="w-full"
              disabled={loadingTemplateId === template.id}
              loading={loadingTemplateId === template.id}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Use This Template
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
