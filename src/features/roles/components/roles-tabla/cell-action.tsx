"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useMutateRolDelete, useMutateRolUpdate, useMutateAsignarPermisos } from "@/modules/administracion/hooks/rol/useMutateRol";
import { ListarRolesType } from "@/modules/administracion/interfaces/rol.interfaces";
import { IconEdit, IconDotsVertical, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { FormRol } from "../modal/form-rol";
import { useFormAsignarPermisosRol, useFormRol } from "@/modules/administracion/hooks/rol/useFormRol";
import { useQuery } from "@tanstack/react-query";
import { obtenerRolId } from "@/modules/administracion/services/rol.services";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FormAsignarPermisosRol } from "../modal/form-asignar-permisos-rol";

interface CellActionProps {
  data: ListarRolesType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openActuaizar, setOpenActualizar] = useState(false);
  const [openAsignarRoles, setOpenAsignarRoles] = useState(false);
  const { form, onSubmit } = useFormRol(setOpen);
  const { form: formAsignarPermisos, onSubmit: onSubmitAsignarPermisos } = useFormAsignarPermisosRol(setOpenAsignarRoles);

  // eliminar rol
  const mutateDeleteRol = useMutateRolDelete(setOpen);
  const onConfirmDelete = async () => {
    await mutateDeleteRol.mutateAsync(data.id);
  };

  // actualizar rol
  const mutateUpadateRol = useMutateRolUpdate(setOpenActualizar);
  const onConfirmUpdate = async () => {
    await mutateUpadateRol.mutateAsync({ ...form.getValues(), id: data.id });
  };

  // asignar roles

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

      {/* Modal de asignación de roles */}
      <AlertModal
        title="Asignar permisos"
        description={`Asignar permisos al rol ${data.nombre}.`}
        isOpen={openAsignarRoles}
        onClose={() => setOpenAsignarRoles(false)}
        onConfirm={() => {}}
        loading={false}
        icon="UserPlus"
      >
        <FormAsignarPermisosRol form={formAsignarPermisos} onSubmit={onSubmitAsignarPermisos} />
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
          <DropdownMenuItem onClick={openUpdateModal} className="hover:bg-blue-400/20!">
            <IconEdit className="size-4" /> Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} className="hover:bg-red-400/20! text-red-400!">
            <IconTrash className="size-4 text-red-400" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={openUpdateModal}>
              <IconEdit className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Actualizar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => setOpenAsignarRoles(true)}>
              <IconUserPlus className="size-4 text-blue-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Asignar roles</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => setOpen(true)}>
              <IconTrash className="size-4 text-red-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};
