import { Link } from 'react-router-dom'
import { Check, ArrowRight, Calendar, Clock, Shield, Heart, Sparkles } from 'lucide-react'
import ClinicStatsSection from '../../components/ClinicStatsSection'

export default function Home() {
  const beneficios = [
    { 
      icon: Calendar, 
      title: 'Agendamento Online 24/7', 
      desc: 'Agende sua consulta a qualquer hora, sem sair de casa',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Clock, 
      title: 'Atendimento Rápido', 
      desc: 'Consultas agendadas com agilidade e eficiência máxima',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: Shield, 
      title: 'Profissionais Certificados', 
      desc: 'Equipe médica especializada e altamente qualificada',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: Heart, 
      title: 'Cuidado Personalizado', 
      desc: 'Atendimento humanizado focado nas suas necessidades',
      color: 'from-pink-500 to-pink-600'
    },
  ]

  const comoFunciona = [
    { step: '1', title: 'Escolha o Serviço', desc: 'Selecione a especialidade desejada' },
    { step: '2', title: 'Escolha o Profissional', desc: 'Veja os médicos disponíveis' },
    { step: '3', title: 'Selecione Data/Hora', desc: 'Escolha o melhor horário para você' },
    { step: '4', title: 'Confirme o Agendamento', desc: 'Preencha seus dados e confirme' },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Impactante e Premium */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Cinematográfica */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat image-medical-filter transition-transform duration-[20s] ease-out hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=90&auto=format&fit=crop')`,
          }}
        >
          {/* Overlay Premium com Gradiente e Vinheta */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-primary-800/40 to-primary-700/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-transparent to-primary-700/30"></div>
          
          {/* Vinheta para profundidade */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)'
            }}
          ></div>
          
          {/* Efeito de desfoque suave em áreas específicas */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-900/20 to-transparent backdrop-blur-[2px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-black/20 to-transparent backdrop-blur-[1px]"></div>
        </div>

        {/* Iluminação Inteligente - Highlight sutil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto Principal com Animações */}
            <div className="text-white animate-fade-in">
              {/* Badge Premium */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-all duration-500 group">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-float group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold tracking-wider text-white/95">Cuidados Premium de Saúde</span>
              </div>
              
              {/* Título Principal com Iluminação */}
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 via-primary-400/10 to-transparent blur-2xl rounded-3xl"></div>
                <h1 className="relative text-6xl lg:text-7xl font-bold mb-6 leading-[1.15] tracking-tight">
                  <span className="text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                    Cuidando da sua saúde com{' '}
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)] font-extrabold">
                    excelência
                  </span>
                </h1>
              </div>
              
              {/* Subtítulo Refinado */}
              <p className="text-xl lg:text-2xl text-gray-100 mb-12 leading-relaxed font-light max-w-2xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.4)]">
                Agende sua consulta online de forma rápida e fácil. Profissionais
                qualificados prontos para cuidar de você com tecnologia de ponta.
              </p>
              
              {/* CTAs Premium */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/agendar" 
                  className="group relative bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_15px_50px_rgba(37,99,235,0.5)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.6)] transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">Agendar Agora</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/servicos" 
                  className="bg-white/10 backdrop-blur-xl text-white border-2 border-white/40 px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/20 hover:border-white/60 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transform hover:-translate-y-0.5"
                >
                  Ver Serviços
                </Link>
              </div>
            </div>

            {/* Card Glassmorphism Premium */}
            <div className="card-glass text-center animate-slide-up hover-lift relative group">
              {/* Borda iluminada */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/30 via-primary-500/20 to-primary-600/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Conteúdo do Card */}
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_20px_60px_rgba(37,99,235,0.5)] transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Calendar className="w-12 h-12 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4 gradient-text">
                  Agendamento Online
                </h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed font-light">
                  Sistema moderno e intuitivo para agendar sua consulta em poucos cliques
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-primary-50/50 hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary-600" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">Disponível 24 horas</span>
                  </div>
                  <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-primary-50/50 hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary-600" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">Confirmação instantânea</span>
                  </div>
                  <div className="flex items-center gap-3 text-left p-3 rounded-xl bg-primary-50/50 hover:bg-primary-50 transition-colors duration-300">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary-600" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">Lembrete automático</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Premium */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2 backdrop-blur-sm bg-white/10 shadow-lg">
            <div className="w-1.5 h-3 bg-white/90 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Benefícios - Design Premium */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        {/* Decorative Elements - Refinados com imagens */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 image-medical-filter"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-100/40 to-blue-100/30 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-primary-100/30 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Por que escolher a{' '}
              <span className="gradient-text">ClínicaMed</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Oferecemos o melhor em saúde e bem-estar com tecnologia de ponta e atendimento humanizado
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon
              return (
                <div 
                  key={index} 
                  className="card hover-lift group animate-on-scroll"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${beneficio.color} rounded-3xl flex items-center justify-center mb-6 shadow-[0_15px_40px_rgba(0,0,0,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                    {beneficio.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {beneficio.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Nossa Clínica em Números */}
      <ClinicStatsSection />

      {/* Como Funciona */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decorativo sutil */}
        <div 
          className="absolute top-1/2 right-0 w-[400px] h-[400px] opacity-5 image-medical-filter transform -translate-y-1/2"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Como funciona o atendimento
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Processo simples e rápido em 4 passos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comoFunciona.map((item, index) => (
              <div key={index} className="relative group">
                <div className="card text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold shadow-[0_15px_40px_rgba(37,99,235,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                {index < comoFunciona.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-300 to-primary-500 transform -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-primary-500 absolute right-0 top-1/2 transform -translate-y-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center image-medical-filter"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 to-primary-700/85"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/30 via-transparent to-primary-600/30"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight text-shadow-soft">
            Pronto para cuidar da sua saúde?
          </h2>
          <p className="text-xl text-primary-100 mb-10 font-light leading-relaxed">
            Agende sua consulta agora mesmo e tenha acesso aos melhores profissionais
          </p>
          <Link 
            to="/agendar" 
            className="inline-block bg-white text-primary-600 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-gray-50 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)] transform hover:-translate-y-2 hover:scale-105"
          >
            Agendar Consulta
          </Link>
        </div>
      </section>

      {/* CTA Fixo */}
      <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
        <Link
          to="/agendar"
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-5 rounded-2xl shadow-[0_15px_50px_rgba(37,99,235,0.5)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.6)] hover:scale-110 transition-all duration-500 flex items-center gap-3 font-extrabold text-lg group backdrop-blur-sm border-2 border-white/20"
        >
          <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline">Agendar</span>
        </Link>
      </div>
    </div>
  )
}
