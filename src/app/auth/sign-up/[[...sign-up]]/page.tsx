import { RegisterForm } from "@/features/auth/views/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
  description: "Página de registro",
};

export default async function Page() {
  return <RegisterForm />;
}
