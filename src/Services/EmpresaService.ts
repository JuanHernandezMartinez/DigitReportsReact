import { Empresa } from "../Models/Empresa";
import api from "../utils/api";
export class EmpresaService {
  async consultarEmpresas(): Promise<Empresa[]> {
    return (await api.get<Empresa[]>("/empresas")).data;
  }
}
