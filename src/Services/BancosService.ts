import api from "../utils/api";
import toast from "react-hot-toast";

export class BancosService {
  async obtenerBancosArticulosPorFechas(dataBase: string, fechaInicio: string, fechaFin: string) {
    const loadingToast = toast.loading("Cargando datos...");
    try {
      const response = await api.get(`/bancos/detalles/${dataBase}/${fechaInicio}/${fechaFin}`);
      toast.dismiss(loadingToast);
      return response.data;
    } catch (error) {
      console.error("Error obteniendo datos de Bancos:", error);
      toast.error("Error Al Obtener Los Datos De Bancos.");
      toast.dismiss(loadingToast);
      return [];
    }
  }
}
