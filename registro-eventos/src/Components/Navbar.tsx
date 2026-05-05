import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const[abierto,setAbierto]=useState(false)
  return (
    <>
     <nav className='bg-blue-400 p-4 h-16 flex items-center justify-between md:justify-center relative'>
        <button onClick={() => setAbierto(!abierto)} className="md:hidden text-white text-2xl"> ☰ </button>
        <div className='hidden md:flex items-center justify-center'>
      <Link to ="/" className="text-xl bg-blue-700 p-3 px-10 border rounded mx-12 font-bold text-white">Inicio</Link>
      <Link to="/nuevo" className="ml-4 bg-blue-700 p-3 px-10 border rounded mx-12 text-xl font-bold text-white">Registrar</Link>
      <Link to="/lista" className="ml-4 bg-blue-700 p-3 px-10 border rounded mx-12 text-xl font-bold text-white">Lista</Link>
    </div>
    </nav>
    <div className={`
     fixed top-0 left-0 h-screen w-64 bg-blue-600 z-50 p-6
     transition-transform duration-300 ease-in-out
     ${abierto ? 'translate-x-0' : '-translate-x-full'} 
     md:hidden flex flex-col
    `}>
  <button 
    onClick={() => setAbierto(false)} 
    className="text-white text-3xl self-end mb-8"
  > 
    ☰  
  </button>

  {/* Tus Links */}
  <div className="flex flex-col space-y-4">
    <Link to="/" onClick={() => setAbierto(false)} className="bg-blue-700 p-3 text-center rounded text-white font-bold">Inicio</Link>
    <Link to="/nuevo" onClick={() => setAbierto(false)} className="bg-blue-700 p-3 text-center rounded text-white font-bold">Registrar</Link>
    <Link to="/lista" onClick={() => setAbierto(false)} className="bg-blue-700 p-3 text-center rounded text-white font-bold">Lista</Link>
  </div>
</div>
    
    </>
  )
}
