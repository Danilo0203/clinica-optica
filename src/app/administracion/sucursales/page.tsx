import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { ModalNuevoSucursal } from "@/features/sucursales/components/modal/nuevo-sucursal";
import SucursalesListingPage from "@/features/sucursales/components/sucursal-listing";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
export const metadata = {
  title: "Administracion: Sucursales",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Sucursales" description="Tabla de administracion de Sucursales" />
          {/* <Link href="/administracion/permisos/nuevo" className={cn(buttonVariants(), "text-xs md:text-sm")}>
            <IconPlus className="size-4" /> Nuevo Permiso
          </Link> */}
          <ModalNuevoSucursal />
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />}
        >
          <SucursalesListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
