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
import { useDataStore, Paciente } from '../store/dataStore'
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
      <div className="card text-center py-12">
        <p className="text-gray-600">Paciente não encontrado</p>
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
    <div className="space-y-6">
      <button
        onClick={() => navigate('/admin/pacientes')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar para Pacientes
      </button>

      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{paciente.nome}</h1>
              <p className="text-gray-600 mt-1">CPF: {paciente.cpf}</p>
            </div>
          </div>
          <button className="btn-primary">Editar Paciente</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Informações de Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{paciente.telefone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{paciente.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">
                  Nascimento: {format(new Date(paciente.dataNascimento), 'dd/MM/yyyy', { locale: ptBR })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Endereço</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div className="text-gray-900">
                <p>{paciente.endereco.rua}</p>
                <p>
                  {paciente.endereco.cidade} - {paciente.endereco.estado}
                </p>
                <p>CEP: {paciente.endereco.cep}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histórico Médico */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Histórico Médico</h2>
            <button
              onClick={handleAddHistorico}
              className="btn-secondary flex items-center gap-2 text-sm"
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
                  className="p-3 bg-gray-50 rounded-lg border-l-4 border-primary-500"
                >
                  <p className="text-gray-900">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Nenhum histórico registrado</p>
            )}
          </div>
        </div>

        {/* Arquivos */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Arquivos Anexados</h2>
            <button className="btn-secondary flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
          <div className="space-y-2">
            {paciente.arquivos.length > 0 ? (
              paciente.arquivos.map((arquivo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{arquivo.nome}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(arquivo.data), 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Nenhum arquivo anexado</p>
            )}
          </div>
        </div>
      </div>

      {/* Observações */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Observações</h2>
          <button
            onClick={() => setShowAddObservacao(!showAddObservacao)}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        {showAddObservacao && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <textarea
              value={novaObservacao}
              onChange={(e) => setNovaObservacao(e.target.value)}
              placeholder="Digite uma observação..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
              rows={3}
            />
            <div className="flex gap-2">
              <button onClick={handleAddObservacao} className="btn-primary text-sm">
                Salvar
              </button>
              <button
                onClick={() => {
                  setShowAddObservacao(false)
                  setNovaObservacao('')
                }}
                className="btn-secondary text-sm"
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
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-gray-900 flex-1">{obs}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma observação registrada</p>
          )}
        </div>
      </div>
    </div>
  )
}

