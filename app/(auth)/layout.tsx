import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="jungle-overlay">
        <div className="container-custom py-6">
          <Link href="/" className="hover:scale-105 transition-transform duration-300">
            <Image
              src="/SmartCampAIpng.png"
              alt="SmartCamp AI"
              width={160}
              height={80}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="jungle-overlay">
        <div className="container-custom py-8">
          <p className="text-center text-white/80 text-sm">
            © {new Date().getFullYear()} Created with ❤️ by{' '}
            <a
              href="https://smartcamp.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400 font-medium"
            >
              SmartCamp.AI
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
