import api from "../utils/api";

export class BancosService {
   async obtenerBancosArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
     try {
       const response = await api.get(`/bancos/detalles/${dataBase}/${fechaInicio}/${fechaFin}`);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo datos de Bancos:", error);
       return [];
     }
   }
 }