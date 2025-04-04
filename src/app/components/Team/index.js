"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { animateOnScroll, animateItems } from "../../utils/animations";
import Image from "next/image";

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Ana Carolina Silva",
      position: "Sócia Fundadora",
      description:
        "Advogada formada pela Universidade de São Paulo (USP), especializada em direito comercial e societário.",
      image: "/images/team/ana.webp",
      link: "/socios#ana-carolina",
    },
    {
      id: 2,
      name: "Ricardo Oliveira",
      position: "Sócio",
      description:
        "Advogado formado pela Pontifícia Universidade Católica de São Paulo (PUC), mestre em Direito Comercial.",
      image: "/images/team/ricardo.jpeg",
      link: "/socios#ricardo",
    },
    {
      id: 3,
      name: "Mariana Santos",
      position: "Sócia",
      description:
        "Advogada formada pela Universidade Presbiteriana Mackenzie, especialista em Direito Empresarial.",
      image: "/images/team/mariana.png",
      link: "/socios#mariana",
    },
  ];

  useEffect(() => {
    // Animar o título e subtítulo quando entrar na tela
    const header = document.querySelector(`.${styles.header}`);
    const cleanup = animateOnScroll();

    // Animar os cards em sequência
    setTimeout(() => {
      animateItems(`.${styles.grid}`, 150);
    }, 300);

    return cleanup;
  }, []);

  return (
    <section className={styles.team}>
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll fadeInUp`}>
          <h2 className={styles.title}>Nossos Sócios</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Conheça os profissionais que lideram nossa equipe
          </p>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={10}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.position}>{member.position}</p>
                <p className={styles.description}>{member.description}</p>
                <Link href={member.link} className={styles.link}>
                  Mais detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} animate-on-scroll fadeInUp`}>
          <Link href="/socios" className={styles.button}>
            Ver Equipe Completa
          </Link>
        </div>
      </div>
    </section>
  );
}
