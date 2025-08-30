import { ListarPermisosType } from "../interfaces/permisos.interfaces";
import { ListarSucursalesType } from "../interfaces/sucursales.interfaces";

export class Sucursal {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  responsable: number;
  responsable_nombre: string;
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
  constructor({
    id,
    direccion,
    nombre,
    activo,
    actualizado_en,
    telefono,
    responsable,
    responsable_nombre,
    creado_en,
  }: ListarSucursalesType) {
    this.id = id;
    this.direccion = direccion;
    this.nombre = nombre;
    this.activo = activo;
    this.telefono = telefono;
    this.actualizado_en = actualizado_en;
    this.responsable = responsable;
    this.creado_en = creado_en;
    this.responsable_nombre = responsable_nombre;
  }
}
