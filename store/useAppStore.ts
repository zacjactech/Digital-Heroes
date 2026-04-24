import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Profile, SubscriptionStatus } from '@/types'

interface AppState {
  // ── User ────────────────────────────────────────────────────────
  user: Profile | null
  subscriptionStatus: SubscriptionStatus | null
  setUser: (user: Profile | null) => void
  clearUser: () => void

  // ── UI ──────────────────────────────────────────────────────────
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  // ── Draw ────────────────────────────────────────────────────────
  selectedDrawId: string | null
  setSelectedDrawId: (id: string | null) => void

  // ── Score Entry ─────────────────────────────────────────────────
  scoreEntryOpen: boolean
  setScoreEntryOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      user: null,
      subscriptionStatus: null,
      setUser: (user) =>
        set({
          user,
          subscriptionStatus: user?.subscriptionStatus ?? null,
        }),
      clearUser: () => set({ user: null, subscriptionStatus: null }),

      // UI
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Draw
      selectedDrawId: null,
      setSelectedDrawId: (id) => set({ selectedDrawId: id }),

      // Score Entry
      scoreEntryOpen: false,
      setScoreEntryOpen: (open) => set({ scoreEntryOpen: open }),
    }),
    {
      name: 'digital-heroes-store',
      storage: createJSONStorage(() => sessionStorage),
      // Only persist UI preferences — not sensitive user data
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
)
