import { fakeProducts, Product } from "@/constants/mock-api";
import { notFound } from "next/navigation";
import ProductForm from "./permisos-form";

type TRolViewPageProps = {
  permisoId: string;
};

export default async function PermisosViewPage({ permisoId }: TRolViewPageProps) {
  let rol = null;
  let pageTitle = "Crear Nuevo Permiso";
  if (permisoId !== "nuevo") {
    const data = await fakeProducts.getProductById(Number(permisoId));
    rol = data.product as Product;
    if (!rol) {
      notFound();
    }
    pageTitle = `Editar Permiso`;
  }

  return <ProductForm initialData={rol} pageTitle={pageTitle} />;
}
