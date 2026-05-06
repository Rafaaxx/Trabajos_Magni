import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const {login}=useAuth()
  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const handleLogin = async () => {
    try{
     await login(username,password)
     alert("Login exitoso")
     navigate("/")
    }catch(error){
        alert("Error al iniciar sesión, por favor verifica tus credenciales")
        console.error("Error al iniciar sesión:", error)
    }
  }
  return (
    <div className="flex justify-center items-center flex-col gap-10 mt-10">
      <h1 className="flex justify-center items-center lg:text-6xl md:text-4xl sm:text-3xl">Iniciar sesión - Registro de participantes</h1>
      <div className="grid grid-cols-1 gap-3">
      <input type="text" placeholder="Usuario" className="border rounded-full border-gray-600 p-5" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Contraseña" className="border rounded-full border-gray-600 p-5" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button className="border rounded bg-blue-600 text-white p-3 px-7" onClick={handleLogin}>Iniciar sesion</button>
      </div>
    </div>
  )
}
