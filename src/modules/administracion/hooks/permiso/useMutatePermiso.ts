import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Permiso } from "../../schemas/permiso.schema";
import { actualizarPermiso, crearPermiso, eliminarPermiso } from "../../services/permiso.services";

export const useMutatePermiso = () => {
  const queryClient = useQueryClient();
  const mutatePermiso = useMutation({
    mutationFn: crearPermiso,
    onMutate: async (nuevoPermiso: Permiso) => {
      await queryClient.cancelQueries({ queryKey: ["permisos"] });
      const previousPermisos = queryClient.getQueryData(["permisos"]);
      queryClient.setQueryData(["permisos"], (old: Permiso[] = []) => [
        ...old,
        {
          ...nuevoPermiso,
          id: Date.now(), // Simular un ID único para el nuevo rol
        },
      ]);
      return { previousPermisos };
    },
    onError: (error, nuevoPermiso, context) => {
      queryClient.setQueryData(["permisos"], context?.previousPermisos);
      toast.error(`Error al crear el permiso: ${error.message}`);
    },
    onSuccess: (data) => {
      toast.success(`Permiso "${data?.nombre}" creado exitosamente.`);
      queryClient.invalidateQueries({ queryKey: ["permisos"] });
    },
  });

  return mutatePermiso;
};

export const useMutatePermisoDelete = (setOpen: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarPermiso,
    onMutate: async (idRol: number) => {
      await queryClient.cancelQueries({ queryKey: ["permisos"] });

      const previousPermisos = queryClient.getQueryData<Permiso[]>(["permisos"]);

      queryClient.setQueryData<(Partial<Permiso> & { id: number })[]>(["permisos"], (old = []) =>
        old.filter((rol) => rol.id !== idRol)
      );

      return { previousPermisos };
    },
    onError: (error, idRol, context) => {
      toast.error(`Error al desactivar el permiso: ${error.message}`);
      if (context?.previousPermisos) {
        queryClient.setQueryData(["permisos"], context.previousPermisos);
      }
    },
    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["permisos"] });
      toast.success(data?.mensaje || "Permiso desactivado exitosamente");
    },
  });
};

export const useMutatePermisoUpdate = (setOpenActualizar: (open: boolean) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: actualizarPermiso,
    onMutate: async (permisoActualizado: Permiso & { id: number }) => {
      await queryClient.cancelQueries({ queryKey: ["permisos"] });
      const previousPermisos = queryClient.getQueryData<Permiso[]>(["permisos"]);
      queryClient.setQueryData<(Partial<Permiso> & { id: number })[]>(["permisos"], (old = []) =>
        old.map((rol) => (rol.id === permisoActualizado.id ? { ...rol, ...permisoActualizado } : rol))
      );
      return { previousPermisos };
    },
    onError: (error, permisoActualizado, context) => {
      queryClient.setQueryData(["permisos"], context?.previousPermisos);
      toast.error(`Error al actualizar el permiso: ${error.message}`);
    },
    onSuccess: (data) => {
      toast.success(`Permiso "${data.nombre}" actualizado correctamente.`);
      setOpenActualizar(false);
      queryClient.invalidateQueries({ queryKey: ["permisos"] });
    },
  });
};
