import "./Tablas.css";
import { useState } from "react";
import { VentasService } from "../../Services/VentasService";
import { FormasService } from "../../Services/FormasService";
import { FormasArticulo } from "../../Models/FormasArticulos";
import { VentasArticulo } from "../../Models/VentasArticulos";
import Ventas from "../Ventas/VentasComponent";
import Formas from "../Ventas/FormasComponent";
import { ClientesService } from "../../Services/ClientesService";
import Clientes from "../Clientes/ClientesComponent";
import { BancosService } from "../../Services/BancosService";
import { BancosArticulo } from "../../Models/BancosArticulos";
import Bancos from "../Bancos/BancosComponent";
import Navbar from "../UIComponents/Navbar";
import DateObject from "react-date-object";
import toast, { Toaster } from "react-hot-toast";
import { SaldoCliente } from "../../Models/SaldoCliente";

function Tablas() {
  const [sales, setSales] = useState<VentasArticulo[]>([]);
  const [formas, setFormas] = useState<FormasArticulo[]>([]);

  const [clients, setClients] = useState<SaldoCliente[]>([]);

  const [banks, setBanks] = useState<BancosArticulo[]>([]);

  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);

  const ventasService = new VentasService();
  const formasService = new FormasService();
  const clientesService = new ClientesService();
  const bancosService = new BancosService();

  const buscar = async (dates: DateObject[], selectedDataBase: string) => {
    setSales([]);
    setFormas([]);
    setClients([]);
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

    try {
      // Obtener datos de ventas
      const ventasData = await ventasService.obtenerVentasArticulosPorFechas(
        selectedDataBase,
        startDate,
        endDate
      );
      setSales(ventasData);
      const formasData = await formasService.obtenerFormasArticulosPorFechas(
        selectedDataBase,
        startDate,
        endDate
      );
      setFormas(formasData);
      // Obtener datos de clientes
      const clientesData =
        await clientesService.obtenerClientesArticulosPorFechas(
          selectedDataBase,
          startDate,
          endDate
        );
      setClients(clientesData);
      // Obtener datos de bancos
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
    <div className="p-4 space-y-4 fondo">
      <Navbar
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        buscar={buscar}
      />
      {/* Secciones de Ventas, Clientes y Bancos */}
      <Ventas sales={sales} />
      <Formas formas={formas} />
      <Clientes clients={clients} />
      <Bancos banks={banks} />

      <Toaster />
    </div>
  );
}

export default Tablas;
