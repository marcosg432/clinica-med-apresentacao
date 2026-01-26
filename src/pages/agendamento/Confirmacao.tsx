import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Calendar, Clock, User, DollarSign, CheckCircle, Tag } from 'lucide-react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { criarAgendamento } from '../../services/api'
import { useDataStore } from '../../store/dataStore'

export default function Confirmacao() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { profissionais } = useDataStore()
  const [cupom, setCupom] = useState('')
  const [desconto, setDesconto] = useState(0)
  const [loading, setLoading] = useState(false)

  const servicoId = searchParams.get('servico')
  const profissionalId = searchParams.get('profissional')
  const data = searchParams.get('data')
  const horario = searchParams.get('horario')
  const nome = decodeURIComponent(searchParams.get('nome') || '')
  const telefone = decodeURIComponent(searchParams.get('telefone') || '')
  const email = decodeURIComponent(searchParams.get('email') || '')
  const cpf = decodeURIComponent(searchParams.get('cpf') || '')

  const profissional = profissionais.find((p) => p.id === profissionalId)

  const servicos: Record<string, { nome: string; preco: number }> = {
    cardiologia: { nome: 'Cardiologia', preco: 250 },
    dermatologia: { nome: 'Dermatologia', preco: 200 },
    ortopedia: { nome: 'Ortopedia', preco: 220 },
    pediatria: { nome: 'Pediatria', preco: 180 },
    ginecologia: { nome: 'Ginecologia', preco: 200 },
    'clinica-geral': { nome: 'Clínica Geral', preco: 150 },
  }

  const servico = servicos[servicoId || '']

  const handleAplicarCupom = async () => {
    if (!cupom) return
    const { verificarCupom } = await import('../../services/api')
    const resultado: any = await verificarCupom(cupom)
    if (resultado.valido) {
      setDesconto(resultado.desconto)
      alert(resultado.message)
    } else {
      alert(resultado.message)
    }
  }

  const handleConfirmar = async () => {
    if (!data || !horario || !profissionalId) return

    setLoading(true)

    try {
      const resultado: any = await criarAgendamento({
        servicoId: servicoId || '',
        profissionalId,
        data,
        horario,
        paciente: {
          nome,
          telefone,
          email,
          cpf,
        },
      })

      if (resultado.success) {
        navigate(`/agendar/sucesso?protocolo=${resultado.protocolo}`)
      } else {
        alert('Erro ao confirmar agendamento. Tente novamente.')
        setLoading(false)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao confirmar agendamento. Tente novamente.')
      setLoading(false)
    }
  }

  const valorFinal = servico ? servico.preco * (1 - desconto / 100) : 0

  return (
    <div className="min-h-screen gradient-primary py-16 relative overflow-hidden">
      {/* Background decorativo */}
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5 image-medical-filter pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
        }}
      ></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Progress Bar Premium */}
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="progress-step progress-step-completed">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-completed">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-completed">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-completed">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-active pulse-glow">
                5
              </div>
              <div>
                <p className="text-sm font-bold text-primary-600 uppercase tracking-wide">Passo 5 de 5</p>
                <p className="text-base font-semibold text-gray-700">Confirmação</p>
              </div>
            </div>
            <div className="flex-1 mx-8">
              <div className="progress-bar-container">
                <div className="progress-bar-fill animate-progress" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Header com imagem */}
        <div className="mb-16 text-center animate-slide-up">
          <div className="inline-block mb-6">
            <div 
              className="w-32 h-32 rounded-3xl mx-auto shadow-2xl image-medical-filter flex items-center justify-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-primary-600" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Confirme seu Agendamento
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Revise os dados antes de confirmar
          </p>
        </div>

        {/* Resumo Premium */}
        <div className="booking-card mb-8 animate-on-scroll">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-primary-600" />
            Resumo da Consulta
          </h2>

          <div className="space-y-4">
            {/* Paciente */}
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Paciente</p>
                <p className="text-xl font-bold text-gray-900 mb-1">{nome}</p>
                <p className="text-sm text-gray-600">{email}</p>
                <p className="text-sm text-gray-600">{telefone}</p>
              </div>
            </div>

            {/* Data e Horário */}
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Data e Horário</p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {data &&
                    format(new Date(data), "EEEE, dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                </p>
                <p className="text-lg font-semibold text-primary-600">Horário: {horario}</p>
              </div>
            </div>

            {/* Profissional */}
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Profissional</p>
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {profissional?.nome || 'Não informado'}
                </p>
                <p className="text-base text-primary-600 font-semibold">{profissional?.especialidade}</p>
              </div>
            </div>

            {/* Especialidade */}
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Especialidade</p>
                <p className="text-xl font-bold text-gray-900">{servico?.nome}</p>
              </div>
            </div>

            {/* Valor */}
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-primary-50 via-white to-primary-50/50 rounded-2xl border-2 border-primary-300/50 shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Valor da Consulta</p>
                {desconto > 0 && (
                  <div className="mb-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-gray-500 line-through mb-1">
                      R$ {servico?.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-base font-bold text-green-600">
                      Desconto de {desconto}% aplicado! 🎉
                    </p>
                  </div>
                )}
                <p className="text-4xl font-extrabold text-primary-600 mb-2">
                  R$ {valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  Pagamento pode ser realizado na clínica
                </p>
              </div>
            </div>

            {/* Cupom */}
            <div className="flex items-start gap-5 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Tag className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Cupom de Desconto (opcional)
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value.toUpperCase())}
                    placeholder="Digite o cupom"
                    className="flex-1 form-field-enhanced"
                  />
                  <button
                    type="button"
                    onClick={handleAplicarCupom}
                    className="btn-secondary whitespace-nowrap px-6"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lembrete Automático */}
        <div className="booking-card bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border-2 border-blue-300/50 shadow-xl mb-12 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-blue-900 mb-2 text-lg">
                Lembrete Automático
              </p>
              <p className="text-base text-blue-800">
                Você receberá um lembrete por WhatsApp 24h antes da consulta.
              </p>
            </div>
          </div>
        </div>

        {/* Botões de Navegação Premium */}
        <div className="flex justify-between animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center gap-3 px-10 py-5 text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            Voltar
          </button>
          <button
            onClick={handleConfirmar}
            disabled={loading}
            className="btn-primary flex items-center gap-3 px-10 py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Confirmando...
              </>
            ) : (
              <>
                Confirmar Agendamento
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

