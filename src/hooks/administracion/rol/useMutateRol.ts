import { Rol } from "@/schemas/administracion/rol/rol.schema";
import { actualizarRol, crearRol, eliminarRol } from "@/services/administracion/rol/rol.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutateRol = () => {
  const queryClient = useQueryClient();
  const mutateRol = useMutation({
    mutationFn: crearRol,
    onMutate: async (nuevoRol: Rol) => {
      await queryClient.cancelQueries({ queryKey: ["roles"] });
      const previousRoles = queryClient.getQueryData(["roles"]);
      queryClient.setQueryData(["roles"], (old: Rol[] = []) => [
        ...old,
        {
          ...nuevoRol,
          id: Date.now(), // Simular un ID único para el nuevo rol
        },
      ]);
      return { previousRoles };
    },
    onError: (error, nuevoRol, context) => {
      queryClient.setQueryData(["roles"], context?.previousRoles);
      toast.error(`Error al crear el rol: ${error.message}`);
    },
    onSettled: (data) => {
      toast.success(`Rol "${data.nombre}" creado exitosamente.`);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return mutateRol;
};

export const useMutateRolDelete = (setOpen: (open: boolean) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eliminarRol,
    onMutate: async (idRol: number) => {
      await queryClient.cancelQueries({ queryKey: ["roles"] });

      const previousRoles = queryClient.getQueryData<Rol[]>(["roles"]);

      queryClient.setQueryData<(Partial<Rol> & { id: number })[]>(["roles"], (old = []) =>
        old.filter((rol) => rol.id !== idRol)
      );

      return { previousRoles };
    },
    onError: (error, idRol, context) => {
      toast.error(`Error al eliminar el rol: ${error.message}`);
      if (context?.previousRoles) {
        queryClient.setQueryData(["roles"], context.previousRoles);
      }
    },
    onSuccess: () => {
      setOpen(false);
      toast.success(`Rol eliminado exitosamente`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useMutateRolUpdate = (setOpenActualizar: (open: boolean) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: actualizarRol,
    onMutate: async (rolActualizado: Rol & { id: number }) => {
      await queryClient.cancelQueries({ queryKey: ["roles"] });

      const previousRoles = queryClient.getQueryData<Rol[]>(["roles"]);

      queryClient.setQueryData<(Partial<Rol> & { id: number })[]>(["roles"], (old = []) =>
        old.map((rol) => (rol.id === rolActualizado.id ? { ...rol, ...rolActualizado } : rol))
      );

      return { previousRoles };
    },
    onError: (error, rolActualizado, context) => {
      queryClient.setQueryData(["roles"], context?.previousRoles);
      toast.error(`Error al actualizar el rol: ${error.message}`);
    },
    onSuccess: (data) => {
      toast.success(`Rol "${data.nombre}" actualizado correctamente.`);
      setOpenActualizar(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
