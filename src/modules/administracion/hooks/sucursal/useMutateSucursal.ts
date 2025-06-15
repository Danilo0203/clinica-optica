import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Sucursal } from "../../schemas/sucursal.schema";
import { actualizarSucursal, crearSucursal, eliminarSucursal } from "../../services/sucursal.services";

export const useMutateSucursal = () => {
  const queryClient = useQueryClient();
  const mutateSucursal = useMutation({
    mutationFn: crearSucursal,
    onMutate: async (nuevoSucursal: Sucursal) => {
      await queryClient.cancelQueries({ queryKey: ["sucursales"] });
      const previousSucursales = queryClient.getQueryData(["sucursales"]);
      queryClient.setQueryData(["sucursales"], (old: Sucursal[] = []) => [
        ...old,
        {
          ...nuevoSucursal,
          id: Date.now(), // Simular un ID único para el nuevo sucursal
        },
      ]);
      return { previousSucursales };
    },
    onError: (error, nuevoSucursal, context) => {
      queryClient.setQueryData(["sucursales"], context?.previousSucursales);
      toast.error(`Error al crear el sucursal: ${error.message}`);
    },
    onSettled: (data) => {
      toast.success(`Sucursal "${data?.nombre}" creado exitosamente.`);
      queryClient.invalidateQueries({ queryKey: ["sucursales"] });
    },
  });

  return mutateSucursal;
};

export const useMutateSucursalDelete = (setOpen: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eliminarSucursal,
    onMutate: async (idSucursal: number) => {
      await queryClient.cancelQueries({ queryKey: ["sucursales"] });

      const previousSucursales = queryClient.getQueryData<Sucursal[]>(["sucursales"]);

      queryClient.setQueryData<(Partial<Sucursal> & { id: number })[]>(["sucursales"], (old = []) =>
        old.filter((sucursal) => sucursal.id !== idSucursal)
      );

      return { previousSucursales };
    },
    onError: (error, idSucursal, context) => {
      toast.error(`Error al eliminar el sucursal: ${error.message}`);
      if (context?.previousSucursales) {
        queryClient.setQueryData(["sucursales"], context.previousSucursales);
      }
    },
    onSuccess: () => {
      setOpen(false);
      toast.success(`Sucursal eliminado exitosamente`);
      queryClient.clear();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sucursales"] });
      queryClient.clear();
    },
  });
};

export const useMutateSucursalUpdate = (setOpenActualizar: (open: boolean) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: actualizarSucursal,
    onMutate: async (sucursalActualizado: Sucursal & { id: number }) => {
      await queryClient.cancelQueries({ queryKey: ["sucursales"] });
      const previousSucursales = queryClient.getQueryData<Sucursal[]>(["sucursales"]);
      queryClient.setQueryData<(Partial<Sucursal> & { id: number })[]>(["sucursales"], (old = []) =>
        old.map((sucursal) =>
          sucursal.id === sucursalActualizado.id ? { ...sucursal, ...sucursalActualizado } : sucursal
        )
      );
      return { previousSucursales };
    },
    onError: (error, sucursalActualizado, context) => {
      queryClient.setQueryData(["sucursales"], context?.previousSucursales);
      toast.error(`Error al actualizar el sucursal: ${error.message}`);
    },
    onSuccess: (data) => {
      toast.success(`Sucursal "${data.nombre}" actualizado correctamente.`);
      setOpenActualizar(false);
      queryClient.invalidateQueries({ queryKey: ["sucursales"] });
    },
    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ["permisos"] });
    },
  });
};
