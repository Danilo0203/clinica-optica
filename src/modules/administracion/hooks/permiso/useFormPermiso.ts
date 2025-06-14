import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutatePermiso } from "./useMutatePermiso";
import { Permiso, permisoSchema } from "../../schemas/permiso.schema";
import { useRouter } from "next/navigation";

export const useFormPermiso = (setOpen: (open: boolean) => void) => {
  const form = useForm<Permiso>({
    defaultValues: {
      nombre: "",
      descripcion: "",
      codigo: "",
      activo: true,
    },
    // defaultValues: async () => obtenerPermisoId(data?.id || 0),
    resolver: zodResolver(permisoSchema),
    mode: "onChange",
  });
  const crearPermiso = useMutatePermiso();
  const router = useRouter();

  const onSubmit = (data: Permiso) => {
    crearPermiso.mutate(data);
    form.reset();
    setOpen(false);
    // router.refresh();
  };
  return {
    form,
    onSubmit,
  };
};
