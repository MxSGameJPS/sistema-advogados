"use client";

import Link from "next/link";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Sobre Nós</h3>
            <div className={styles.about}>
              <p>
                MaisDireito Advogados é um escritório especializado em soluções
                jurídicas inovadoras, com profissionais experientes
                comprometidos com os mais altos padrões éticos.
              </p>
              <div className={styles.social}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <span>📱</span>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <span>🐦</span>
                </a>
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <span>📷</span>
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <span>💼</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Links Úteis</h3>
            <div className={styles.links}>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/quem-somos">Quem Somos</Link>
                </li>
                <li>
                  <Link href="/areas-atuacao">Áreas de Atuação</Link>
                </li>
                <li>
                  <Link href="/socios">Sócios</Link>
                </li>
                <li>
                  <Link href="/publicacoes">Publicações</Link>
                </li>
                <li>
                  <Link href="/contato">Contato</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Contato</h3>
            <div className={styles.contact}>
              <ul>
                <li>
                  <span className={styles.contactIcon}>
                    <span>📍</span>
                  </span>
                  <span>
                    Rua Exemplo, 123, 10º andar
                    <br />
                    Centro - 00000-000 - São Paulo, SP
                  </span>
                </li>
                <li>
                  <span className={styles.contactIcon}>
                    <span>📞</span>
                  </span>
                  <span>+55 (51) 99339-2983</span>
                </li>
                <li>
                  <span className={styles.contactIcon}>
                    <span>✉️</span>
                  </span>
                  <a href="mailto:mxsgamejps@gmail.com">
                    mxsgamejps@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Saulo Pavanello. Todos os
            direitos reservados.
          </div>
          <div className={styles.legal}>
            <a href="#">Termos de Uso</a>
            <span className={styles.divider}>|</span>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
