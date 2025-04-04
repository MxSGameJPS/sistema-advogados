import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function AreasAtuacao() {
  const areas = [
    {
      id: 1,
      title: "Direito Societário",
      icon: "⚖️",
      description:
        "Assessoria completa em questões relacionadas à constituição, organização e estruturação de sociedades empresárias.",
      servicos: [
        "Constituição e reorganização de sociedades",
        "Elaboração e revisão de contratos sociais e estatutos",
        "Assessoria em operações societárias",
        "Governança corporativa",
        "Due diligence societária",
      ],
    },
    {
      id: 2,
      title: "Direito Tributário",
      icon: "📊",
      description:
        "Consultoria e planejamento tributário para pessoas físicas e jurídicas, buscando a redução lícita da carga tributária.",
      servicos: [
        "Planejamento tributário",
        "Consultoria em tributos diretos e indiretos",
        "Recuperação de tributos",
        "Defesa em processos administrativos fiscais",
        "Ações judiciais em matéria tributária",
      ],
    },
    {
      id: 3,
      title: "Direito Trabalhista",
      icon: "👔",
      description:
        "Suporte jurídico preventivo e contencioso em questões relacionadas às relações de trabalho e emprego.",
      servicos: [
        "Consultoria em direito individual e coletivo do trabalho",
        "Elaboração de contratos de trabalho",
        "Defesa em processos trabalhistas",
        "Análise de riscos trabalhistas",
        "Assessoria em negociações coletivas",
      ],
    },
    {
      id: 4,
      title: "Direito Imobiliário",
      icon: "🏢",
      description:
        "Atuação especializada em operações imobiliárias, garantindo segurança jurídica nas transações de compra, venda e locação.",
      servicos: [
        "Contratos de compra e venda",
        "Contratos de locação comercial e residencial",
        "Due diligence imobiliária",
        "Incorporação imobiliária",
        "Assessoria em operações de built to suit",
      ],
    },
    {
      id: 5,
      title: "Contratos Empresariais",
      icon: "📝",
      description:
        "Elaboração, análise e negociação de contratos empresariais, garantindo segurança jurídica nas relações comerciais.",
      servicos: [
        "Elaboração e revisão de contratos comerciais",
        "Contratos de prestação de serviços",
        "Contratos de distribuição e agência",
        "Contratos de franquia",
        "Acordos de confidencialidade",
      ],
    },
    {
      id: 6,
      title: "Fusões e Aquisições",
      icon: "🔄",
      description:
        "Assessoria jurídica especializada em operações de M&A, desde a fase de negociação até a conclusão do negócio.",
      servicos: [
        "Due diligence legal",
        "Estruturação de operações",
        "Negociação e elaboração de instrumentos",
        "Assessoria na obtenção de aprovações regulatórias",
        "Planejamento de integração pós-aquisição",
      ],
    },
    {
      id: 7,
      title: "Direito Digital e Proteção de Dados",
      icon: "💻",
      description:
        "Consultoria especializada em direito digital, com foco na proteção de dados pessoais e adequação à LGPD.",
      servicos: [
        "Adequação à LGPD",
        "Elaboração de políticas de privacidade",
        "Contratos de tecnologia",
        "Propriedade intelectual no ambiente digital",
        "Crimes cibernéticos",
      ],
    },
    {
      id: 8,
      title: "Contencioso Estratégico",
      icon: "⚔️",
      description:
        "Representação em litígios complexos, com estratégias personalizadas para a defesa dos interesses do cliente.",
      servicos: [
        "Representação em ações judiciais empresariais",
        "Contencioso civil e comercial",
        "Arbitragem e mediação",
        "Disputas societárias",
        "Recuperação de créditos",
      ],
    },
  ];

  return (
    <main>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Áreas de Atuação</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Conheça nossos serviços e especialidades jurídicas
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.introduction}>
            <h2>Excelência Jurídica em Diversas Áreas</h2>
            <p>
              O escritório Mais Direito Advogados possui equipes especializadas
              em diversas áreas do Direito, oferecendo soluções jurídicas
              completas e personalizadas para pessoas físicas e jurídicas. Nossa
              atuação é pautada pelo profundo conhecimento técnico, experiência
              prática e entendimento das necessidades específicas de cada
              cliente.
            </p>
          </div>

          <div className={styles.areasGrid}>
            {areas.map((area) => (
              <div key={area.id} className={styles.areaCard}>
                <div className={styles.areaHeader}>
                  <div className={styles.areaIcon}>{area.icon}</div>
                  <h3 className={styles.areaTitle}>{area.title}</h3>
                </div>
                <p className={styles.areaDescription}>{area.description}</p>
                <div className={styles.areaServices}>
                  <h4>Serviços</h4>
                  <ul>
                    {area.servicos.map((servico, index) => (
                      <li key={index}>{servico}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.callToAction}>
            <h2>Como podemos ajudar?</h2>
            <p>
              Entre em contato conosco para uma análise personalizada da sua
              situação e descubra como nossa equipe pode auxiliar no seu caso
              específico.
            </p>
            <a href="/contato" className={styles.button}>
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
