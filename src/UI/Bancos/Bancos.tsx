import { useState } from "react";
import { BancosService } from "../../Services/BancosService";
import { BancosArticulo } from "../../Models/BancosArticulos";
import Bancos from "../Bancos/BancosComponent";
import Navbar from "../UIComponents/Navbar";
import DateObject from "react-date-object";
import toast, { Toaster } from "react-hot-toast";

function BancosUI() {
  const [banks, setBanks] = useState<BancosArticulo[]>([]);
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const bancosService = new BancosService();

  const buscar = async (dates: DateObject[], selectedDataBase: string) => {
    console.log("Fechas seleccionadas:", dates);
    console.log("Base de datos seleccionada:", selectedDataBase);
    setBanks([]);
    setSelectedDates(dates);

    if (dates.length !== 2) {
      toast("Selecciona la fecha final!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    toast.dismiss();

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    // Obtener datos de bancos
    try {
      const bancosData = await bancosService.obtenerBancosArticulosPorFechas(
        selectedDataBase,
        startDate,
        endDate
      );
      setBanks(bancosData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      toast.error("Error Al Obtener Los Datos.");
    }
  };

  return (
    <div className="fondo p-4 space-y-4">
      <Navbar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        buscar={buscar}
      />
      {/* Seccion de Bancos */}
      <Bancos banks={banks} />
      <Toaster />
    </div>
  );
}

export default BancosUI;
