import {useEffect, useState } from 'react'
import './App.css'
import type { Participante } from './Models/Participante'
import { Filtros } from './Components/Filtros'
import { Formulario } from './Components/Formulario'
import { ParticipanteCard } from './Components/ParticipanteCard'
function App() {
  const [participantes,setParticipantes]=useState<Participante[]>(()=>{
  const guardados=localStorage.getItem("participantes")
    return guardados ? JSON.parse(guardados):[]
  })
  const [filtroModalidad,setFiltroModalidad]=useState("Todas")
  const [filtroNivel,setFiltroNivel]=useState("Todos")
  const [filtroNombre,setFiltroNombre]=useState("")
  
  const agregarParticipante=(nuevoParticipante:Participante)=>{
   setParticipantes([...participantes,nuevoParticipante])
  }
  const filtrarParticipantes=participantes.filter((p)=>{
    const coincideModalidad= filtroModalidad==="Todas" || p.modalidad===filtroModalidad
    const coincideNivel= filtroNivel==="Todos"|| p.nivel===filtroNivel
    const  coincideNombre= filtroNombre===""|| p.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
    return coincideModalidad && coincideNivel && coincideNombre
  })
  useEffect(()=>{
    localStorage.setItem("participantes",JSON.stringify(participantes))
  },[participantes])
  const eliminarParticipante=(id:number)=>{
    setParticipantes(participantes.filter(p=>p.id!=id))
  }
  return (
    <>
    <div className='max-w-6xl mx-auto p-6'>
      <Formulario
      onAgregar={agregarParticipante}
      contador={participantes.length}
      />
      </div>
      <h1 className='font-bold text-2xl text-center my-10'>Búsqueda</h1>
        <Filtros 
        nombre={filtroNombre}
        setNombre={setFiltroNombre}
        nivel={filtroNivel}
        setNivel={setFiltroNivel}
        modalidad={filtroModalidad}
        setModalidad={setFiltroModalidad}
        />
         <h2 className='font-bold text-center text-2xl my-8'>Resultados</h2>
         <p className='flex justify-center items-center m-5 font-bold text-xl'>Mostrando {filtrarParticipantes.length} de {participantes.length} participantes</p>
         <div className='lista-participantes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {participantes.length===0?(
            <p className='flex justify-center items-center m-5 font-bold text-xl'>Aun no hay participantes registrados</p>
          ):(
            filtrarParticipantes.map((p)=>{
            return(
              <ParticipanteCard
               p={p}
               onEliminar={()=>eliminarParticipante(p.id)}
               />
            )})
          )
        }
         </div>
         <div className='w-full flex justify-center my-10'>
         <button className='bg-red-600 text-white p-3 w-1/2 rounded font-bold my-10 flex justify-center items-center' 
         onClick={()=>{localStorage.removeItem("participantes");
          setParticipantes([])
         }}>
         Resetear datos</button>
         </div>
    </>
  )
}

export default App
