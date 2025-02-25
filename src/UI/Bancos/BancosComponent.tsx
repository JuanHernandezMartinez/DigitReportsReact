import { Card, CardContent } from "../UIComponents/card";
import { BancosArticulo } from "../../Models/BancosArticulos";

function BancosComponent({ banks }: { banks: BancosArticulo[] }) {
  
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
              {banks.map((bank) => (
                <tr
                  key={bank.cuentaBancoId}
                  className="hover:bg-blue-50 even:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    <b> {bank.banco}</b>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900">
                    ${bank.saldoInicial.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-green-700">
                    ${bank.depositors.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-red-700">
                    ${bank.retiros.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-900">
                    ${bank.saldoFinal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default BancosComponent;
