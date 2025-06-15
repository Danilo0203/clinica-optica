import { Sucursal } from "../models/sucursal.model";

export const localSucursalMapper = (sucursal: Sucursal) => {
  const { id, nombre, activo, actualizado_en, creado_en, direccion, responsable, telefono } = sucursal;
  return new Sucursal({
    id: id,
    nombre: nombre,
    activo: activo,
    actualizado_en: actualizado_en,
    telefono: telefono,
    responsable: responsable || "No asignado",
    creado_en: creado_en,
    direccion: direccion,
  });
};
