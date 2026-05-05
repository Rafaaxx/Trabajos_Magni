import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Formulario } from '../Components/Formulario'
import { ParticipantesContext } from '../context/ParticipantesContext'

export default function FormularioPage() {
  const navigate=useNavigate()
  const context=useContext(ParticipantesContext)
    if (!context){
        return null
    }
  useEffect(()=>{
    context.setParticipanteSeleccionado(null)
  },[])
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Formulario onSuccess={() => navigate("/")} />
    </div>
  )
}
