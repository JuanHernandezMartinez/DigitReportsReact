import { Ventas } from "../Models/Ventas";
import axios from '../Interceptors/AxiosInterceptor'
import { VentasArticulo } from "../Models/VentasArticulos";

export class VentasService {
   async obtenerTodasLasVentas(): Promise<Ventas[]> { 
    const ventas = await axios.get('/ventas');
    console.log("Ventas encontradas: ", ventas.data)
    return ventas.data }

   async obtenerUnaVentaPorId(id:number): Promise<Ventas[]> { return await axios.get(`/ventas/${id}`)}
   
   //http://localhost:8080/ventas/articulos/2024-10-01/2024-10-30
   //formato de la fecha year-month-day = yyyy-mm-dd
   async obtenerVentasArticulosPorFechas(fechaInicio:any, fechaFin:any): Promise<VentasArticulo[]>{
      return (await axios.get(`/ventas/articulos/${fechaInicio}/${fechaFin}`)).data
   }

}
