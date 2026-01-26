import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, Heart, Eye, Bone, Baby, UserCircle, Stethoscope, Activity, Shield, Clock, Award } from 'lucide-react'

export default function Servicos() {
  const servicos = [
    {
      id: 'cardiologia',
      nome: 'Cardiologia',
      descricao: 'Cuidados especializados com o coração e sistema cardiovascular',
      preco: 250,
      duracao: '60 min',
      icone: Heart,
      beneficios: [
        'Consulta completa com cardiologista',
        'Eletrocardiograma incluído',
        'Avaliação de risco cardiovascular',
        'Plano de tratamento personalizado',
      ],
      imagem: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=90&auto=format&fit=crop',
    },
    {
      id: 'dermatologia',
      nome: 'Dermatologia',
      descricao: 'Tratamento completo de doenças da pele, cabelo e unhas',
      preco: 200,
      duracao: '45 min',
      icone: Eye,
      beneficios: [
        'Exame completo da pele',
        'Diagnóstico preciso',
        'Tratamentos estéticos avançados',
        'Acompanhamento personalizado',
      ],
      imagem: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=90&auto=format&fit=crop',
    },
    {
      id: 'ortopedia',
      nome: 'Ortopedia',
      descricao: 'Cuidados especializados com ossos, articulações e músculos',
      preco: 220,
      duracao: '50 min',
      icone: Bone,
      beneficios: [
        'Avaliação ortopédica completa',
        'Exames de imagem quando necessário',
        'Tratamento conservador',
        'Programa de reabilitação',
      ],
      imagem: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=90&auto=format&fit=crop',
    },
    {
      id: 'pediatria',
      nome: 'Pediatria',
      descricao: 'Cuidados médicos especializados para bebês, crianças e adolescentes',
      preco: 180,
      duracao: '40 min',
      icone: Baby,
      beneficios: [
        'Consulta pediátrica completa',
        'Acompanhamento do crescimento',
        'Programa de vacinação',
        'Orientação especializada aos pais',
      ],
      imagem: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=90&auto=format&fit=crop',
    },
    {
      id: 'ginecologia',
      nome: 'Ginecologia',
      descricao: 'Cuidados completos com a saúde da mulher em todas as fases da vida',
      preco: 200,
      duracao: '45 min',
      icone: UserCircle,
      beneficios: [
        'Consulta ginecológica completa',
        'Prevenção e rastreamento',
        'Exames complementares',
        'Acompanhamento personalizado',
      ],
      imagem: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=90&auto=format&fit=crop',
    },
    {
      id: 'clinica-geral',
      nome: 'Clínica Geral',
      descricao: 'Atendimento médico geral e preventivo com profissionais qualificados',
      preco: 150,
      duracao: '30 min',
      icone: Stethoscope,
      beneficios: [
        'Consulta médica completa',
        'Avaliação geral de saúde',
        'Solicitação de exames',
        'Encaminhamentos quando necessário',
      ],
      imagem: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=90&auto=format&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section Premium */}
      <section className="relative py-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center image-medical-filter"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1920&q=90')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-primary-700/90"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800/40 via-transparent to-primary-600/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl px-6 py-3 rounded-full mb-8 border border-white/30 shadow-2xl">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-float" />
            <span className="text-sm font-bold tracking-widest text-white uppercase">Nossos Serviços</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight text-shadow-soft tracking-tight">
            Especialidades Médicas
          </h1>
          <p className="text-xl text-primary-50 max-w-3xl mx-auto font-light leading-relaxed">
            Oferecemos uma ampla gama de especialidades com profissionais altamente qualificados
          </p>
        </div>
      </section>

      {/* Serviços Grid - Catálogo Premium */}
      <section className="section-padding relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)',
        backgroundSize: '400% 400%',
      }}>
        {/* Background decorativo sutil com padrão médico */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Título da seção - Estilo Catálogo Premium */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-gray-200/50 shadow-sm">
              <Award className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">Catálogo de Serviços</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
              Nossas Especialidades
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Cuidados médicos de excelência com profissionais altamente qualificados
            </p>
          </div>

          {/* Grid de Serviços Premium */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {servicos.map((servico, index) => {
              const IconComponent = servico.icone
              return (
                <div
                  key={servico.id}
                  className="group animate-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Premium com Glassmorphism */}
                  <div className="relative h-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:-translate-y-2"
                    style={{
                      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    {/* Sombra externa no hover */}
                    <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: '0 40px 120px rgba(37, 99, 235, 0.15), 0 15px 50px rgba(0, 0, 0, 0.08)',
                      }}
                    ></div>

                    {/* Imagem Premium do Serviço */}
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={servico.imagem}
                        alt={servico.nome}
                        className="absolute inset-0 w-full h-full object-cover image-medical-filter transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      {/* Overlay gradiente premium */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-primary-600/20"></div>
                      
                      {/* Ícone da especialidade no canto superior */}
                      <div className="absolute top-6 right-6">
                        <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          <IconComponent className="w-8 h-8 text-primary-600" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Título e descrição sobre a imagem */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 text-shadow-soft leading-tight">
                          {servico.nome}
                        </h3>
                        <p className="text-primary-100 font-light text-lg leading-relaxed">{servico.descricao}</p>
                      </div>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="p-8">
                      {/* Preço Premium */}
                      <div className="mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                            R$ {servico.preco}
                          </span>
                          <span className="text-lg text-gray-500 font-light">/consulta</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Duração: {servico.duracao}</span>
                        </div>
                      </div>

                      {/* Benefícios Premium */}
                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                          <Shield className="w-5 h-5 text-primary-600" />
                          <h4 className="text-lg font-bold text-gray-900">Benefícios incluídos</h4>
                        </div>
                        <div className="space-y-4">
                          {servico.beneficios.map((beneficio, idx) => (
                            <div key={idx} className="flex items-start gap-4 group/beneficio">
                              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md transition-transform duration-200 group-hover/beneficio:scale-110">
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                              </div>
                              <span className="text-gray-700 leading-relaxed font-medium text-base flex-1">{beneficio}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botão Premium SaaS */}
                      <Link
                        to={`/agendar?servico=${servico.id}`}
                        className="relative w-full group/btn overflow-hidden rounded-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          boxShadow: '0 10px 40px rgba(37, 99, 235, 0.35), 0 4px 15px rgba(37, 99, 235, 0.2)',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative px-8 py-5 flex items-center justify-center gap-3 text-white font-bold text-lg transition-transform duration-300 group-hover/btn:scale-[1.03]">
                          <span>Agendar Agora</span>
                          <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Final Premium */}
        <div className="mt-24 text-center animate-fade-in">
          <div className="inline-block bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-100/50"
            style={{
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-primary-600" />
              <p className="text-gray-900 font-bold text-xl">
                Não encontrou o que procura?
              </p>
            </div>
            <p className="text-gray-600 mb-6 text-lg font-light">
              Entre em contato conosco e tire suas dúvidas
            </p>
            <Link 
              to="/contato" 
              className="btn-secondary inline-flex items-center gap-3 px-8 py-4 text-lg rounded-2xl"
            >
              Fale Conosco
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
