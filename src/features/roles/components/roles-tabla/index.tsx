"use client";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useQueryRol } from "@/modules/administracion/hooks/rol/useQueryRol";
import { useDataTable } from "@/hooks/use-data-table";
import { ListarRolesType } from "@/modules/administracion/interfaces/rol.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
interface RolesTableParams<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}
export function RolesTable<TValue>({ columns }: RolesTableParams<ListarRolesType, TValue>) {
  const { rolQuery } = useQueryRol();
  const data = rolQuery.data || [];
  // const totalItems = rolQuery.data?.length || 0;
  // const [pageSize] = useQueryState("perPage", parseAsInteger.withDefault(10));
  // const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: false,
    shallow: true, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
