import { AsigarPermisosARol, Rol } from "../models/rol.model";

export const localRolMapper = (rol: Rol) => {
  const { descripcion, id, nombre, permisos } = rol;
  return new Rol({
    id: id,
    descripcion: descripcion,
    nombre: nombre,
    permisos: permisos,
  });
};

export const localAsigarPermisosARolMapper = (rol: AsigarPermisosARol) => {
  const { id, nombre, permisos, descripcion } = rol;
  return new AsigarPermisosARol({
    id: id,
    nombre: nombre,
    permisos: permisos,
    descripcion: descripcion,
  });
};
