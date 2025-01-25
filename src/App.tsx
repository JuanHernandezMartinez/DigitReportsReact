
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './UI/Home/Home'
import Login from './UI/Login/Login'
import Clientes from './UI/Clientes/Clientes'
import Bancos from './UI/Bancos/Bancos'
import VentasComponent from './UI/Ventas/VentasComponent'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/ventas" element={<VentasComponent />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/bancos" element={<Bancos />} />

    </Routes>
  </BrowserRouter>

  )
}

export default App