import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: {
    name: string
    email: string
    role: string
  } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Simulação de autenticação
    if (email && password) {
      set({
        isAuthenticated: true,
        user: {
          name: 'Dr. João Silva',
          email: email,
          role: 'admin',
        },
      })
      return true
    }
    return false
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
  },
}))


