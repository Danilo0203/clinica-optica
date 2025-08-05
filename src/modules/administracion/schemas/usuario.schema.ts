import { z } from "zod";

export const usuarioSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Minimo 3 caracteres" })
      .max(20, { message: "El nombre no puede exceder los 20 caracteres" }),
    nombre_completo: z.string().min(1, {
      message: "Debe ingresar un nombre completo",
    }),
    email: z.string().email({
      message: "Debe ser un email valido",
    }),
    fotografia: z.array(z.instanceof(File)).optional().nullable(),
    rol: z.string().min(1, {
      message: "Debe seleccionar un rol",
    }),
    sucursal: z.string().min(1, {
      message: "Debe seleccionar una sucursal",
    }),
    is_active: z.boolean().default(true),
    is_staff: z.boolean().default(true),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmar_password: z.string().min(6, {
      message: "La confirmación de contraseña debe tener al menos 6 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmar_password, {
    path: ["confirmar_password"], // muestra el error en el campo de confirmación
    message: "Las contraseñas no coinciden",
  });

export type Usuario = z.infer<typeof usuarioSchema>;
