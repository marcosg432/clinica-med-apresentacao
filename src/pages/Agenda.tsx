import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useDataStore } from '../store/dataStore'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../styles/calendar.css'

moment.locale('pt-br')
const localizer = momentLocalizer(moment)

export default function Agenda() {
  const { consultas, updateConsulta } = useDataStore()
  const [view, setView] = useState<View>('month')
  const [date, setDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const events = consultas.map((consulta) => ({
    id: consulta.id,
    title: `${consulta.pacienteNome} - ${consulta.profissionalNome}`,
    start: new Date(consulta.data),
    end: new Date(new Date(consulta.data).getTime() + 60 * 60 * 1000), // 1 hora
    resource: consulta,
  }))

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event.resource)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (selectedEvent) {
      updateConsulta(selectedEvent.id, { status: 'confirmada' })
      setShowModal(false)
    }
  }

  const handleCancel = () => {
    if (selectedEvent) {
      updateConsulta(selectedEvent.id, { status: 'cancelada' })
      setShowModal(false)
    }
  }

  const eventStyleGetter = (event: any) => {
    const status = event.resource.status
    let backgroundColor = '#3b82f6' // azul padrão
    if (status === 'confirmada') backgroundColor = '#10b981' // verde
    if (status === 'cancelada') backgroundColor = '#ef4444' // vermelho
    if (status === 'realizada') backgroundColor = '#6b7280' // cinza

    return {
      style: {
        backgroundColor,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      },
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header Premium */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Agenda</h1>
          <p className="text-gray-600 text-base sm:text-lg font-light">Gerencie consultas e agendamentos</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-premium pl-10 sm:pl-12 text-sm sm:text-base w-full"
            />
          </div>
          <button className="btn-premium btn-premium-primary flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base whitespace-nowrap">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Nova Consulta</span>
            <span className="sm:hidden">Nova</span>
          </button>
        </div>
      </div>

      {/* Calendar Premium */}
      <div className="card-premium p-0 overflow-hidden">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50 to-white flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <button
            onClick={() => setView('month')}
            className={`px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              view === 'month'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              view === 'week'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Semanal
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap ${
              view === 'day'
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Diária
          </button>
        </div>
        <div className="overflow-x-auto">
          <div style={{ height: '400px', minWidth: '600px' }} className="sm:h-[500px] lg:h-[600px]">
            <BigCalendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={setView}
              date={date}
              onNavigate={setDate}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              messages={{
                next: 'Próximo',
                previous: 'Anterior',
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal de Detalhes Premium */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="card-premium max-w-md w-full mx-4 animate-fade-in-up" style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15)',
          }}>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
              Detalhes da Consulta
            </h3>
            <div className="space-y-5 mb-8">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Paciente</p>
                <p className="font-bold text-gray-900 text-lg">{selectedEvent.pacienteNome}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Profissional</p>
                <p className="font-bold text-gray-900 text-lg">{selectedEvent.profissionalNome}</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Data e Hora</p>
                <p className="font-bold text-gray-900 text-lg">
                  {format(new Date(selectedEvent.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Status</p>
                <span
                  className={`inline-block px-4 py-2 rounded-xl text-xs font-bold ${
                    selectedEvent.status === 'confirmada'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : selectedEvent.status === 'agendada'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  {selectedEvent.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {selectedEvent.status === 'agendada' && (
                <button onClick={handleConfirm} className="flex-1 btn-premium btn-premium-primary text-sm sm:text-base py-2.5 sm:py-3">
                  Confirmar
                </button>
              )}
              {selectedEvent.status !== 'cancelada' && (
                <button onClick={handleCancel} className="flex-1 btn-premium btn-premium-secondary text-sm sm:text-base py-2.5 sm:py-3">
                  Cancelar
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn-premium btn-premium-secondary text-sm sm:text-base py-2.5 sm:py-3"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

