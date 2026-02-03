import { useState } from 'react'
import { Plus, Search, UserCheck, Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react'
import { useDataStore } from '../store/dataStore'

export default function Profissionais() {
  const { profissionais, deleteProfissional } = useDataStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProfissional, setEditingProfissional] = useState<any>(null)

  const filteredProfissionais = profissionais.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.crm.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este profissional?')) {
      deleteProfissional(id)
    }
  }

  const handleEdit = (profissional: any) => {
    setEditingProfissional(profissional)
    setShowModal(true)
  }

  const handleNew = () => {
    setEditingProfissional(null)
    setShowModal(true)
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header Premium */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Profissionais</h1>
          <p className="text-gray-600 text-base sm:text-lg font-light">
            Gerencie os profissionais da clínica
          </p>
        </div>
        <button onClick={handleNew} className="btn-premium btn-premium-primary flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base w-full sm:w-auto">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          Novo Profissional
        </button>
      </div>

      {/* Search Premium */}
      <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex-1 relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="Buscar por nome, especialidade ou CRM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-premium pl-10 sm:pl-12 text-sm sm:text-base w-full"
          />
        </div>
      </div>

      {/* Cards Premium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProfissionais.map((profissional, index) => (
          <div 
            key={profissional.id} 
            className="card-premium card-premium-hover group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-200">
                  <UserCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm ${
                  profissional.ativo ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 truncate">
                  {profissional.nome}
                </h3>
                <p className="text-sm text-primary-600 font-bold mb-2">
                  {profissional.especialidade}
                </p>
                <p className="text-xs text-gray-500 mb-2 sm:mb-3 font-medium">{profissional.crm}</p>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span className="truncate font-medium">{profissional.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                    <span className="truncate font-medium">{profissional.email}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
              <span
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                  profissional.ativo
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200'
                }`}
              >
                {profissional.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleEdit(profissional)}
                className="flex-1 btn-premium btn-premium-secondary flex items-center justify-center gap-2 text-sm py-2.5"
              >
                <Edit className="w-4 h-4" strokeWidth={2.5} />
                Editar
              </button>
              <button
                onClick={() => handleDelete(profissional.id)}
                className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 text-sm font-semibold border border-red-200 hover:border-red-300 hover:shadow-sm"
              >
                <Trash2 className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
            <button className="w-full mt-3 btn-premium btn-premium-secondary text-sm py-2.5 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" strokeWidth={2.5} />
              Ver Agenda
            </button>
          </div>
        ))}
      </div>

      {/* Empty State Premium */}
      {filteredProfissionais.length === 0 && (
        <div className="card-premium text-center py-16 animate-fade-in-up">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-10 h-10 text-gray-400" strokeWidth={2} />
          </div>
          <p className="text-gray-600 text-lg font-medium">
            {searchTerm
              ? 'Nenhum profissional encontrado com os filtros aplicados.'
              : 'Nenhum profissional cadastrado ainda.'}
          </p>
        </div>
      )}

      {/* Modal de Cadastro/Edição Premium */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="card-premium max-w-md w-full mx-4 animate-fade-in-up" style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15)',
          }}>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
              {editingProfissional ? 'Editar Profissional' : 'Novo Profissional'}
            </h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  defaultValue={editingProfissional?.nome || ''}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  CRM
                </label>
                <input
                  type="text"
                  defaultValue={editingProfissional?.crm || ''}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Especialidade
                </label>
                <input
                  type="text"
                  defaultValue={editingProfissional?.especialidade || ''}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={editingProfissional?.email || ''}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  defaultValue={editingProfissional?.telefone || ''}
                  className="input-premium"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-premium btn-premium-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 btn-premium btn-premium-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


