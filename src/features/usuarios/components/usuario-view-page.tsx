"use client";
import { notFound } from "next/navigation";
import UsuarioForm from "./usuario-form";
import { useQueryUsuarioId } from "@/modules/administracion/hooks/usuarios/useQueryUsuarios";
import FormCardSkeleton from "@/components/form-card-skeleton";

type TUsuarioViewPageProps = {
  usuarioId: string;
};

export default function UsuarioViewPage({ usuarioId }: TUsuarioViewPageProps) {
  const isNuevo = usuarioId === "nuevo";
  const id = Number(usuarioId);
  const { usuarioIdQuery } = useQueryUsuarioId(id, { enabled: !isNuevo });

  if (!isNuevo && usuarioIdQuery.isLoading) {
    return <FormCardSkeleton />;
  }

  if (!isNuevo && !usuarioIdQuery.data) {
    notFound();
  }

  const usuario = isNuevo ? null : usuarioIdQuery.data;
  const pageTitle = isNuevo ? "Crear Nuevo Usuario" : "Editar Usuario";

  return <UsuarioForm initialData={usuario} pageTitle={pageTitle} />;
}
