"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import { animateOnScroll, animateItems } from "../../utils/animations";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Fusões e Aquisições",
      description:
        "Assessoria completa ao comprador e ao vendedor em negócios de alienação de participação societária, alienação de ativos e de estabelecimentos, management buyout e constituição de joint ventures.",
      icon: "💼",
      link: "/servicos#fusoes-aquisicoes",
    },
    {
      id: 2,
      title: "Direito Societário",
      description:
        "Constituição de sociedades e parcerias empresariais, como, por exemplo, joint venture, consórcios, sociedades em conta de participação.",
      icon: "📊",
      link: "/servicos#societario",
    },
    {
      id: 3,
      title: "Direito Imobiliário",
      description:
        "Consultoria em operações imobiliárias, como compra e venda de imóveis, locação, built-to-suit, arrendamento, permuta, doação, comodato, condomínio.",
      icon: "🏢",
      link: "/servicos#imobiliario",
    },
    {
      id: 4,
      title: "Direito Trabalhista",
      description:
        "Consultoria em Direito do Trabalho, elaboração e negociação de contratos de diretores, brasileiros ou expatriados.",
      icon: "👥",
      link: "/servicos#trabalhista",
    },
    {
      id: 5,
      title: "Propriedade Intelectual",
      description:
        "Consultoria em matéria de propriedade industrial e direito autoral, elaboração de contratos de cessão ou licença de marca, patente, transferência de tecnologia.",
      icon: "©️",
      link: "/servicos#propriedade-intelectual",
    },
    {
      id: 6,
      title: "Compliance",
      description:
        "Elaboração e implementação de programas de compliance, revisão de controles internos, realização de treinamentos para empregados, fornecedores e prestadores de serviços.",
      icon: "✓",
      link: "/servicos#compliance",
    },
  ];

  useEffect(() => {
    // Animar o título e subtítulo quando a página carregar
    const header = document.querySelector(`.${styles.header}`);
    if (header) {
      header.classList.add("animate-on-scroll", "fadeInUp", "animated");
    }

    // Animar cards ao scrollar
    const cleanup = animateOnScroll();

    // Animar os cards em sequência
    setTimeout(() => {
      animateItems(`.${styles.grid}`, 100);
    }, 500);

    return cleanup;
  }, []);

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Áreas de Atuação</h2>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Atendimento personalizado e integrado em diversas áreas do Direito
            Empresarial
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <div
              key={service.id}
              className={`${styles.card} animate-on-scroll fadeInUp`}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <Link href={service.link} className={styles.cardLink}>
                Saiba mais
              </Link>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} animate-on-scroll fadeInUp`}>
          <Link href="/servicos" className={styles.button}>
            Ver Todos os Serviços
          </Link>
        </div>
      </div>
    </section>
  );
}
