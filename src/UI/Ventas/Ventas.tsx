import React, { useState, useEffect } from "react";
import { VentasService } from "../../Services/VentasService";
import { FormasService } from "../../Services/FormasService";
import { FormasArticulo } from "../../Models/FormasArticulos";
import { VentasArticulo } from "../../Models/VentasArticulos";
import Ventas from "../Ventas/VentasComponent";
import Formas from "../Ventas/FormasComponent";
import Navbar from "../UIComponents/navbar";

function VentasUI() {
  const [sales, setSales] = useState<VentasArticulo[]>([]);
  const [formas, setFormas] = useState<FormasArticulos[]>([]);
  
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const ventasService = new VentasService();
  const formasService = new FormasService();

  const buscar = (dates: DateObject[]) => {
    console.log("Fechas seleccionadas:", dates);
    setSales([]);
    setFormas([]);
    setSelectedDates(dates);

    if (dates.length !== 2) {
      console.error("Selecciona un rango de fechas válido");
      return;
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    // Obtener datos de ventas
    ventasService.obtenerVentasArticulosPorFechas(startDate, endDate).then(setSales);
    formasService.obtenerFormasArticulosPorFechas(startDate, endDate).then(setFormas);
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
      {/* Secciones de Ventas*/}
      <Ventas selectedDates={selectedDates} sales={sales} />
      <Formas selectedDates={selectedDates} formas={formas} />

    </div>
  );
}

export default VentasUI;
