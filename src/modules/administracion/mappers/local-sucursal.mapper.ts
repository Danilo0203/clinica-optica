import { Sucursal } from "../models/sucursal.model";

export const localSucursalMapper = (sucursal: Sucursal) => {
  const { id, nombre, activo, actualizado_en, creado_en, direccion, responsable, telefono, responsable_nombre } = sucursal;
  return new Sucursal({
    id: id,
    nombre: nombre,
    activo: activo,
    actualizado_en: actualizado_en,
    telefono: telefono,
    responsable: responsable,
    responsable_nombre: responsable_nombre,
    creado_en: creado_en,
    direccion: direccion,
  });
};
