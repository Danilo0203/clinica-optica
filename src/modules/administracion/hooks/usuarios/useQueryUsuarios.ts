"use client";
import { listRoles } from "@/modules/administracion/services/rol.services";
import { useQuery } from "@tanstack/react-query";
import { listUsuarios, obtenerUsuarioId } from "../../services/usuario.services";

export const useQueryUsuarios = () => {
  const usuariosQuery = useQuery({
    queryKey: ["usuarios"],
    queryFn: listUsuarios,
  });
  return {
    usuariosQuery,
  };
};

export const useQueryUsuarioId = (id: number, options?: { enabled?: boolean }) => {
  const usuarioIdQuery = useQuery({
    queryKey: ["usuario", id],
    queryFn: () => obtenerUsuarioId(id),
    ...options,
  });

  return { usuarioIdQuery };
};
