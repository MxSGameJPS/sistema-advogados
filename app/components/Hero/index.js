"use client";

import { useEffect } from 'react';
import Link from "next/link";
import styles from "./styles.module.css";

export default function Hero() {
  useEffect(() => {
    // Adiciona a classe animated aos elementos ao carregar a página
    const title = document.querySelector(`.${styles.title}`);
    const subtitle = document.querySelector(`.${styles.subtitle}`);
    const ctaButtons = document.querySelectorAll(`.${styles.cta} a`);
    
    setTimeout(() => {
      title.classList.add(styles.animated);
    }, 300);
    
    setTimeout(() => {
      subtitle.classList.add(styles.animated);
    }, 600);
    
    ctaButtons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add(styles.animated);
      }, 900 + index * 200);
    });
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>MaisDireito Advogados</h1>
          <p className={styles.subtitle}>
            Assessoria jurídica de excelência para empresas nacionais e
            internacionais
          </p>
          <div className={styles.cta}>
            <Link href="/contato" className={styles.button}>
              Fale Conosco
            </Link>
            <Link href="/servicos" className={styles.buttonOutline}>
              Nossos Serviços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
