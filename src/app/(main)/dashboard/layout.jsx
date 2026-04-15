import {connection} from "next/server";

export default async function DashboardLayout({children}) {
  await connection();
  return <>{children}</>;
}