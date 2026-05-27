import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabaseAdmin as supabase } from "../lib/supabase";
import {
  auth,
  createUserWithEmailAndPassword as fbCreateUser,
  signInWithEmailAndPassword as fbSignIn,
  signInWithPopup,
  googleProvider,
  firebaseSignOut,
  onAuthStateChanged,
  User,
} from "../lib/firebase";
import { uploadAvatar, deleteAvatar } from "../lib/storage";

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  area?: string;
  city?: string;
  preferences?: string[];
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, profile: Partial<UserProfile>) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: string }>;
  uploadAvatarFile: (file: File) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (!error && data) setProfile(data as UserProfile);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.uid);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) fetchProfile(firebaseUser.uid);
      else setProfile(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    try {
      const cred = await fbCreateUser(auth, email, password);
      const uid = cred.user.uid;

      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: uid,
        full_name: profileData.full_name || "",
        phone: profileData.phone || null,
        date_of_birth: profileData.date_of_birth || null,
        gender: profileData.gender || null,
        address: profileData.address || null,
        area: profileData.area || null,
        city: profileData.city || "Abu Dhabi",
        preferences: profileData.preferences || [],
      });
      if (profileError) console.warn("Profile insert warning:", profileError);
      return {};
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      return { error: e?.message || "Sign up failed" };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await fbSignIn(auth, email, password);
      return {};
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      return { error: e?.message || "Sign in failed" };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const uid = result.user.uid;

      const { data: existing } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("id", uid)
        .single();

      if (!existing) {
        await supabase.from("user_profiles").insert({
          id: uid,
          full_name: result.user.displayName || "",
          avatar_url: result.user.photoURL,
        });
      }
      return {};
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      return { error: e?.message || "Google sign in failed" };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: "Not authenticated" };
    const { error } = await supabase
      .from("user_profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", user.uid);
    if (error) return { error: error.message };
    await refreshProfile();
    return {};
  };

  const uploadAvatarFile = async (file: File): Promise<string | null> => {
    if (!user) return null;
    try {
      await deleteAvatar();
      const url = await uploadAvatar(file);
      await updateProfile({ avatar_url: url });
      return url;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        refreshProfile,
        updateProfile,
        uploadAvatarFile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
