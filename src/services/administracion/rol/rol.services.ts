import { ListarRolesType } from "@/interfaces/rol.interfaces";
import { Rol } from "@/schemas/administracion/rol/rol.schema";
import { apiConfig } from "@/services/configAxios";

export const crearRol = async (data: Rol) => {
  const res = await apiConfig.post("/api/users/roles/crear/", data);
  return res.data;
};

export const listRoles = async (): Promise<ListarRolesType[]> => {
  const res = await apiConfig.get<ListarRolesType[]>("/api/users/roles/");
  return res.data;
};

export const eliminarRol = async (id: number): Promise<void> => {
  await apiConfig.delete(`/api/users/roles/${id}/eliminar/`);
};

export const actualizarRol = async (data: Partial<Rol> & { id: number }): Promise<Rol> => {
  const res = await apiConfig.put<Rol>(`/api/users/roles/${data.id}/actualizar/`, data);
  return res.data;
};
