import { useNavigate, useParams } from "react-router-dom"
import { ParticipantesContext } from "../context/ParticipantesContext"
import { useContext, useEffect } from "react"
import { Formulario } from "../Components/Formulario"
export default function EditarPage() {
  const {id}=useParams()
  const navigate=useNavigate()
  const context=useContext(ParticipantesContext)
  if (!context){
    return <p>Cargando...</p>
  }
  const {participante, setParticipanteSeleccionado}=context
  useEffect(()=>{
    const encontrado=participante.find(p=>p.id===Number(id))
    if (encontrado){
        setParticipanteSeleccionado(encontrado)
    }else{
        alert("Participante no encontrado")
        navigate("/")
    }
    return()=>{
        setParticipanteSeleccionado(null)
    }
  },[id,participante, setParticipanteSeleccionado])
    return (
    <div className="p-6">
     <h1 className="text-xl font-bold mb-4">
     Editar Participante
     </h1>
     <Formulario onSuccess={() => navigate("/")} />
    </div>
  )
}
