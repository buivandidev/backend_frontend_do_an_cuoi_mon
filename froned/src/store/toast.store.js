import { create } from 'zustand'

const DEFAULT_DURATION = 3500

// Map to track timeout IDs for cleanup
const timeoutMap = new Map()

export const useToastStore = create((set, get) => ({
  toasts: [],

  push: ({ type = 'info', title = '', message = '', duration = DEFAULT_DURATION } = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const toast = {
      id,
      type,
      title,
      message,
      duration,
    }

    set((state) => ({ toasts: [...state.toasts, toast] }))

    const safeDuration = Number.isFinite(duration) ? Math.max(1000, duration) : DEFAULT_DURATION

    // CRITICAL FIX: Store timeout ID so it can be cleared on unmount
    const timeoutId = window.setTimeout(() => {
      get().remove(id)
    }, safeDuration)

    // Store timeout ID for cleanup
    timeoutMap.set(id, timeoutId)
  },

  remove: (id) => {
    // CRITICAL FIX: Clear the timeout to prevent memory leaks
    const timeoutId = timeoutMap.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutMap.delete(id)
    }

    set((state) => ({
      toasts: state.toasts.filter((item) => item.id !== id),
    }))
  },

  clear: () => {
    // Clear all pending timeouts
    for (const [id, timeoutId] of timeoutMap) {
      clearTimeout(timeoutId)
    }
    timeoutMap.clear()

    set({ toasts: [] })
  },
}))
