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
  isAuthenticated: true, // Sempre autenticado - login removido
  user: {
    name: 'Dr. João Silva',
    email: 'admin@clinicamed.com',
    role: 'admin',
  },
  login: async (email: string, _password: string) => {
    // Função mantida para compatibilidade, mas sempre retorna true
    // _password prefixado com _ para indicar que não é usado (login removido)
    set({
      isAuthenticated: true,
      user: {
        name: 'Dr. João Silva',
        email: email || 'admin@clinicamed.com',
        role: 'admin',
      },
    })
    return true
  },
  logout: () => {
    // Logout não faz nada - sempre permanece autenticado
    set({ 
      isAuthenticated: true, 
      user: {
        name: 'Dr. João Silva',
        email: 'admin@clinicamed.com',
        role: 'admin',
      }
    })
  },
}))





