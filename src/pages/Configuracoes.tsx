import { useState } from 'react'
import {
  Building2,
  Upload,
  Palette,
  Bell,
  Shield,
  Save,
} from 'lucide-react'

export default function Configuracoes() {
  const [clinicaData, setClinicaData] = useState({
    nome: 'ClínicaMed',
    cnpj: '12.345.678/0001-90',
    telefone: '(11) 3333-4444',
    email: 'contato@clinicamed.com.br',
    endereco: 'Rua Exemplo, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
  })

  const [tema, setTema] = useState('claro')

  const handleSave = () => {
    alert('Configurações salvas com sucesso!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">
          Gerencie as configurações da clínica e do sistema
        </p>
      </div>

      {/* Dados da Clínica Premium */}
      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Dados da Clínica</h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo da Clínica
          </label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <button className="btn-secondary flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG até 2MB
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Clínica
            </label>
            <input
              type="text"
              value={clinicaData.nome}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, nome: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CNPJ
            </label>
            <input
              type="text"
              value={clinicaData.cnpj}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, cnpj: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={clinicaData.telefone}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, telefone: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={clinicaData.email}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, email: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Endereço
            </label>
            <input
              type="text"
              value={clinicaData.endereco}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, endereco: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade
            </label>
            <input
              type="text"
              value={clinicaData.cidade}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, cidade: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <input
              type="text"
              value={clinicaData.estado}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, estado: e.target.value })
              }
              className="input-premium"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CEP
            </label>
            <input
              type="text"
              value={clinicaData.cep}
              onChange={(e) =>
                setClinicaData({ ...clinicaData, cep: e.target.value })
              }
              className="input-premium"
            />
          </div>
        </div>
      </div>

      {/* Aparência Premium */}
      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Aparência</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tema
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setTema('claro')}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                tema === 'claro'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 bg-white border border-gray-300 rounded mb-2"></div>
              <p className="text-sm font-medium">Claro</p>
            </button>
            <button
              onClick={() => setTema('escuro')}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${
                tema === 'escuro'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 bg-gray-800 rounded mb-2"></div>
              <p className="text-sm font-medium">Escuro</p>
            </button>
          </div>
        </div>
      </div>

      {/* Permissões de Usuário Premium */}
      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Permissões de Usuário
          </h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">Dr. João Silva</p>
                <p className="text-sm text-gray-600">joao@clinica.com</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Administrador
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Acesso total ao sistema</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Gerenciar usuários</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Configurações</span>
              </label>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">Dra. Ana Paula</p>
                <p className="text-sm text-gray-600">ana@clinica.com</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Profissional
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Ver pacientes</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Ver agenda</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                <span className="ml-2 text-sm text-gray-700">Gerenciar financeiro</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notificações Premium */}
      <div className="card-premium">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Notificações</h2>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Lembretes de Consulta</p>
              <p className="text-sm text-gray-600">
                Enviar lembretes via WhatsApp/SMS
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-primary-600"
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Estoque Baixo</p>
              <p className="text-sm text-gray-600">
                Alertar quando estoque estiver baixo
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-primary-600"
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Novos Pacientes</p>
              <p className="text-sm text-gray-600">
                Notificar sobre novos cadastros
              </p>
            </div>
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-600"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-5 h-5" />
          Salvar Configurações
        </button>
      </div>
    </div>
  )
}


