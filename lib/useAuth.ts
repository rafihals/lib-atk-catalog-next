// useAuth.ts (React hook for global auth state)
import { useEffect, useState } from "react";
import { getSession, logout } from "@/lib/authService";

export function useAuth() {
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    const handleStorage = () => {
      setSession(getSession());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const signOut = async () => {
    await logout();
    setSession(null);
  };

  return { session, signOut };
}
