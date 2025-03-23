import { Card, CardContent } from "../UIComponents/card";

function FormasComponent({ formas }: { formas: any[]}) {
    return (
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
    )
}

export default FormasComponent;