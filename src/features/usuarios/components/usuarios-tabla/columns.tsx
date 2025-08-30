"use client";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Column, ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Text, XCircle } from "lucide-react";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { CATEGORY_OPTIONS } from "./options";
import { ListUsuarioType, Usuario } from "@/modules/administracion/interfaces/usuario.interfaces";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Usuario>[] = [
  // {
  //   accessorKey: "fotografia",
  //   header: "Foto",
  //   cell: ({ row }) => {
  //     console.log(row.original);
  //     const data = row.original.map((usuario) => (
  //       <div key={usuario.id} className="relative aspect-square">
  //         <Image src={usuario.fotografia || ""} alt={usuario.nombre_completo} />
  //       </div>
  //     ));
  //     return data;
  //   },
  //   meta: {
  //     label: "Foto",
  //     variant: "text",
  //     icon: Text,
  //   },
  // },
  {
    id: "nombre",
    accessorKey: "nombre_completo",
    // header: ({ column }: { column: Column<ListUsuarioType, unknown> }) => (
    //   <DataTableColumnHeader column={column} title="Nombre" />
    // ),
    header: "Nombre",
    cell: ({ row }) => {
      const nombre_completo = row.original.nombre_completo;
      const username = row.original.username;
      const data = nombre_completo.length > 0 ? nombre_completo : username;
      return data;
    },
    meta: {
      label: "Nombre",
      placeholder: "Buscar usuarios...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "email",
    accessorKey: "email",
    // header: ({ column }: { column: Column<Product, unknown> }) => (
    //   <DataTableColumnHeader column={column} title="Category" />
    // ),
    header: "Email",
    cell: ({ row }) => {
      const data = row.original.email;
      return data;
    },
    // enableColumnFilter: true,
    meta: {
      label: "Email",
      // variant: "multiSelect",
      // options: CATEGORY_OPTIONS,
    },
  },
  {
    id: "rol_nombre",
    accessorKey: "rol_nombre",
    // header: ({ column }: { column: Column<Product, unknown> }) => (
    //   <DataTableColumnHeader column={column} title="Category" />
    // ),
    header: "Rol",
    cell: ({ row }) => {
      const data = row.original.rol_nombre;

      return data;
    },
    // enableColumnFilter: true,
    meta: {
      label: "Rol",
      // variant: "multiSelect",
      // options: CATEGORY_OPTIONS,
    },
  },
  {
    id: "sucursal_nombre",
    accessorKey: "sucursal_nombre",
    // header: ({ column }: { column: Column<Product, unknown> }) => (
    //   <DataTableColumnHeader column={column} title="Category" />
    // ),
    header: "Sucursal",
    cell: ({ row }) => {
      const data = row.original.sucursal_nombre;

      return data;
    },
    // enableColumnFilter: true,
    meta: {
      label: "Sucursal",
      // variant: "multiSelect",
      // options: CATEGORY_OPTIONS,
    },
  },
  {
    accessorKey: "is_active",
    header: "Estado",
    cell: ({ row }) => {
      const data = row.original.is_active;
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
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
