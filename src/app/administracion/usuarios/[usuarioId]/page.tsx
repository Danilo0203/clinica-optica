// import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
// import { Suspense } from "react";
import UsuarioViewPage from "@/features/usuarios/components/usuario-view-page";
import { getQueryClient } from "@/lib/get-query-client";
import { obtenerUsuarioId } from "@/modules/administracion/services/usuario.services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Administracion: Vista de Usuario",
};

type PageProps = { params: Promise<{ usuarioId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const queryClient = getQueryClient();
  if (params.usuarioId !== "nuevo") {
    await queryClient.prefetchQuery({
      queryKey: ["usuario", params.usuarioId],
      queryFn: () => obtenerUsuarioId(Number(params.usuarioId)),
    });
  }
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {/* <Suspense fallback={<FormCardSkeleton />}> */}
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UsuarioViewPage usuarioId={params.usuarioId} />
        </HydrationBoundary>
        {/* </Suspense> */}
      </div>
    </PageContainer>
  );
}
