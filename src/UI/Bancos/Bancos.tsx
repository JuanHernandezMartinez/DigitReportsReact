import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./TablasComponents/card";
import { BancosService } from "../../Services/BancosService";
import { BancosArticulo } from "../../Models/BancosArticulos";
import Bancos from "../Bancos/BancosComponent";
import Navbar from "../UIComponents/navbar";

function BancosUI() {
  const [banks, setBanks] = useState<BancosArticulo[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const bancosService = new BancosService();

  const buscar = (dates: DateObject[]) => {
    console.log("Fechas seleccionadas:", dates);
    setBanks([]);
    setSelectedDates(dates);

    if (dates.length !== 2) {
      console.error("Selecciona un rango de fechas válido");
      return;
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    // Obtener datos de bancos
    bancosService.obtenerBancosArticulosPorFechas(startDate, endDate).then(setBanks);
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
      {/* Seccion de Bancos */}
      <Bancos selectedDates={selectedDates} banks={banks} />
      

    </div>
  );
}

export default BancosUI;
