import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, Heart, Eye, Bone, Baby, UserCircle, Stethoscope } from 'lucide-react'

export default function EscolherServico() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const servicoSelecionado = searchParams.get('servico')

  const servicos = [
    {
      id: 'cardiologia',
      nome: 'Cardiologia',
      descricao: 'Cuidados com o coração e sistema cardiovascular',
      preco: 250,
      duracao: '60 min',
      icone: Heart,
      imagem: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80&auto=format&fit=crop',
    },
    {
      id: 'dermatologia',
      nome: 'Dermatologia',
      descricao: 'Tratamento de doenças da pele, cabelo e unhas',
      preco: 200,
      duracao: '45 min',
      icone: Eye,
      imagem: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80&auto=format&fit=crop',
    },
    {
      id: 'ortopedia',
      nome: 'Ortopedia',
      descricao: 'Cuidados com ossos, articulações e músculos',
      preco: 220,
      duracao: '50 min',
      icone: Bone,
      imagem: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80&auto=format&fit=crop',
    },
    {
      id: 'pediatria',
      nome: 'Pediatria',
      descricao: 'Cuidados médicos para bebês, crianças e adolescentes',
      preco: 180,
      duracao: '40 min',
      icone: Baby,
      imagem: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop',
    },
    {
      id: 'ginecologia',
      nome: 'Ginecologia',
      descricao: 'Cuidados com a saúde da mulher',
      preco: 200,
      duracao: '45 min',
      icone: UserCircle,
      imagem: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80&auto=format&fit=crop',
    },
    {
      id: 'clinica-geral',
      nome: 'Clínica Geral',
      descricao: 'Atendimento médico geral e preventivo',
      preco: 150,
      duracao: '30 min',
      icone: Stethoscope,
      imagem: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80&auto=format&fit=crop',
    },
  ]

  const [servicoEscolhido, setServicoEscolhido] = useState<string | null>(
    servicoSelecionado || null
  )

  const handleContinuar = () => {
    if (servicoEscolhido) {
      navigate(`/agendar/profissional?servico=${servicoEscolhido}`)
    }
  }

  return (
    <div className="min-h-screen gradient-primary py-16 relative overflow-hidden">
      {/* Background decorativo */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 image-medical-filter pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
        }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Progress Bar Premium */}
        <div className="mb-16 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="progress-step progress-step-active pulse-glow">
                1
              </div>
              <div>
                <p className="text-sm font-bold text-primary-600 uppercase tracking-wide">Passo 1 de 5</p>
                <p className="text-base font-semibold text-gray-700">Escolher Serviço</p>
              </div>
            </div>
            <div className="flex-1 mx-8">
              <div className="progress-bar-container">
                <div className="progress-bar-fill animate-progress" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Header com imagem */}
        <div className="mb-16 text-center animate-slide-up">
          <div className="inline-block mb-6">
            <div 
              className="w-32 h-32 rounded-3xl mx-auto shadow-2xl image-medical-filter"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Escolha a Especialidade
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Selecione o tipo de consulta que você precisa
          </p>
        </div>

        {/* Cards de Serviços Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {servicos.map((servico, index) => {
            const IconComponent = servico.icone
            const isSelected = servicoEscolhido === servico.id
            return (
              <div
                key={servico.id}
                onClick={() => setServicoEscolhido(servico.id)}
                className={`booking-card cursor-pointer group animate-on-scroll ${
                  isSelected ? 'booking-card-selected' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Imagem do serviço */}
                <div className="relative h-48 rounded-2xl mb-6 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                  <img
                    src={servico.imagem}
                    alt={servico.nome}
                    className="absolute inset-0 w-full h-full object-cover image-medical-filter transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback para cor sólida se imagem não carregar
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                      isSelected 
                        ? 'bg-primary-600 shadow-lg scale-110' 
                        : 'bg-white/80 group-hover:bg-white'
                    }`}>
                      <IconComponent className={`w-6 h-6 transition-colors ${
                        isSelected ? 'text-white' : 'text-primary-600'
                      }`} />
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-4 left-4 animate-checkmark">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {servico.nome}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{servico.descricao}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="font-medium">Duração:</span>
                      <span className="font-semibold text-gray-700">{servico.duracao}</span>
                    </div>
                    <span className="text-2xl font-extrabold text-primary-600">
                      R$ {servico.preco}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Botão Continuar Premium */}
        <div className="flex justify-end animate-fade-in">
          <button
            onClick={handleContinuar}
            disabled={!servicoEscolhido}
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

