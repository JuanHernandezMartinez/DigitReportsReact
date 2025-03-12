
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './UI/Home/Home'
import Login from './UI/Login/Login'
import Clientes from './UI/Clientes/Clientes'
import Bancos from './UI/Bancos/Bancos'
import Tablas from './UI/Tablas/Tablas'
import Ventas from './UI/Ventas/Ventas'
import ProtectedRoute from "./components/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/home" element={<Home />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/bancos" element={<Bancos />} />
      <Route path="/Tablas" element={<Tablas />} />
      </Route>

      <Route path="/*" element={<Navigate to="/" />} />

    </Routes>
    <Toaster />
  </Router>

  )
}

export default App