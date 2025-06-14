import { Permiso } from "../models/permiso.model";

export const localPermisoMapper = (permiso: Permiso) => {
  const { descripcion, id, nombre, activo, actualizado_en, codigo, creado_en } = permiso;
  return new Permiso({
    id: id,
    descripcion: descripcion,
    nombre: nombre, 
    activo: activo,
    actualizado_en: actualizado_en,
    codigo: codigo,
    creado_en: creado_en,
  });
};
