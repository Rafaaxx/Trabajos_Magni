import type { Participante } from "../Models/Participante"
interface ParticipanteCardProps{p:Participante, onEliminar: (id:number)=>void}
export const ParticipanteCard=({p,onEliminar}:ParticipanteCardProps)=>{
const bgColor=
  p.nivel==="Principiante"?"bg-green-100":
  p.nivel==="Intermedio"?"bg-yellow-100":
 "bg-red-100"
  const nivelColor=
  p.nivel==="Principiante"?"text-green-800":
  p.nivel==="Intermedio"?"text-yellow-800":
  "text-red-800"  
  return(
        <div key={p.id} className={`${bgColor} shadow rounded p-4 hover:shadow-lg transition`}>
        <h3 className='font-bold text-xl'>{p.nombre}</h3>
        <p className='mb-3'>{p.pais}</p>
        <p className='mb-1'>Modalidad:{p.modalidad}</p>
        <p className={`${nivelColor} font-bold mb-3`}>Nivel:{p.nivel}</p>
        <p>Tecnologias: {p.tecnologias.join(" - ")}</p>
        <button className="bg-red-600 text-white rounded mt-3 py-2 px-3" onClick={()=>onEliminar(p.id)}>Eliminar</button>
        </div>
  )
}