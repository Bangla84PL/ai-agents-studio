import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="jungle-overlay">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:scale-105 transition-transform duration-300">
              <Image
                src="/SmartCampAIpng.png"
                alt="SmartCamp AI"
                width={160}
                height={80}
                priority
                className="h-12 w-auto sm:h-14 md:h-16"
              />
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white hover:text-emerald-500 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-white text-forest-green rounded-md text-sm font-medium hover:bg-white/90 transition-all"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="container-custom py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-shadow-lg">
              Build, Deploy & Manage
              <br />
              <span className="text-emerald-500">AI Agents</span> with Ease
            </h1>

            {/* Hero Description */}
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-shadow">
              Create powerful AI agents with our visual builder. Pre-built templates, seamless
              integrations with n8n and Flowise, and real-time monitoring.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3 bg-white text-forest-green rounded-md text-base font-semibold hover:bg-white/90 transition-all hover:scale-105"
              >
                Start Building Free
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto px-8 py-3 border border-white/30 text-white rounded-md text-base font-medium hover:bg-white/10 transition-all"
              >
                Explore Features
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-sm text-emerald-500 font-medium pt-4 text-shadow">
              You are the Future! 🌿
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container-custom py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 text-shadow-lg">
              Everything You Need to Build AI Agents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="glass-card p-6 space-y-4 hover-lift">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Visual Builder</h3>
                <p className="text-white/70">
                  Drag-and-drop interface with code editor. Build complex agents without writing
                  code.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-6 space-y-4 hover-lift animation-delay-100">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Pre-built Templates</h3>
                <p className="text-white/70">
                  Start with ready-made templates for common use cases. Customize to fit your
                  needs.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-6 space-y-4 hover-lift animation-delay-200">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Powerful Integrations</h3>
                <p className="text-white/70">
                  Connect with n8n workflows, Flowise chatflows, and more. Build complex
                  automation.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card p-6 space-y-4 hover-lift animation-delay-300">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Real-time Monitoring</h3>
                <p className="text-white/70">
                  Track agent performance with live execution logs, metrics, and analytics
                  dashboards.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-card p-6 space-y-4 hover-lift animation-delay-500">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Secure & Scalable</h3>
                <p className="text-white/70">
                  Enterprise-grade security with multi-tenant isolation. Scale to thousands of
                  agents.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-card p-6 space-y-4 hover-lift animation-delay-500">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">API-First</h3>
                <p className="text-white/70">
                  Full REST API for programmatic access. Integrate with your existing workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container-custom py-20">
          <div className="glass-card-enhanced max-w-4xl mx-auto p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-shadow-lg">
              Ready to Build Your First Agent?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join SmartCamp.AI and start creating powerful AI agents today. No credit card
              required.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-md text-base font-semibold hover:bg-emerald-600 transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="jungle-overlay mt-20">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Monkey Mascot */}
            <div className="flex items-center gap-6">
              <Image
                src="/Monkey_SmartCampAI-no-background.png"
                alt="SmartCamp AI Monkey Mascot"
                width={160}
                height={160}
                className="h-32 w-32 object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
              <a
                href="https://n8n.io/creators/smart-camp-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src="/n8n-certified-creator.png"
                  alt="n8n Certified Creator"
                  width={144}
                  height={144}
                  className="h-28 w-28 object-contain opacity-90 hover:opacity-100"
                />
              </a>
            </div>

            {/* Center: Copyright */}
            <div className="text-center">
              <p className="text-white/80 text-sm">
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
              <p className="text-white/60 text-xs mt-2">
                AI | Automations | Web Dev
              </p>
            </div>

            {/* Right: Links */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <Link href="/docs" className="text-white/80 hover:text-emerald-500">
                Documentation
              </Link>
              <Link href="/api" className="text-white/80 hover:text-emerald-500">
                API
              </Link>
              <a
                href="https://smartcamp.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-emerald-500"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
