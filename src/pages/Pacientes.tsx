import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Filter, User, Phone, Mail, FileText, Edit, Trash2, Eye } from 'lucide-react'
import { useDataStore } from '../store/dataStore'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function Pacientes() {
  const { pacientes, deletePaciente } = useDataStore()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const filteredPacientes = pacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cpf.includes(searchTerm) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
      deletePaciente(id)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Premium */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Pacientes</h1>
          <p className="text-gray-600 text-lg font-light">
            Gerencie o cadastro de pacientes da clínica
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/pacientes/novo')}
          className="btn-premium btn-premium-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          Novo Paciente
        </button>
      </div>

      {/* Search Premium */}
      <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-premium pl-12"
          />
        </div>
        <button className="btn-premium btn-premium-secondary flex items-center gap-2 px-6 py-3">
          <Filter className="w-5 h-5" strokeWidth={2} />
          Filtros
        </button>
      </div>

      {/* Cards Premium */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPacientes.map((paciente, index) => (
          <div
            key={paciente.id}
            className="card-premium card-premium-hover cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => navigate(`/pacientes/${paciente.id}`)}
          >
            <div className="flex items-start gap-5 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-200">
                  <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg mb-2 truncate">
                  {paciente.nome}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span className="truncate font-medium">{paciente.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span className="truncate font-medium">{paciente.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span className="font-medium">CPF: {paciente.cpf}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="font-semibold">
                  {paciente.historicoMedico.length} histórico(s)
                </span>
                <span className="text-gray-300">•</span>
                <span className="font-semibold">
                  {paciente.arquivos.length} arquivo(s)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/admin/pacientes/${paciente.id}`)
                }}
                className="flex-1 btn-premium btn-premium-secondary flex items-center justify-center gap-2 text-sm py-2.5"
              >
                <Eye className="w-4 h-4" strokeWidth={2.5} />
                Ver Detalhes
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(paciente.id)
                }}
                className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 text-sm font-semibold border border-red-200 hover:border-red-300 hover:shadow-sm"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Premium */}
      {filteredPacientes.length === 0 && (
        <div className="card-premium text-center py-16 animate-fade-in-up">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-gray-400" strokeWidth={2} />
          </div>
          <p className="text-gray-600 text-lg font-medium">
            {searchTerm
              ? 'Nenhum paciente encontrado com os filtros aplicados.'
              : 'Nenhum paciente cadastrado ainda.'}
          </p>
        </div>
      )}
    </div>
  )
}


