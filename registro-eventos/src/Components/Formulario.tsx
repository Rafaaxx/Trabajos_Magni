import { Participante } from "../Models/Participante";
import { useState, useEffect, useRef, useId } from "react";
import { useContext } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";
import { useForm } from "../hooks/useForm";
export const Formulario=({onSuccess}:any)=>{
    const context=useContext(ParticipantesContext)
    if(!context) return null //nuevo tp 4
    const nombreRef=useRef<HTMLInputElement>(null)
    useEffect(()=>{
      nombreRef.current?.focus()
    },[])
 const {formData, setFormData, handleChange, resetForm}= useForm<Omit<Participante, "id">>({
      nombre: '',
      email: '',
      edad: 0,
      pais: 'Argentina',
      modalidad: 'Presencial',
      tecnologias: [],
      nivel: 'Principiante',
      aceptaTerminos: false
    })
    
  const handleCheckboxChange=(tec:string)=>{
    const {tecnologias}=formData;
    if (tecnologias.includes(tec)){
      setFormData({
        ...formData,
        tecnologias:tecnologias.filter((t)=>t!==tec)
      });
    }else{
      setFormData({
        ...formData,
        tecnologias:[...tecnologias,tec]
      });
    }
  };
  
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()

    if (!formData.aceptaTerminos){
      alert("Debe aceptar los términos y condiciones.")
      return
    }
  

    //onAgregar(nuevoParticipante) 
    if(!context.participanteSeleccionado){
    const nuevoParticipante=new Participante(
    formData.nombre,
    formData.email,
    formData.edad,
    formData.pais,
    formData.modalidad as any, //para evitar errores de string 
    formData.tecnologias,
    formData.nivel as any,
    formData.aceptaTerminos
  );
    context.agregar(nuevoParticipante) //nuevo tp 4
    }
    else{
      const participanteActualizado={
        ...formData,
        id:context.participanteSeleccionado.id
      } as Participante   
      context.actualizar(participanteActualizado)
    }
    resetForm()
    onSuccess()
  }
  useEffect(()=>{
     if (context.participanteSeleccionado){
      setFormData({
        nombre: context.participanteSeleccionado.nombre,
        email: context.participanteSeleccionado.email,
        edad: context.participanteSeleccionado.edad,
        pais: context.participanteSeleccionado.pais,
        modalidad: context.participanteSeleccionado.modalidad,
        tecnologias: context.participanteSeleccionado.tecnologias,
        nivel: context.participanteSeleccionado.nivel,
        aceptaTerminos: context.participanteSeleccionado.aceptaTerminos
      })
     }else{
      resetForm()
     }
  },[context.participanteSeleccionado])
  const nombreId=useId()
  const emailId=useId()
  const edadId=useId()
  const paisId=useId()
  const modalidadId=useId()
  const tecnologiasId=useId()
  const nivelId=useId()
  const terminosId=useId()
return(
<div > 
         <h1 className=' bg-blue-500 p-4 text-3xl font-bold text-center mb-6'>Registro de participantes</h1>
         <h3 className='font-bold text-xl my-5'>Participantes registrados: {context.contador}</h3>
         <form onSubmit={handleSubmit} className='shadow-md' >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor={nombreId}>Nombre:</label>
            <input type="text" className="my-3 mx-2 border p-2 rounded" name='nombre' ref={nombreRef} id={nombreId} value={formData.nombre} placeholder='Nombre' onChange={handleChange} required /> 
          </div>
          <div>
            <label htmlFor={emailId}>Email:</label>
            <input type="email" className="my-3 mx-2 border p-2 rounded" name='email' id={emailId} value={formData.email} placeholder='Email' onChange={handleChange} required /> 
          </div>
          <div>
            <label htmlFor={edadId}>Edad:</label>
            <input type="number" className="my-3 mx-2 border p-2 rounded" name='edad' id={edadId} value={formData.edad}  placeholder='Edad'onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor={paisId}>País:</label>
            <select name="pais" className="border p-1 text-sm rounded" id={paisId} value={formData.pais} onChange={handleChange}>
              <option value="Argentina">Argentina</option>
              <option value="Chile">Chile</option>
              <option value="Uruguay">Uruguay</option>
              <option value="México">México</option>
              <option value="España">España</option>
            </select> 
          </div>
          </div>
          <p className='font-bold'>Modalidad</p>
          <div className='flex gap-4'>
          <label htmlFor={modalidadId + "-presencial"}><input className="my-3 mx-2" type="radio"  id={modalidadId + "-presencial"} name='modalidad' value="Presencial" checked={formData.modalidad==="Presencial"} onChange={handleChange} />Presencial</label>
          <label htmlFor={modalidadId + "-virtual"}><input className="my-3 mx-2" type="radio"  id={modalidadId + "-virtual"} name='modalidad' value="Virtual" checked={formData.modalidad==="Virtual"} onChange={handleChange} />Virtual</label>
          <label htmlFor={modalidadId + "-hibrido"}><input className="my-3 mx-2" type="radio"  id={modalidadId + "-hibrido"} name='modalidad' value="Hibrido" checked={formData.modalidad==="Hibrido"} onChange={handleChange} />Hibrido</label>
          </div>
          <p className="my-3 mx-2 font-bold">Tecnologias conocidas:</p>
          <div className='grid grid-cols-2 md:grid-cols-3'>
            {["React", "Node", "Angular", "Vue", "Java", "Python"].map((tec) => (
             <label key={tec} htmlFor={tecnologiasId + "-" + tec}><input type="checkbox" className="" id={tecnologiasId+"-"+tec}checked={formData.tecnologias.includes(tec)} onChange={() => handleCheckboxChange(tec)} />{tec}</label>
             ))}
          </div>
          <div className="my-3 mx-2">
            <label htmlFor={nivelId} className="my-3 mx-2 font-bold ">Nivel</label>
            <select name="nivel"  className="border rounded px-6 py-2" id={nivelId} value={formData.nivel} onChange={handleChange}>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select> 
          </div>
          <label htmlFor={terminosId}> <input type="checkbox" className="my-3 mx-2"  name="aceptaTerminos" id={terminosId} checked={formData.aceptaTerminos} onChange={(e)=> setFormData({...formData,aceptaTerminos:e.target.checked})}/>Acepto los términos y condiciones del evento</label>
          <div className='mt-4'>
         <button type='submit' className='bg-blue-600 rounded text-white md:col-span-3 py-2 px-4 hover:bg-blue-700'>{context.participanteSeleccionado ? "Guardar Cambios" : "Registrar"}</button>
         </div>
         </form>
      </div>
)
}