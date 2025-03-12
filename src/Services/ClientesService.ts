import api from "../utils/api";
import toast from "react-hot-toast";


export class ClientesService {
   async obtenerClientesArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
    const loadingToast = toast.loading("Cargando datos..."); 
    try {
       const response = await api.get(`/Clientes/fechas/${dataBase}/${fechaInicio}/${fechaFin}`);
       toast.success("Datos cargados con éxito!");
       toast.dismiss(loadingToast);
       return response.data;
     } catch (error) {
       console.error("Error obteniendo ventas:", error);
       toast.error("Error Al Obtener Los Datos De Clientes.");
       toast.dismiss(loadingToast);
       return [];
     }
   }
 }
