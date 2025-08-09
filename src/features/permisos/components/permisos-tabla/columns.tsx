"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Text, XCircle } from "lucide-react";
import { CellAction } from "./cell-action";
import { CATEGORY_OPTIONS } from "./options";
import { ListarPermisosType } from "@/modules/administracion/interfaces/permisos.interfaces";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<ListarPermisosType>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      const data = row.original.id;
      return data;
    },
    meta: {
      label: "No.",
    },
  },
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      const data = row.original.nombre;
      return data;
    },
    meta: {
      label: "Nombre",
      placeholder: "Buscar permisos...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "descripcion",
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => {
      const data = row.original.descripcion;
      return data;
    },
    enableColumnFilter: true,
    // meta: {
    //   label: "categorias",
    //   variant: "multiSelect",
    //   options: CATEGORY_OPTIONS,
    // },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const data = row.original.activo;
      const Icon = data ? CheckCircle2 : XCircle;
      return (
        <Badge
          variant="outline"
          className={cn(data ? "text-green-600 bg-green-300/20!" : "text-destructive bg-destructive/20!")}
        >
          <Icon />
          {data ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
    meta: {
      label: "Estado",
    },
  },

  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
    meta: {
      label: "Acciones",
    },
  },
];
