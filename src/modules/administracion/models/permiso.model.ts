import { ListarPermisosType } from "../interfaces/permisos.interfaces";

export class Permiso {
  id: number;
  descripcion: string;
  nombre: string;
  activo: boolean;
  actualizado_en: Date;
  codigo: string;
  creado_en: Date;
  constructor({ id, descripcion, nombre, activo, actualizado_en, codigo, creado_en }: ListarPermisosType) {
    this.id = id;
    this.descripcion = descripcion;
    this.nombre = nombre;
    this.activo = activo;
    this.actualizado_en = actualizado_en;
    this.codigo = codigo;
    this.creado_en = creado_en;
  }
}
