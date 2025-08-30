"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconEdit, IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { obtenerPermisoId } from "@/modules/administracion/services/permiso.services";
import { Loader2 } from "lucide-react";
import { FormSucursal } from "../form-sucursal";
import { ListarSucursalesType } from "@/modules/administracion/interfaces/sucursales.interfaces";
import { useFormSucursal } from "@/modules/administracion/hooks/sucursal/useFormSucursal";
import {
  useMutateSucursalDelete,
  useMutateSucursalUpdate,
} from "@/modules/administracion/hooks/sucursal/useMutateSucursal";
import { obtenerSucursalId } from "@/modules/administracion/services/sucursal.services";

interface CellActionProps {
  data: ListarSucursalesType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openActuaizar, setOpenActualizar] = useState(false);
  const { form, onSubmit } = useFormSucursal(setOpen);
  const mutateDeletePermiso = useMutateSucursalDelete(setOpen);
  const onConfirmDelete = async () => {
    await mutateDeletePermiso.mutateAsync(data.id);
  };
  const mutateUpadatePermiso = useMutateSucursalUpdate(setOpenActualizar);

  const onConfirmUpdate = async () => {
    await mutateUpadatePermiso.mutateAsync({ ...form.getValues(), id: data.id });
  };

  const {
    data: sucursal,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sucursal", data.id],
    queryFn: () => obtenerSucursalId(data.id),
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
    if (sucursal)
      form.reset({
        nombre: sucursal.nombre,
        direccion: sucursal.direccion,
        telefono: sucursal.telefono,
        activo: sucursal.activo,
        responsable: sucursal.responsable?.toString(),
        responsable_nombre: sucursal.responsable_nombre,
      });
  }, [sucursal]);

  return (
    <>
      {/* Desactivar Permiso */}
      <AlertModal
        title="Desactivar Permiso"
        description="Esta acción eliminará el permiso de forma permanente."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmDelete}
        loading={mutateDeletePermiso.isPending}
        icon="Trash2"
      >
        <div>
          <p>
            ¿Estás seguro de que deseas eliminar el permiso <strong>"{data.nombre}"</strong>?
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
          <FormSucursal form={form} onSubmit={onSubmit} />
        )}
      </AlertModal>
      <DropdownMenu modal={false}>
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
      </DropdownMenu>
    </>
  );
};
