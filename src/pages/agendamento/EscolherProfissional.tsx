import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Star, Check, Award } from 'lucide-react'
import { useDataStore } from '../../store/dataStore'

export default function EscolherProfissional() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const servicoId = searchParams.get('servico')
  const { profissionais } = useDataStore()
  const [profissionalEscolhido, setProfissionalEscolhido] = useState<string | null>(null)

  // Filtrar profissionais por especialidade (simulado)
  const profissionaisFiltrados = profissionais.filter((p) => {
    const especialidadeMap: Record<string, string> = {
      cardiologia: 'Cardiologia',
      dermatologia: 'Dermatologia',
      ortopedia: 'Ortopedia',
      pediatria: 'Pediatria',
      ginecologia: 'Ginecologia',
      'clinica-geral': 'Clínica Geral',
    }
    return p.especialidade === especialidadeMap[servicoId || ''] || !servicoId
  })

  const handleContinuar = () => {
    if (profissionalEscolhido) {
      navigate(
        `/agendar/horario?servico=${servicoId}&profissional=${profissionalEscolhido}`
      )
    }
  }

  // Imagens de profissionais (simuladas)
  const fotosProfissionais: Record<string, string> = {
    '1': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop',
    '2': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop',
    '3': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80&auto=format&fit=crop',
    '4': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80&auto=format&fit=crop',
    '5': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80&auto=format&fit=crop',
    '6': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80&auto=format&fit=crop',
  }

  return (
    <div className="min-h-screen gradient-primary py-16 relative overflow-hidden">
      {/* Background decorativo */}
      <div 
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-5 image-medical-filter pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop')`,
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
              <div className="progress-step progress-step-completed">
                <Check className="w-5 h-5" />
              </div>
              <div className="progress-step progress-step-active pulse-glow">
                2
              </div>
              <div>
                <p className="text-sm font-bold text-primary-600 uppercase tracking-wide">Passo 2 de 5</p>
                <p className="text-base font-semibold text-gray-700">Escolher Profissional</p>
              </div>
            </div>
            <div className="flex-1 mx-8">
              <div className="progress-bar-container">
                <div className="progress-bar-fill animate-progress" style={{ width: '40%' }}></div>
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
                backgroundImage: `url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Escolha o Profissional
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Selecione o médico que você prefere para sua consulta
          </p>
        </div>

        {/* Cards de Profissionais Premium */}
        {profissionaisFiltrados.length === 0 ? (
          <div className="text-center py-16 mb-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Nenhum profissional disponível
            </h3>
            <p className="text-gray-600 mb-6">
              Não há profissionais cadastrados para esta especialidade no momento.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar e escolher outra especialidade
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {profissionaisFiltrados.map((profissional, index) => {
            const foto = fotosProfissionais[profissional.id] || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop'
            const isSelected = profissionalEscolhido === profissional.id
            return (
              <div
                key={profissional.id}
                onClick={() => setProfissionalEscolhido(profissional.id)}
                className={`booking-card cursor-pointer group animate-on-scroll ${
                  isSelected ? 'booking-card-selected' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Foto do profissional */}
                  <div className="relative mb-6">
                    <div 
                      className="w-32 h-32 rounded-full shadow-2xl border-4 border-white overflow-hidden image-medical-filter transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${foto}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent"></div>
                    </div>
                    {isSelected && (
                      <div className="absolute -bottom-2 -right-2 animate-checkmark">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full border-4 border-primary-500 animate-pulse"></div>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {profissional.nome}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-primary-600" />
                    <p className="text-primary-600 font-semibold text-lg">
                      {profissional.especialidade}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 font-medium">{profissional.crm}</p>
                  
                  {/* Avaliação */}
                  <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl w-full">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                        />
                      ))}
                    </div>
                    <span className="text-base font-bold text-gray-700 ml-2">4.9</span>
                    <span className="text-sm text-gray-500">(127 avaliações)</span>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        )}

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
            disabled={!profissionalEscolhido}
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

