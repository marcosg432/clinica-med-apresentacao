import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Calendar, Clock, Check } from 'lucide-react'
import { format, addDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function EscolherHorario() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const servicoId = searchParams.get('servico')
  const profissionalId = searchParams.get('profissional')
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null)
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null)

  // Gerar próximos 30 dias
  const proximosDias = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i))

  // Horários disponíveis (simulado)
  const horariosDisponiveis = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]

  // Horários bloqueados (simulado - alguns horários já ocupados)
  const horariosBloqueados: Record<string, string[]> = {
    [format(addDays(new Date(), 0), 'yyyy-MM-dd')]: ['09:00', '14:00'],
    [format(addDays(new Date(), 1), 'yyyy-MM-dd')]: ['10:00', '15:00'],
  }

  const isHorarioDisponivel = (data: Date, horario: string) => {
    const dataStr = format(data, 'yyyy-MM-dd')
    const bloqueados = horariosBloqueados[dataStr] || []
    return !bloqueados.includes(horario)
  }

  const handleContinuar = () => {
    if (dataSelecionada && horarioSelecionado) {
      const dataStr = format(dataSelecionada, 'yyyy-MM-dd')
      navigate(
        `/agendar/dados?servico=${servicoId}&profissional=${profissionalId}&data=${dataStr}&horario=${horarioSelecionado}`
      )
    }
  }

  return (
    <div className="min-h-screen gradient-primary py-16 relative overflow-hidden">
      {/* Background decorativo */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-5 image-medical-filter pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Progress Bar Premium */}
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="progress-step progress-step-completed">
                <Check className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-completed">
                <Check className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-active pulse-glow">
                3
              </div>
              <div>
                <p className="text-sm font-bold text-primary-600 uppercase tracking-wide">Passo 3 de 5</p>
                <p className="text-base font-semibold text-gray-700">Escolher Data e Horário</p>
              </div>
            </div>
            <div className="flex-1 mx-8">
              <div className="progress-bar-container">
                <div className="progress-bar-fill animate-progress" style={{ width: '60%' }}></div>
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
                <Calendar className="w-12 h-12 text-primary-600" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Escolha Data e Horário
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Selecione quando você prefere ser atendido
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Calendário Premium */}
          <div className="booking-card animate-on-scroll">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Selecione a Data</h2>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {proximosDias.slice(0, 7).map((dia, index) => {
                const diaStr = format(dia, 'yyyy-MM-dd')
                const isSelected = dataSelecionada && format(dataSelecionada, 'yyyy-MM-dd') === diaStr
                const isToday = format(dia, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')

                return (
                  <button
                    key={index}
                    onClick={() => setDataSelecionada(dia)}
                    className={`date-button ${
                      isSelected
                        ? 'date-button-selected'
                        : isToday
                        ? 'date-button-today'
                        : 'date-button-default'
                    }`}
                  >
                    <div className="text-xs font-semibold mb-1 uppercase">
                      {format(dia, 'EEE', { locale: ptBR })}
                    </div>
                    <div className="text-xl font-bold">{format(dia, 'd')}</div>
                  </button>
                )
              })}
            </div>
            <div className="mt-6 p-4 bg-primary-50/50 rounded-xl border border-primary-100">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold text-primary-700">Mostrando próximos 7 dias.</span> Mais opções disponíveis.
              </p>
            </div>
          </div>

          {/* Horários Premium */}
          <div className="booking-card animate-on-scroll" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Selecione o Horário</h2>
            </div>
            {dataSelecionada ? (
              <div className="grid grid-cols-2 gap-3">
                {horariosDisponiveis.map((horario) => {
                  const disponivel = isHorarioDisponivel(dataSelecionada, horario)
                  const isSelected = horarioSelecionado === horario
                  return (
                    <button
                      key={horario}
                      onClick={() => disponivel && setHorarioSelecionado(horario)}
                      disabled={!disponivel}
                      className={`time-slot ${
                        isSelected
                          ? 'time-slot-selected'
                          : disponivel
                          ? 'time-slot-available'
                          : 'time-slot-disabled'
                      }`}
                    >
                      {isSelected && <Check className="w-5 h-5 inline mr-2" />}
                      {horario}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Selecione uma data primeiro</p>
              </div>
            )}
          </div>
        </div>

        {/* Resumo da seleção */}
        {dataSelecionada && horarioSelecionado && (
          <div className="booking-card mb-12 bg-gradient-to-br from-primary-50 via-white to-primary-50/50 border-2 border-primary-300/50 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Consulta agendada para:</p>
                  <p className="text-xl font-bold text-gray-900">
                    {format(dataSelecionada, "EEEE, dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </p>
                  <p className="text-lg font-semibold text-primary-600 mt-1">
                    às {horarioSelecionado}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
            onClick={handleContinuar}
            disabled={!dataSelecionada || !horarioSelecionado}
            className="btn-primary flex items-center gap-3 px-10 py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
          >
            Continuar
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

