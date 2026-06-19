"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the user's profile from the "profiles" table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    }
  };

  // Listen to Supabase auth state changes (login, logout, token refresh)
  useEffect(() => {
    // Get the current session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) fetchProfile(currentUser.id);
      setIsLoading(false);
    });

    // Subscribe to future auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) fetchProfile(currentUser.id);
        else setProfile(null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // LOGIN with email + password
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { success: false, error: error.message };
      return { success: true, user: data.user };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // REGISTER a new user
  const register = async (userData) => {
    try {
      // 1. Create the auth account
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
          },
        },
      });
      if (error) return { success: false, error: error.message };

      // 2. Save extra profile info to the "profiles" table
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          company: userData.company || "",
          city: userData.city || "",
          state: userData.state || "",
          is_wholesale: true,
        });
        if (profileError) console.error("Profile save error:", profileError);
      }

      return { success: true, user: data.user };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  // UPDATE PROFILE
  const updateProfile = async (userData) => {
    try {
      if (!user) return { success: false, error: "Not logged in" };
      const { error } = await supabase
        .from("profiles")
        .update(userData)
        .eq("id", user.id);
      if (error) return { success: false, error: error.message };
      setProfile((prev) => ({ ...prev, ...userData }));
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // The displayed user object merges Supabase auth user with profile data
  const displayUser = user
    ? {
        id: user.id,
        email: user.email,
        name: profile?.name || user.user_metadata?.name || "Customer",
        phone: profile?.phone || user.user_metadata?.phone || "",
        company: profile?.company || "",
        city: profile?.city || "",
        state: profile?.state || "",
        isWholesale: profile?.is_wholesale ?? true,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user: displayUser,
        rawUser: user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
