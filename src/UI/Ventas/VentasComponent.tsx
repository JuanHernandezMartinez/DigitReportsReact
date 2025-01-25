import { useEffect, useState } from "react";
import { VentasService } from "../../Services/VentasService"
import { Ventas } from "../../Models/Ventas";

function VentasComponent() {
  const ventasService = new VentasService();

  const [ventas, setVentas] = useState<Ventas[]>([])

  const getVentas = async () => {
    console.log("Se esta ejecutando la funcion getVentas")
    setVentas( await ventasService.obtenerTodasLasVentas())
 }

  useEffect(()=>{
    getVentas();

    console.log(ventas);
  }, [])
  return (
    <div>
      {ventas.map(venta=>(
        <div key={venta.doctoVeId}>
          <h1>{venta.doctoVeId}</h1>
          <h1>{venta.folio}</h1>
          <h1>{venta.tipoDocto}</h1>
        </div>
      ))}
    </div>
  )
}

export default VentasComponent