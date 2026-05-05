import { Participante } from "../Models/Participante";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ParticipantesContext } from "../context/ParticipantesContext";
export const Formulario=({onSuccess}:any)=>{
    const context=useContext(ParticipantesContext)
    if(!context) return null //nuevo tp 4
  const [formData,setFormData]=useState<Omit<Participante, 'id'>>({
        nombre: '',
        email: '',
        edad: 0,
        pais: 'Argentina', 
        modalidad: 'Presencial', 
        tecnologias: [],
        nivel: 'Principiante', 
        aceptaTerminos: false
      })
    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const {name,value,type}=e.target;
    setFormData({
      ...formData,
      [name]:type==="number" ? Number(value) : value
    });
  };
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
    setFormData({
    nombre: '',
    email: '',
    edad: 0,
    pais: 'Argentina',
    modalidad: 'Presencial',
    tecnologias: [],
    nivel: 'Principiante',
    aceptaTerminos: false
    })
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
      setFormData({
        nombre: '',
        email: '',
        edad: 0,
        pais: 'Argentina',
        modalidad: 'Presencial',
        tecnologias: [],
        nivel: 'Principiante',
        aceptaTerminos: false
      })
     }
  },[context.participanteSeleccionado])
return(
<div > 
         <h1 className=' bg-blue-500 p-4 text-3xl font-bold text-center mb-6'>Registro de participantes</h1>
         <h3 className='font-bold text-xl my-5'>Participantes registrados: {context.contador}</h3>
         <form onSubmit={handleSubmit} className='shadow-md' >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input type="text" className="my-3 mx-2 border p-2 rounded" name='nombre' value={formData.nombre} placeholder='Nombre' onChange={handleChange} required /> 
          <input type="email" className="my-3 mx-2 border p-2 rounded" name='email' value={formData.email} placeholder='Email' onChange={handleChange} required /> 
          <input type="number" className="my-3 mx-2 border p-2 rounded" name='edad' value={formData.edad}  placeholder='Edad'onChange={handleChange} required />
          <select name="pais" className="border p-1 text-sm rounded" value={formData.pais} onChange={handleChange}>
            <option value="Argentina">Argentina</option>
            <option value="Chile">Chile</option>
            <option value="Uruguay">Uruguay</option>
            <option value="México">México</option>
            <option value="España">España</option>
          </select> 
          </div>
          <p className='font-bold'>Modalidad</p>
          <div className='flex gap-4'>
          <label><input className="my-3 mx-2" type="radio" name='modalidad' value="Presencial" checked={formData.modalidad==="Presencial"} onChange={handleChange} />Presencial</label>
          <label><input className="my-3 mx-2" type="radio" name='modalidad' value="Virtual" checked={formData.modalidad==="Virtual"} onChange={handleChange} />Virtual</label>
          <label><input className="my-3 mx-2" type="radio" name='modalidad' value="Hibrido" checked={formData.modalidad==="Hibrido"} onChange={handleChange} />Hibrido</label>
          </div>
          <p className="my-3 mx-2 font-bold">Tecnologias conocidas:</p>
          <div className='grid grid-cols-2 md:grid-cols-3'>
            {["React", "Node", "Angular", "Vue", "Java", "Python"].map((tec) => (
             <label key={tec}><input type="checkbox" className="" checked={formData.tecnologias.includes(tec)} onChange={() => handleCheckboxChange(tec)} />{tec}</label>
             ))}
          </div>
          <div className="my-3 mx-2">
            <p className="my-3 mx-2 font-bold ">Nivel</p>
            <select name="nivel"  className="border rounded px-6 py-2" value={formData.nivel} onChange={handleChange}>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select> 
          </div>
          <label> <input type="checkbox" className="my-3 mx-2"  name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={(e)=> setFormData({...formData,aceptaTerminos:e.target.checked})}/>Acepto los términos y condiciones del evento</label>
          <div className='mt-4'>
         <button type='submit' className='bg-blue-600 rounded text-white md:col-span-3 py-2 px-4 hover:bg-blue-700'>{context.participanteSeleccionado ? "Guardar Cambios" : "Registrar"}</button>
         </div>
         </form>
      </div>
)
}