'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  user: User | null
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="jungle-overlay sticky top-0 z-20 border-b border-white/10">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="hover:scale-105 transition-transform duration-300">
            <Image
              src="/SmartCampAIpng.png"
              alt="SmartCamp AI"
              width={160}
              height={80}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-white/80 hidden sm:inline">
                  {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  loading={loading}
                  disabled={loading}
                >
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
