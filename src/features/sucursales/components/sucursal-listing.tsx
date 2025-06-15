import { searchParamsCache } from "@/lib/searchparams";
import { columns } from "./sucursales-tabla/columns";
import { SucursalesTable } from "./sucursales-tabla";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listSucursales } from "@/modules/administracion/services/sucursal.services";

type UsuarioListingPage = {};

export default async function SucursalesListingPage({}: UsuarioListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("name");
  const pageLimit = searchParamsCache.get("perPage");
  const categories = searchParamsCache.get("category");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories }),
  };
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["sucursales"],
    queryFn: listSucursales,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SucursalesTable columns={columns} />
      </HydrationBoundary>
    </>
  );
}
