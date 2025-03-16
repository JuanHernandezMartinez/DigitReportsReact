import { useState, useEffect } from "react";
import { VentasService } from "../../Services/VentasService";
import { FormasService } from "../../Services/FormasService";
import { FormasArticulo } from "../../Models/FormasArticulos";
import { VentasArticulo } from "../../Models/VentasArticulos";
import Ventas from "../Ventas/VentasComponent";
import Formas from "../Ventas/FormasComponent";
import { ClientesService } from "../../Services/ClientesService";
import { ClientesArticulo } from "../../Models/ClientesArticulos";
import Clientes from "../Clientes/ClientesComponent";
import { BancosService } from "../../Services/BancosService";
import { BancosArticulo } from "../../Models/BancosArticulos";
import Bancos from "../Bancos/BancosComponent";
import Navbar from "../UIComponents/Navbar";
import DateObject from "react-date-object";
import toast, { Toaster } from "react-hot-toast";



function Tablas() {
  const [sales, setSales] = useState<VentasArticulo[]>([]);
  const [formas, setFormas] = useState<FormasArticulo[]>([]);

  const [clients, setClients] = useState<ClientesArticulo[]>([]);

  const [banks, setBanks] = useState<BancosArticulo[]>([]);

  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const ventasService = new VentasService();
  const formasService = new FormasService();
  const clientesService = new ClientesService();
  const bancosService = new BancosService();

  const buscar = async (dates: DateObject[], selectedDataBase: string) => {
    console.log("Fechas seleccionadas:", dates);
    console.log("Base de datos seleccionada:", selectedDataBase);
    setSales([]);
    setFormas([]);
    setClients([]);
    setBanks([]);
    setSelectedDates(dates);

    if (dates.length !== 2) {
      console.error("Selecciona un rango de fechas válido");
      toast.error("Selecciona un rango de fechas válido.")
      return;
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");


    try {
    // Obtener datos de ventas
      const ventasData = await ventasService.obtenerVentasArticulosPorFechas(selectedDataBase, startDate, endDate);
      setSales(ventasData);
      const formasData = await formasService.obtenerFormasArticulosPorFechas(selectedDataBase, startDate, endDate);
      setFormas(formasData);
    // Obtener datos de clientes
      const clientesData = await clientesService.obtenerClientesArticulosPorFechas(selectedDataBase, startDate, endDate);
      setClients(clientesData);
    // Obtener datos de bancos
      const bancosData = await bancosService.obtenerBancosArticulosPorFechas(selectedDataBase, startDate, endDate);
      setBanks(bancosData);



    } catch (error) {
      console.error("Error al obtener datos:", error);
      toast.error("Error Al Obtener Los Datos.")
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-emerald-800 p-4 space-y-4">
            <Navbar selectedDates={selectedDates} setSelectedDates={setSelectedDates} buscar={buscar} currentTime={currentTime} />
      {/* Secciones de Ventas, Clientes y Bancos */}
      <Ventas selectedDates={selectedDates} sales={sales} />
      <Formas selectedDates={selectedDates} formas={formas} />
      <Clientes selectedDates={selectedDates} clients={clients} />
      <Bancos selectedDates={selectedDates} banks={banks} />
      
      <Toaster />
    </div>

    
  );
}

export default Tablas;
