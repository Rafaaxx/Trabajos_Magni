
import { createContext, useEffect, useState, type ReactNode } from "react";
import { Participante } from "../Models/Participante";

interface ContextType{
    participante:Participante[],
    agregar: (p:Participante)=>void,
    eliminar:(id:number)=>void,
    resetear:()=>void,
    contador:number
}
export const ParticipantesContext= createContext<ContextType |undefined> (undefined)

export const ParticipantesProvider=({children}:{children:ReactNode})=>{
    const [participantes,setParticipantes]=useState<Participante[]>([])
    const api_url="http://localhost:8000/participantes"
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
      setParticipantes((prev)=>[...prev,guardado])
    }
    }  catch(error){
      console.error("Error al agregar participante:",error)
    }
  }
    useEffect(()=>{
        fetch(api_url)
        .then(res=>res.json())
        .then(data=>setParticipantes(data))
      },[])
      const eliminarParticipante=async(id:number)=>{
        try{
        const respuesta= await fetch(`${api_url}/${id}`,{
          method:"DELETE"
         })
         if (respuesta.ok){
         setParticipantes((prev)=>prev.filter(p=>p.id!==id)) 
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
        setParticipantes([])
      }
    }
     let contador=participantes.length
   return(
        <ParticipantesContext.Provider value={{
         participante:participantes,
         agregar:agregarParticipante,
         eliminar:eliminarParticipante,
         resetear:reseteardatos,
         contador:contador

     }}>
        {children}
     </ParticipantesContext.Provider>
    )

}
