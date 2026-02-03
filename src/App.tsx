import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Agenda from './pages/Agenda'
import Pacientes from './pages/Pacientes'
import PacienteDetail from './pages/PacienteDetail'
import Profissionais from './pages/Profissionais'
import Financeiro from './pages/Financeiro'
import Estoque from './pages/Estoque'
import Configuracoes from './pages/Configuracoes'
import PublicLayout from './components/layout/PublicLayout'
import Home from './pages/public/Home'
import Servicos from './pages/public/Servicos'
import Clinica from './pages/public/Clinica'
import Contato from './pages/public/Contato'
import EscolherServico from './pages/agendamento/EscolherServico'
import EscolherProfissional from './pages/agendamento/EscolherProfissional'
import EscolherHorario from './pages/agendamento/EscolherHorario'
import DadosPaciente from './pages/agendamento/DadosPaciente'
import Confirmacao from './pages/agendamento/Confirmacao'
import Sucesso from './pages/agendamento/Sucesso'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  // Sempre permite acesso - login removido
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="clinica" element={<Clinica />} />
          <Route path="contato" element={<Contato />} />
        </Route>

        {/* Fluxo de Agendamento */}
        <Route path="/agendar" element={<PublicLayout />}>
          <Route index element={<EscolherServico />} />
          <Route path="profissional" element={<EscolherProfissional />} />
          <Route path="horario" element={<EscolherHorario />} />
          <Route path="dados" element={<DadosPaciente />} />
          <Route path="confirmacao" element={<Confirmacao />} />
          <Route path="sucesso" element={<Sucesso />} />
        </Route>

        {/* Rotas Administrativas */}
        <Route path="/admin/login" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="pacientes/:id" element={<PacienteDetail />} />
          <Route path="profissionais" element={<Profissionais />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="estoque" element={<Estoque />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>

        {/* Redirecionamento antigo /login */}
        <Route path="/login" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


