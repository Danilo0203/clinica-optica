export interface UsuarioType {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fotografia: null;
  rol: number;
  sucursal: number;
  is_active: boolean;
  is_staff: boolean;
  creado_en: Date;
  actualizado_en: Date;
}

export interface ResponseUpdateUsuarioType {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fotografia: null;
  rol: number;
  rol_nombre: string;
  sucursal: number;
  sucursal_nombre: string;
  is_active: boolean;
  is_staff: boolean;
  creado_en: Date;
  actualizado_en: Date;
}

export interface ResponseObtenerUsuarioID {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fotografia: null;
  rol: number;
  rol_nombre: string;
  sucursal: number;
  sucursal_nombre: string;
  is_active: boolean;
  is_staff: boolean;
  creado_en: Date;
  actualizado_en: Date;
}

export interface ResponseCrearUsuarioType {
  username: string;
  nombre_completo: string;
  email: string;
  fotografia: null;
  rol: number;
  sucursal: number;
}

export interface toListUsuarioType {
  usuarios: Usuario[];
  roles: Role[];
  sucursales: Sucursale[];
}

export interface Role {
  id: number;
  nombre: string;
  permisos: any[];
  descripcion: string;
}

export interface Sucursale {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  responsable: null;
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
}

export interface Usuario {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fotografia: null;
  rol: number | null;
  sucursal: number | null;
  is_active: boolean;
  is_staff: boolean;
  creado_en: Date;
  actualizado_en: Date;
  rol_nombre?: string;
  sucursal_nombre?: string;
}
