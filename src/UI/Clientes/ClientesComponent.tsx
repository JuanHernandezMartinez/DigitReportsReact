import { SaldoCliente } from "../../Models/SaldoCliente";
import { Card, CardContent } from "../UIComponents/card";

function ClientesComponent({ clients }: { clients: SaldoCliente[]}) {

    return (
<div>
<Card className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
  <CardContent>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Clientes</h2>
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[700px]">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-3 text-left text-green-900 font-semibold uppercase border-b border-green-200">
              Cliente
            </th>
            <th className="px-4 py-3 text-right text-green-900 font-semibold uppercase border-b border-green-200">
              Pago
            </th>
            <th className="px-4 py-3 text-right text-green-900 font-semibold uppercase border-b border-green-200">
              Cargo
            </th>
            <th className="px-4 py-3 text-right text-green-900 font-semibold uppercase border-b border-green-200">
              Saldo
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {clients.map((client, index) => (
            <tr key={index} className="hover:bg-green-50 even:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-gray-900 font-medium">{client?.nombre}</td>
              <td className="px-4 py-3 text-right text-green-700">${client?.pago.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="px-4 py-3 text-right text-red-700">${client?.cargo.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">
                ${client.saldo.toFixed(2)}
              </td>
            </tr>
          ))}
          
          {/* Fila de Totales */}
          <tr className="bg-green-50 font-bold border-t border-green-200">
            <td className="px-4 py-3 text-green-900">Totales</td>
            <td className="px-4 py-3 text-right text-green-700">
              ${clients.reduce((acc, client) => acc + client?.pago, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-red-700">
              ${clients.reduce((acc, client) => acc + client?.cargo, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-4 py-3 text-right text-gray-900">
              ${clients.reduce((acc, client) => acc + client?.saldo, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

export default ClientesComponent;