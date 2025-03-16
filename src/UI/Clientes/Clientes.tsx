import { useState, useEffect } from "react";
import { ClientesService } from "../../Services/ClientesService";
import Clientes from "../Clientes/ClientesComponent";
import Navbar from "../UIComponents/Navbar";
import DateObject from "react-date-object";
import toast, { Toaster } from "react-hot-toast";
import { SaldoCliente } from "../../Models/SaldoCliente";


function ClientesUI() {
  const [clients, setClients] = useState<SaldoCliente[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const clientesService = new ClientesService();

  const buscar = async (dates: DateObject[]) => {
    console.log("Fechas seleccionadas:", dates);
    setClients([]);
    setSelectedDates(dates);

    if (dates.length !== 2) {
      
      toast('Selecciona la fecha final!',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      return;
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");
    const dataBase = "GRANILLO";

  try {
    const clientesData = await clientesService.obtenerClientesArticulosPorFechas(dataBase, startDate, endDate);
    setClients(clientesData);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    
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
      <Clientes selectedDates={selectedDates} clients={clients} />
      <Toaster />

    </div>
  );
}

export default ClientesUI;