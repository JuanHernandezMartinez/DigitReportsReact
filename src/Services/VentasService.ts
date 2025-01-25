import { Ventas } from "../Models/Ventas";
import axios from '../Interceptors/AxiosInterceptor'

export class VentasService {
   async obtenerTodasLasVentas(): Promise<Ventas[]> { 
    const ventas = await axios.get('/ventas');
    console.log("Ventas encontradas: ", ventas.data)
    return ventas.data }

   async obtenerUnaVentaPorId(id:number): Promise<Ventas[]> { return await axios.get(`/ventas/${id}`)}

}
