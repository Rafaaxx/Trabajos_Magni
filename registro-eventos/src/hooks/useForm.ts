import { useState } from 'react'

export function useForm<T>(InitialState:T){ 
    const [formData,setFormData]=useState<T>(InitialState)
    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value, type}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:type==="number" ? Number(value):value,
        }))
    }
    const resetForm=()=>setFormData(InitialState)
  return {formData,setFormData,handleChange,resetForm}
}
