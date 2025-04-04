import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function Servicos() {
  const servicos = [
    {
      id: "fusoes-aquisicoes",
      title: "Fusões e Aquisições",
      icon: "💼",
      description:
        "Assessoria completa ao comprador e ao vendedor em negócios de alienação de participação societária, alienação de ativos e de estabelecimentos, management buyout e constituição de joint ventures.",
      topicos: [
        "Assessoria completa ao comprador e ao vendedor",
        "Alienação de participação societária",
        "Alienação de ativos e de estabelecimentos",
        "Management buyout",
        "Constituição de joint ventures",
        "Reorganizações societárias",
        "Incorporações e cisões",
        "Due diligence",
      ],
    },
    {
      id: "societario",
      title: "Direito Societário",
      icon: "📊",
      description:
        "Constituição de sociedades e parcerias empresariais, como, por exemplo, joint venture, consórcios, sociedades em conta de participação.",
      topicos: [
        "Constituição de sociedades",
        "Parcerias empresariais",
        "Joint venture",
        "Consórcios",
        "Sociedades em conta de participação",
        "Elaboração e gestão de documentos societários",
        "Alterações de contratos sociais",
        "Acordos de acionistas e acordos de quotistas",
      ],
    },
    {
      id: "imobiliario",
      title: "Direito Imobiliário",
      icon: "🏢",
      description:
        "Consultoria em operações imobiliárias, como compra e venda de imóveis, locação, built-to-suit, arrendamento, permuta, doação, comodato, condomínio.",
      topicos: [
        "Compra e venda de imóveis",
        "Locação",
        "Built-to-suit",
        "Arrendamento",
        "Permuta",
        "Doação",
        "Comodato",
        "Condomínio",
        "Assessoria na aquisição de imóveis rurais por estrangeiros",
        "Auditorias imobiliárias",
      ],
    },
    {
      id: "trabalhista",
      title: "Direito Trabalhista",
      icon: "👥",
      description:
        "Consultoria em Direito do Trabalho, elaboração e negociação de contratos de diretores, brasileiros ou expatriados.",
      topicos: [
        "Consultoria em Direito do Trabalho",
        "Elaboração e negociação de contratos de diretores",
        "Contratação de trabalhadores estrangeiros",
        "Planos de remuneração",
        "Bônus e participação nos lucros e resultados",
        "Stock options",
        "Comissões",
        "Negociações coletivas",
      ],
    },
    {
      id: "propriedade-intelectual",
      title: "Propriedade Intelectual",
      icon: "©️",
      description:
        "Consultoria em matéria de propriedade industrial e direito autoral, elaboração de contratos de cessão ou licença de marca, patente, transferência de tecnologia.",
      topicos: [
        "Consultoria em propriedade industrial",
        "Direito autoral",
        "Contratos de cessão ou licença de marca",
        "Proteção de patentes",
        "Transferência de tecnologia",
        "Software",
        "Obras autorais",
        "Registro de domínios",
      ],
    },
    {
      id: "compliance",
      title: "Compliance",
      icon: "✓",
      description:
        "Elaboração e implementação de programas de compliance, revisão de controles internos, realização de treinamentos para empregados, fornecedores e prestadores de serviços.",
      topicos: [
        "Elaboração de programas de compliance",
        "Implementação de programas de compliance",
        "Revisão de controles internos",
        "Treinamentos para empregados",
        "Treinamentos para fornecedores",
        "Treinamentos para prestadores de serviços",
        "Investigações internas",
        "Auditorias de compliance",
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
            Conheça os serviços jurídicos oferecidos pelo MaisDireito Advogados
          </p>
        </div>

        <div className={styles.content}>
          {servicos.map((servico) => (
            <div
              key={servico.id}
              id={servico.id}
              className={styles.serviceItem}
            >
              <div className={styles.serviceHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{servico.icon}</span>
                </div>
                <h2 className={styles.serviceTitle}>{servico.title}</h2>
              </div>
              <div className={styles.serviceContent}>
                <p className={styles.serviceDescription}>
                  {servico.description}
                </p>
                <div className={styles.serviceTopicos}>
                  <h3>Áreas de atuação</h3>
                  <ul>
                    {servico.topicos.map((topico, index) => (
                      <li key={index}>{topico}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
