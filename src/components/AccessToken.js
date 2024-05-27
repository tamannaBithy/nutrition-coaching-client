"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AccessToken() {
  const { data: session } = useSession();

  useEffect(() => {
    localStorage.setItem("accessToken", session?.user?.accessToken);
  }, [session]);

  return null;
}
