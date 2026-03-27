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

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "general",
        input: false,
      },
      university: {
        type: "string",
        input: true,
      },
      bio: {
        type: "string",
        input: true,
      },
      researchInterests: {
        type: "string[]",
        defaultValue: [],
        input: true,
      },
      socialLinks: {
        type: "string",
        input: true,
      },
      profileImage: {
        type: "string",
        input: true,
      },
      isApproved: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },

  plugins: [nextCookies()],

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
  const database = client.db();
  const users = await database
    .collection("user")
    .find({})
    .sort({createdAt: -1})
    .toArray();
  return users;
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
