import { Empresa } from "../Models/Empresa";
import api from "../utils/api";

export async function consultarEmpresasService(): Promise<Empresa[]> {
  return (await api.get("/empresas")).data;
}
