import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, User, Phone, Mail, FileText, Check, Shield } from 'lucide-react'
import { useDataStore } from '../../store/dataStore'

export default function DadosPaciente() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { pacientes } = useDataStore()

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
  })

  const [pacienteExistente, setPacienteExistente] = useState<any>(null)
  const [aceitouTermos, setAceitouTermos] = useState(false)

  // Autocomplete se paciente já existe
  useEffect(() => {
    if (formData.telefone.length >= 10) {
      const encontrado = pacientes.find(
        (p) => p.telefone.replace(/\D/g, '') === formData.telefone.replace(/\D/g, '')
      )
      if (encontrado) {
        setPacienteExistente(encontrado)
        setFormData({
          nome: encontrado.nome,
          telefone: encontrado.telefone,
          email: encontrado.email,
          cpf: encontrado.cpf,
        })
      } else {
        setPacienteExistente(null)
      }
    }
  }, [formData.telefone, pacientes])

  const formatarCPF = (value: string) => {
    const cpf = value.replace(/\D/g, '')
    if (cpf.length <= 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return value
  }

  const formatarTelefone = (value: string) => {
    const tel = value.replace(/\D/g, '')
    if (tel.length <= 11) {
      return tel.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handleContinuar = () => {
    if (formData.nome && formData.telefone && formData.email && formData.cpf && aceitouTermos) {
      navigate(
        `/agendar/confirmacao?servico=${searchParams.get('servico')}&profissional=${searchParams.get('profissional')}&data=${searchParams.get('data')}&horario=${searchParams.get('horario')}&nome=${encodeURIComponent(formData.nome)}&telefone=${encodeURIComponent(formData.telefone)}&email=${encodeURIComponent(formData.email)}&cpf=${encodeURIComponent(formData.cpf)}`
      )
    }
  }

  return (
    <div className="min-h-screen gradient-primary py-16 relative overflow-hidden">
      {/* Background decorativo */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-5 image-medical-filter pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
        }}
      ></div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <div className="progress-step progress-step-completed">
                <Check className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-active pulse-glow">
                4
              </div>
              <div>
                <p className="text-sm font-bold text-primary-600 uppercase tracking-wide">Passo 4 de 5</p>
                <p className="text-base font-semibold text-gray-700">Dados do Paciente</p>
              </div>
            </div>
            <div className="flex-1 mx-8">
              <div className="progress-bar-container">
                <div className="progress-bar-fill animate-progress" style={{ width: '80%' }}></div>
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
                <User className="w-12 h-12 text-primary-600" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Seus Dados
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Preencha suas informações para finalizar o agendamento
          </p>
        </div>

        {/* Alerta de paciente existente */}
        {pacienteExistente && (
          <div className="booking-card mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300/50 shadow-xl animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-bold text-green-900 mb-1">Paciente encontrado!</p>
                <p className="text-green-800">Dados preenchidos automaticamente.</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulário Premium */}
        <div className="booking-card mb-12 animate-on-scroll">
          <form className="space-y-6">
            <div className="form-field-container">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Nome Completo
              </label>
              <div className="relative">
                <User className="form-field-icon" />
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="form-field-enhanced"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
            </div>

            <div className="form-field-container">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Telefone
              </label>
              <div className="relative">
                <Phone className="form-field-icon" />
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefone: formatarTelefone(e.target.value),
                    })
                  }
                  className="form-field-enhanced"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </div>

            <div className="form-field-container">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="form-field-icon" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-field-enhanced"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-field-container">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                CPF
              </label>
              <div className="relative">
                <FileText className="form-field-icon" />
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cpf: formatarCPF(e.target.value),
                    })
                  }
                  className="form-field-enhanced"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
              </div>
            </div>

            {/* Termos e condições */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-primary-50/30 rounded-2xl border-2 border-gray-200/50 hover:border-primary-300/50 transition-all duration-300">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="termos"
                  checked={aceitouTermos}
                  onChange={(e) => setAceitouTermos(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer transition-all"
                  required
                />
                <label htmlFor="termos" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  Eu aceito os{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2">
                    termos de uso
                  </a>{' '}
                  e a{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2">
                    política de privacidade
                  </a>
                </label>
              </div>
            </div>

            {/* Segurança */}
            <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Seus dados estão seguros.</span> Utilizamos criptografia de ponta para proteger suas informações.
              </p>
            </div>
          </form>
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
            onClick={handleContinuar}
            disabled={!formData.nome || !formData.telefone || !formData.email || !formData.cpf || !aceitouTermos}
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

