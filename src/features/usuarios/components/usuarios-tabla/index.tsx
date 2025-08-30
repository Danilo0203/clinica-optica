"use client";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useQueryUsuarios } from "@/modules/administracion/hooks/usuarios/useQueryUsuarios";
import { useDataTable } from "@/hooks/use-data-table";
import { ListUsuarioType, Usuario } from "@/modules/administracion/interfaces/usuario.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
interface UsuariosTableParams<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}
export function UsuariosTable<TValue>({ columns }: UsuariosTableParams<Usuario, TValue>) {
  const { usuariosQuery } = useQueryUsuarios();
  const data = usuariosQuery.data?.usuarios || [];
  // console.log(data);
  // const totalItems = usuariosQuery.data?.usuarios.length || 0;
  //  const [pageSize] = useQueryState("perPage", parseAsInteger.withDefault(10));
  // const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: false,
    shallow: true,
    debounceMs: 500,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
