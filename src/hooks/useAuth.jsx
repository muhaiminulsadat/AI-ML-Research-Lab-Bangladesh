"use client";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import { toast } from "sonner";


export function useLoggedIn() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  return {user: session?.user, isPending};
}

export const useGetCurrentUser = () => {
  const {data: session, isPending} = authClient.useSession();
  return {user: session?.user, isPending};
};

export function useNotLoggedIn() {
  const router = useRouter();
  const {data: session, isPending} = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  return {user: session?.user, isPending};
}

export const useLogOut = () => {
  const router = useRouter();

  const logout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You are signed out.");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return {logout};
};

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    await authClient.signIn.email(
      {email, password},
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.success("Welcome back! Taking you in...");
          setLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "Something went wrong. Please try again.",
          );
          setLoading(false);
        },
      },
    );
  };

  return {login, loading};
};

export const useSignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signUp = async (name, email, password) => {
    await authClient.signUp.email(
      {name, email, password},
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.success("Account created! Welcome to Antorlipi.");
          setLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(
            ctx.error.message || "Something went wrong. Please try again.",
          );
          setLoading(false);
        },
      },
    );
  };

  return {signUp, loading};
};
