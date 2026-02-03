import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  DollarSign,
  Package,
  Settings,
  Stethoscope,
  X,
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/agenda', icon: Calendar, label: 'Agenda' },
  { path: '/admin/pacientes', icon: Users, label: 'Pacientes' },
  { path: '/admin/profissionais', icon: UserCheck, label: 'Profissionais' },
  { path: '/admin/financeiro', icon: DollarSign, label: 'Financeiro' },
  { path: '/admin/estoque', icon: Package, label: 'Estoque' },
  { path: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
]

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { user } = useAuthStore()

  return (
    <aside className="w-64 lg:w-72 sidebar-premium flex flex-col h-full">
      {/* Logo Premium */}
      <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100/50 flex items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4 animate-slide-in-left">
          <div className="relative">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Stethoscope className="w-5 h-5 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-xl font-extrabold text-gray-900 tracking-tight">ClínicaMed</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Sistema de Gestão Premium</p>
          </div>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Premium */}
      <nav className="flex-1 p-4 sm:p-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => {
                const baseClasses = "sidebar-item group"
                if (isActive) {
                  return `${baseClasses} sidebar-item-active`
                }
                return `${baseClasses} sidebar-item-inactive`
              }}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {({ isActive }) => (
                <>
                  <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 shadow-md shadow-primary-500/20'
                      : 'bg-gray-100/50 group-hover:bg-gray-200/50'
                  }`}>
                    <Icon className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600'
                    }`} strokeWidth={2.5} />
                  </div>
                  <span className="font-medium text-sm lg:text-base">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Separator Premium */}
      <div className="px-6">
        <div className="separator-premium"></div>
      </div>

      {/* User Profile Premium */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/50 hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-white font-bold text-xs lg:text-sm">
                {user?.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}


