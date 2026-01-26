import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
    }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8" style={{
          background: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.03) 0%, transparent 50%)',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}


