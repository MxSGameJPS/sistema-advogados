"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { animateOnScroll } from "../../utils/animations";

export default function About() {
  useEffect(() => {
    const cleanup = animateOnScroll();
    return cleanup;
  }, []);

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.text} animate-on-scroll fadeInLeft`}>
            <h2 className={styles.title}>Quem Somos</h2>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              O escritório <strong>MaisDireito Advogados</strong> tem por foco a
              prestação de serviços jurídicos de consultoria e assessoria a
              empresas que buscam se estabelecer e consolidar sua posição no
              mercado brasileiro.
            </p>
            <p className={styles.description}>
              A experiência desenvolvida durante anos de assessoria a empresas
              nacionais e multinacionais credencia o{" "}
              <strong>MaisDireito Advogados</strong> a encontrar soluções
              dinâmicas que auxiliem seus clientes a enfrentar os desafios
              inerentes a um complexo ambiente de negócios em constante
              transformação.
            </p>
            <p className={styles.description}>
              Acreditamos no desenvolvimento de relações profissionais pautadas
              nos pilares da ética, eficiência, pessoalidade e confiança e, com
              esse foco, contamos com advogados qualificados para assessorar
              nossos clientes na consultoria jurídica em todas as áreas do
              direito e, em especial, em projetos de fusões e aquisições de
              empresas, tendo sempre em vista as especificidades de cada negócio
              e as necessidades do cliente.
            </p>
            <Link href="/quem-somos" className={styles.button}>
              Saiba Mais
            </Link>
          </div>
          <div className={`${styles.image} animate-on-scroll fadeInRight`}>
            <Image
              src="/images/escritorio.webp"
              alt="Escritório MaisDireito Advogados"
              width={600}
              height={400}
              className={styles.imageContent}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
