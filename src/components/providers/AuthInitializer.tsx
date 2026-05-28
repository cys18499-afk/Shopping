"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { User } from "@supabase/supabase-js";

export default function AuthInitializer({
  initialUser,
}: {
  initialUser: User | null;
}) {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  return null;
}
