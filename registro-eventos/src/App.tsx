import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import FormularioPage from "./pages/FormularioPage"
import EditarPage from "./pages/EditarPage"
import ListaPage from "./pages/ListaPage"
import Navbar from "./Components/Navbar"

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/nuevo" element={<FormularioPage/>}/>
      <Route path="/editar/:id" element={<EditarPage/>}/>
      <Route path="/lista" element={<ListaPage/>}/>
    </Routes>
    </>
  )
}

export default App
