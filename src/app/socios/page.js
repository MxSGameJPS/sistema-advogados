import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import styles from "./page.module.css";

export default function Socios() {
  const socios = [
    {
      id: "ana-carolina",
      name: "Ana Carolina Silva",
      position: "Sócia Fundadora",
      image: "/images/team/ana.webp",
      bio: "Advogada formada pela Universidade de São Paulo (USP), especializada em direito comercial e societário. Com mais de 20 anos de experiência, Ana Carolina liderou diversas operações de fusões e aquisições para empresas nacionais e internacionais.",
      specialties: [
        "Direito Societário",
        "Fusões e Aquisições",
        "Contratos Comerciais",
        "Planejamento Sucessório",
      ],
      education: [
        "Bacharel em Direito pela Universidade de São Paulo (USP)",
        "Especialização em Direito Empresarial pela FGV",
        "MBA em Gestão de Negócios pelo INSPER",
      ],
      languages: ["Português", "Inglês", "Espanhol"],
    },
    {
      id: "ricardo",
      name: "Ricardo Oliveira",
      position: "Sócio",
      image: "/images/team/ricardo.jpeg",
      bio: "Advogado formado pela Pontifícia Universidade Católica de São Paulo (PUC), mestre em Direito Comercial. Ricardo possui ampla experiência em operações imobiliárias e consultoria em direito empresarial para empresas de médio e grande porte.",
      specialties: [
        "Direito Imobiliário",
        "Direito Societário",
        "Propriedade Intelectual",
        "Arbitragem",
      ],
      education: [
        "Bacharel em Direito pela PUC-SP",
        "Mestre em Direito Comercial pela PUC-SP",
        "Especialização em Arbitragem pela USP",
      ],
      languages: ["Português", "Inglês", "Francês"],
    },
    {
      id: "mariana",
      name: "Mariana Santos",
      position: "Sócia",
      image: "/images/team/mariana.png",
      bio: "Advogada formada pela Universidade Presbiteriana Mackenzie, especialista em Direito Empresarial. Com foco em compliance e proteção de dados, Mariana assessora empresas na implementação de programas de conformidade e adequação às leis de proteção de dados.",
      specialties: [
        "Compliance",
        "Proteção de Dados",
        "Direito Digital",
        "Contratos Internacionais",
      ],
      education: [
        "Bacharel em Direito pela Universidade Presbiteriana Mackenzie",
        "Especialista em Direito Empresarial pela FGV",
        "Certificação em Proteção de Dados (LGPD/GDPR)",
      ],
      languages: ["Português", "Inglês", "Alemão"],
    },
  ];

  return (
    <main>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Nossos Sócios</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Conheça os profissionais que lideram nossa equipe
          </p>
        </div>

        <div className={styles.content}>
          {socios.map((socio) => (
            <div key={socio.id} id={socio.id} className={styles.socioItem}>
              <div className={styles.socioProfile}>
                <div className={styles.imageContainer}>
                  <Image
                    src={socio.image}
                    alt={socio.name}
                    width={300}
                    height={300}
                    className={styles.image}
                  />
                </div>
                <div className={styles.socioInfo}>
                  <h2 className={styles.socioName}>{socio.name}</h2>
                  <p className={styles.socioPosition}>{socio.position}</p>
                  <p className={styles.socioBio}>{socio.bio}</p>

                  <div className={styles.socioDetails}>
                    <div className={styles.detailSection}>
                      <h3>Áreas de Atuação</h3>
                      <ul>
                        {socio.specialties.map((specialty, index) => (
                          <li key={index}>{specialty}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Formação</h3>
                      <ul>
                        {socio.education.map((edu, index) => (
                          <li key={index}>{edu}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.detailSection}>
                      <h3>Idiomas</h3>
                      <ul>
                        {socio.languages.map((lang, index) => (
                          <li key={index}>{lang}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
