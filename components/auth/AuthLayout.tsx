'use client'

interface AuthLayoutProps {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
}

export default function AuthLayout({ leftPanel, rightPanel }: AuthLayoutProps) {
  return (
    <div className="h-[100dvh] w-full flex flex-col lg:flex-row overflow-hidden bg-auth-bg">
      {/* Left Panel — desktop only */}
      <div className="hidden lg:flex lg:w-[40%] h-full bg-forest relative overflow-hidden border-r border-gold/20">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-12 w-full">
          {leftPanel}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 lg:w-[60%] h-full flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 overflow-y-auto no-scrollbar relative bg-auth-bg">
        {/* Mobile logo */}
        <div className="lg:hidden w-full flex justify-center mb-12 flex-shrink-0">
          <h1 className="font-display text-3xl font-bold text-gold italic tracking-tight">
            Digital Heroes
          </h1>
        </div>

        <div className="w-full max-w-lg">
          {rightPanel}
        </div>
      </div>
    </div>
  )
}