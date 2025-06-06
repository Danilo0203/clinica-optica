import { redirect } from "next/navigation";

export default async function Administracion() {
  return redirect("/administracion/usuarios");
}
