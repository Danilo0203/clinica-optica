import { apiConfig } from "@/services/configAxios";
import { Sucursal } from "../schemas/sucursal.schema";
import { ListarSucursalesType, SucursalesType } from "../interfaces/sucursales.interfaces";
import { localSucursalMapper } from "../mappers/local-sucursal.mapper";

export const crearSucursal = async (data: Sucursal): Promise<SucursalesType> => {
  const res = await apiConfig.post<SucursalesType>("/api/users/sucursales/crear/", data);
  const sucursal = res.data;
  return sucursal;
};

export const obtenerSucursalId = async (id: number): Promise<ListarSucursalesType> => {
  const res = await apiConfig.get<ListarSucursalesType>(`/api/users/sucursales/${id}/`);
  const sucursal = res.data;
  return localSucursalMapper(sucursal);
};

export const listSucursales = async (): Promise<ListarSucursalesType[]> => {
  const res = await apiConfig.get<ListarSucursalesType[]>("/api/users/sucursales/");
  const data = res.data;
  const sucursales = data.map(localSucursalMapper);
  return sucursales;
};

export const eliminarSucursal = async (id: number): Promise<{ mensaje: string }> => {
  const res = await apiConfig.delete<{ mensaje: string }>(`/api/users/sucursales/${id}/eliminar/`);
  return res.data;
};

export const actualizarSucursal = async (data: Partial<Sucursal> & { id: number }): Promise<ListarSucursalesType> => {
  const res = await apiConfig.put<ListarSucursalesType>(`/api/users/sucursales/${data.id}/actualizar/`, data);
  const sucursal = res.data;
  return localSucursalMapper(sucursal);
};
