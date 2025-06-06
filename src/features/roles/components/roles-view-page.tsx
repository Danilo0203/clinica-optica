import { fakeProducts, Product } from "@/constants/mock-api";
import { notFound } from "next/navigation";
import ProductForm from "./roles-form";

type TRolViewPageProps = {
  roleId: string;
};

export default async function RolesViewPage({ roleId }: TRolViewPageProps) {
  let rol = null;
  let pageTitle = "Crear Nuevo Rol";
  if (roleId !== "nuevo") {
    const data = await fakeProducts.getProductById(Number(roleId));
    rol = data.product as Product;
    if (!rol) {
      notFound();
    }
    pageTitle = `Editar Rol`;
  }

  return <ProductForm initialData={rol} pageTitle={pageTitle} />;
}
