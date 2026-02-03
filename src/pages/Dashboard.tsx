import {
  Calendar,
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  Clock,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useDataStore } from '../store/dataStore'
import { format, subDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function Dashboard() {
  const { pacientes, profissionais, consultas, lancamentos } = useDataStore()

  const consultasHoje = consultas.filter(
    (c) => format(new Date(c.data), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ).length

  const pacientesAtivos = pacientes.length
  const profissionaisAtivos = profissionais.filter((p) => p.ativo).length

  const faturamentoMes = lancamentos
    .filter((l) => l.tipo === 'entrada')
    .reduce((acc, l) => acc + l.valor, 0)

  // Dados para gráfico de consultas por dia (últimos 7 dias)
  const consultasPorDia = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    const dateStr = format(date, 'yyyy-MM-dd')
    return {
      dia: format(date, 'dd/MM', { locale: ptBR }),
      consultas: consultas.filter(
        (c) => format(new Date(c.data), 'yyyy-MM-dd') === dateStr
      ).length,
    }
  })

  // Dados para gráfico de faturamento mensal (últimos 6 meses)
  const faturamentoMensal = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    return {
      mes: format(date, 'MMM', { locale: ptBR }),
      faturamento: Math.floor(Math.random() * 50000) + 30000,
    }
  })

  // Pacientes novos (últimos 30 dias)
  const pacientesNovos = pacientes.filter((p) => {
    const createdAt = new Date(p.createdAt)
    const thirtyDaysAgo = subDays(new Date(), 30)
    return createdAt >= thirtyDaysAgo
  }).length

  const statsCards = [
    {
      title: 'Consultas Hoje',
      value: consultasHoje,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Pacientes Ativos',
      value: pacientesAtivos,
      icon: Users,
      color: 'bg-green-500',
      change: `+${pacientesNovos} novos`,
    },
    {
      title: 'Profissionais Ativos',
      value: profissionaisAtivos,
      icon: UserCheck,
      color: 'bg-purple-500',
      change: '100%',
    },
    {
      title: 'Faturamento do Mês',
      value: `R$ ${faturamentoMes.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      change: '+8.2%',
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header Premium */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Dashboard</h1>
        <p className="text-gray-600 text-base sm:text-lg font-light">
          Visão geral da clínica e estatísticas importantes
        </p>
      </div>

      {/* Cards de Resumo Premium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.title} 
              className="metric-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2 break-words">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-3 sm:mt-4">
                    <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 bg-green-50 rounded-lg">
                      <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" strokeWidth={3} />
                      <span className="text-xs font-bold text-green-600">{stat.change}</span>
                    </div>
                  </div>
                </div>
                <div className={`${stat.color} p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0 ml-2`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Gráficos Premium */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Consultas por Dia */}
        <div className="card-premium card-premium-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              Consultas por Dia
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Últimos 7 dias</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={consultasPorDia} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="dia" 
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="consultas"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5 }}
                activeDot={{ r: 7 }}
                name="Consultas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Faturamento Mensal */}
        <div className="card-premium card-premium-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              Faturamento Mensal
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Últimos 6 meses</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={faturamentoMensal} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="mes" 
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '12px', fontWeight: 500 }}
              />
              <Tooltip
                formatter={(value: number) =>
                  `R$ ${value.toLocaleString('pt-BR')}`
                }
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar 
                dataKey="faturamento" 
                fill="#10b981" 
                name="Faturamento"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximas Consultas Premium */}
      <div className="card-premium card-premium-hover animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
            Próximas Consultas
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Agendamentos confirmados</p>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {consultas
            .filter((c) => new Date(c.data) >= new Date())
            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            .slice(0, 5)
            .map((consulta) => (
              <div
                key={consulta.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-100/50 hover:border-primary-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 text-sm sm:text-base mb-1 truncate">
                      {consulta.pacienteNome}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium break-words">
                      {consulta.profissionalNome} • {format(new Date(consulta.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold whitespace-nowrap ${
                    consulta.status === 'confirmada'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : consulta.status === 'agendada'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 border border-gray-200'
                  }`}
                >
                  {consulta.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

