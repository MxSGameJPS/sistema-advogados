"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdvogadoPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("advogadoAuth");

    if (!isLoggedIn) {
      router.push("/admin/login?type=advogado&returnTo=/advogado/dashboard");
    } else {
      router.push("/advogado/dashboard");
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
