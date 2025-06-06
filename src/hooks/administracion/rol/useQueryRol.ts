"use client";
import { listRoles } from "@/services/administracion/rol/rol.services";
import { useQuery } from "@tanstack/react-query";

export const useQueryRol = () => {
  const rolQuery = useQuery({
    queryKey: ["roles"],
    queryFn: listRoles,
  });
  return {
    rolQuery,
  };
};
