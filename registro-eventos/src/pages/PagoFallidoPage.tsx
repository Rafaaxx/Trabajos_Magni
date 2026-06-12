import { useSearchParams } from "react-router-dom"

export default function PagoFallidoPage() {
  const [searchParams]=useSearchParams()
  const curso=searchParams.get("external_reference")
  return (
    <div className="flex flex-col justify-center mt-10 items-center p-4 border rounded shadow-lg border-red-500 bg-red-100">
        <h1 className=" text-2xl font-bold mb-4 text-red-500">Pago Fallido</h1>
        <h2>Error al procesar el pago de {curso}</h2>
    </div>
  )
}
