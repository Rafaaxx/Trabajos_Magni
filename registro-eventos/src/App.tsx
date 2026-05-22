import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
interface Participante{
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: "Presencial" | "Virtual" | "Hibrido";
  tecnologias: string[];
  nivel: "Principiante"|"Intermedio"| "Avanzado";
  aceptaTerminos: boolean;
}
function App() {
  const [participantes,setParticipantes]=useState<Participante[]>(()=>{
    const guardados=localStorage.getItem("participantes")
    return guardados ? JSON.parse(guardados):[]
  })
  const [filtroModalidad,setFiltroModalidad]=useState("Todas")
  const [filtroNivel,setFiltroNivel]=useState("Todos")
  const [filtroNombre,setFiltroNombre]=useState("")
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
    const nuevoParticipante:Participante={
      ...formData,
      id: Date.now()
    }
    setParticipantes([...participantes,nuevoParticipante])
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
      <div className='contenedor_registro'> 
         <h1 className=' bg-green-600 p-4 text-3xl font-bold text-center mb-6'>Registro de participantes</h1>
         <h3 className='font-bold text-xl my-5'>Participantes registrados: {participantes.length}</h3>
         <form onSubmit={handleSubmit} className='' >
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
         <button type='submit' className='bg-blue-600 rounded text-white md:col-span-3 py-2 px-4 hover:bg-blue-700'>Registrar</button>
         </div>
         </form>
      </div>
      <h1 className='font-bold text-2xl text-center my-10'>Búsqueda</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5'> 
         <div className='filtro-nombre'>
           <input type="text" className="border rounded py-2 px-6"  name="nombre" value={filtroNombre} onChange={(e)=>setFiltroNombre(e.target.value)} placeholder='Buscar por nombre' />
         </div>
         <div className='filtro-modalidad'>
          <label>Modalidad: </label>
          <select className="border rounded py-2 px-6"  value={filtroModalidad} onChange={(e)=>setFiltroModalidad(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Hibrido">Híbrido</option>
          </select>
         </div>
         <div className='filtro-nivel'>
          <label>Nivel: </label>
          <select value={filtroNivel} className="border rounded py-2 px-6" onChange={(e)=>setFiltroNivel(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          </div>
         </div>
         <h2 className='font-bold text-center text-2xl my-8'>Resultados</h2>
         <div className='lista-participantes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {participantes.length===0?(
            <p>Aun no hay participantes registrados</p>
          ):(
            filtrarParticipantes.map((p)=>{
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
                <button className="bg-red-600 text-white rounded mt-3 py-2 px-3" onClick={()=>eliminarParticipante(p.id)}>Eliminar</button>
              </div>
            )})
          )
        }
         </div>
      </div>
    </>
  )
}

export default App
