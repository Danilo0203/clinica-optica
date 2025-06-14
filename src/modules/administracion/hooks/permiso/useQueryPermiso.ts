import { useQuery } from "@tanstack/react-query";
import { listPermisos } from "../../services/permiso.services";

export const useQueryPermiso = () => {
  const permisoQuery = useQuery({
    queryKey: ["permisos"],
    queryFn: listPermisos,
  });
  return {
    permisoQuery,
  };
};
