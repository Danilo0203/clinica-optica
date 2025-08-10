"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  useMutateAsignarPermisos,
  useMutateRolDelete,
  useMutateRolUpdate,
} from "@/modules/administracion/hooks/rol/useMutateRol";
import { ListarRolesType } from "@/modules/administracion/interfaces/rol.interfaces";
import { IconEdit, IconTrash, IconKey } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { FormRol } from "../modal/form-rol";
import { useFormRol } from "@/modules/administracion/hooks/rol/useFormRol";
import { useQuery } from "@tanstack/react-query";
import { obtenerRolId } from "@/modules/administracion/services/rol.services";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQueryPermiso } from "@/modules/administracion/hooks/permiso/useQueryPermiso";
import TransferPermisos from "../transfer-permisos";

interface CellActionProps {
  data: ListarRolesType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openActuaizar, setOpenActualizar] = useState(false);
  const [openAsignarPermisos, setOpenAsignarPermisos] = useState(false);
  const [selectedPermisos, setSelectedPermisos] = useState<number[]>([]);

  const { form, onSubmit } = useFormRol(setOpen);

  // Eliminar Rol
  const mutateDeleteRol = useMutateRolDelete(setOpen);
  const onConfirmDelete = async () => {
    await mutateDeleteRol.mutateAsync(data.id);
  };

  // Actualizar Rol
  const mutateUpadateRol = useMutateRolUpdate(setOpenActualizar);
  const onConfirmUpdate = async () => {
    await mutateUpadateRol.mutateAsync({ ...form.getValues(), id: data.id });
  };

  // Asignar permisos
  const mutateAsignarPermisos = useMutateAsignarPermisos(setOpenAsignarPermisos);
  const onConfirmAsignarPermisos = async () => {
    await mutateAsignarPermisos.mutateAsync({ rolId: data.id, permisos: selectedPermisos });
  };

  const { permisoQuery } = useQueryPermiso();

  const {
    data: rol,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["permiso", data.id],
    queryFn: () => obtenerRolId(data.id),
    enabled: openActuaizar || openAsignarPermisos,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  // abrir modal: activar fetch
  const openUpdateModal = () => {
    setOpenActualizar(true);
    refetch();
  };

  // cuando el query tenga datos, setear en el form
  useEffect(() => {
    if (rol) form.reset(rol);
  }, [rol]);

  useEffect(() => {
    if (openAsignarPermisos && rol?.permisos) {
      const ids = rol.permisos.map((p: any) => (typeof p === "number" ? p : p.id));
      setSelectedPermisos(ids);
    }
  }, [openAsignarPermisos, rol]);

  return (
    <>
      {/* Eliminar Rol */}
      <AlertModal
        title="Eliminar Rol"
        description="Esta acción eliminará el rol de forma permanente."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmDelete}
        loading={mutateDeleteRol.isPending}
        icon="Trash2"
      >
        <div>
          <p>
            ¿Estás seguro de que deseas eliminar el rol <strong>"{data.nombre}"</strong>?
          </p>
        </div>
      </AlertModal>
      {/* Actualizar Rol */}
      <AlertModal
        title="Actualizar Rol"
        description="Actualizar los detalles del rol seleccionado."
        isOpen={openActuaizar}
        onClose={() => setOpenActualizar(false)}
        onConfirm={onConfirmUpdate}
        loading={mutateUpadateRol.isPending}
        icon="SquarePen"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Cargando...
            </span>
          </div>
        ) : (
          <FormRol form={form} onSubmit={onSubmit} />
        )}
      </AlertModal>

      {/* Asignar Permisos al Rol */}
      <AlertModal
        title="Asignar Permisos"
        description="Selecciona los permisos que tendrá este rol."
        isOpen={openAsignarPermisos}
        onClose={() => setOpenAsignarPermisos(false)}
        onConfirm={onConfirmAsignarPermisos}
        loading={mutateAsignarPermisos.isPending || permisoQuery.isLoading}
        icon="Key"
        className="max-w-5xl!"
      >
        {permisoQuery.isLoading || isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="animate-spin mr-2" /> Cargando permisos...
          </div>
        ) : (
          <TransferPermisos
            all={permisoQuery.data ?? []}
            value={selectedPermisos}
            onChange={setSelectedPermisos}
            height={300}
          />
        )}
      </AlertModal>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={openUpdateModal}>
              <IconEdit className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Actualizar Rol</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpen(true)}>
              <IconTrash className="size-4 text-red-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Eliminar Rol</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setOpenAsignarPermisos(true)}>
              <IconKey className="size-4 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Asignar Permisos</TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};
