"use client";
import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useQueryPermiso } from "@/modules/administracion/hooks/permiso/useQueryPermiso";
import { ListarPermisosType } from "@/modules/administracion/interfaces/permisos.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
interface PermisosTableParams<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}
export function PermisosTable<TData, TValue>({ columns }: PermisosTableParams<ListarPermisosType, TValue>) {
  const [pageSize] = useQueryState("perPage", parseAsInteger.withDefault(10));
  const { permisoQuery } = useQueryPermiso();
  const data = permisoQuery.data || [];
  const pageCount = Math.ceil(data.length / pageSize);
  const { table } = useDataTable({
    data, // product data
    columns, // product columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
