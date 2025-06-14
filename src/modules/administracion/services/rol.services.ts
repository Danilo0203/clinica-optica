import { ListarRolesType } from "@/modules/administracion/interfaces/rol.interfaces";
import { Rol } from "@/modules/administracion/schemas/rol.schema";
import { apiConfig } from "@/services/configAxios";
import { localRolMapper } from "../mappers/local-rol.mapper";

export const crearRol = async (data: Rol): Promise<ListarRolesType> => {
  const res = await apiConfig.post<ListarRolesType>("/api/users/roles/crear/", data);
  const rolNuevo = res.data;
  return localRolMapper(rolNuevo);
};

export const listRoles = async (): Promise<ListarRolesType[]> => {
  const res = await apiConfig.get<ListarRolesType[]>("/api/users/roles/");
  const data = res.data;
  const roles = data.map(localRolMapper);
  return roles;
};

export const eliminarRol = async (id: number): Promise<void> => {
  await apiConfig.delete<{ message: string }>(`/api/users/roles/${id}/eliminar/`);
};

export const actualizarRol = async (data: Partial<Rol> & { id: number }): Promise<ListarRolesType> => {
  const res = await apiConfig.put<ListarRolesType>(`/api/users/roles/${data.id}/actualizar/`, data);
  const rolActualizado = res.data;
  return localRolMapper(rolActualizado);
};

export const obtenerRolId = async (id: number): Promise<ListarRolesType> => {
  const res = await apiConfig.get<ListarRolesType>(`/api/users/roles/${id}/`);
  return localRolMapper(res.data);
};
