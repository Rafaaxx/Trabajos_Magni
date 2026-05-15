import { useNavigate, useParams } from "react-router-dom"
import { ParticipantesContext } from "../context/ParticipantesContext"
import { useContext, useEffect } from "react"
import { Formulario } from "../Components/Formulario"
export default function EditarPage() {
  const {id}=useParams()
  const navigate=useNavigate()
  const context=useContext(ParticipantesContext)

  useEffect(()=>{
    if (!context || context.cargando) return;
    const { participante, setParticipanteSeleccionado } = context;
    const encontrado=participante.find(p=>p.id===Number(id))
    if (encontrado){
        setParticipanteSeleccionado(encontrado)
    }else{
        alert("Participante no encontrado")
        navigate("/")
    }
    return()=>{
        context.setParticipanteSeleccionado(null)
    }
  },[id,context?.cargando,navigate])
  if (!context || context.cargando) {
    return <p className="p-6">Cargando datos del servidor...</p>;
  }
    return (
    <div className="p-6">
     <h1 className="text-xl font-bold mb-4">
     Editar Participante
     </h1>
     <Formulario onSuccess={() => navigate("/")} />
    </div>
  )
}
