import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

import {nextCookies} from "better-auth/next-js";
import connectDB from "./db";
import {admin} from "better-auth/plugins";

const mongooseInstance = await connectDB();
const client = mongooseInstance.connection.getClient();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  trustedOrigins: ["**"],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },

  plugins: [nextCookies(), admin({defaultRole: "user"})],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 1,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {},
      },
    },
  },
});

// # Get current User
export async function getCurrentUser() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return {user: result?.user};
}

// Get all the users.
export const getAllUsers = async () => {
  const data = await auth.api.listUsers({
    headers: await headers(),
    query: {
      limit: 100,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
  });

  return data?.users ?? [];
};

//Sign out the user
export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/login");
  } else {
    throw new Error("Sign out failed");
  }
}
