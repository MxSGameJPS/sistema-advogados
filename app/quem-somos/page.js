import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import Image from "next/image";

export default function QuemSomos() {
  return (
    <main>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Quem Somos</h1>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2>Nossa História</h2>
            <p>
              <strong>MaisDireito Advogados</strong> é um escritório de
              advocacia com atuação abrangente, especializado em consultoria de
              direito empresarial. Formamos uma equipe altamente qualificada,
              apta a atender nossos clientes de forma personalizada, objetiva e
              ágil, capaz de se adequar ao perfil de negócios de cada cliente.
            </p>
            <p>
              O escritório se origina de tradicionais escritórios de advocacia
              especializados em assessorar empresas nacionais e internacionais
              que vieram a se estabelecer no Brasil, o que gerou um legado de
              mais de 40 anos de excelência e qualidade.
            </p>
            <p>
              O adequado e competente aconselhamento jurídico na constituição,
              implantação e manutenção de empresas, bem como mediante operações
              de fusões e aquisições, além da permanente orientação jurídica no
              dia a dia dessas empresas no território brasileiro, fizeram do
              MaisDireito Advogados um escritório de advocacia de referência no
              mercado.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/escritorio.webp"
              alt="Escritório MaisDireito Advogados"
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Valores</h2>
          <div className={styles.values}>
            <div className={styles.valueItem}>
              <h3>Ética</h3>
              <p>
                Comprometimento com os mais altos padrões éticos e morais em
                todas as nossas ações.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3>Excelência</h3>
              <p>
                Busca constante pela qualidade e pela excelência em todos os
                serviços prestados.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3>Dedicação</h3>
              <p>
                Dedicação total às necessidades e aos objetivos dos nossos
                clientes.
              </p>
            </div>
            <div className={styles.valueItem}>
              <h3>Inovação</h3>
              <p>
                Busca por soluções inovadoras e criativas para os desafios
                jurídicos mais complexos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
