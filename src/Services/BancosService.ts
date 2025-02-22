import { Bancos } from "../Models/Bancos";
import axios from '../Interceptors/AxiosInterceptor'
import { BancosArticulos } from "../Models/BancosArticulos";

export class BancosService {
   async obtenerTodasLasVentas(): Promise<Bancos[]> { 
    const Bancos = await axios.get('/Bancos-pago');
    console.log("Bancos encontradas: ", Bancos.data)
    return Bancos.data }

   async obtenerUnaVentaPorId(id:number): Promise<Bancos[]> { return await axios.get(`/Bancos-pago/${id}`)}
   
   //http://localhost:8080/ventas/articulos/2024-10-01/2024-10-30
   //formato de la fecha year-month-day = yyyy-mm-dd
   async obtenerBancosArticulosPorFechas(fechaInicio:any, fechaFin:any): Promise<BancosArticulos[]>{
      return (await axios.get(`/Bancos-pago/fechas/${fechaInicio}/${fechaFin}`)).data
   }

}
