export interface ListarSucursalesType {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  responsable: number;
  responsable_nombre: string;
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
}
export interface SucursalesType {
  nombre: string;
  direccion: string;
  telefono: string;
  responsable: number;
  activo: boolean;
}
