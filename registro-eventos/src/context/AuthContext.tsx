import { createContext, useContext, useEffect, useState } from "react";

type Rol= "ADMIN" | "CONSULTA"
interface User{
    username:string;
    rol:Rol;
}
interface ContextType{
    user:User|null,
    login:(username:string,password:string)=>Promise<void>,
    logout:()=>void
}
export const AuthContext= createContext<ContextType|undefined>(undefined)

export const AuthProvider=({children}:{children:React.ReactNode})=>{
 const [user,setUser]=useState<User|null>(null)
 
 const login=async (username:string,password:string)=>{
    const response= await fetch("http://localhost:8000/usuarios/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
    })
    if (!response.ok){
        throw new Error("El login ha fallado")
    }
    const data= await response.json()
    setUser(data.user)
    localStorage.setItem("token",data.token)
    localStorage.setItem("user",JSON.stringify(data.user))
 }

 const logout=()=>{
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
 }

 useEffect(()=>{
    const usuarioGuardado=localStorage.getItem("user")
    const tokenGuardado=localStorage.getItem("token")
    if (usuarioGuardado && tokenGuardado){
        setUser(JSON.parse(usuarioGuardado))
    }
},[])

    return (
        <AuthContext.Provider value={{
            user:user,
            login:login,
            logout:logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    const context=useContext(AuthContext)
    if (!context){
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context
}