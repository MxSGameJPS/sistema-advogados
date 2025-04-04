"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Componente de login que usa useSearchParams
function ClienteLoginContent() {
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verificar se já está logado
    const clienteAuth = localStorage.getItem("clienteAuth");

    if (clienteAuth) {
      router.push("/cliente/dashboard");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simular validação de credenciais
    setTimeout(() => {
      if (credentials.user.trim() && credentials.password.trim()) {
        // Mock de autenticação - em produção, isso seria validado no servidor
        if (
          credentials.user === "cliente" &&
          credentials.password === "admin"
        ) {
          const userData = {
            id: 1,
            nome: "Cliente Demo",
            email: "cliente@exemplo.com",
            telefone: "(11) 98765-4321",
            cpf: "123.456.789-00",
            dataCadastro: "2023-01-15",
          };
          localStorage.setItem("clienteAuth", JSON.stringify(userData));
          const returnTo = searchParams.get("returnTo") || "/cliente/dashboard";
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
    }, 800);
  };

  // Estilos inline para substituir os módulos CSS
  const styles = {
    pageContainer: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    loginContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      backgroundColor: "#f5f5f5",
      marginTop: "80px",
    },
    loginCard: {
      display: "flex",
      width: "100%",
      maxWidth: "900px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    logoSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      backgroundColor: "#4caf50",
      color: "white",
      textAlign: "center",
    },
    logoPlaceholder: {
      width: "120px",
      height: "120px",
      backgroundColor: "#fff",
      borderRadius: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#4caf50",
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
      color: "#4caf50",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    loginButton: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    loginButtonHover: {
      backgroundColor: "#388e3c",
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
    createAccount: {
      marginTop: "20px",
      textAlign: "center",
    },
    createAccountLink: {
      color: "#4caf50",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  // Para telas menores - adiciona estilos responsivos manualmente
  if (typeof window !== "undefined" && window.innerWidth <= 900) {
    styles.loginCard.flexDirection = "column";
    styles.loginCard.maxWidth = "500px";
  }

  return (
    <div style={styles.pageContainer}>
      <Header />
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <div style={styles.logoSection}>
            <div style={styles.logoPlaceholder}>
              <span>MD</span>
            </div>
            <h1 style={styles.title}>MaisDireito</h1>
            <p style={styles.subtitle}>Acesso à Área do Cliente</p>
          </div>

          <div style={styles.formSection}>
            <form onSubmit={handleSubmit} style={styles.loginForm}>
              {error && <div style={styles.errorMessage}>{error}</div>}

              <div style={styles.inputGroup}>
                <label htmlFor="user" style={styles.label}>
                  Usuário
                </label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={credentials.user}
                  onChange={handleChange}
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
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Sua senha"
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.rememberForgot}>
                <div style={styles.rememberMe}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    style={styles.rememberMeInput}
                  />
                  <label htmlFor="rememberMe">Lembrar-me</label>
                </div>
                <Link href="#" style={styles.forgotPassword}>
                  Esqueceu a senha?
                </Link>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.loginButton,
                  ...(loading ? styles.loginButtonDisabled : {}),
                }}
                disabled={loading}
              >
                {loading ? "Processando..." : "Entrar"}
              </button>

              <div style={styles.createAccount}>
                <p>Não tem uma conta?</p>
                <Link href="/cliente/cadastro" style={styles.createAccountLink}>
                  Criar conta
                </Link>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  color: "#777",
                }}
              >
                <p>
                  <strong>Credencial para teste:</strong>
                </p>
                <p>
                  Usuário: <strong>cliente</strong> / Senha:{" "}
                  <strong>admin</strong>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Componente de Fallback para o Suspense
function LoginFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        Carregando...
      </div>
      <Footer />
    </div>
  );
}

// Componente principal que renderiza o ClienteLoginContent com Suspense
export default function ClienteLogin() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <ClienteLoginContent />
    </Suspense>
  );
}
