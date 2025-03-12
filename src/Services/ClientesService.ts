import api from "../utils/api";

export class ClientesService {
   async obtenerClientesArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
     try {
       const response = await api.get(`/Clientes/fechas/${dataBase}/${fechaInicio}/${fechaFin}`);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo ventas:", error);
       return [];
     }
   }
 }
