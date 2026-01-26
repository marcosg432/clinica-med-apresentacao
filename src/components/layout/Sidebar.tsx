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

export default function Sidebar() {
  const { user } = useAuthStore()

  return (
    <aside className="w-72 sidebar-premium flex flex-col">
      {/* Logo Premium */}
      <div className="p-8 border-b border-gray-100/50">
        <div className="flex items-center gap-4 animate-slide-in-left">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Stethoscope className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">ClínicaMed</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Sistema de Gestão Premium</p>
          </div>
        </div>
      </div>

      {/* Navigation Premium */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
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
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600 shadow-md shadow-primary-500/20'
                      : 'bg-gray-100/50 group-hover:bg-gray-200/50'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-600'
                    }`} strokeWidth={2.5} />
                  </div>
                  <span className="font-medium">{item.label}</span>
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
      <div className="p-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/50 hover:shadow-md transition-all duration-200 cursor-pointer group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-white font-bold text-sm">
                {user?.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="flex-1 min-w-0">
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


