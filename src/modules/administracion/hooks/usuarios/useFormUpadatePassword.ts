import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { actualizarContraseñaUsuario } from "../../services/usuario.services";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useFormUpadatePassword = (setOpen: (open: boolean) => void) => {
  const passwordUpdateSchema = z
    .object({
      password_actual: z.string().min(8, { message: "minimo 8 caracteres" }),
      password_nuevo: z.string().min(8, { message: "minimo 8 caracteres" }),
      confirmar_password: z.string().min(8, { message: "minimo 8 caracteres" }),
    })
    .refine((data) => data.password_nuevo === data.confirmar_password, {
      message: "Las contraseñas no coinciden",
      path: ["confirmar_password"],
    });

  const form = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password_actual: "",
      password_nuevo: "",
      confirmar_password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof passwordUpdateSchema>) => {
    try {
      const res = await actualizarContraseñaUsuario(data);
      if ("message" in res) {
        toast.success(res.message);
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Error al actualizar la contraseña. Por favor, inténtelo de nuevo.");
      } else {
        toast.error("Error inesperado al actualizar la contraseña.");
      }
    }
  };
  return {
    form,
    onSubmit,
  };
};
