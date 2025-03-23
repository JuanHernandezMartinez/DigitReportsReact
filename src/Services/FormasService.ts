import api from "../utils/api";
import toast from "react-hot-toast";

export class FormasService {
   async obtenerFormasArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
    const loadingToast = toast.loading("Cargando datos...");
     try {
       const response = await api.get(`/formas-pago/fechas/${dataBase}/${fechaInicio}/${fechaFin}`);
       toast.dismiss(loadingToast);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo ventas:", error);
       toast.error("Error Al Obtener Los Datos De Ventas Y Formas.");
       toast.dismiss(loadingToast);
       return [];
     }
   }
 }
