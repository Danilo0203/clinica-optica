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
import { useMutateRolDelete, useMutateRolUpdate } from "@/hooks/administracion/rol/useMutateRol";
import { ListarRolesType } from "@/interfaces/rol.interfaces";
import { IconEdit, IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { FormRol } from "../modal/form-rol";
import { useFormRol } from "@/hooks/administracion/rol/useFormRol";

interface CellActionProps {
  data: ListarRolesType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openActuaizar, setOpenActualizar] = useState(false);
  const { form, onSubmit } = useFormRol(setOpen, data);
  const mutateDeleteRol = useMutateRolDelete(setOpen);
  const onConfirmDelete = async () => {
    await mutateDeleteRol.mutateAsync(data.id);
  };
  const mutateUpadateRol = useMutateRolUpdate(setOpenActualizar);
  const onConfirmUpdate = async () => {
    await mutateUpadateRol.mutateAsync({ ...form.getValues(), id: data.id });
  };

  return (
    <>
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
      <AlertModal
        title="Actualizar Rol"
        description="Actualizar los detalles del rol seleccionado."
        isOpen={openActuaizar}
        onClose={() => setOpenActualizar(false)}
        onConfirm={onConfirmUpdate}
        loading={mutateUpadateRol.isPending}
        icon="Upload"
      >
        <FormRol form={form} onSubmit={onSubmit} />
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
          <DropdownMenuItem onClick={() => setOpenActualizar(true)} className="hover:bg-blue-400/20!">
            <IconEdit className="size-4" /> Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} className="hover:bg-red-400/20! text-red-400!">
            <IconTrash className="size-4 text-red-400" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
