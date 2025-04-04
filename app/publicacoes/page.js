import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

export default function Publicacoes() {
  const publicacoes = [
    {
      id: 1,
      title:
        "Mantida a desoneração da folha de salários e aberto programa para regularização de bens",
      date: "15 de Março de 2023",
      excerpt:
        "As mudanças trazidas pela MP 1.171/2023, publicada no dia 30 de abril, atingem as pessoas físicas residentes no Brasil, em relação à renda obtida no exterior...",
      author: "Ricardo Oliveira",
      category: "Direito Tributário",
      slug: "mantida-desoneracao-folha-salarios",
    },
    {
      id: 2,
      title: "STJ afasta tributação sobre Stock Options",
      date: "11 de Setembro de 2022",
      excerpt:
        "Em sessão realizada nesta quarta-feira, 11/09, em importante julgamento, a 1ª Seção do Superior Tribunal decidiu afastar a tributação sobre stock options...",
      author: "Ana Carolina Silva",
      category: "Direito Tributário",
      slug: "stj-afasta-tributacao-stock-options",
    },
    {
      id: 3,
      title:
        "STJ dispensa comprovação do pagamento para restituição do ICMS-ST pago a maior",
      date: "05 de Julho de 2022",
      excerpt:
        "Desde 15.03.2021 está aberto o prazo para adesão às propostas de transação tributária estabelecidas pela Procuradoria Geral da Fazenda Nacional...",
      author: "Ricardo Oliveira",
      category: "Direito Tributário",
      slug: "stj-dispensa-comprovacao-pagamento-icms",
    },
    {
      id: 4,
      title:
        "Relatório de Transparência Salarial deve ser enviado até 30 de agosto",
      date: "10 de Maio de 2022",
      excerpt:
        "Desde 15.03.2021 está aberto o prazo para adesão às propostas de transação tributária estabelecidas pela Procuradoria Geral da Fazenda Nacional...",
      author: "Mariana Santos",
      category: "Direito Trabalhista",
      slug: "relatorio-transparencia-salarial",
    },
    {
      id: 5,
      title:
        "STF retomará julgamento sobre exclusão do ISS da base de cálculo do PIS e da Confins em agosto",
      date: "22 de Abril de 2022",
      excerpt:
        "O Supremo Tribunal Federal (STF) irá decidir em agosto sobre a exclusão do ISS na base de cálculo de tributos federais...",
      author: "Ana Carolina Silva",
      category: "Direito Tributário",
      slug: "stf-retomara-julgamento-iss",
    },
    {
      id: 6,
      title: "Alteração legislativa limita cláusulas de eleição de foro",
      date: "30 de Janeiro de 2022",
      excerpt:
        "Recentemente, foi publicada a Lei nº 14.879/2024, que alterou os critérios de validade das cláusulas de eleição de foro em contratos...",
      author: "Mariana Santos",
      category: "Direito Contratual",
      slug: "alteracao-legislativa-clausulas-eleicao-foro",
    },
  ];

  return (
    <main>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Publicações</h1>
          <div className={styles.divider}></div>
          <p className={styles.subtitle}>
            Artigos e notícias sobre temas jurídicos relevantes
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.filterSection}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar publicações..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>Buscar</button>
            </div>
            <div className={styles.categoryFilter}>
              <span>Categorias:</span>
              <select className={styles.categorySelect}>
                <option value="">Todas as categorias</option>
                <option value="Direito Tributário">Direito Tributário</option>
                <option value="Direito Trabalhista">Direito Trabalhista</option>
                <option value="Direito Contratual">Direito Contratual</option>
                <option value="Direito Societário">Direito Societário</option>
              </select>
            </div>
          </div>

          <div className={styles.publicacoesList}>
            {publicacoes.map((pub) => (
              <div key={pub.id} className={styles.publicacaoCard}>
                <div className={styles.publicacaoMeta}>
                  <span className={styles.publicacaoCategory}>
                    {pub.category}
                  </span>
                  <span className={styles.publicacaoDate}>{pub.date}</span>
                </div>
                <h2 className={styles.publicacaoTitle}>
                  <Link href={`/publicacoes/${pub.slug}`}>{pub.title}</Link>
                </h2>
                <p className={styles.publicacaoExcerpt}>{pub.excerpt}</p>
                <div className={styles.publicacaoFooter}>
                  <span className={styles.publicacaoAuthor}>
                    Por: {pub.author}
                  </span>
                  <Link
                    href={`/publicacoes/${pub.slug}`}
                    className={styles.publicacaoLink}
                  >
                    Leia Mais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
