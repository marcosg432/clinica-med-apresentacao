import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, Calendar, Download, Home } from 'lucide-react'

export default function Sucesso() {
  const [searchParams] = useSearchParams()
  const protocolo = searchParams.get('protocolo')

  const handleGoogleCalendar = () => {
    // Simulação de adicionar ao Google Calendar
    alert('Funcionalidade de adicionar ao Google Calendar (simulado)')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Consulta Agendada com Sucesso!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Sua consulta foi confirmada e você receberá um lembrete por WhatsApp.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Protocolo do Agendamento</p>
            <p className="text-2xl font-bold text-primary-600 font-mono">
              #{protocolo}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Guarde este número para consultas futuras
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-blue-900">Lembrete Automático</p>
                <p className="text-sm text-blue-700">
                  Você receberá um lembrete 24h antes da consulta
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={handleGoogleCalendar}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Adicionar ao Google Calendar
            </button>
            <Link to="/" className="btn-primary flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Voltar ao Início
            </Link>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-2">Precisa de ajuda?</p>
            <p className="text-sm text-gray-600">
              Entre em contato: <span className="font-semibold">(11) 3333-4444</span> ou{' '}
              <a href="https://wa.me/5511999998888" className="text-primary-600 hover:underline">
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


