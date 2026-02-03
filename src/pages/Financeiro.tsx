import { useState } from 'react'
import { Plus, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { useDataStore } from '../store/dataStore'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function Financeiro() {
  const { lancamentos, addLancamento, deleteLancamento } = useDataStore()
  const [showModal, setShowModal] = useState(false)
  const [tipoFiltro, setTipoFiltro] = useState<'todos' | 'entrada' | 'saida'>('todos')

  const lancamentosFiltrados = lancamentos.filter(
    (l) => tipoFiltro === 'todos' || l.tipo === tipoFiltro
  )

  const totalEntradas = lancamentos
    .filter((l) => l.tipo === 'entrada')
    .reduce((acc, l) => acc + l.valor, 0)

  const totalSaidas = lancamentos
    .filter((l) => l.tipo === 'saida')
    .reduce((acc, l) => acc + l.valor, 0)

  const saldo = totalEntradas - totalSaidas

  // Dados para gráfico de fluxo de caixa (últimos 30 dias)
  const fluxoCaixa = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const dateStr = format(date, 'yyyy-MM-dd')
    const entradas = lancamentos
      .filter((l) => l.tipo === 'entrada' && l.data === dateStr)
      .reduce((acc, l) => acc + l.valor, 0)
    const saidas = lancamentos
      .filter((l) => l.tipo === 'saida' && l.data === dateStr)
      .reduce((acc, l) => acc + l.valor, 0)
    return {
      dia: format(date, 'dd/MM', { locale: ptBR }),
      entradas,
      saidas,
      saldo: entradas - saidas,
    }
  })

  const formasPagamento = lancamentos.reduce((acc, l) => {
    acc[l.formaPagamento] = (acc[l.formaPagamento] || 0) + l.valor
    return acc
  }, {} as Record<string, number>)

  const dadosFormasPagamento = Object.entries(formasPagamento).map(([forma, valor]) => ({
    forma: forma.charAt(0).toUpperCase() + forma.slice(1),
    valor,
  }))

  const handleGerarRelatorio = () => {
    const doc = new jsPDF()
    
    doc.setFontSize(18)
    doc.text('Relatório Financeiro', 14, 22)
    
    doc.setFontSize(12)
    doc.text(`Período: ${format(new Date(), 'dd/MM/yyyy', { locale: ptBR })}`, 14, 30)
    
    autoTable(doc, {
      startY: 35,
      head: [['Data', 'Tipo', 'Descrição', 'Valor', 'Forma Pagamento']],
      body: lancamentos.map((l) => [
        format(new Date(l.data), 'dd/MM/yyyy', { locale: ptBR }),
        l.tipo === 'entrada' ? 'Entrada' : 'Saída',
        l.descricao,
        `R$ ${l.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        l.formaPagamento,
      ]),
    })
    
    doc.save('relatorio-financeiro.pdf')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    addLancamento({
      tipo: formData.get('tipo') as 'entrada' | 'saida',
      descricao: formData.get('descricao') as string,
      valor: parseFloat(formData.get('valor') as string),
      data: formData.get('data') as string,
      formaPagamento: formData.get('formaPagamento') as any,
      categoria: formData.get('categoria') as string,
    })
    setShowModal(false)
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Controle financeiro e fluxo de caixa
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleGerarRelatorio}
            className="btn-secondary flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Gerar Relatório PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Novo Lançamento</span>
            <span className="sm:hidden">Novo</span>
          </button>
        </div>
      </div>

      {/* Cards de Resumo Premium */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-premium">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Total de Entradas</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-green-600 mb-2 break-words">
                R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="card-premium">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Total de Saídas</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-red-600 mb-2 break-words">
                R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
              <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="card-premium sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">Saldo Atual</p>
              <p
                className={`text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2 break-words ${
                  saldo >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0 ${saldo >= 0 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
              {saldo >= 0 ? (
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
              ) : (
                <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos Premium */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium">
          <h3 className="text-xl font-extrabold text-gray-900 mb-6">
            Fluxo de Caixa (Últimos 30 dias)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fluxoCaixa}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="entradas"
                stroke="#10b981"
                strokeWidth={2}
                name="Entradas"
              />
              <Line
                type="monotone"
                dataKey="saidas"
                stroke="#ef4444"
                strokeWidth={2}
                name="Saídas"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-premium">
          <h3 className="text-xl font-extrabold text-gray-900 mb-6">
            Formas de Pagamento
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosFormasPagamento}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="forma" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Legend />
              <Bar dataKey="valor" fill="#3b82f6" name="Valor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela de Lançamentos Premium */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Lançamentos</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setTipoFiltro('todos')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                tipoFiltro === 'todos'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setTipoFiltro('entrada')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                tipoFiltro === 'entrada'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Entradas
            </button>
            <button
              onClick={() => setTipoFiltro('saida')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                tipoFiltro === 'saida'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Saídas
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Data
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Tipo
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Descrição
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Valor
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Forma de Pagamento
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {lancamentosFiltrados.map((lancamento) => (
                <tr
                  key={lancamento.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {format(new Date(lancamento.data), 'dd/MM/yyyy', { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lancamento.tipo === 'entrada'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {lancamento.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {lancamento.descricao}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    R$ {lancamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 capitalize">
                    {lancamento.formaPagamento}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteLancamento(lancamento.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Novo Lançamento Premium */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="card-premium max-w-md w-full mx-4 animate-fade-in-up" style={{
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2), 0 8px 25px rgba(0, 0, 0, 0.15)',
          }}>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
              Novo Lançamento
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tipo
                </label>
                <select name="tipo" className="input-premium" required>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  name="descricao"
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Valor
                </label>
                <input
                  type="number"
                  name="valor"
                  step="0.01"
                  min="0"
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Forma de Pagamento
                </label>
                <select name="formaPagamento" className="input-premium" required>
                  <option value="pix">PIX</option>
                  <option value="cartao">Cartão</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="transferencia">Transferência</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Categoria
                </label>
                <input
                  type="text"
                  name="categoria"
                  className="input-premium"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary font-semibold"
                >
                  Cancelar
                </button>
                <button type="submit" className="flex-1 btn-primary font-semibold">
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

