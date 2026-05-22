import { useState } from "react"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago("APP_USR-16a4f979-d41b-484d-91e7-dbfb3371d74b",{locale:"es-AR"})
export default function CursosPage() {
   const [cargando,setCargando]=useState(false)
   const [preferenceId, setPreferenceId] = useState(null);
   const cursos = [
    { titulo: "Curso React", precio: 10000, color: "bg-blue-500" },
    { titulo: "Curso Node", precio: 8000, color: "bg-green-500" },
    { titulo: "Curso Angular", precio: 9000, color: "bg-red-500" },
    { titulo: "Curso Vue", precio: 7000, color: "bg-yellow-500" },
    { titulo: "Curso Java", precio: 12000, color: "bg-purple-500" },
    { titulo: "Curso Python", precio: 11000, color: "bg-pink-500" },
  ];
   const comprarCurso= async(curso:{titulo:string,precio:number})=>{
      setCargando(true)
      try{
        const response= await fetch("https://epic-earpiece-arise.ngrok-free.dev/payment/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            titulo: curso.titulo,
            precio: curso.precio
          })
        });
        const data = await response.json();
        if (data.id){
          setPreferenceId(data.id);
        }
      } catch (error) {
        console.error("Error al crear la preferencia de pago:", error);
      } finally {
        setCargando(false);
      }
   }

    return (
    <div>
      <h1 className="flex justify-center items-center text-4xl mt-6 font-bold mb-4">Cursos Disponibles</h1>
      <div className="p-6 max-w-md mx-auto">
      {cursos.map((curso) => (
        <button key={curso.titulo} disabled={cargando} onClick={() => comprarCurso(curso)} className={`${curso.color} text-white px-4 py-2 rounded mb-2 w-full`}>
          {cargando ? "Redirigiendo...": `${curso.titulo} - $${curso.precio}`}
        </button>
      ))}
      {preferenceId &&(
        <Wallet initialization={{ preferenceId }} />
      )}
    </div>
    </div>
  )
}
