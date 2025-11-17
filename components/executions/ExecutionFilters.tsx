'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'

const statusFilters = [
  { value: 'all', label: 'All Status', icon: '📊' },
  { value: 'success', label: 'Success', icon: '✓' },
  { value: 'failed', label: 'Failed', icon: '✗' },
  { value: 'running', label: 'Running', icon: '⟳' },
  { value: 'pending', label: 'Pending', icon: '○' },
  { value: 'timeout', label: 'Timeout', icon: '⏱' },
]

export function ExecutionFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') || 'all'
  const currentAgentId = searchParams.get('agent_id') || ''

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`/dashboard/executions?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => updateFilter('status', filter.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currentStatus === filter.value
                ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border border-white/20'
            }`}
          >
            <span className="mr-2">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>

      {/* Agent ID Filter */}
      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Filter by Agent ID..."
          value={currentAgentId}
          onChange={(e) => updateFilter('agent_id', e.target.value || null)}
        />
      </div>
    </div>
  )
}
