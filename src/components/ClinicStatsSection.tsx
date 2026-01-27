import { useEffect, useRef, useState } from 'react'
import { Users, UserCheck, Star, Building2 } from 'lucide-react'

interface StatItem {
  icon: typeof Users
  value: number
  suffix?: string
  label: string
  delay?: number
}

const stats: StatItem[] = [
  {
    icon: Users,
    value: 800,
    suffix: '+',
    label: 'Pacientes atendidos',
    delay: 0,
  },
  {
    icon: UserCheck,
    value: 150,
    suffix: '+',
    label: 'Profissionais',
    delay: 0.1,
  },
  {
    icon: Star,
    value: 2000,
    suffix: '',
    label: 'Avaliações realizadas',
    delay: 0.2,
  },
  {
    icon: Building2,
    value: 4,
    suffix: '',
    label: 'Unidades',
    delay: 0.3,
  },
]

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  isVisible: boolean
}

function CountUp({ end, duration = 2000, suffix = '', isVisible }: CountUpProps) {
  const [count, setCount] = useState(0)
  const hasStartedRef = useRef(false)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!isVisible || hasStartedRef.current) return

    hasStartedRef.current = true
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function para animação suave (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (end - startValue) * easeOutCubic)

      setCount(current)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, end, duration])

  return (
    <span className="tabular-nums">
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}

interface StatCardProps {
  stat: StatItem
}

function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{
        animationDelay: `${stat.delay || 0}s`,
      }}
    >
      <div
        className={`card-premium card-premium-hover text-center transition-all duration-700 ${
          isInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Borda iluminada sutil no hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400/0 via-primary-500/0 to-primary-600/0 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:from-primary-400/20 group-hover:via-primary-500/15 group-hover:to-primary-600/20"></div>

        <div className="relative z-10">
          {/* Ícone Premium */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_10px_30px_rgba(37,99,235,0.15)] group-hover:shadow-[0_15px_40px_rgba(37,99,235,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3">
            <Icon
              className="w-10 h-10 text-primary-600"
              strokeWidth={2}
            />
          </div>

          {/* Número Grande com Count-Up */}
          <div className="mb-4">
            <div className="text-6xl lg:text-7xl font-extrabold bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 bg-clip-text text-transparent leading-none tracking-tight">
              <CountUp
                end={stat.value}
                duration={2000}
                suffix={stat.suffix}
                isVisible={isInView}
              />
            </div>
          </div>

          {/* Label Discreto */}
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ClinicStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-gray-50 via-white to-primary-50/30 relative overflow-hidden"
    >
      {/* Decorative Elements Premium */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-100/30 to-blue-100/20 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/30 to-primary-100/20 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Nossa Clínica em{' '}
            <span className="gradient-text">Números</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Resultados que comprovam nossa excelência e compromisso com a sua saúde
          </p>
        </div>

        {/* Grid de Cards Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

