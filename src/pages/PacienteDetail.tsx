import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Upload,
  Plus,
  MessageSquare,
  Download,
} from 'lucide-react'
import { useDataStore } from '../store/dataStore'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function PacienteDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { pacientes, updatePaciente } = useDataStore()
  const paciente = pacientes.find((p) => p.id === id)

  const [showAddObservacao, setShowAddObservacao] = useState(false)
  const [novaObservacao, setNovaObservacao] = useState('')

  if (!paciente) {
    return (
      <div className="card-premium text-center py-16 animate-fade-in">
        <p className="text-gray-600 text-lg font-medium mb-6">Paciente não encontrado</p>
        <button onClick={() => navigate('/admin/pacientes')} className="btn-primary mt-4">
          Voltar
        </button>
      </div>
    )
  }

  const handleAddObservacao = () => {
    if (novaObservacao.trim()) {
      updatePaciente(paciente.id, {
        observacoes: [...paciente.observacoes, novaObservacao],
      })
      setNovaObservacao('')
      setShowAddObservacao(false)
    }
  }

  const handleAddHistorico = () => {
    const historico = prompt('Adicionar entrada ao histórico médico:')
    if (historico) {
      updatePaciente(paciente.id, {
        historicoMedico: [...paciente.historicoMedico, historico],
      })
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <button
        onClick={() => navigate('/admin/pacientes')}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-medium mb-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para Pacientes
      </button>

      {/* Header Premium do Perfil */}
      <div className="card-premium">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white">
                <User className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{paciente.nome}</h1>
              <p className="text-gray-600 text-lg font-medium">CPF: {paciente.cpf}</p>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2 px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
            Editar Paciente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Informações de Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
                </div>
                <span className="text-gray-900 font-semibold text-lg">{paciente.telefone}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
                </div>
                <span className="text-gray-900 font-semibold text-lg">{paciente.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
                </div>
                <span className="text-gray-900 font-semibold text-lg">
                  Nascimento: {format(new Date(paciente.dataNascimento), 'dd/MM/yyyy', { locale: ptBR })}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Endereço</h3>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mt-1">
                <MapPin className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
              </div>
              <div className="text-gray-900">
                <p className="font-semibold text-lg mb-1">{paciente.endereco.rua}</p>
                <p className="text-gray-600 mb-1">
                  {paciente.endereco.cidade} - {paciente.endereco.estado}
                </p>
                <p className="text-gray-600">CEP: {paciente.endereco.cep}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histórico Médico */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Histórico Médico</h2>
            <button
              onClick={handleAddHistorico}
              className="btn-secondary flex items-center gap-2 px-4 py-2 font-semibold hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
          <div className="space-y-3">
            {paciente.historicoMedico.length > 0 ? (
              paciente.historicoMedico.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-primary-50 to-white rounded-xl border-l-4 border-primary-500 shadow-sm hover:shadow-md transition-all"
                >
                  <p className="text-gray-900 font-medium">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm font-medium text-center py-8">Nenhum histórico registrado</p>
            )}
          </div>
        </div>

        {/* Arquivos */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">Arquivos Anexados</h2>
            <button className="btn-secondary flex items-center gap-2 px-4 py-2 font-semibold hover:shadow-md transition-all">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
          <div className="space-y-3">
            {paciente.arquivos.length > 0 ? (
              paciente.arquivos.map((arquivo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <FileText className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{arquivo.nome}</p>
                      <p className="text-xs text-gray-500 font-medium">
                        {format(new Date(arquivo.data), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm font-medium text-center py-8">Nenhum arquivo anexado</p>
            )}
          </div>
        </div>
      </div>

      {/* Observações */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Observações</h2>
          <button
            onClick={() => setShowAddObservacao(!showAddObservacao)}
            className="btn-secondary flex items-center gap-2 px-4 py-2 font-semibold hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        {showAddObservacao && (
          <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
            <textarea
              value={novaObservacao}
              onChange={(e) => setNovaObservacao(e.target.value)}
              placeholder="Digite uma observação..."
              className="input-premium w-full mb-4 min-h-[100px] resize-y"
              rows={4}
            />
            <div className="flex gap-3">
              <button onClick={handleAddObservacao} className="btn-primary px-6 py-2 font-semibold">
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowAddObservacao(false)
                  setNovaObservacao('')
                }}
                className="btn-secondary px-6 py-2 font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        <div className="space-y-3">
          {paciente.observacoes.length > 0 ? (
            paciente.observacoes.map((obs, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary-600" strokeWidth={2.5} />
                </div>
                <p className="text-gray-900 flex-1 font-medium pt-2">{obs}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm font-medium text-center py-8">Nenhuma observação registrada</p>
          )}
        </div>
      </div>
    </div>
  )
}

