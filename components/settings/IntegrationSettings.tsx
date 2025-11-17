'use client'

import { Badge } from '@/components/ui/Badge'

const integrations = [
  {
    name: 'n8n',
    description: 'Workflow automation platform',
    url: 'https://n8n.smartcamp.ai',
    icon: '⚙️',
    status: 'available',
  },
  {
    name: 'Flowise',
    description: 'AI chatflow builder',
    url: 'https://flowise.smartcamp.ai',
    icon: '🤖',
    status: 'available',
  },
  {
    name: 'Gotenberg',
    description: 'PDF generation service',
    url: 'https://gotenberg.smartcamp.ai',
    icon: '📄',
    status: 'available',
  },
]

export function IntegrationSettings() {
  return (
    <div className="space-y-4">
      <p className="text-white/70 text-sm">
        These integrations are available for your agents. Configure them in your agent settings.
      </p>

      <div className="space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-md"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{integration.icon}</div>
              <div>
                <div className="text-white font-medium">{integration.name}</div>
                <div className="text-white/70 text-sm">
                  {integration.description}
                </div>
                <a
                  href={integration.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-400 text-xs transition-colors"
                >
                  {integration.url} ↗
                </a>
              </div>
            </div>

            <Badge variant="success">
              {integration.status}
            </Badge>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-4">
        <div className="flex gap-2">
          <svg
            className="w-5 h-5 text-blue-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <div className="text-blue-400 text-sm font-medium mb-1">
              VPS Infrastructure
            </div>
            <div className="text-blue-400/80 text-xs">
              All integrations are hosted on srv867044.hstgr.cloud with SSL via Traefik.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
