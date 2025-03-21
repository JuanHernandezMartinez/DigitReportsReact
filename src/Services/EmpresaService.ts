import { Empresa } from "../Models/Empresa";
import api from "../utils/api";
export class EmpresaService {
  async consultarEmpresas(): Promise<Empresa[]> {

    const data=(await api.get<any[]>("/empresas/"));
    console.log("Empresas: ", data)
    return [];
  }
}
