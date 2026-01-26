// APIs simuladas para integração com o sistema administrativo

import { useDataStore } from '../store/dataStore'

export interface AgendamentoRequest {
  servicoId: string
  profissionalId: string
  data: string
  horario: string
  paciente: {
    nome: string
    telefone: string
    email: string
    cpf: string
  }
}

export interface PagamentoRequest {
  agendamentoId: string
  valor: number
  formaPagamento: 'pix' | 'cartao' | 'dinheiro'
}

// Simular POST /api/pacientes
export async function criarPaciente(paciente: AgendamentoRequest['paciente']) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { addPaciente } = useDataStore.getState()
      addPaciente({
        ...paciente,
        dataNascimento: '1990-01-01',
        endereco: {
          rua: '',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '',
        },
        historicoMedico: [],
        arquivos: [],
        observacoes: [],
      })
      resolve({ success: true, message: 'Paciente criado com sucesso' })
    }, 500)
  })
}

// Simular POST /api/agendamentos
export async function criarAgendamento(data: AgendamentoRequest) {
  return new Promise(async (resolve) => {
    try {
      setTimeout(async () => {
        const { addConsulta, addPaciente, pacientes, profissionais } = useDataStore.getState()

        // Normalizar CPF para busca (remover pontos e traços)
        const cpfNormalizado = data.paciente.cpf.replace(/\D/g, '')
        
        // Encontrar paciente existente
        let paciente = pacientes.find((p) => {
          const cpfPaciente = p.cpf.replace(/\D/g, '')
          return cpfPaciente === cpfNormalizado
        })

        // Se não encontrou, criar novo paciente
        if (!paciente) {
          addPaciente({
            nome: data.paciente.nome,
            cpf: data.paciente.cpf,
            email: data.paciente.email,
            telefone: data.paciente.telefone,
            dataNascimento: '1990-01-01',
            endereco: {
              rua: '',
              cidade: 'São Paulo',
              estado: 'SP',
              cep: '',
            },
            historicoMedico: [],
            arquivos: [],
            observacoes: [],
          })
          
          // Buscar o paciente recém-criado
          await new Promise(resolve => setTimeout(resolve, 100))
          const { pacientes: pacientesAtualizados } = useDataStore.getState()
          paciente = pacientesAtualizados.find((p) => {
            const cpfPaciente = p.cpf.replace(/\D/g, '')
            return cpfPaciente === cpfNormalizado
          })
        }

        // Verificar profissional
        const profissional = profissionais.find((p) => p.id === data.profissionalId)

        if (!paciente) {
          resolve({ success: false, message: 'Erro ao criar/encontrar paciente' })
          return
        }

        if (!profissional) {
          resolve({ success: false, message: 'Profissional não encontrado' })
          return
        }

        // Criar consulta
        const [hora, minuto] = data.horario.split(':')
        const dataConsulta = new Date(data.data)
        dataConsulta.setHours(parseInt(hora), parseInt(minuto))

        addConsulta({
          pacienteId: paciente.id,
          pacienteNome: paciente.nome,
          profissionalId: profissional.id,
          profissionalNome: profissional.nome,
          data: dataConsulta,
          hora: data.horario,
          status: 'agendada',
        })

        // Simular envio de lembrete
        enviarLembreteWhatsApp(data.paciente.telefone, data.data, data.horario)

        resolve({
          success: true,
          protocolo: `AGD-${Date.now()}`,
          message: 'Agendamento criado com sucesso',
        })
      }, 800)
    } catch (error) {
      console.error('Erro ao criar agendamento:', error)
      resolve({ success: false, message: 'Erro ao criar agendamento. Tente novamente.' })
    }
  })
}

// Simular GET /api/servicos
export async function obterServicos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        servicos: [
          { id: 'cardiologia', nome: 'Cardiologia', preco: 250 },
          { id: 'dermatologia', nome: 'Dermatologia', preco: 200 },
          { id: 'ortopedia', nome: 'Ortopedia', preco: 220 },
          { id: 'pediatria', nome: 'Pediatria', preco: 180 },
          { id: 'ginecologia', nome: 'Ginecologia', preco: 200 },
          { id: 'clinica-geral', nome: 'Clínica Geral', preco: 150 },
        ],
      })
    }, 300)
  })
}

// Simular GET /api/profissionais
export async function obterProfissionais(servicoId?: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { profissionais } = useDataStore.getState()
      let filtrados = profissionais

      if (servicoId) {
        const especialidadeMap: Record<string, string> = {
          cardiologia: 'Cardiologia',
          dermatologia: 'Dermatologia',
          ortopedia: 'Ortopedia',
          pediatria: 'Pediatria',
          ginecologia: 'Ginecologia',
          'clinica-geral': 'Clínica Geral',
        }
        filtrados = profissionais.filter(
          (p) => p.especialidade === especialidadeMap[servicoId]
        )
      }

      resolve({ profissionais: filtrados })
    }, 300)
  })
}

// Simular POST /api/pagamentos
export async function processarPagamento(data: PagamentoRequest) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { addLancamento } = useDataStore.getState()
      addLancamento({
        tipo: 'entrada',
        descricao: `Consulta - Protocolo ${data.agendamentoId}`,
        valor: data.valor,
        data: new Date().toISOString().split('T')[0],
        formaPagamento: data.formaPagamento,
        categoria: 'Consultas',
      })

      resolve({
        success: true,
        transactionId: `TXN-${Date.now()}`,
        message: 'Pagamento processado com sucesso',
      })
    }, 1500)
  })
}

// Simular envio de lembrete WhatsApp
function enviarLembreteWhatsApp(telefone: string, data: string, horario: string) {
  console.log('📱 Lembrete WhatsApp enviado:', {
    telefone,
    mensagem: `Lembrete: Sua consulta está agendada para ${data} às ${horario}`,
  })
  // Em produção, aqui seria feita a integração real com API do WhatsApp
}

// Simular verificação de cupom
export async function verificarCupom(codigo: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cuponsValidos: Record<string, number> = {
        BEMVINDO10: 10,
        SAUDE20: 20,
        CLINICA15: 15,
      }

      const desconto = cuponsValidos[codigo.toUpperCase()]
      if (desconto) {
        resolve({ valido: true, desconto, message: `Cupom aplicado! ${desconto}% de desconto` })
      } else {
        resolve({ valido: false, message: 'Cupom inválido' })
      }
    }, 500)
  })
}

