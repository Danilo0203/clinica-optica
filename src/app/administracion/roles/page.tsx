import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import ProductListingPage from "@/features/products/components/product-listing";
import { ModalNuevoRol } from "@/features/roles/components/modal/nuevo-rol";
import RolListingPage from "@/features/roles/components/roles-listing";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
export const metadata = {
  title: "Administracion: Roles",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Roles" description="Tabla de administracion de Roles" />
          <ModalNuevoRol />
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />}
        >
          <RolListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
