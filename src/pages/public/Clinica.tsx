import { Heart, Target, Eye, Users, Award, Building, Sparkles } from 'lucide-react'

export default function Clinica() {
  const valores = [
    { icon: Heart, title: 'Humanização', desc: 'Atendimento humanizado e acolhedor em cada momento' },
    { icon: Target, title: 'Excelência', desc: 'Busca constante pela qualidade e melhoria contínua' },
    { icon: Eye, title: 'Transparência', desc: 'Comunicação clara, honesta e transparente' },
    { icon: Users, title: 'Compromisso', desc: 'Dedicação total ao bem-estar dos nossos pacientes' },
  ]

  const equipe = [
    { nome: 'Dr. Carlos Mendes', cargo: 'Cardiologista', crm: 'CRM 123456', foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop' },
    { nome: 'Dra. Ana Paula', cargo: 'Dermatologista', crm: 'CRM 789012', foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop' },
    { nome: 'Dr. Roberto Silva', cargo: 'Ortopedista', crm: 'CRM 345678', foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80&auto=format&fit=crop' },
    { nome: 'Dra. Juliana Costa', cargo: 'Pediatra', crm: 'CRM 901234', foto: 'https://images.unsplash.com/photo-1594824476968-48fd8d2c0fd7?w=400&q=80&auto=format&fit=crop' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full mb-6 border border-white/20 shadow-lg">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-float" />
            <span className="text-sm font-bold tracking-wide text-white">Sobre Nós</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight text-shadow-soft">
            A ClínicaMed
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto font-light leading-relaxed">
            Há mais de 15 anos cuidando da saúde e bem-estar de nossos pacientes
            com excelência, dedicação e tecnologia de ponta.
          </p>
        </div>
      </section>

      {/* História - Dupla */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
                <div
                  className="absolute inset-0 bg-cover bg-center image-medical-filter transition-transform duration-700 hover:scale-110"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary-100/60 to-blue-100/40 rounded-full blur-2xl opacity-50"></div>
            </div>
            
            <div>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Nossa História
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed font-light">
                <p>
                  A ClínicaMed foi fundada em 2009 com a missão de oferecer cuidados
                  médicos de excelência, combinando tecnologia avançada com um
                  atendimento humanizado e personalizado.
                </p>
                <p>
                  Ao longo dos anos, expandimos nossa equipe de profissionais
                  especializados e investimos continuamente em equipamentos modernos
                  e infraestrutura de qualidade.
                </p>
                <p>
                  Hoje, somos reconhecidos como uma das clínicas mais completas e
                  confiáveis da região, atendendo milhares de pacientes com
                  dedicação e compromisso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        {/* Background decorativo com imagem */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-full opacity-10 image-medical-filter"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="card hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center shadow-[0_15px_40px_rgba(37,99,235,0.4)]">
                  <Target className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900">Missão</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Proporcionar cuidados médicos de excelência, com foco na prevenção,
                diagnóstico preciso e tratamento humanizado, sempre priorizando o
                bem-estar e a satisfação dos nossos pacientes.
              </p>
            </div>

            <div className="card hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center shadow-[0_15px_40px_rgba(37,99,235,0.4)]">
                  <Eye className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900">Visão</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-light">
                Ser referência em saúde na região, reconhecida pela excelência no
                atendimento, pela qualidade dos profissionais e pela inovação
                tecnológica aplicada aos cuidados médicos.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center leading-tight">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valores.map((valor, index) => {
                const Icon = valor.icon
                return (
                  <div key={index} className="card text-center hover-lift">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_15px_40px_rgba(37,99,235,0.4)] transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                      <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                      {valor.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{valor.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600">
              Profissionais qualificados e dedicados ao seu bem-estar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipe.map((membro, index) => (
              <div key={index} className="card text-center hover-lift group overflow-hidden">
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${membro.foto}')` }}
                  ></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {membro.nome}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">{membro.cargo}</p>
                <p className="text-sm text-gray-500">{membro.crm}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        {/* Background decorativo */}
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-full opacity-10 image-medical-filter"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&q=80&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Nossa Estrutura
            </h2>
            <p className="text-xl text-gray-600">
              Ambiente moderno e acolhedor para seu conforto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover-lift overflow-hidden relative">
              <div 
                className="absolute inset-0 opacity-5 image-medical-filter"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80&auto=format&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Instalações Modernas
                </h3>
                <p className="text-gray-600">
                  Ambiente climatizado, limpo e organizado para seu conforto
                </p>
              </div>
            </div>
            
            <div className="card text-center hover-lift overflow-hidden relative">
              <div 
                className="absolute inset-0 opacity-5 image-medical-filter"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80&auto=format&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Equipamentos de Ponta
                </h3>
                <p className="text-gray-600">
                  Tecnologia avançada para diagnósticos precisos e tratamentos eficazes
                </p>
              </div>
            </div>
            
            <div className="card text-center hover-lift overflow-hidden relative">
              <div 
                className="absolute inset-0 opacity-5 image-medical-filter"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&q=80&auto=format&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Atendimento Humanizado
                </h3>
                <p className="text-gray-600">
                  Equipe treinada para oferecer um atendimento acolhedor e personalizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
