import { useQuery } from "@tanstack/react-query";
import { listSucursales } from "../../services/sucursal.services";

export const useQuerySucursal = () => {
  const sucursalQuery = useQuery({
    queryKey: ["sucursales"],
    queryFn: listSucursales,
  });
  return {
    sucursalQuery,
  };
};
