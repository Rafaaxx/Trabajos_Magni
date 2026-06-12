import { useSearchParams } from "react-router-dom"

export default function PagoExitosoPage() {
  const [searchParams]=useSearchParams()
  const curso=searchParams.get("external_reference")
  return (
    <div className="flex justify-center mt-10 items-center p-4 border rounded shadow-lg border-green-500 bg-green-100">
        <h1 className="text-2xl font-bold mb-4 text-green-500">Pago Exitoso! ya te inscribiste a "{curso}".</h1>
    </div>
  )
}
