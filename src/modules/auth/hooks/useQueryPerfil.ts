import { perfilUsuario } from "@/services/auth/auth.services";
import { useQuery } from "@tanstack/react-query";

export const useQueryPerfil = () => {
  const usePerfil = useQuery({
    queryKey: ["perfilUsuario"],
    queryFn: perfilUsuario,
  });

  return {
    usePerfil,
  };
};
