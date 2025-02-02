
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './UI/Home/Home'
import Login from './UI/Login/Login'
import Clientes from './UI/Clientes/Clientes'
import Bancos from './UI/Bancos/Bancos'
import Tablas from './UI/Tablas/Tablas'
import Ventas from './UI/Ventas/Ventas'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/bancos" element={<Bancos />} />
      <Route path="/Tablas" element={<Tablas />} />

    </Routes>
  </BrowserRouter>

  )
}

export default App