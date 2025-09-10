import { apiConfig } from "@/services/configAxios";
import {
  toListUsuarioType,
  ResponseCrearUsuarioType,
  ResponseObtenerUsuarioID,
  ResponseUpdateUsuarioType,
  UsuarioType,
} from "../interfaces/usuario.interfaces";
import { Usuario } from "../schemas/usuario.schema";

export const crearUsuario = async (data: Usuario): Promise<ResponseCrearUsuarioType> => {
  const res = await apiConfig.post<ResponseCrearUsuarioType>("/api/users/usuarios/crear/", data);
  const usuario = res.data;
  return usuario;
};

export const obtenerUsuarioId = async (id: number): Promise<ResponseObtenerUsuarioID> => {
  const res = await apiConfig.get<ResponseObtenerUsuarioID>(`/api/users/usuarios/${id}/`);
  const usuario = res.data;
  // return localPermisoMapper(usuario);
  return usuario;
};

export const listUsuarios = async (): Promise<toListUsuarioType> => {
  const res = await apiConfig.get<toListUsuarioType>("/api/users/usuarios/");
  const data = res.data;
  // const roles = data.map(localPermisoMapper);
  return data;
};

export const eliminarUsuario = async (id: number): Promise<void> => {
  const res = await apiConfig.delete<void>(`/api/users/usuarios/${id}/eliminar/`);
  return res.data;
};

export const actualizarUsuario = async (data: Partial<UsuarioType>, id: number): Promise<ResponseUpdateUsuarioType> => {
  const res = await apiConfig.put<ResponseUpdateUsuarioType>(`/api/users/usuarios/${id}/actualizar/`, data);
  const usuario = res.data;
  // return localPermisoMapper(usuario);
  return usuario;
};

export const actualizarContraseñaUsuario = async (data: {
  password_actual: string;
  password_nuevo: string;
  confirmar_password: string;
}): Promise<{ message: string } | { error: string }> => {
  const res = await apiConfig.post<{ message: string } | { error: string }>(`/api/users/usuarios/cambiar-password/`, data);
  const passwordActualizado = res.data;
  return passwordActualizado;
};
