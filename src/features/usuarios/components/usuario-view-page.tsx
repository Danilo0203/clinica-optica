import { fakeProducts, Product } from "@/constants/mock-api";
import { notFound } from "next/navigation";
import ProductForm from "./usuario-form";

type TUsuarioViewPageProps = {
  usuarioId: string;
};

export default async function UsuarioViewPage({ usuarioId }: TUsuarioViewPageProps) {
  let usuario = null;
  let pageTitle = "Crear Nuevo Usuario";
  if (usuarioId !== "nuevo") {
    const data = await fakeProducts.getProductById(Number(usuarioId));
    usuario = data.product as Product;
    if (!usuario) {
      notFound();
    }
    pageTitle = `Editar Usuario`;
  }

  return <ProductForm initialData={usuario} pageTitle={pageTitle} />;
}
