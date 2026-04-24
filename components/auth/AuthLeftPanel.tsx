'use client'

export default function AuthLeftPanel() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      {/* Top Section - Logo */}
      <div>
        <h1 className="font-display text-3xl font-bold text-gold italic tracking-tight">
          Digital Heroes
        </h1>
      </div>

      {/* Middle Section - Quote and Bullets */}
      <div className="max-w-md">
        <h2 className="font-display text-5xl font-bold text-gold leading-tight mb-12">
          &ldquo;Every score counts.<br/>Every life matters.&rdquo;
        </h2>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-emerald mt-1">check_circle</span>
            <span className="text-mist text-lg">Monthly prize draws</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-emerald mt-1">check_circle</span>
            <span className="text-mist text-lg">Support your chosen charity</span>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-emerald mt-1">check_circle</span>
            <span className="text-mist text-lg">Track your Stableford scores</span>
          </li>
        </ul>
        <div className="w-16 h-px bg-gold mt-12 mb-8" />
      </div>

      {/* Bottom Section - Footer */}
      <div>
        <p className="text-slate font-body">Trusted by golfers making a difference</p>
      </div>
    </div>
  )
}