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
import { Usuario } from "@/modules/administracion/interfaces/usuario.interfaces";
import { IconEdit, IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: Usuario;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <IconDotsVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`/administracion/usuarios/${data.id}`)}>
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
