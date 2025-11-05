import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import WheelPage from './pages/Wheel'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div className="app-shell">
      <header className="header flex items-center justify-between">
        <div>Raffle System</div>
        <nav className="space-x-4">
          <Link to="/" className="underline">Dashboard</Link>
          <Link to="/wheel" className="underline">Wheel</Link>
          <Link to="/admin" className="underline">Admin</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wheel" element={<WheelPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
