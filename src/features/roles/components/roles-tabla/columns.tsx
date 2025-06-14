"use client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Text } from "lucide-react";
import { CellAction } from "./cell-action";

import { ListarRolesType } from "@/modules/administracion/interfaces/rol.interfaces";

export const columns: ColumnDef<ListarRolesType>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({ row }) => {
      const id = row.original.id;
      return <div>{id}</div>;
    },
    meta: {
      label: "No",
    },
    maxSize: 1,
  },
  {
    id: "nombre",
    accessorKey: "nombre",
    header: ({ column }: { column: Column<ListarRolesType, unknown> }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => {
      const nombre = row.original.nombre;
      return <div>{nombre}</div>;
    },
    meta: {
      label: "Nombre",
      placeholder: "Buscar roles...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },

  {
    accessorKey: "descripcion",
    header: "Descripcion",
    cell: ({ row }) => {
      const descripcion = row.original.descripcion;
      return <div>{descripcion}</div>;
    },
    meta: {
      label: "Descripcion",
    },
  },

  {
    id: "actions",
    accessorKey: "actions",
    header: () => {
      return "Acciones";
    },
    cell: ({ row }) => <CellAction data={row.original} />,
    meta: {
      label: "Acciones",
    },
  },
];
