'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const categories = [
  { value: 'all', label: 'All Templates', icon: '📚' },
  { value: 'chat', label: 'Chat', icon: '💬' },
  { value: 'workflow', label: 'Workflow', icon: '⚙️' },
  { value: 'hybrid', label: 'Hybrid', icon: '🔀' },
  { value: 'utility', label: 'Utility', icon: '🔧' },
]

const popularTags = [
  'automation',
  'data-processing',
  'nlp',
  'api-integration',
  'scheduling',
  'notifications',
]

export function TemplateFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || 'all'
  const currentTag = searchParams.get('tag')
  const currentSearch = searchParams.get('search') || ''

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/dashboard/templates?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="max-w-md">
        <Input
          type="search"
          placeholder="Search templates..."
          value={currentSearch}
          onChange={(e) => updateFilter('search', e.target.value || null)}
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => updateFilter('category', category.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currentCategory === category.value
                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/20'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Tag Filters */}
      {popularTags.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70">Popular Tags</label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => updateFilter('tag', currentTag === tag ? null : tag)}
                className={`transition-all ${
                  currentTag === tag ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Badge variant={currentTag === tag ? 'success' : 'default'}>
                  #{tag}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
