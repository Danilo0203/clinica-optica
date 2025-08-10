import { AsignarPermisosARol, Rol } from "../models/rol.model";

export const localRolMapper = (rol: Rol) => {
  const { descripcion, id, nombre, permisos } = rol;
  return new Rol({
    id: id,
    descripcion: descripcion,
    nombre: nombre,
    permisos: permisos,
  });
};

export const localAsignarPermisosARolMapper = (rol: AsignarPermisosARol) => {
  const { id, nombre, permisos, descripcion } = rol;
  return new AsignarPermisosARol({
    id: id,
    descripcion: descripcion,
    nombre: nombre,
    permisos: permisos,
  });
};
