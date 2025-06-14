import { ListarRolesType } from "../interfaces/rol.interfaces";

export class Rol {
  id: number;
  descripcion: string;
  nombre: string;
  permisos: any[];
  constructor({ id, descripcion, nombre, permisos }: ListarRolesType) {
    this.id = id;
    this.descripcion = descripcion;
    this.nombre = nombre;
    this.permisos = permisos;
  }
}
