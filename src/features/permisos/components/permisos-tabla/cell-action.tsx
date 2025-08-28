"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { useFormPermiso } from "@/modules/administracion/hooks/permiso/useFormPermiso";
import { useMutatePermisoDelete, useMutatePermisoUpdate } from "@/modules/administracion/hooks/permiso/useMutatePermiso";
import { ListarPermisosType } from "@/modules/administracion/interfaces/permisos.interfaces";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { FormPermiso } from "../modal/form-permiso";
import { useQuery } from "@tanstack/react-query";
import { obtenerPermisoId } from "@/modules/administracion/services/permiso.services";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CellActionProps {
  data: ListarPermisosType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openActuaizar, setOpenActualizar] = useState(false);
  const { form, onSubmit } = useFormPermiso(setOpen);

  // desactivar permiso
  const mutateDeletePermiso = useMutatePermisoDelete(setOpen);
  const onConfirmDelete = async () => {
    await mutateDeletePermiso.mutateAsync(data.id);
  };

  // actualizar permiso
  // const mutateUpadatePermiso = useMutatePermisoUpdate(setOpenActualizar);

  // Actualizar Permiso
  const mutateUpadatePermiso = useMutatePermisoUpdate(setOpenActualizar);
  const onConfirmUpdate = async () => {
    await mutateUpadatePermiso.mutateAsync({ ...form.getValues(), id: data.id });
  };

  const {
    data: permiso,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["permiso", data.id],
    queryFn: () => obtenerPermisoId(data.id),
    enabled: openActuaizar,
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
    if (permiso) form.reset(permiso);
  }, [permiso]);

  return (
    <>
      {/* Desactivar Permiso */}
      <AlertModal
        title="Desactivar Permiso"
        description="Esta acción desactivará el permiso."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmDelete}
        loading={mutateDeletePermiso.isPending}
        icon="Trash2"
      >
        <div>
          <p>
            ¿Estás seguro de que deseas desactivar el permiso <strong>"{data.nombre}"</strong>?
          </p>
        </div>
      </AlertModal>
      {/* Actualizar Permiso */}
      <AlertModal
        title="Actualizar Permiso"
        description="Actualizar los detalles del permiso seleccionado."
        isOpen={openActuaizar}
        onClose={() => setOpenActualizar(false)}
        onConfirm={onConfirmUpdate}
        loading={mutateUpadatePermiso.isPending}
        icon="SquarePen"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Cargando...
            </span>
          </div>
        ) : (
          <FormPermiso form={form} onSubmit={onSubmit} />
        )}
      </AlertModal>
      {/* <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={openUpdateModal}>
            <IconEdit className="size-4" /> Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} className="hover:bg-red-400/20! text-red-400!">
            <IconTrash className="size-4 text-red-400" /> Desactivar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={openUpdateModal}>
          <IconEdit className="size-4" />
        </Button>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => setOpen(true)}>
          <IconTrash className="size-4 text-red-400" />
        </Button>
      </div>
    </>
  );
};
