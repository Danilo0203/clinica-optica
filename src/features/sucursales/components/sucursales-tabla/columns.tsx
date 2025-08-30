"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Text, XCircle } from "lucide-react";
import { CellAction } from "./cell-action";
import { CATEGORY_OPTIONS } from "./options";
import { cn } from "@/lib/utils";
import { ListarSucursalesType } from "@/modules/administracion/interfaces/sucursales.interfaces";

export const columns: ColumnDef<ListarSucursalesType>[] = [
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
    id: "responsable",
    accessorKey: "responsable",
    header: "Responsable",
    cell: ({ row }) => {
      const data = row.original.responsable_nombre;
      return data;
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
      placeholder: "Buscar sucursales...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "direccion",
    accessorKey: "direccion",
    header: "Direccion",
    cell: ({ row }) => {
      const data = row.original.direccion;
      return data;
    },
    // enableColumnFilter: true,
    // meta: {
    //   label: "Direccion",
    //   variant: "multiSelect",
    //   options: CATEGORY_OPTIONS,
    // },
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
    cell: ({ row }) => {
      const data = row.original.telefono;
      return data;
    },
    meta: {
      label: "Telefono",
    },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const data = row.original.activo;
      const Icon = data ? CheckCircle2 : XCircle;
      return (
        <Badge variant="outline" className={cn(data ? "text-green-600 bg-green-300/20!" : "text-destructive bg-destructive/20!")}>
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
