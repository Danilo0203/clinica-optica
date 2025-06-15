import { z } from "zod";

export const sucursalSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "Minimo 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  direccion: z.string().min(1, { message: "La dirección es requerida" }),
  telefono: z.string().min(8, { message: "Minimo 8 caracteres" }).max(8, { message: "Maximo 8 caracteres" }),
  email: z.string({ message: "Campo requerido" }).email({ message: "Email no válido" }),
  activo: z.boolean().default(true),
  responsable: z.string().min(1, { message: "responsable requerido" }),
});

export type Sucursal = z.infer<typeof sucursalSchema>;
