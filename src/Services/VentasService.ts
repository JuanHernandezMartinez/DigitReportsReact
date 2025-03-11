import api from "../utils/api";

export class VentasService {
   async obtenerVentasArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
     try {
       const response = await api.get(`/ventas/articulos/${dataBase}/${fechaInicio}/${fechaFin}`);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo ventas:", error);
       return [];
     }
   }
 }