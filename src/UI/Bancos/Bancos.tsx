import { useState, useEffect } from "react";
import { BancosService } from "../../Services/BancosService";
import { BancosArticulo } from "../../Models/BancosArticulos";
import Bancos from "../Bancos/BancosComponent";
import Navbar from "../UIComponents/Navbar";
import DateObject from "react-date-object";
import toast, { Toaster } from "react-hot-toast";


function BancosUI() {
  const [banks, setBanks] = useState<BancosArticulo[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const bancosService = new BancosService();

  const buscar = async (dates: DateObject[], selectedDataBase: string) => {
    console.log("Fechas seleccionadas:", dates);
    console.log("Base de datos seleccionada:", selectedDataBase);
    setBanks([]);
    setSelectedDates(dates);

    if (dates.length !== 2) {
      console.error("Selecciona un rango de fechas válido");
      toast.error("Selecciona un rango de fechas válido.")
      return;
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    // Obtener datos de bancos
  try {
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
      <Navbar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        buscar={buscar}
        currentTime={currentTime}
      />
      {/* Seccion de Bancos */}
      <Bancos banks={banks} />
            <Toaster />
      
    </div>
  );
}

export default BancosUI;
