import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { Participante } from "../Models/Participante";
import { participantesReducer } from "../reducers/participantesReducer";
import { useNotification } from "../hooks/useNotification";
interface ContextType{
    participante:Participante[],
    participanteSeleccionado:Participante|null,
    setParticipanteSeleccionado:(p:Participante|null)=>void,
    actualizar:(p:Participante)=>void,
    cargando: boolean,
    agregar: (p:Participante)=>void,
    eliminar:(id:number)=>void,
    resetear:()=>void,
    contador:number
    message:string|null,
    type:"success" | "error" | 'info'
}
export const ParticipantesContext= createContext<ContextType |undefined> (undefined)

export const ParticipantesProvider=({children}:{children:ReactNode})=>{
    const [cargando, setCargando] = useState(true);
    const [participantes,dispatch]=useReducer(participantesReducer,[])
    const {message,type,notify}=useNotification()
    const api_url="http://localhost:8000/participantes"
    let contador=participantes.length
    const [participanteSeleccionado,setParticipanteSeleccionado]=useState<Participante|null>(null)
    const agregarParticipante=async (nuevoParticipante:Participante)=>{
     const token = localStorage.getItem("token")
      try{
      const respuesta= await fetch(api_url,{
        method:"POST",
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify(nuevoParticipante)
    })
    if (respuesta.ok){
      const guardado=await respuesta.json()
      notify("¡Participante agregado con éxito!", "success")
      dispatch({type:"AGREGAR",payload:guardado})
    }
      if (respuesta.status === 403) {
        notify("No tienes permisos de administrador para esta acción.", "error");
        return;
      }
    }  catch(error){
      console.error("Error al agregar participante:",error)
    }
  }
    useEffect(()=>{
        setCargando(true);
        fetch(api_url)
        .then(res=>res.json())
        .then(data=>{dispatch({type:"GET_PARTICIPANTES",payload:data})})
        .finally(()=> setCargando(false));
      },[])
      const eliminarParticipante=async(id:number)=>{
        const token = localStorage.getItem("token")
        try{
        const respuesta = await fetch(`${api_url}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
         if (respuesta.ok){
           notify("¡Participante eliminado con éxito!", "success")
           dispatch({type:"ELIMINAR",payload:id}) 
      }
    }catch(error){
      console.error("Error al eliminar participante:",error)
    }
  }
      const reseteardatos=async()=>{
      const token = localStorage.getItem("token")
       const respuesta= await fetch(api_url,{
        method:"DELETE",
        headers:{
          "Authorization": `Bearer ${token}`
        }
       })
       if (respuesta.ok){
        dispatch({type:"RESET"})
      }
      if (respuesta.status === 403) {
      notify("No tienes permisos de administrador para esta acción.", "error");
      return;
    }
    }
    const actualizarparticipante=async(participante:Participante)=>{
      const token = localStorage.getItem("token")
      try{
         const respuesta= await fetch(`${api_url}/${participante.id}`,{
          method:"PUT",
          headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type":"application/json"
        },
          body: JSON.stringify(participante)
         })
         if (respuesta.ok){
          dispatch({type:"EDITAR",payload:participante})
          setParticipanteSeleccionado(null)
         }
         if (respuesta.status === 403) {
          notify("No tienes permisos de administrador para esta acción.", "error");
          return;
        }
      }catch(error){
        console.error(error)
      }
    }
   return(
        <ParticipantesContext.Provider value={{
         participante:participantes,
         participanteSeleccionado:participanteSeleccionado,
         setParticipanteSeleccionado:setParticipanteSeleccionado,
         actualizar:actualizarparticipante,
         cargando:cargando,
         agregar:agregarParticipante,
         eliminar:eliminarParticipante,
         resetear:reseteardatos,
         contador:contador,
         message:message,
         type:type

     }}>
        {children}
     </ParticipantesContext.Provider>
    )

}
