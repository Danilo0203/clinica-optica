import { redirect } from "next/navigation";

export default async function Dashboard() {
  return redirect("/panel/overview");
}
