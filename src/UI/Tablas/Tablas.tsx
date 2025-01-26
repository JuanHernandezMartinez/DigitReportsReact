import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./TablasComponents/card";
import { Button } from "./TablasComponents/button";
import { Input } from "./TablasComponents/input";
import "./Tablas.css";

function Tablas() {

 // const App = () => {

  const [date, setDate] = useState("Fecha");
  const [sales, setSales] = useState([]);
  const [clients, setClients] = useState([]);
  const [banks, setBanks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Firebird
    const fetchData = async () => {
      try {
        const salesResponse = await fetch("http://localhost:3000/sales");
        if (!salesResponse.ok) throw new Error(`Sales API error: ${salesResponse.statusText}`);
        const clientsResponse = await fetch("http://localhost:3000/clients");
        if (!clientsResponse.ok) throw new Error(`Clients API error: ${clientsResponse.statusText}`);
        const banksResponse = await fetch("http://localhost:3000/banks");
        if (!banksResponse.ok) throw new Error(`Banks API error: ${banksResponse.statusText}`);

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
    <div className="p-4 space-y-4">
      {/* barra superior */}
      <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Button>Boton</Button>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-40"
            />
            <Button>Cargar</Button>
          </div>
        </div>
        <div>Fecha del sistema: {currentTime}</div>
      </div>

      {/* ventas */}
      <Card className="bg-orange-100">
        <CardContent>
          <h2 className="text-xl font-bold text-orange-600 mb-2">Ventas</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-orange-200">
                <th className="border border-gray-300 p-2">Artículo</th>
                <th className="border border-gray-300 p-2">Unidades</th>
                <th className="border border-gray-300 p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{sale.article}</td>
                  <td className="border border-gray-300 p-2">{sale.units}</td>
                  <td className="border border-gray-300 p-2">${sale.total.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-orange-300 font-bold">
                <td className="border border-gray-300 p-2">Totales</td>
                <td className="border border-gray-300 p-2">
                  {sales.reduce((acc, sale) => acc + sale.units, 0)}
                </td>
                <td className="border border-gray-300 p-2">
                  ${sales.reduce((acc, sale) => acc + sale.total, 0).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-orange-200 font-bold">
                <td className="border border-gray-300 p-2">Efectivo</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              <tr className="bg-orange-200 font-bold">
                <td className="border border-gray-300 p-2">Tarjeta</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
              <tr className="bg-orange-200 font-bold">
                <td className="border border-gray-300 p-2">Crédito</td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Clientes */}
      <Card className="bg-green-100">
        <CardContent>
          <h2 className="text-xl font-bold text-green-600 mb-2">Clientes</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-gray-300 p-2">Cliente</th>
                <th className="border border-gray-300 p-2">Pago</th>
                <th className="border border-gray-300 p-2">Cargo</th>
                <th className="border border-gray-300 p-2">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{client.name}</td>
                  <td className="border border-gray-300 p-2">${client.payment.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">${client.charge.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">${client.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Bancos*/}
      <Card className="bg-blue-100">
        <CardContent>
          <h2 className="text-xl font-bold text-blue-600 mb-2">Bancos</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-gray-300 p-2">Cuenta</th>
                <th className="border border-gray-300 p-2">Saldo Inicial</th>
                <th className="border border-gray-300 p-2">Depósitos</th>
                <th className="border border-gray-300 p-2">Retiros</th>
                <th className="border border-gray-300 p-2">Saldo Final</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{bank.account}</td>
                  <td className="border border-gray-300 p-2">${bank.initial.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">${bank.deposits.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">${bank.withdrawals.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">${bank.final.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tablas