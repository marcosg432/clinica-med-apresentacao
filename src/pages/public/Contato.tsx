import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Sparkles } from 'lucide-react'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setEnviado(true)
      setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
      setTimeout(() => setEnviado(false), 5000)
    }, 1000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center image-medical-filter"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&q=80&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 to-primary-700/85"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/30 via-transparent to-primary-600/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20 shadow-lg">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-float" />
            <span className="text-sm font-bold tracking-wide text-white">Fale Conosco</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight text-shadow-soft">
            Entre em Contato
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto font-light leading-relaxed">
            Estamos prontos para atender você. Fale conosco!
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        {/* Background decorativo */}
        <div 
          className="absolute top-1/2 right-0 w-[400px] h-[400px] opacity-10 image-medical-filter transform -translate-y-1/2"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-6">
              <div className="card hover-lift">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Informações de Contato
                </h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-[0_15px_40px_rgba(37,99,235,0.4)] transform hover:scale-110 transition-transform duration-500">
                      <Phone className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Telefone</h3>
                      <p className="text-gray-600">(11) 3333-4444</p>
                      <p className="text-gray-600">(11) 99999-8888 (WhatsApp)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-[0_15px_40px_rgba(37,99,235,0.4)] transform hover:scale-110 transition-transform duration-500">
                      <Mail className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                      <p className="text-gray-600">contato@clinicamed.com.br</p>
                      <p className="text-gray-600">agendamento@clinicamed.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-[0_15px_40px_rgba(37,99,235,0.4)] transform hover:scale-110 transition-transform duration-500">
                      <MapPin className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Endereço</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Rua Exemplo, 123<br />
                        Bairro Centro<br />
                        São Paulo - SP<br />
                        CEP: 01234-567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-[0_15px_40px_rgba(37,99,235,0.4)] transform hover:scale-110 transition-transform duration-500">
                      <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                      <a
                        href="https://wa.me/5511999998888"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                      >
                        Falar no WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="card hover-lift overflow-hidden">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Localização</h3>
                <div className="relative h-80 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                      <p className="text-gray-700 font-semibold text-lg">Mapa Interativo</p>
                      <p className="text-gray-600">Rua Exemplo, 123 - São Paulo/SP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="card hover-lift">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Envie sua Mensagem
              </h2>
              {enviado ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-green-800 font-bold text-xl mb-2">
                    Mensagem enviada com sucesso!
                  </p>
                  <p className="text-green-700">
                    Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Assunto
                    </label>
                    <input
                      type="text"
                      value={formData.assunto}
                      onChange={(e) =>
                        setFormData({ ...formData, assunto: e.target.value })
                      }
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Mensagem
                    </label>
                    <textarea
                      value={formData.mensagem}
                      onChange={(e) =>
                        setFormData({ ...formData, mensagem: e.target.value })
                      }
                      rows={6}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full btn-primary flex items-center justify-center gap-3 text-lg py-5"
                  >
                    <Send className="w-6 h-6" />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
