export const convertToObject = (data) => JSON.parse(JSON.stringify(data));

import {getCurrentUser} from "@/lib/auth";

export async function requireAdmin() {
  const {user} = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return {
      authorized: false,
      response: {success: false, message: "Unauthorized."},
    };
  }
  return {authorized: true, user};
}
