import { ListarRolesType, Permiso } from "../interfaces/rol.interfaces";

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

export class AsignarPermisosARol {
  id: number;
  nombre: string;
  permisos: Permiso[];
  descripcion: string;
  constructor({ id, nombre, permisos, descripcion }: AsignarPermisosARol) {
    this.id = id;
    this.nombre = nombre;
    this.permisos = permisos;
    this.descripcion = descripcion;
  }
}
