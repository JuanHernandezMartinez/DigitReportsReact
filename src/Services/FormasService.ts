import { Formas } from "../Models/Formas";
import axios from '../Interceptors/AxiosInterceptor'
import { FormasArticulo } from "../Models/FormasArticulos";
import api from "../utils/api";

export class FormasService {
   async obtenerFormasArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
     try {
       const response = await api.get(`/formas-pago/fechas/${dataBase}/${fechaInicio}/${fechaFin}`);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo ventas:", error);
       return [];
     }
   }
 }
