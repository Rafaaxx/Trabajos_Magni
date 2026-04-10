interface FiltrosProps{
  nombre: string;
  modalidad: string;
  nivel: string;
  setNombre: (val: string) => void;
  setModalidad: (val: string) => void;
  setNivel: (val: string) => void;
}
export const Filtros=({nombre, modalidad, nivel, setNombre, setModalidad, setNivel}:FiltrosProps)=>{
return(
 <div className='my-5 flex flex-col w-full md:flex-row flex-wrap justify-center items-center gap-10'> 
         <div className='filtro-nombre flex justify-center'>
           <input type="text" className="border rounded py-2 px-6"  name="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder='Buscar por nombre' />
         </div>
         <div className='filtro-modalidad flex justify-center '>
          <label className="flex items-center">Modalidad: </label>
          <select className="border rounded py-2 px-6"  value={modalidad} onChange={(e)=>setModalidad(e.target.value)}>
            <option value="Todas">Todas</option>
            <option value="Presencial">Presencial</option>
            <option value="Virtual">Virtual</option>
            <option value="Hibrido">Híbrido</option>
          </select>
         </div>
         <div className='filtro-nivel flex justify-center'>
          <label className="flex items-center">Nivel: </label>
          <select value={nivel} className="border rounded py-2 px-6 " onChange={(e)=>setNivel(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          </div>
          <button className="bg-gray-400 font-bold rounded p-2"onClick={()=>{setModalidad("Todas"),setNivel("Todos"),setNombre("")}}>Limpiar filtros</button>
         </div>
)}