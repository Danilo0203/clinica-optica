  import { apiConfig } from "../configAxios";

  export interface AccessType {
    refresh: string;
    access: string;
  }

  export const loginServices = async (data: { username: string; password: string }): Promise<AccessType> => {
    const res = await apiConfig.post<AccessType>("/api/users/token/", data);
    return res.data;
  };
  export interface PerfilUsuarioType {
    usuario: Usuario;
    roles: any[];
    sucursales: any[];
  }

  export interface Usuario {
    id: number;
    username: string;
    nombre_completo: string;
    email: string;
    fotografia: null;
    rol: null;
    sucursal: null;
    is_active: boolean;
    is_staff: boolean;
    creado_en: Date;
    actualizado_en: Date;
  }

  export const perfilUsuario = async (): Promise<PerfilUsuarioType> => {
    const res = await apiConfig.get<PerfilUsuarioType>("/api/users/usuarios/perfil/");
    return res.data;
  };
