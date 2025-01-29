import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./TablasComponents/card";
import { Button } from "./TablasComponents/button";
import { Input } from "./TablasComponents/input";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/165 x 645.png';

function Tablas() {
  const navigate = useNavigate();
  const [date, setDate] = useState("Fecha");
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [banks, setBanks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const navigateTo = (route: string) => {
    navigate(route);
  };
  const handleLogout = () => {
    navigate('/');
  };
  const ArrowLeftIcon = () => (
    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch("http://localhost:3000/sales");
        const clientsResponse = await fetch("http://localhost:3000/clients");
        const banksResponse = await fetch("http://localhost:3000/banks");

        const salesData = await salesResponse.json();
        const clientsData = await clientsResponse.json();
        const banksData = await banksResponse.json();

        setSales(salesData);
        setClients(clientsData);
        setBanks(banksData);
      } catch (error) {
        console.error("Error fetching data from API:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 space-y-4">

<div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col md:flex-row justify-between items-stretch gap-4 shadow-lg">
  {/*Logo y controles*/}
  <div className="flex flex-col xs:flex-row items-center gap-4 flex-none">
    <div className="w-32 h-8 bg-white/20 rounded-lg">
      <img src={logo} alt="Digitreports" className="w-full h-full object-contain" />
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

  {/*Fecha*/}
  <div className="flex-1 min-w-[200px] flex items-center justify-center bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
    <div className="text-white text-sm md:text-base lg:text-lg whitespace-nowrap">
      Fecha del sistema: {currentTime}
    </div>
  </div>

  {/*Botón Atrás */}
  <div className="flex-none flex justify-end items-center">
    <button
      onClick={handleLogout}
      className="w-full xs:w-auto flex items-center justify-center text-white hover:text-white/80 transition-colors duration-200 px-4 py-2"
    >
      <ArrowLeftIcon />
      <span className="hidden sm:inline ml-2">Atras</span>
    </button>
  </div>
</div>

      {/* Ventas */}
      <Card className="bg-orange-100/80 backdrop-blur-sm border border-white/30">
        <CardContent>
          <h2 className="text-xl font-bold text-orange-600 mb-4">Ventas</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-200/50 backdrop-blur-sm">
                <th className="p-3 text-left text-orange-700">Artículo</th>
                <th className="p-3 text-left text-orange-700">Unidades</th>
                <th className="p-3 text-left text-orange-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={index} className="hover:bg-orange-100/30">
                  <td className="p-3 border-b border-white/20">{sale.article}</td>
                  <td className="p-3 border-b border-white/20">{sale.units}</td>
                  <td className="p-3 border-b border-white/20">${sale.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-orange-300/50 backdrop-blur-sm font-bold">
                <td className="p-3">Totales</td>
                <td className="p-3">
                  {sales.reduce((acc, sale) => acc + sale.units, 0)}
                </td>
                <td className="p-3">
                  ${sales.reduce((acc, sale) => acc + sale.total, 0).toFixed(2)}
                </td>
              </tr>
              {['Efectivo', 'Tarjeta', 'Crédito'].map((method, index) => (
                <tr key={index} className="bg-orange-200/30 hover:bg-orange-200/40">
                  <td className="p-3">{method}</td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Clientes */}
      <Card className="bg-green-100/80 backdrop-blur-sm border border-white/30">
        <CardContent>
          <h2 className="text-xl font-bold text-green-600 mb-4">Clientes</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-200/50 backdrop-blur-sm">
                <th className="p-3 text-left text-green-700">Cliente</th>
                <th className="p-3 text-left text-green-700">Pago</th>
                <th className="p-3 text-left text-green-700">Cargo</th>
                <th className="p-3 text-left text-green-700">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index} className="hover:bg-green-100/30">
                  <td className="p-3 border-b border-white/20">{client.name}</td>
                  <td className="p-3 border-b border-white/20">${client.payment.toFixed(2)}</td>
                  <td className="p-3 border-b border-white/20">${client.charge.toFixed(2)}</td>
                  <td className="p-3 border-b border-white/20">${client.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Bancos */}
      <Card className="bg-blue-100/80 backdrop-blur-sm border border-white/30">
        <CardContent>
          <h2 className="text-xl font-bold text-blue-600 mb-4">Bancos</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-200/50 backdrop-blur-sm">
                <th className="p-3 text-left text-blue-700">Cuenta</th>
                <th className="p-3 text-left text-blue-700">Saldo Inicial</th>
                <th className="p-3 text-left text-blue-700">Depósitos</th>
                <th className="p-3 text-left text-blue-700">Retiros</th>
                <th className="p-3 text-left text-blue-700">Saldo Final</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank, index) => (
                <tr key={index} className="hover:bg-blue-100/30">
                  <td className="p-3 border-b border-white/20">{bank.account}</td>
                  <td className="p-3 border-b border-white/20">${bank.initial.toFixed(2)}</td>
                  <td className="p-3 border-b border-white/20">${bank.deposits.toFixed(2)}</td>
                  <td className="p-3 border-b border-white/20">${bank.withdrawals.toFixed(2)}</td>
                  <td className="p-3 border-b border-white/20">${bank.final.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tablas;