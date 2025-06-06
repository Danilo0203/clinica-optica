import { searchParamsCache } from "@/lib/searchparams";
import { RolesTable } from "./roles-tabla";
import { columns } from "./roles-tabla/columns";
import { getQueryClient } from "@/lib/get-query-client";
import { listRoles } from "@/services/administracion/rol/rol.services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type UsuarioListingPage = {};

export default async function RolListingPage({}: UsuarioListingPage) {
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
    queryKey: ["roles"],
    queryFn: listRoles,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RolesTable columns={columns} />
      </HydrationBoundary>
    </>
  );
}
