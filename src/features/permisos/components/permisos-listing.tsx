import { searchParamsCache } from "@/lib/searchparams";
import { columns } from "./permisos-tabla/columns";
import { PermisosTable } from "./permisos-tabla";
import { getQueryClient } from "@/lib/get-query-client";
import { listPermisos } from "@/modules/administracion/services/permiso.services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type UsuarioListingPage = {};

export default async function PermisosListingPage({}: UsuarioListingPage) {
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
    queryKey: ["permisos"],
    queryFn: listPermisos,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PermisosTable columns={columns} />
      </HydrationBoundary>
    </>
  );
}
