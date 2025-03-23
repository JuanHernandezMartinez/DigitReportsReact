import { Card, CardContent } from "../UIComponents/card";

function Ventas({ sales }: { sales: any[] }) {
  return (
    <div>
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
      </Card>
    </div>
  );
}

export default Ventas;
