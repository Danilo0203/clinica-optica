import { Rol, rolSchema } from "@/modules/administracion/schemas/rol.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutateRol } from "./useMutateRol";

export const useFormRol = (setOpen: (open: boolean) => void) => {
  const form = useForm<Rol>({
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
    resolver: zodResolver(rolSchema),
    mode: "onChange",
  });
  const crearRol = useMutateRol();
  const onSubmit = (data: Rol) => {
    crearRol.mutate(data);
    form.reset();
    setOpen(false);
  };
  return {
    form,
    onSubmit,
  };
};
