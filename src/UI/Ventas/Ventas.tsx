import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../UIComponents/card";
import { Button } from "../UIComponents/button";
//import { Input } from "../UIComponents/input";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/165 x 645.png';
import { VentasService } from "../../Services/VentasService";
import { VentasArticulo } from "../../Models/VentasArticulos";
import { FormasService } from "../../Services/FormasService";
import { FormasArticulos } from "../../Models/FormasArticulos";
import DatePicker, { DateObject } from "react-multi-date-picker";
//import DatePanel from "react-multi-date-picker/plugins/date_panel";

function Ventas(props : {hide:boolean}) {
    const navigate = useNavigate();
    const [sales, setSales] = useState<VentasArticulo[]>([]);
    const [formas, setFormas] = useState<FormasArticulos[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
    const hidden=props.hide ? props.hide:false
    const ventasService = new VentasService();
    const formasService = new FormasService();
    
    const handleBack = () => {
        navigate(-1); // pag anterior
    };

    const ArrowLeftIcon = () => (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    );

    function buscar(dates: DateObject[]) {
        console.log("entro la funcion buscar: ", dates)
        setSales([]);
        setFormas([]);
        setSelectedDates(dates);
        if (dates.length !== 2) {
            console.error("Selecciona un rango de fechas válido");
            return;
        }

        const startDate = dates[0].format("YYYY-MM-DD");
        const endDate = dates[1].format("YYYY-MM-DD");
        console.log("buscando datos")
        ventasService.obtenerVentasArticulosPorFechas(startDate, endDate).then((data)=>{
            setSales(data);
        })
        formasService.obtenerFormasArticulosPorFechas(startDate, endDate).then((dataform)=>{
            setFormas(dataform);
        })
        // var response:VentasArticulo[] = await ventasService.obtenerVentasArticulosPorFechas("2024-10-02", "2024-10-02");
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
            <div className="min-h-screen bg-gradient-to-br from-blue-700 to-emerald-800 p-4 space-y-4">
            {/* navbar */}
            {hidden !== true?
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col md:flex-row justify-between items-stretch gap-4 shadow-lg">
            <div className="flex items-center space-x-4">
                <div className="w-32 h-8 bg-white/20 rounded-lg">
            {/* Logo y controles */}
                    <img src={logo} alt="Digitreports" className="w-full h-full object-contain" />
                </div>
                
                <div className="flex flex-1 w-full xs:w-auto flex-col sm:flex-row gap-4 text-white placeholder:text-white/70" style={{ overflow: "visible" }}>
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
                    <Button 
                        onClick={() => buscar(selectedDates)}
                        className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white"
                    >
                        Recargar
                    </Button>
                </div>
                <div>
                    <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white">
                        Generar Reporte
                    </Button>
                </div>
            </div>
            {/* Fecha */}
            <div className="flex-1 flex items-center justify-center bg-white/10 px-2 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-white text-sm md:text-base lg:text-lg whitespace-nowrap">
                    Fecha Actual: {currentTime}
                </div>
            </div>
            {/* Botón Atrás */}
            <Button 
                onClick={handleBack}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white flex items-center justify-center space-x-2"
            >
                <ArrowLeftIcon />
                <span>Volver</span>
            </Button>
        </div>:null}

            <div style={{zIndex:1}}>
            
            {/* Tabla Ventas */}
            <Card className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <CardContent>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Ventas</h2>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-indigo-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-indigo-800 font-semibold uppercase tracking-wider border-b border-gray-200">
                                        Artículo
                                    </th>
                                    <th className="px-4 py-3 text-right text-indigo-800 font-semibold uppercase tracking-wider border-b border-gray-200">
                                        Unidades
                                    </th>
                                    <th className="px-4 py-3 text-right text-indigo-800 font-semibold uppercase tracking-wider border-b border-gray-200">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {sales.map((sale, index) => (
                                    <tr key={index} className="hover:bg-indigo-50 transition-colors even:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-900 font-medium">{sale.nombre}</td>
                                        <td className="px-4 py-3 text-right text-gray-900 text-xl">{sale.unidades.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-blue-800">
                                        ${sale.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))}
                                
                                {/* Fila de Totales */}
                                <tr className="bg-blue-100 font-bold">
                                    <td className="px-4 py-3 text-blue-900 border-t border-gray-200">Totales</td>
                                    <td className="px-4 py-3 text-right text-blue-900 border-t border-gray-200 text-xl">
                                        {sales.reduce((acc, sale) => acc + sale.unidades, 0).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-blue-900 border-t border-gray-200 text-xl">
                                    ${sales.reduce((acc, sale) => acc + sale.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card></div>
                        <div className="flex justify-center items-center">
            <Card className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
                <CardContent>
                <table className="w-full min-w-[600px]">
                    <thead className="bg-indigo-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-indigo-800 font-semibold uppercase tracking-wider border-b border-gray-200">
                        Forma de pago
                        </th>
                        <th className="px-4 py-3 text-right text-indigo-800 font-semibold uppercase tracking-wider border-b border-gray-200">
                        Total
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {formas.map((form, index) => (
                        <tr key={index} className="hover:bg-green-50 even:bg-gray-50">
                            <td className="px-4 py-3 text-green-900 font-medium">{form.forma}</td>
                            <td className="px-4 py-3 text-right text-gray-500 text-xl">
                                ${form.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                        </tr>
                    ))}
                    {/* Fila de Totales */}
                    <tr className="bg-green-100 font-bold">
                        <td className="px-4 py-3 text-blue-900 border-t border-gray-200 text-2xl">Totales</td>
                        <td className="px-4 py-3 text-right text-blue-900 border-t border-gray-200 text-2xl">
                            ${formas.reduce((acc, form) => acc + form.total, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                    </tr>
                    </tbody>
                </table>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}

export default Ventas;