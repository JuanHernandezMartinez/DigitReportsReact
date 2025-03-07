import { Bancos } from "../Models/Bancos";
import axios from '../Interceptors/AxiosInterceptor'
import { BancosArticulo } from "../Models/BancosArticulos";
import api from "../utils/api";

export class BancosService {
   async obtenerBancosArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
     try {
       const response = await api.get(`/bancos/detalles/${dataBase}/${fechaInicio}/${fechaFin}`);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo ventas:", error);
       return [];
     }
   }
 }