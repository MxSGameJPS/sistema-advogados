"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Impedir rolagem quando o menu estiver aberto
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  // Fechar o menu quando um link é clicado
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    // Função para verificar o scroll e mudar a aparência do header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Adicionar event listener
    window.addEventListener("scroll", handleScroll);

    // Limpar o event listener ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Garantir que o overflow do body seja restaurado
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/" onClick={closeMenu}>
              <h1>MaisDireito Advogados</h1>
            </Link>
          </div>

          <div
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Menu de navegação"
          >
            <div
              className={`${styles.menuIcon} ${menuOpen ? styles.open : ""}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Menu sobreposto */}
      <div
        className={`${styles.menuOverlay} ${menuOpen ? styles.visible : ""}`}
        onClick={closeMenu}
      ></div>
      <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
        <div className={styles.navContent}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/quem-somos"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Quem Somos
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/areas-atuacao"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Áreas de Atuação
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/servicos"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Serviços
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/socios"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Sócios
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/publicacoes"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Publicações
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/contato"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Contato
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/cliente/login"
                className={`${styles.navLink} ${styles.clienteLink}`}
                onClick={closeMenu}
              >
                Área do Cliente
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href="/admin"
                className={`${styles.navLink} ${styles.adminLink}`}
                onClick={closeMenu}
              >
                Área Restrita
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
