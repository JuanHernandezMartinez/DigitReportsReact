import { Clientes } from "../Models/Clientes";
import axios from '../Interceptors/AxiosInterceptor'
import { ClientesArticulo } from "../Models/ClientesArticulos";

export class ClientesService {
   async obtenerTodasLasVentas(): Promise<Clientes[]> { 
    const Clientes = await axios.get('/Clientes');
    console.log("clientes encontradas: ", Clientes.data)
    return Clientes.data }

   async obtenerUnaVentaPorId(id:number): Promise<Clientes[]> { return await axios.get(`/Clientes-pago/${id}`)}
   
   //http://localhost:8080/ventas/articulos/2024-10-01/2024-10-30
   //formato de la fecha year-month-day = yyyy-mm-dd
   async obtenerClientesArticulosPorFechas(fechaInicio:any, fechaFin:any): Promise<ClientesArticulo[]>{
      return (await axios.get(`/Clientes/fechas/${fechaInicio}/${fechaFin}`)).data
   }

}
