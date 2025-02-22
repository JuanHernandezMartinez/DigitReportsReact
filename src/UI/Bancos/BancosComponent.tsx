import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../UIComponents/card";
import { Button } from "../UIComponents/button";
import { Input } from "../UIComponents/input";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/165 x 645.png';

function BancosComponent({ selectedDates, banks }: { selectedDates: any[], banks: any[]}) {
  return (
<Card className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
  <CardContent>
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
        
    )
}

export default BancosComponent;