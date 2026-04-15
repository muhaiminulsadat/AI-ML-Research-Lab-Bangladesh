import {connection} from "next/server";

export default async function AdminLayout({children}) {
  await connection();
  return <>{children}</>;
}