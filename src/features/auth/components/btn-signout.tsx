import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";

export const BtnSignOut = () => {
  const handleSignOut = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = "/auth/sign-in";
  };
  return (
    <Button variant="ghost" className="w-full flex justify-start" onClick={handleSignOut}>
      <LogOut />
      Cerrar Sesión
    </Button>
  );
};
