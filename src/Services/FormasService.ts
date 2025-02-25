import { Formas } from "../Models/Formas";
import axios from '../Interceptors/AxiosInterceptor'
import { FormasArticulo } from "../Models/FormasArticulos";

export class FormasService {
   async obtenerTodasLasVentas(): Promise<Formas[]> { 
    const Formas = await axios.get('/formas-pago');
    console.log("formas encontradas: ", Formas.data)
    return Formas.data }

   async obtenerUnaVentaPorId(id:number): Promise<Formas[]> { return await axios.get(`/formas-pago/${id}`)}
   
   //http://localhost:8080/ventas/articulos/2024-10-01/2024-10-30
   //formato de la fecha year-month-day = yyyy-mm-dd
   async obtenerFormasArticulosPorFechas(fechaInicio:any, fechaFin:any): Promise<FormasArticulo[]>{
      return (await axios.get(`/formas-pago/fechas/${fechaInicio}/${fechaFin}`)).data
   }

}
