export interface ListarRolesType {
  id: number;
  nombre: string;
  permisos: any[];
  descripcion: string;
}

export interface AsignarPermisosARol {
  id:          number;
  nombre:      string;
  permisos:    Permiso[];
  descripcion: string;
}

export interface Permiso {
  id:             number;
  nombre:         string;
  codigo:         string;
  descripcion:    string;
  activo:         boolean;
  creado_en:      Date;
  actualizado_en: Date;
}
