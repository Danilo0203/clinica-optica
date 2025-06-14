import { z } from "zod";

export const permisoSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "Minimo 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  descripcion: z.string().optional(),
  codigo: z.string().optional(),
  activo: z.boolean().default(true),
});

export type Permiso = z.infer<typeof permisoSchema>;
