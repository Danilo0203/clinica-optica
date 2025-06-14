import { apiConfig } from "@/services/configAxios";
import { Permiso } from "../schemas/permiso.schema";
import { ListarPermisosType, PermisosType } from "../interfaces/permisos.interfaces";
import { localPermisoMapper } from "../mappers/local-permiso.mapper";

export const crearPermiso = async (data: Permiso): Promise<PermisosType> => {
  const res = await apiConfig.post<PermisosType>("/api/users/permisos/crear/", data);
  const permiso = res.data;
  return localPermisoMapper(permiso);
};

export const obtenerPermisoId = async (id: number): Promise<PermisosType> => {
  const res = await apiConfig.get<PermisosType>(`/api/users/permisos/${id}/`);
  const permiso = res.data;
  return localPermisoMapper(permiso);
};

export const listPermisos = async (): Promise<ListarPermisosType[]> => {
  const res = await apiConfig.get<ListarPermisosType[]>("/api/users/permisos/");
  const data = res.data;
  const roles = data.map(localPermisoMapper);
  return roles;
};

export const eliminarPermiso = async (id: number): Promise<{ mensaje: string }> => {
  const res = await apiConfig.delete<{ mensaje: string }>(`/api/users/permisos/${id}/eliminar/`);
  return res.data;
};

export const actualizarPermiso = async (data: Partial<Permiso> & { id: number }): Promise<PermisosType> => {
  const res = await apiConfig.put<PermisosType>(`/api/users/permisos/${data.id}/actualizar/`, data);
  const permiso = res.data;
  return localPermisoMapper(permiso);
};
