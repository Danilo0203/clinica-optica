import FormCardSkeleton from "@/components/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import RolesViewPage from "@/features/roles/components/roles-view-page";

export const metadata = {
  title: "Administracion: Vista de Roles",
};

type PageProps = { params: Promise<{ roleId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <RolesViewPage roleId={params.roleId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
