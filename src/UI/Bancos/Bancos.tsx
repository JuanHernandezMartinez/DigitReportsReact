import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../UIComponents/card";
import { Button } from "../UIComponents/button";
import { Input } from "../UIComponents/input";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/165 x 645.png';

function Bancos() {
    const navigate = useNavigate();
    const [date, setDate] = useState("Fecha");
    const [sales, setSales] = useState([]);
    const [clients, setClients] = useState([]);
    const [banks, setBanks] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    
    const handleBack = () => {
        navigate(-1); // pag anterior
    };

    const ArrowLeftIcon = () => (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 to-emerald-800 p-4 space-y-4">
            {/* navbar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col md:flex-row justify-between items-stretch gap-4 shadow-lg">
                {/* Logo y controles */}
                <div className="flex items-center space-x-4">
                    <div className="w-32 h-8 bg-white/20 rounded-lg">
                        <img src={logo} alt="Digitreports" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white">
                            Generar Reporte
                        </Button>
                    </div>
                    <div className="flex flex-1 w-full xs:w-auto flex-col sm:flex-row gap-2">
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full sm:w-40 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/70"
                        />
                        <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white">
                            Cargar
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
            </div>

                  {/* Bancos */}
<Card className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
  <CardContent className="p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Bancos</h2>
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[800px]">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-3 text-left text-blue-900 font-semibold uppercase border-b border-blue-200">
              Cuenta
            </th>
            <th className="px-4 py-3 text-right text-blue-900 font-semibold uppercase border-b border-blue-200">
              Saldo Inicial
            </th>
            <th className="px-4 py-3 text-right text-blue-900 font-semibold uppercase border-b border-blue-200">
              Depósitos
            </th>
            <th className="px-4 py-3 text-right text-blue-900 font-semibold uppercase border-b border-blue-200">
              Retiros
            </th>
            <th className="px-4 py-3 text-right text-blue-900 font-semibold uppercase border-b border-blue-200">
              Saldo Final
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {banks.map((bank, index) => (
            <tr key={index} className="hover:bg-blue-50 even:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-900 font-medium">{bank.account}</td>
              <td className="px-4 py-3 text-right text-gray-900">${bank.initial.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-green-700">${bank.deposits.toFixed(2)}</td>
              <td className="px-4 py-3 text-right text-red-700">${bank.withdrawals.toFixed(2)}</td>
              <td className="px-4 py-3 text-right font-semibold text-blue-900">
                ${bank.final.toFixed(2)}
              </td>
            </tr>
          ))}
          
          {/* Fila de Totales */}
          <tr className="bg-blue-50 font-bold border-t border-blue-200">
            <td className="px-4 py-3 text-blue-900">Totales</td>
            <td className="px-4 py-3 text-right text-blue-900">
              ${banks.reduce((acc, bank) => acc + bank.initial, 0).toFixed(2)}
            </td>
            <td className="px-4 py-3 text-right text-green-700">
              ${banks.reduce((acc, bank) => acc + bank.deposits, 0).toFixed(2)}
            </td>
            <td className="px-4 py-3 text-right text-red-700">
              ${banks.reduce((acc, bank) => acc + bank.withdrawals, 0).toFixed(2)}
            </td>
            <td className="px-4 py-3 text-right text-blue-900">
              ${banks.reduce((acc, bank) => acc + bank.final, 0).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>
        </div>
    )
}

export default Bancos;