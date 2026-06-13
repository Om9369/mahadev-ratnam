"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtected({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn === "true") {
      setAuthorized(true);
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!authorized) {
    return null;
  }

  return children;
}