"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "../admin/dashboard.css"; // Reutilizamos os estilos do admin

export default function ClienteLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("clienteAuth");

      // Se estiver na página de login, não precisa redirecionar
      if (pathname.includes("/cliente/login")) {
        return;
      }

      if (!auth) {
        router.push("/cliente/login");
        return;
      }

      try {
        const user = JSON.parse(auth);
        setUserData(user);
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
        localStorage.removeItem("clienteAuth");
        router.push("/cliente/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("clienteAuth");
    router.push("/cliente/login");
  };

  // Se estiver na página de login, não renderiza o layout completo
  if (pathname.includes("/cliente/login")) {
    return <>{children}</>;
  }

  return (
    <div className={`admin-layout ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ backgroundColor: "#4caf50" }}>
        <div className="sidebar-header">
          <h2>MaisDireito</h2>
          <button
            className="toggle-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <div className="user-info">
          <div
            className="avatar"
            style={{ backgroundColor: "#fff", color: "#4caf50" }}
          >
            <span>{userData?.nome?.charAt(0) || "C"}</span>
          </div>
          {sidebarOpen && (
            <div className="user-details">
              <p className="user-name">{userData?.nome || "Cliente"}</p>
              <p className="user-role">Cliente</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                href="/cliente/dashboard"
                className={pathname === "/cliente/dashboard" ? "active" : ""}
              >
                <span className="nav-icon">📊</span>
                {sidebarOpen && (
                  <span className="nav-text" style={{ color: "var(--color-text-light)" }}>Painel Principal</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/cliente/processos"
                className={pathname === "/cliente/processos" ? "active" : ""}
              >
                <span className="nav-icon">📁</span>
                {sidebarOpen && (
                  <span className="nav-text" style={{ color: "var(--color-text-light)" }}>Meus Processos</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/cliente/agendamentos"
                className={pathname === "/cliente/agendamentos" ? "active" : ""}
              >
                <span className="nav-icon">📅</span>
                {sidebarOpen && <span className="nav-text" style={{ color: "var(--color-text-light)" }}>Agendamentos</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/cliente/perfil"
                className={pathname === "/cliente/perfil" ? "active" : ""}
              >
                <span className="nav-icon">👤</span>
                {sidebarOpen && <span className="nav-text" style={{ color: "var(--color-text-light)" }}>Meu Perfil</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            className="logout-button"
            onClick={handleLogout}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span className="nav-text">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        <header className="main-header">
          <div className="page-title">
            {pathname.includes("/cliente/dashboard") && "Painel Principal"}
            {pathname.includes("/cliente/processos") && "Meus Processos"}
            {pathname.includes("/cliente/agendamentos") && "Agendamentos"}
            {pathname.includes("/cliente/perfil") && "Meu Perfil"}
          </div>
          <div className="header-actions">
            <div className="notification-icon">
              <span>🔔</span>
              <span className="badge">2</span>
            </div>
          </div>
        </header>

        <div className="content-container">{children}</div>
      </main>

      <style jsx>{`
        .sidebar .sidebar-nav li.active a {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          border-left: 3px solid white;
        }

        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #4caf50;
          color: white;
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-icon {
          font-size: 1.2rem;
          position: relative;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
