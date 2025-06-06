import { LoginForm } from "@/features/auth/views/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio de sesión",
  description: "Página de inicio de sesión",
};

export default async function Page() {
  return <LoginForm />;
}
