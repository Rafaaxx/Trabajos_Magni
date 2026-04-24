import { createContext, useEffect, useReducer, useState, type ReactNode } from "react";
import { Participante } from "../Models/Participante";
import { participantesReducer } from "../reducers/participantesReducer";
interface ContextType{
    participante:Participante[],
    participanteSeleccionado:Participante|null,
    setParticipanteSeleccionado:(p:Participante|null)=>void,
    actualizar:(p:Participante)=>void,
    agregar: (p:Participante)=>void,
    eliminar:(id:number)=>void,
    resetear:()=>void,
    contador:number
}
export const ParticipantesContext= createContext<ContextType |undefined> (undefined)

export const ParticipantesProvider=({children}:{children:ReactNode})=>{
    const [participantes,dispatch]=useReducer(participantesReducer,[])
    const api_url="http://localhost:8000/participantes"
    let contador=participantes.length
    const [participanteSeleccionado,setParticipanteSeleccionado]=useState<Participante|null>(null)
    const agregarParticipante=async (nuevoParticipante:Participante)=>{
     try{
      const respuesta= await fetch(api_url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(nuevoParticipante)
    })
    if (respuesta.ok){
      const guardado=await respuesta.json()
      dispatch({type:"AGREGAR",payload:guardado})
    }
    }  catch(error){
      console.error("Error al agregar participante:",error)
    }
  }
    useEffect(()=>{
        fetch(api_url)
        .then(res=>res.json())
        .then(data=>{dispatch({type:"GET_PARTICIPANTES",payload:data})})
      },[])
      const eliminarParticipante=async(id:number)=>{
        try{
        const respuesta= await fetch(`${api_url}/${id}`,{
          method:"DELETE"
         })
         if (respuesta.ok){
         dispatch({type:"ELIMINAR",payload:id}) 
      }
    }catch(error){
      console.error("Error al eliminar participante:",error)
    }
  }
      const reseteardatos=async()=>{
       const respuesta= await fetch(api_url,{
        method:"DELETE"
       })
       if (respuesta.ok){
        dispatch({type:"RESET"})
      }
    }
    const actualizarparticipante=async(participante:Participante)=>{
      try{
         const respuesta= await fetch(`${api_url}/${participante.id}`,{
          method:"PUT",
          headers:{
          "Content-Type":"application/json"
        },
          body: JSON.stringify(participante)
         })
         if (respuesta.ok){
          dispatch({type:"EDITAR",payload:participante})
          setParticipanteSeleccionado(null)
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
         agregar:agregarParticipante,
         eliminar:eliminarParticipante,
         resetear:reseteardatos,
         contador:contador

     }}>
        {children}
     </ParticipantesContext.Provider>
    )

}
