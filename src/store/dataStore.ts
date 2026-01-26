import { create } from 'zustand'

export interface Paciente {
  id: string
  nome: string
  cpf: string
  email: string
  telefone: string
  dataNascimento: string
  foto?: string
  endereco: {
    rua: string
    cidade: string
    estado: string
    cep: string
  }
  historicoMedico: string[]
  arquivos: Array<{ nome: string; data: string; tipo: string }>
  observacoes: string[]
  createdAt: string
}

export interface Profissional {
  id: string
  nome: string
  crm: string
  especialidade: string
  email: string
  telefone: string
  foto?: string
  ativo: boolean
}

export interface Consulta {
  id: string
  pacienteId: string
  pacienteNome: string
  profissionalId: string
  profissionalNome: string
  data: Date
  hora: string
  status: 'agendada' | 'confirmada' | 'cancelada' | 'realizada'
  observacoes?: string
}

export interface LancamentoFinanceiro {
  id: string
  tipo: 'entrada' | 'saida'
  descricao: string
  valor: number
  data: string
  formaPagamento: 'pix' | 'cartao' | 'dinheiro' | 'transferencia'
  categoria: string
}

export interface ItemEstoque {
  id: string
  nome: string
  tipo: 'insumo' | 'produto'
  quantidade: number
  quantidadeMinima: number
  unidade: string
  fornecedor: string
  preco: number
}

interface DataState {
  pacientes: Paciente[]
  profissionais: Profissional[]
  consultas: Consulta[]
  lancamentos: LancamentoFinanceiro[]
  estoque: ItemEstoque[]
  
  // Actions
  addPaciente: (paciente: Omit<Paciente, 'id' | 'createdAt'>) => void
  updatePaciente: (id: string, paciente: Partial<Paciente>) => void
  deletePaciente: (id: string) => void
  
  addProfissional: (profissional: Omit<Profissional, 'id'>) => void
  updateProfissional: (id: string, profissional: Partial<Profissional>) => void
  deleteProfissional: (id: string) => void
  
  addConsulta: (consulta: Omit<Consulta, 'id'>) => void
  updateConsulta: (id: string, consulta: Partial<Consulta>) => void
  deleteConsulta: (id: string) => void
  
  addLancamento: (lancamento: Omit<LancamentoFinanceiro, 'id'>) => void
  deleteLancamento: (id: string) => void
  
  addItemEstoque: (item: Omit<ItemEstoque, 'id'>) => void
  updateItemEstoque: (id: string, item: Partial<ItemEstoque>) => void
  deleteItemEstoque: (id: string) => void
}

// Dados iniciais simulados
const pacientesIniciais: Paciente[] = [
  {
    id: '1',
    nome: 'Maria Santos',
    cpf: '123.456.789-00',
    email: 'maria@email.com',
    telefone: '(11) 98765-4321',
    dataNascimento: '1985-05-15',
    endereco: {
      rua: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
    },
    historicoMedico: ['Hipertensão controlada', 'Consulta anual realizada'],
    arquivos: [
      { nome: 'Exame Sangue.pdf', data: '2024-01-15', tipo: 'pdf' },
      { nome: 'Raio-X Torax.jpg', data: '2024-01-10', tipo: 'image' },
    ],
    observacoes: ['Paciente pontual', 'Prefere manhã'],
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    nome: 'João Oliveira',
    cpf: '987.654.321-00',
    email: 'joao@email.com',
    telefone: '(11) 91234-5678',
    dataNascimento: '1990-08-20',
    endereco: {
      rua: 'Av. Paulista, 1000',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310-100',
    },
    historicoMedico: ['Diabetes tipo 2', 'Seguimento trimestral'],
    arquivos: [],
    observacoes: [],
    createdAt: '2023-03-20',
  },
]

const profissionaisIniciais: Profissional[] = [
  {
    id: '1',
    nome: 'Dr. Carlos Mendes',
    crm: 'CRM 123456',
    especialidade: 'Cardiologia',
    email: 'carlos@clinica.com',
    telefone: '(11) 99999-1111',
    ativo: true,
  },
  {
    id: '2',
    nome: 'Dra. Ana Paula',
    crm: 'CRM 789012',
    especialidade: 'Dermatologia',
    email: 'ana@clinica.com',
    telefone: '(11) 99999-2222',
    ativo: true,
  },
  {
    id: '3',
    nome: 'Dr. Roberto Silva',
    crm: 'CRM 345678',
    especialidade: 'Ortopedia',
    email: 'roberto@clinica.com',
    telefone: '(11) 99999-3333',
    ativo: true,
  },
  {
    id: '4',
    nome: 'Dra. Juliana Costa',
    crm: 'CRM 456789',
    especialidade: 'Pediatria',
    email: 'juliana@clinica.com',
    telefone: '(11) 99999-4444',
    ativo: true,
  },
  {
    id: '5',
    nome: 'Dra. Fernanda Lima',
    crm: 'CRM 567890',
    especialidade: 'Ginecologia',
    email: 'fernanda@clinica.com',
    telefone: '(11) 99999-5555',
    ativo: true,
  },
  {
    id: '6',
    nome: 'Dr. Paulo Santos',
    crm: 'CRM 678901',
    especialidade: 'Clínica Geral',
    email: 'paulo@clinica.com',
    telefone: '(11) 99999-6666',
    ativo: true,
  },
]

const consultasIniciais: Consulta[] = [
  {
    id: '1',
    pacienteId: '1',
    pacienteNome: 'Maria Santos',
    profissionalId: '1',
    profissionalNome: 'Dr. Carlos Mendes',
    data: new Date(2024, 0, 20, 9, 0),
    hora: '09:00',
    status: 'confirmada',
  },
  {
    id: '2',
    pacienteId: '2',
    pacienteNome: 'João Oliveira',
    profissionalId: '2',
    profissionalNome: 'Dra. Ana Paula',
    data: new Date(2024, 0, 20, 14, 30),
    hora: '14:30',
    status: 'agendada',
  },
]

const lancamentosIniciais: LancamentoFinanceiro[] = [
  {
    id: '1',
    tipo: 'entrada',
    descricao: 'Consulta - Maria Santos',
    valor: 250.0,
    data: '2024-01-15',
    formaPagamento: 'pix',
    categoria: 'Consultas',
  },
  {
    id: '2',
    tipo: 'saida',
    descricao: 'Aluguel do consultório',
    valor: 5000.0,
    data: '2024-01-05',
    formaPagamento: 'transferencia',
    categoria: 'Despesas Fixas',
  },
]

const estoqueInicial: ItemEstoque[] = [
  {
    id: '1',
    nome: 'Seringa 5ml',
    tipo: 'insumo',
    quantidade: 150,
    quantidadeMinima: 50,
    unidade: 'un',
    fornecedor: 'MedSupply',
    preco: 0.5,
  },
  {
    id: '2',
    nome: 'Algodão',
    tipo: 'insumo',
    quantidade: 25,
    quantidadeMinima: 30,
    unidade: 'pacote',
    fornecedor: 'MedSupply',
    preco: 12.0,
  },
]

export const useDataStore = create<DataState>((set) => ({
  pacientes: pacientesIniciais,
  profissionais: profissionaisIniciais,
  consultas: consultasIniciais,
  lancamentos: lancamentosIniciais,
  estoque: estoqueInicial,
  
  addPaciente: (paciente) =>
    set((state) => ({
      pacientes: [
        ...state.pacientes,
        {
          ...paciente,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  
  updatePaciente: (id, paciente) =>
    set((state) => ({
      pacientes: state.pacientes.map((p) =>
        p.id === id ? { ...p, ...paciente } : p
      ),
    })),
  
  deletePaciente: (id) =>
    set((state) => ({
      pacientes: state.pacientes.filter((p) => p.id !== id),
    })),
  
  addProfissional: (profissional) =>
    set((state) => ({
      profissionais: [
        ...state.profissionais,
        {
          ...profissional,
          id: Date.now().toString(),
        },
      ],
    })),
  
  updateProfissional: (id, profissional) =>
    set((state) => ({
      profissionais: state.profissionais.map((p) =>
        p.id === id ? { ...p, ...profissional } : p
      ),
    })),
  
  deleteProfissional: (id) =>
    set((state) => ({
      profissionais: state.profissionais.filter((p) => p.id !== id),
    })),
  
  addConsulta: (consulta) =>
    set((state) => ({
      consultas: [
        ...state.consultas,
        {
          ...consulta,
          id: Date.now().toString(),
        },
      ],
    })),
  
  updateConsulta: (id, consulta) =>
    set((state) => ({
      consultas: state.consultas.map((c) =>
        c.id === id ? { ...c, ...consulta } : c
      ),
    })),
  
  deleteConsulta: (id) =>
    set((state) => ({
      consultas: state.consultas.filter((c) => c.id !== id),
    })),
  
  addLancamento: (lancamento) =>
    set((state) => ({
      lancamentos: [
        ...state.lancamentos,
        {
          ...lancamento,
          id: Date.now().toString(),
        },
      ],
    })),
  
  deleteLancamento: (id) =>
    set((state) => ({
      lancamentos: state.lancamentos.filter((l) => l.id !== id),
    })),
  
  addItemEstoque: (item) =>
    set((state) => ({
      estoque: [
        ...state.estoque,
        {
          ...item,
          id: Date.now().toString(),
        },
      ],
    })),
  
  updateItemEstoque: (id, item) =>
    set((state) => ({
      estoque: state.estoque.map((i) =>
        i.id === id ? { ...i, ...item } : i
      ),
    })),
  
  deleteItemEstoque: (id) =>
    set((state) => ({
      estoque: state.estoque.filter((i) => i.id !== id),
    })),
}))


