"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "../admin/dashboard.css"; // Reutilizamos os estilos do admin

export default function AdvogadoLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("advogadoAuth");

      // Se estiver na página de login, não precisa redirecionar
      if (pathname.includes("/admin/login")) {
        return;
      }

      if (!auth) {
        router.push("/admin/login?type=advogado");
        return;
      }

      try {
        const user = JSON.parse(auth);
        setUserData(user);
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
        localStorage.removeItem("advogadoAuth");
        router.push("/admin/login?type=advogado");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("advogadoAuth");
    router.push("/admin/login?type=advogado");
  };

  // Se estiver na página de login, não renderiza o layout completo
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <div className={`admin-layout ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      {/* Sidebar */}
      <aside className="sidebar">
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
          <div className="avatar">
            <span>{userData?.user?.charAt(0) || "A"}</span>
          </div>
          {sidebarOpen && (
            <div className="user-details">
              <p className="user-name">{userData?.user || "Advogado"}</p>
              <p className="user-role">Advogado</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                href="/advogado/dashboard"
                className={pathname === "/advogado/dashboard" ? "active" : ""}
              >
                <span className="nav-icon">📊</span>
                {sidebarOpen && (
                  <span className="nav-text">Mapa de Desempenho</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/advogado/processos"
                className={pathname === "/advogado/processos" ? "active" : ""}
              >
                <span className="nav-icon">📁</span>
                {sidebarOpen && (
                  <span className="nav-text">Gestão de Processos</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/advogado/clientes"
                className={pathname === "/advogado/clientes" ? "active" : ""}
              >
                <span className="nav-icon">👥</span>
                {sidebarOpen && (
                  <span className="nav-text">Gestão de Clientes</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/advogado/agenda"
                className={pathname === "/advogado/agenda" ? "active" : ""}
              >
                <span className="nav-icon">📅</span>
                {sidebarOpen && (
                  <span className="nav-text">Agenda de Reunião</span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/advogado/financeiro"
                className={pathname === "/advogado/financeiro" ? "active" : ""}
              >
                <span className="nav-icon">💰</span>
                {sidebarOpen && (
                  <span className="nav-text">Controle Financeiro</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span className="nav-text">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content">
        <header className="main-header">
          <div className="page-title">
            {pathname.includes("/advogado/dashboard") && "Mapa de Desempenho"}
            {pathname.includes("/advogado/processos") && "Gestão de Processos"}
            {pathname.includes("/advogado/clientes") && "Gestão de Clientes"}
            {pathname.includes("/advogado/agenda") && "Agenda de Reunião"}
            {pathname.includes("/advogado/financeiro") && "Controle Financeiro"}
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
    </div>
  );
}
