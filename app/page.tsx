"use client"

import { useState } from "react"
import { Globe, Moon, Sun, Clock, MapPin, Users } from "lucide-react"
import { TimeSync } from "@/components/timesync"
import { cn } from "@/lib/utils"

export default function Page() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={cn("h-screen flex flex-col", isDark && "dark")}>
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <span className="font-bold text-foreground text-lg">TimeSync</span>
              <p className="text-xs text-muted-foreground">World Time Converter</p>
            </div>
          </div>

          {/* Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-secondary rounded-xl">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-card shadow-sm text-foreground">
              <Clock className="w-4 h-4 text-chart-3" />
              <span>Converter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-4 h-4" />
              <span>Meeting Planner</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-xl bg-secondary">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-chart-3" />
              <span className="text-sm font-medium text-foreground">130+ Cities</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-chart-4" />
              <span className="text-sm font-medium text-foreground">7 Regions</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chart-3 to-accent flex items-center justify-center text-white text-sm font-semibold">
            TS
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <TimeSync />
      </main>
    </div>
  )
}
