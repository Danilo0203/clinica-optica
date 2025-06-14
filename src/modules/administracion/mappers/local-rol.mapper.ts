import { Rol } from "../models/rol.model";

export const localRolMapper = (rol: Rol) => {
  const { descripcion, id, nombre, permisos } = rol;
  return new Rol({
    id: id,
    descripcion: descripcion,
    nombre: nombre,
    permisos: permisos,
  });
};
