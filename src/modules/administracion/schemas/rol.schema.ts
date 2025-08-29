import { z } from "zod";

export const rolSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  descripcion: z.string().min(1, { message: "La descripción es obligatoria" }),
});

export type Rol = z.infer<typeof rolSchema>;

export const asignarPermisosARolSchema = z.object({
  permisos: z.array(z.number()).min(1, { message: "Selecciona al menos un permiso" }),
});

export type AsigarPermisosARol = z.infer<typeof asignarPermisosARolSchema>;
