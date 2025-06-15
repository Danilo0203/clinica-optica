import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutateSucursal } from "./useMutateSucursal";
import { Sucursal, sucursalSchema } from "../../schemas/sucursal.schema";

export const useFormSucursal = (setOpen: (open: boolean) => void) => {
  const form = useForm<Sucursal>({
    defaultValues: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      responsable: "",
      activo: true,
    },
    resolver: zodResolver(sucursalSchema),
    mode: "onChange",
  });
  const crearSucursal = useMutateSucursal();

  const onSubmit = (data: Sucursal) => {
    crearSucursal.mutate(data);
    form.reset();
    setOpen(false);
  };
  return {
    form,
    onSubmit,
  };
};
