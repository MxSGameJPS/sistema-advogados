"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "./dashboard.css";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuth");

      // Se estiver na página de login, não precisa redirecionar
      if (pathname.includes("/admin/login")) {
        return;
      }

      if (!auth) {
        router.push("/admin/login?type=admin");
        return;
      }

      try {
        const user = JSON.parse(auth);
        setUserData(user);
      } catch (error) {
        console.error("Erro ao processar dados do usuário:", error);
        localStorage.removeItem("adminAuth");
        router.push("/admin/login?type=admin");
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login?type=admin");
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
            <span>A</span>
          </div>
          {sidebarOpen && (
            <div className="user-details">
              <p className="user-name">{userData?.user || "Admin"}</p>
              <p className="user-role">Administrador</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                href="/admin/dashboard"
                className={pathname === "/admin/dashboard" ? "active" : ""}
              >
                <span className="nav-icon">📊</span>
                {sidebarOpen && <span className="nav-text">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/clientes"
                className={pathname === "/admin/clientes" ? "active" : ""}
              >
                <span className="nav-icon">👥</span>
                {sidebarOpen && <span className="nav-text">Clientes</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/financeiro"
                className={pathname === "/admin/financeiro" ? "active" : ""}
              >
                <span className="nav-icon">💰</span>
                {sidebarOpen && <span className="nav-text">Financeiro</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/estoque"
                className={pathname === "/admin/estoque" ? "active" : ""}
              >
                <span className="nav-icon">📦</span>
                {sidebarOpen && <span className="nav-text">Estoque</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/rh"
                className={pathname === "/admin/rh" ? "active" : ""}
              >
                <span className="nav-icon">👔</span>
                {sidebarOpen && <span className="nav-text">RH</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/admin/configuracoes"
                className={pathname === "/admin/configuracoes" ? "active" : ""}
              >
                <span className="nav-icon">⚙️</span>
                {sidebarOpen && <span className="nav-text">Configurações</span>}
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
            {pathname.includes("/admin/dashboard") && "Dashboard"}
            {pathname.includes("/admin/clientes") && "Gestão de Clientes"}
            {pathname.includes("/admin/financeiro") && "Controle Financeiro"}
            {pathname.includes("/admin/estoque") && "Controle de Estoque"}
            {pathname.includes("/admin/rh") && "Recursos Humanos"}
            {pathname.includes("/admin/configuracoes") && "Configurações"}
          </div>
          <div className="header-actions">
            <div className="notification-icon">
              <span>🔔</span>
              <span className="badge">3</span>
            </div>
          </div>
        </header>

        <div className="content-container">{children}</div>
      </main>
    </div>
  );
}
