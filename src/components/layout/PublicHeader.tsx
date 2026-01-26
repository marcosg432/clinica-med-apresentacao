import { Link, useLocation } from 'react-router-dom'
import { Stethoscope, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/clinica', label: 'A Clínica' },
    { path: '/contato', label: 'Contato' },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-300">
              <Stethoscope className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">ClínicaMed</h1>
              <p className="text-xs text-gray-500 font-medium">Cuidando de você</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/agendar"
              className="btn-primary px-6 py-2.5 text-base"
            >
              Agendar Consulta
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/agendar"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mx-4 text-center"
              >
                Agendar Consulta
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

