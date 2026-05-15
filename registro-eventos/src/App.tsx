import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import FormularioPage from "./pages/FormularioPage"
import EditarPage from "./pages/EditarPage"
import ListaPage from "./pages/ListaPage"
import Navbar from "./Components/Navbar"
import LoginPage from "./pages/LoginPage"
import PublicaPage from "./pages/PublicaPage"
import PrivateRoute from "./routes/PrivateRoute"
import { useContext } from "react"
import { ParticipantesContext } from "./context/ParticipantesContext"

function App() {
  const context=useContext(ParticipantesContext)
  return (
    <>
    {context?.message&&(
    <div className={`fixed top-5 right-5 p-4 rounded shadow-2xl text-white font-bold z-[9999] transition-all animate-bounce ${
      context.type==="success"?"bg-green-500":
      context.type==="error"?"bg-red-500":
      "bg-blue-500"
    }`}>
      {context.message}
    </div>
  )}
    <Routes>
      <Route path="/" element={<PrivateRoute><Navbar /><Home/></PrivateRoute>}/>
      <Route path="/publica" element={<PublicaPage/>}/>
      <Route path="/nuevo" element={<PrivateRoute rol="ADMIN"><Navbar /><FormularioPage/></PrivateRoute>}/>
      <Route path="/editar/:id" element={<PrivateRoute rol="ADMIN"><Navbar /><EditarPage/></PrivateRoute>}/>
      <Route path="/lista" element={<PrivateRoute><Navbar /><ListaPage/></PrivateRoute>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </>
  )
}

export default App
