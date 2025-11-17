/**
 * 404 Not Found Page
 */

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-lg text-center">
        <div className="text-6xl mb-4">404</div>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-white/70 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link href="/dashboard">
            <Button variant="emerald" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
