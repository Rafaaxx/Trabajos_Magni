import { useState } from "react"

export  function useNotification() {
  const [message,setMessage]=useState<string | null>(null)
  const [type,setType]=useState<"success" | "error" | 'info'>('info')
  const notify=(msg:string,notificationType:"success" | "error" | 'info'='info')=>{
    setMessage(msg)
    setType(notificationType)
    setTimeout(()=>{
      setMessage(null)
    },3000)
  }
  return {message,type,notify}
}
