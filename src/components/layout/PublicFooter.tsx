import { Link } from 'react-router-dom'
import { Stethoscope, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">ClínicaMed</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Cuidando da sua saúde com excelência e dedicação há mais de 15 anos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-400 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/clinica" className="text-gray-400 hover:text-white transition-colors">
                  A Clínica
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/agendar" className="text-gray-400 hover:text-white transition-colors">
                  Agendar Consulta
                </Link>
              </li>
            </ul>
          </div>

          {/* Especialidades */}
          <div>
            <h3 className="font-semibold mb-4">Especialidades</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Cardiologia</li>
              <li>Dermatologia</li>
              <li>Ortopedia</li>
              <li>Pediatria</li>
              <li>Ginecologia</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400">(11) 3333-4444</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400">contato@clinicamed.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400">
                  Rua Exemplo, 123<br />
                  São Paulo - SP
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 ClínicaMed. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}




