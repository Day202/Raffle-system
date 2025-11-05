import React from 'react'

export default function Admin(){
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Admin</h1>
      <p>Manage participants, prizes and view winners.</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Participants (placeholder)</div>
        <div className="p-4 bg-white rounded shadow">Prizes (placeholder)</div>
      </div>
    </div>
  )
}
