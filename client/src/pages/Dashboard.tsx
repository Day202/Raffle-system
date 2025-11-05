import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <p className="mb-4">Overview and quick actions.</p>
      <div className="space-x-2">
        <Link to="/wheel" className="px-4 py-2 bg-blue-600 text-white rounded">Open Wheel</Link>
        <Link to="/admin" className="px-4 py-2 bg-gray-200 rounded">Manage</Link>
      </div>
    </div>
  )
}
