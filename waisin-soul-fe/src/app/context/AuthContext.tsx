"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "../lib/supabase-browser";

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserInfo: (userInfo: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapSupabaseUser = (authUser: SupabaseUser): User => ({
  id: authUser.id,
  name:
    (authUser.user_metadata?.name as string) ||
    authUser.email?.split("@")[0] ||
    "User",
  email: authUser.email ?? "",
  address: authUser.user_metadata?.address as string | undefined,
  city: authUser.user_metadata?.city as string | undefined,
  state: authUser.user_metadata?.state as string | undefined,
  zipCode: authUser.user_metadata?.zipCode as string | undefined,
  country: authUser.user_metadata?.country as string | undefined,
  phone: authUser.user_metadata?.phone as string | undefined,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!mounted) return;

      if (error) {
        setUser(null);
      } else {
        setUser(data.session?.user ? mapSupabaseUser(data.session.user) : null);
      }
      setIsLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setUser(session?.user ? mapSupabaseUser(session.user) : null);
        setIsLoading(false);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    // Store remember me preference in localStorage
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const origin =
      configuredSiteUrl ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");
    const redirectUrl = `${origin}/auth/callback`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: redirectUrl,
      },
    });
    if (error) throw new Error(error.message);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    setUser(null);
  };

  const updateUserInfo = async (userInfo: Partial<User>) => {
    const { name, email, ...rest } = userInfo;

    const { data, error } = await supabase.auth.updateUser({
      ...(email ? { email } : {}),
      data: {
        ...(name ? { name } : {}),
        ...rest,
      },
    });

    if (error) throw new Error(error.message);
    if (data.user) setUser(mapSupabaseUser(data.user));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        signup,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
