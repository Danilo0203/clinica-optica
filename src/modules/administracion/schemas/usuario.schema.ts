import { z } from "zod";

// Esquema base compartido (sin reglas específicas de contraseña)
const usuarioBaseSchema = z.object({
  username: z.string().min(3, { message: "Minimo 3 caracteres" }).max(20, { message: "El nombre no puede exceder los 20 caracteres" }),
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
});

// Crear: contraseña requerida
export const usuarioCreateSchema = usuarioBaseSchema
  .extend({
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmar_password: z.string().min(8, {
      message: "La confirmación de contraseña debe tener al menos 8 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmar_password, {
    path: ["confirmar_password"],
    message: "Las contraseñas no coinciden",
  });

// Editar: contraseña opcional; si se envía, validar longitud y coincidencia
export const usuarioUpdateSchema = usuarioBaseSchema
  .extend({
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }).optional().or(z.literal("")),
    confirmar_password: z.string().min(8, { message: "La confirmación de contraseña debe tener al menos 8 caracteres" }).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const hasPassword = typeof data.password === "string" && data.password.length > 0;
    const hasConfirm = typeof data.confirmar_password === "string" && data.confirmar_password.length > 0;

    if (hasPassword || hasConfirm) {
      if (!hasPassword || !hasConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Debe ingresar y confirmar la contraseña",
          path: [!hasPassword ? "password" : "confirmar_password"],
        });
        return;
      }
      if (data.password !== data.confirmar_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Las contraseñas no coinciden",
          path: ["confirmar_password"],
        });
      }
    }
  });

// Compatibilidad hacia atrás: mantener el nombre original apuntando al esquema de creación
export const usuarioSchema = usuarioCreateSchema;

export type UsuarioCreate = z.infer<typeof usuarioCreateSchema>;
export type UsuarioUpdate = z.infer<typeof usuarioUpdateSchema>;
export type Usuario = UsuarioCreate;
