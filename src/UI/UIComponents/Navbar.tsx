import React from "react";
import { Button } from "./button";
import DatePicker, { DateObject } from "react-multi-date-picker";
import logo from "../../assets/165 x 645.png";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  selectedDates: DateObject[];
  setSelectedDates: (dates: DateObject[]) => void;
  buscar: (dates: DateObject[]) => void;
  currentTime: string;
}

const Navbar: React.FC<NavbarProps> = ({ selectedDates, setSelectedDates, buscar, currentTime }) => {
  const navigate = useNavigate();
  const ArrowLeftIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col md:flex-row justify-between items-stretch gap-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-32 h-8 bg-white/20 rounded-lg">
          <img src={logo} alt="Digitreports" className="w-full h-full object-contain" />
        </div>
                    <DatePicker
                    value={selectedDates}
                    onChange={(dates: DateObject[]) => buscar(dates)}
                    range
                    sort
                    format="YYYY/MM/DD"
                    weekDays={["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]}
                    months={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]}
                    calendarPosition="bottom-center"
                    //plugins={[<DatePanel />]}
                    showOtherDays
                    portal
                    placeholder="Seleccione Una Fecha"
                    className="w-full sm:w-40 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/70"
                    />
        <Button onClick={() => buscar(selectedDates)} className="bg-white/10 border text-white">
          Recargar
        </Button>
                        <div>
                            <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white">
                                Generar Reporte
                            </Button>
                        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white/10 px-2 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-white text-sm md:text-base lg:text-lg whitespace-nowrap">
                    Fecha Actual: {currentTime}
                </div>
                </div>
      <Button onClick={() => navigate(-1)} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white flex items-center justify-center space-x-2">
                      <ArrowLeftIcon />
                      <span>Volver</span>
                  </Button>
              </div>
  );
};

export default Navbar;
