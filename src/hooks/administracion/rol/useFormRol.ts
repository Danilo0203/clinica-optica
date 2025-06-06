import { Rol, rolSchema } from "@/schemas/administracion/rol/rol.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutateRol } from "./useMutateRol";

export const useFormRol = (setOpen: (open: boolean) => void, data?: Partial<Rol> & { id: number }) => {
  const isEdit = Boolean(data);
  const form = useForm<Rol>({
    defaultValues: {
      nombre: data?.nombre ? data.nombre : "",
      descripcion: data?.descripcion ? data.descripcion : "",
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
