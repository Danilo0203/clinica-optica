import { searchParamsCache } from "@/lib/searchparams";
import { columns } from "./usuarios-tabla/columns";
import { UsuariosTable } from "./usuarios-tabla";
import { getQueryClient } from "@/lib/get-query-client";
import { listUsuarios } from "@/modules/administracion/services/usuario.services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type UsuarioListingPage = {};

export default async function UsuarioListingPage({}: UsuarioListingPage) {
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
    queryKey: ["usuarios"],
    queryFn: listUsuarios,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsuariosTable columns={columns} />
      </HydrationBoundary>
    </>
  );
}
