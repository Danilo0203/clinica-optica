import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import PermisosViewPage from "@/features/permisos/components/permisos-view-page";

export const metadata = {
  title: "Administracion: Vista de Permisos",
};

type PageProps = { params: Promise<{ permisoId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <PermisosViewPage permisoId={params.permisoId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
