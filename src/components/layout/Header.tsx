import { useState } from 'react'
import { Bell, Search, LogOut, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

export default function Header() {
  const { user } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    // Logout desabilitado - sempre permanece autenticado
    setShowUserMenu(false)
  }

  return (
    <header className="header-premium px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Search Premium */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Buscar pacientes, consultas, profissionais..."
              className="input-premium pl-12 pr-4 w-full"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6 ml-8">
          {/* Notifications */}
          <button className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-sm group">
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
          </button>

          {/* Separator */}
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

          {/* User Menu Premium */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
                <span className="text-white font-bold text-sm">
                  {user?.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 font-medium">{user?.role}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100/50 py-2 z-50 animate-fade-in-up"
                style={{
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Sair</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


