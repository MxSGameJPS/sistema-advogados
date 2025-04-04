"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tipoLogin, setTipoLogin] = useState("admin");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verificar o tipo de login baseado na URL
    const type = searchParams.get("type") || "admin";
    setTipoLogin(type);

    // Verificar se já está logado
    const adminAuth = localStorage.getItem("adminAuth");
    const advogadoAuth = localStorage.getItem("advogadoAuth");

    if (type === "admin" && adminAuth) {
      router.push("/admin/dashboard");
    } else if (type === "advogado" && advogadoAuth) {
      router.push("/advogado/dashboard");
    }
  }, [router, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular validação de credenciais
    setTimeout(() => {
      if (user.trim() && password.trim()) {
        // Mock de autenticação - em produção, isso seria validado no servidor
        const userData = { user, role: tipoLogin };

        if (tipoLogin === "admin" && user === "admin" && password === "admin") {
          localStorage.setItem("adminAuth", JSON.stringify(userData));
          const returnTo = searchParams.get("returnTo") || "/admin/dashboard";
          router.push(returnTo);
        } else if (
          tipoLogin === "advogado" &&
          user === "advogado" &&
          password === "admin"
        ) {
          localStorage.setItem("advogadoAuth", JSON.stringify(userData));
          const returnTo =
            searchParams.get("returnTo") || "/advogado/dashboard";
          router.push(returnTo);
        } else {
          setError(
            "Credenciais inválidas. Verifique usuário/senha e tente novamente."
          );
        }
      } else {
        setError("Por favor, preencha todos os campos");
      }
      setLoading(false);
    }, 1000);
  };

  // Estilos inline para substituir os módulos CSS
  const styles = {
    loginContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
      padding: "20px",
    },
    loginCard: {
      display: "flex",
      width: "100%",
      maxWidth: "900px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
    },
    logoSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      backgroundColor: "var(--color-primary)",
      color: "white",
      textAlign: "center",
    },
    logoPlaceholder: {
      width: "120px",
      height: "120px",
      backgroundColor: "var(--color-accent)",
      borderRadius: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "var(--color-primary-dark)",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "10px",
      fontWeight: "700",
    },
    subtitle: {
      fontSize: "1.1rem",
      opacity: "0.9",
      maxWidth: "80%",
      margin: "0 auto",
    },
    formSection: {
      flex: "1",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    loginForm: {
      width: "100%",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "var(--color-text)",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "1px solid #e1e1e1",
      borderRadius: "8px",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    rememberForgot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    rememberMe: {
      display: "flex",
      alignItems: "center",
    },
    rememberMeInput: {
      marginRight: "8px",
    },
    forgotPassword: {
      color: "var(--color-accent)",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    loginButton: {
      width: "100%",
      padding: "14px",
      backgroundColor: "var(--color-accent)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    loginButtonDisabled: {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
    errorMessage: {
      color: "#e53935",
      marginBottom: "16px",
      padding: "8px 12px",
      backgroundColor: "rgba(229, 57, 53, 0.1)",
      borderRadius: "4px",
      fontSize: "0.9rem",
    },
    loginFooter: {
      marginTop: "24px",
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "0.85rem",
    },
  };

  // Para telas menores - adiciona estilos responsivos manualmente
  if (typeof window !== "undefined" && window.innerWidth <= 900) {
    styles.loginCard.flexDirection = "column";
    styles.loginCard.maxWidth = "500px";
  }

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.logoSection}>
          <div style={styles.logoPlaceholder}>
            <span>MD</span>
          </div>
          <h1 style={styles.title}>MaisDireito</h1>
          <p style={styles.subtitle}>
            {tipoLogin === "admin"
              ? "Acesso ao Painel Administrativo"
              : "Acesso ao Portal do Advogado"}
          </p>
          <Link href="/" style={{ color: "white" }}>
            Voltar a Home
          </Link>
        </div>

        <div style={styles.formSection}>
          <form onSubmit={handleSubmit} style={styles.loginForm}>
            <div style={styles.inputGroup}>
              <label htmlFor="user" style={styles.label}>
                Usuário
              </label>
              <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Seu nome de usuário"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                required
                style={styles.input}
              />
            </div>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <div style={styles.rememberForgot}>
              <div style={styles.rememberMe}>
                <input
                  type="checkbox"
                  id="remember"
                  style={styles.rememberMeInput}
                />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <a href="#" style={styles.forgotPassword}>
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              style={{
                ...styles.loginButton,
                ...(loading ? styles.loginButtonDisabled : {}),
              }}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>

            <div
              style={{
                marginTop: "20px",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              <p style={{ marginBottom: "8px" }}>
                <strong>Credenciais para teste:</strong>
              </p>
              {tipoLogin === "admin" ? (
                <div>
                  <p>
                    Admin: usuario <strong>admin</strong> / senha{" "}
                    <strong>admin</strong>
                  </p>
                  <a
                    href={`/admin/login?type=advogado${
                      searchParams.get("returnTo")
                        ? `&returnTo=${searchParams.get("returnTo")}`
                        : ""
                    }`}
                    style={{
                      color: "var(--color-accent)",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    Entrar como advogado
                  </a>
                </div>
              ) : (
                <div>
                  <p>
                    Advogado: usuario <strong>advogado</strong> / senha{" "}
                    <strong>admin</strong>
                  </p>
                  <a
                    href={`/admin/login?type=admin${
                      searchParams.get("returnTo")
                        ? `&returnTo=${searchParams.get("returnTo")}`
                        : ""
                    }`}
                    style={{
                      color: "var(--color-accent)",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    Entrar como administrador
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div style={styles.loginFooter}>
        <p>© 2025 Saulo Pavanello - Todos os direitos reservados</p>
      </div>
    </div>
  );
}
