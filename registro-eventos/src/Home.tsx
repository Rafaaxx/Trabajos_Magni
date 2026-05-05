import {useContext, useEffect, useState } from 'react'
import './App.css'
import { Filtros } from './Components/Filtros'
import { ParticipanteCard } from './Components/ParticipanteCard'
import { ParticipantesContext } from './context/ParticipantesContext'
import { Link } from 'react-router-dom'

function Home() {
  const context=useContext(ParticipantesContext)
  if (!context) return null

  return (
    <>
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-5xl md:text-7xl font-bold m-10 text-blue-700'>Bienvenido</h1>
      <div className='flex justify-between'>
      <Link to="/nuevo" className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">Registrar nuevo participante</Link>
      <Link to="/lista" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 ml-4">Ver lista de participantes</Link>
    </div>
    <h2 className='bg-gray-200 border rounded-full p-4 my-6'>Sistema de gestion de participantes-UTN</h2>
    </div>
    </>
  )
}

export default Home
