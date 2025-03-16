import React, { useEffect, useState } from "react";
import { Button } from "./button";
import DatePicker, { DateObject } from "react-multi-date-picker";
import logo from "../../assets/165 x 645.png";
import { useNavigate } from "react-router-dom";
import { EmpresaService } from "../../Services/EmpresaService";
import { Empresa } from "../../Models/Empresa";

interface NavbarProps {
  selectedDates: DateObject[];
  setSelectedDates: (dates: DateObject[]) => void;
  buscar: (dates: DateObject[], dataBase: string) => void;
  currentTime: string;
}

const Navbar: React.FC<NavbarProps> = ({
  selectedDates,
  setSelectedDates,
  buscar,
  currentTime,
}) => {
  const empresaService = new EmpresaService();
  const navigate = useNavigate();
  const [dataBase, setDataBase] = useState<string>("GRANILLO");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  async function selectEmpresa(empresa: string) {
    setDataBase(empresa);
  }

  useEffect(() => {
    async function consultarEmpresas() {
      let response = await empresaService.consultarEmpresas();
      console.log("Empresas encontradas: ", response);
      setEmpresas(response);
    }
    consultarEmpresas();
  }, []);

  const ArrowLeftIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col md:flex-row justify-between items-stretch gap-4 shadow-lg">
      <div className="flex items-center space-x-6.5">
        {/* LOGO */}
        <div className="w-32 h-8 bg-white/20 rounded-lg">
          <img
            src={logo}
            alt="Digitreports"
            className="w-full h-full object-contain"
          />
        </div>

        {/* MENU DESPLEGABLE BASE DE DATOS */}
        <div>
          <select
            value={dataBase}
            onChange={(e) => selectEmpresa(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {empresas.map((e) => (
              <option
                key={e.id}
                value={e.nombre}
                className="text-black bg-gray-200 hover:bg-gray-300"
              >
                {e.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* DATE PICKER */}
        <DatePicker
          value={selectedDates}
          onChange={(dates: DateObject[]) => buscar(dates, dataBase)}
          range
          sort
          format="YYYY/MM/DD"
          weekDays={["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]}
          months={[
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ]}
          calendarPosition="bottom-center"
          showOtherDays
          portal
          placeholder="📆 Seleccione Una Fecha "
          inputClass="text-lg h-10 px-4 bg-white/20 text-white placeholder-white border border-white/30 rounded-lg"
          containerClassName="w-full sm:w-60"
        />

        {/* BOTÓN RECARGAR */}
        <Button
          onClick={() => buscar(selectedDates, dataBase)}
          className="bg-white/10 border text-white"
        >
          Recargar
        </Button>

        {/* BOTÓN GENERAR REPORTE */}
        <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white">
          Generar Reporte
        </Button>
      </div>

      {/* BOTÓN VOLVER */}
      <Button
        onClick={() => navigate(-1)}
        className="bg-white/10 hover:bg-white/20 border border-white/30 text-white flex items-center justify-center space-x-2"
      >
        <ArrowLeftIcon />
        <span>Volver</span>
      </Button>
    </div>
  );
};

export default Navbar;
