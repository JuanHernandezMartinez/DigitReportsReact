import { useState } from "react";
import { VentasService } from "../../Services/VentasService";
import { FormasService } from "../../Services/FormasService";
import { FormasArticulo } from "../../Models/FormasArticulos";
import { VentasArticulo } from "../../Models/VentasArticulos";
import Ventas from "../Ventas/VentasComponent";
import Formas from "../Ventas/FormasComponent";
import Navbar from "../UIComponents/Navbar";
import DateObject from "react-date-object";
import toast, { Toaster } from "react-hot-toast";

function VentasUI() {
  const [sales, setSales] = useState<VentasArticulo[]>([]);
  const [formas, setFormas] = useState<FormasArticulo[]>([]);

  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const ventasService = new VentasService();
  const formasService = new FormasService();

  const buscar = async (dates: DateObject[]) => {
    console.log("Fechas seleccionadas:", dates);
    setSales([]);
    setFormas([]);
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
    const dataBase = "GRANILLO";

    try {
      const ventasData = await ventasService.obtenerVentasArticulosPorFechas(
        dataBase,
        startDate,
        endDate
      );
      setSales(ventasData);

      const formasData = await formasService.obtenerFormasArticulosPorFechas(
        dataBase,
        startDate,
        endDate
      );
      setFormas(formasData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  return (
    <div className="fondo p-4 space-y-4">
      <Navbar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        buscar={buscar}
      />
      {/* Secciones de Ventas*/}
      <Ventas sales={sales} />
      <Formas formas={formas} />
      <Toaster />
    </div>
  );
}

export default VentasUI;
