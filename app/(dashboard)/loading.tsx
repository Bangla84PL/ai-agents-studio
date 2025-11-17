/**
 * Loading State for Dashboard Pages
 */

import { Spinner } from '@/components/ui/Spinner'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spinner size="lg" />
    </div>
  )
}
