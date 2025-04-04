"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminAuth");

    if (!isLoggedIn) {
      router.push("/admin/login?type=admin&returnTo=/admin/dashboard");
    } else {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Redirecionando...</p>
    </div>
  );
}
