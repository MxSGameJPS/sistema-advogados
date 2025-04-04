"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";

export default function GestaoProcessos() {
  const [processos, setProcessos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroPrazo, setFiltroPrazo] = useState("todos");
  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [processosFiltrados, setProcessosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados do servidor
    setTimeout(() => {
      const mockProcessos = [
        {
          id: 1,
          numero: "0123456-78.2023.8.26.0100",
          cliente: {
            id: 101,
            nome: "Maria Silva",
            tipo: "Pessoa Física",
            contato: "maria.silva@email.com",
          },
          tipo: "Trabalhista",
          vara: "2ª Vara do Trabalho",
          comarca: "São Paulo",
          dataDistribuicao: "2023-05-15",
          status: "Em andamento",
          valorCausa: 50000,
          honorarios: 5000,
          prazo: "2023-11-20",
          descricao:
            "Reclamação trabalhista - horas extras e verbas rescisórias",
          parteContraria: "Empresa XYZ Ltda.",
          movimentacoes: [
            {
              id: 1001,
              data: "2023-11-10",
              tipo: "Publicação",
              descricao: "Publicação de sentença",
            },
            {
              id: 1002,
              data: "2023-10-25",
              tipo: "Audiência",
              descricao: "Audiência de instrução realizada",
            },
          ],
        },
        {
          id: 2,
          numero: "0098765-43.2023.8.26.0100",
          cliente: {
            id: 102,
            nome: "João Ferreira",
            tipo: "Pessoa Física",
            contato: "joao.ferreira@email.com",
          },
          tipo: "Civil",
          vara: "5ª Vara Cível",
          comarca: "São Paulo",
          dataDistribuicao: "2023-06-20",
          status: "Aguardando prazo",
          valorCausa: 75000,
          honorarios: 7500,
          prazo: "2023-11-18",
          descricao: "Ação de indenização por danos materiais e morais",
          parteContraria: "Seguradora ABC S/A",
          movimentacoes: [
            {
              id: 2001,
              data: "2023-11-08",
              tipo: "Intimação",
              descricao: "Intimação para contestar",
            },
          ],
        },
        {
          id: 3,
          numero: "0456789-12.2023.8.26.0100",
          cliente: {
            id: 103,
            nome: "Pedro Souza",
            tipo: "Pessoa Física",
            contato: "pedro.souza@email.com",
          },
          tipo: "Consumidor",
          vara: "3ª Vara do Juizado Especial Cível",
          comarca: "São Paulo",
          dataDistribuicao: "2023-03-10",
          status: "Concluído",
          valorCausa: 25000,
          honorarios: 3000,
          prazo: null,
          descricao: "Ação de rescisão contratual com devolução de valores",
          parteContraria: "Loja de Eletrônicos DEF",
          movimentacoes: [
            {
              id: 3001,
              data: "2023-11-05",
              tipo: "Trânsito em julgado",
              descricao: "Certidão de trânsito em julgado",
            },
            {
              id: 3002,
              data: "2023-10-10",
              tipo: "Sentença",
              descricao: "Sentença procedente",
            },
          ],
        },
        {
          id: 4,
          numero: "0567890-12.2023.8.26.0100",
          cliente: {
            id: 104,
            nome: "Ana Oliveira",
            tipo: "Pessoa Física",
            contato: "ana.oliveira@email.com",
          },
          tipo: "Trabalhista",
          vara: "5ª Vara do Trabalho",
          comarca: "São Paulo",
          dataDistribuicao: "2023-07-05",
          status: "Em andamento",
          valorCausa: 45000,
          honorarios: 4500,
          prazo: "2023-11-25",
          descricao:
            "Reclamação trabalhista - reconhecimento de vínculo empregatício",
          parteContraria: "Empresa QWE S/A",
          movimentacoes: [
            {
              id: 4001,
              data: "2023-11-03",
              tipo: "Designação",
              descricao: "Designação de audiência para 18/11/2023",
            },
          ],
        },
        {
          id: 5,
          numero: "0246813-57.2023.8.26.0100",
          cliente: {
            id: 105,
            nome: "Empresa ABC Ltda.",
            tipo: "Pessoa Jurídica",
            contato: "juridico@empresaabc.com",
          },
          tipo: "Tributário",
          vara: "2ª Vara da Fazenda Pública",
          comarca: "São Paulo",
          dataDistribuicao: "2023-04-22",
          status: "Suspenso",
          valorCausa: 150000,
          honorarios: 15000,
          prazo: null,
          descricao:
            "Mandado de segurança - Suspensão de exigibilidade de crédito tributário",
          parteContraria: "Estado de São Paulo",
          movimentacoes: [
            {
              id: 5001,
              data: "2023-09-15",
              tipo: "Decisão",
              descricao: "Decisão de suspensão do processo por 90 dias",
            },
          ],
        },
        {
          id: 6,
          numero: "0135792-46.2023.8.26.0100",
          cliente: {
            id: 106,
            nome: "Carlos Santos",
            tipo: "Pessoa Física",
            contato: "carlos.santos@email.com",
          },
          tipo: "Família",
          vara: "3ª Vara de Família e Sucessões",
          comarca: "São Paulo",
          dataDistribuicao: "2023-08-10",
          status: "Em andamento",
          valorCausa: 0,
          honorarios: 8000,
          prazo: "2023-11-15",
          descricao: "Ação de divórcio litigioso com partilha de bens",
          parteContraria: "Júlia Santos",
          movimentacoes: [
            {
              id: 6001,
              data: "2023-10-30",
              tipo: "Audiência",
              descricao: "Audiência de conciliação realizada sem acordo",
            },
          ],
        },
      ];

      setProcessos(mockProcessos);
      setProcessosFiltrados(mockProcessos);
      setCarregando(false);
    }, 800);
  }, []);

  useEffect(() => {
    filtrarProcessos();
  }, [filtroStatus, filtroPrazo, filtroPesquisa, processos]);

  const filtrarProcessos = () => {
    let resultado = [...processos];

    // Filtro por status
    if (filtroStatus !== "todos") {
      resultado = resultado.filter(
        (processo) =>
          processo.status.toLowerCase() === filtroStatus.toLowerCase()
      );
    }

    // Filtro por prazo
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (filtroPrazo === "urgentes") {
      resultado = resultado.filter((processo) => {
        if (!processo.prazo) return false;
        const prazoDate = new Date(processo.prazo);
        const diffDias = Math.ceil((prazoDate - hoje) / (1000 * 60 * 60 * 24));
        return diffDias <= 5 && diffDias >= 0;
      });
    } else if (filtroPrazo === "proximos") {
      resultado = resultado.filter((processo) => {
        if (!processo.prazo) return false;
        const prazoDate = new Date(processo.prazo);
        const diffDias = Math.ceil((prazoDate - hoje) / (1000 * 60 * 60 * 24));
        return diffDias > 5 && diffDias <= 15;
      });
    } else if (filtroPrazo === "futuros") {
      resultado = resultado.filter((processo) => {
        if (!processo.prazo) return false;
        const prazoDate = new Date(processo.prazo);
        const diffDias = Math.ceil((prazoDate - hoje) / (1000 * 60 * 60 * 24));
        return diffDias > 15;
      });
    }

    // Filtro por pesquisa (número, cliente, tipo)
    if (filtroPesquisa.trim() !== "") {
      const pesquisa = filtroPesquisa.toLowerCase().trim();
      resultado = resultado.filter(
        (processo) =>
          processo.numero.toLowerCase().includes(pesquisa) ||
          processo.cliente.nome.toLowerCase().includes(pesquisa) ||
          processo.tipo.toLowerCase().includes(pesquisa) ||
          processo.descricao.toLowerCase().includes(pesquisa)
      );
    }

    setProcessosFiltrados(resultado);
  };

  const formatarData = (dataString) => {
    if (!dataString) return "N/A";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "em andamento":
        return "badge-info";
      case "aguardando prazo":
        return "badge-warning";
      case "concluído":
        return "badge-success";
      case "suspenso":
        return "badge-secondary";
      default:
        return "badge-dark";
    }
  };

  const calcularDiasRestantes = (prazoString) => {
    if (!prazoString) return null;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const prazoDate = new Date(prazoString);

    const diffTempo = prazoDate.getTime() - hoje.getTime();
    const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

    return diffDias;
  };

  const getPrazoClass = (prazoString) => {
    if (!prazoString) return "";

    const diasRestantes = calcularDiasRestantes(prazoString);

    if (diasRestantes < 0) return "prazo-expirado";
    if (diasRestantes <= 5) return "prazo-urgente";
    if (diasRestantes <= 15) return "prazo-proximo";
    return "prazo-futuro";
  };

  return (
    <div
      className={styles.gestaoProcessos}
      style={{
        padding: "1rem",
        width: "100%",
        height: "100%",
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Gestão de Processos</h1>
        <div className={styles.actions}>
          <button className="btn btn-primary">
            <span>➕</span> Novo processo
          </button>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar por número, cliente, tipo..."
            value={filtroPesquisa}
            onChange={(e) => setFiltroPesquisa(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>🔍</button>
        </div>

        <div className={styles.filterGroup}>
          <div className={styles.filterItem}>
            <label>Status:</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="todos">Todos</option>
              <option value="em andamento">Em andamento</option>
              <option value="aguardando prazo">Aguardando prazo</option>
              <option value="concluído">Concluído</option>
              <option value="suspenso">Suspenso</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label>Prazo:</label>
            <select
              value={filtroPrazo}
              onChange={(e) => setFiltroPrazo(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="todos">Todos</option>
              <option value="urgentes">Urgentes (até 5 dias)</option>
              <option value="proximos">Próximos (6-15 dias)</option>
              <option value="futuros">Futuros (mais de 15 dias)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.processosList}>
        {carregando ? (
          <div className={styles.loading}>Carregando processos...</div>
        ) : processosFiltrados.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhum processo encontrado para os filtros selecionados.</p>
          </div>
        ) : (
          <div className={styles.processGrid}>
            {processosFiltrados.map((processo) => (
              <div key={processo.id} className={styles.processoCard}>
                <div className={styles.processoHeader}>
                  <span
                    className={`badge-status ${getStatusClass(
                      processo.status
                    )}`}
                  >
                    {processo.status}
                  </span>

                  {processo.prazo && (
                    <span
                      className={`${styles.prazoBadge} ${
                        styles[getPrazoClass(processo.prazo)]
                      }`}
                      title={`Prazo: ${formatarData(processo.prazo)}`}
                    >
                      {calcularDiasRestantes(processo.prazo) < 0
                        ? "Expirado"
                        : `${calcularDiasRestantes(processo.prazo)} dias`}
                    </span>
                  )}
                </div>

                <h3 className={styles.processoNumero}>{processo.numero}</h3>

                <div className={styles.processoInfo}>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Cliente:</span>
                    <span className={styles.infoValue}>
                      {processo.cliente.nome}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Tipo:</span>
                    <span className={styles.infoValue}>{processo.tipo}</span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Distribuição:</span>
                    <span className={styles.infoValue}>
                      {formatarData(processo.dataDistribuicao)}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Valor:</span>
                    <span className={styles.infoValue}>
                      {formatarMoeda(processo.valorCausa)}
                    </span>
                  </div>
                </div>

                <div className={styles.processoDescricao}>
                  <p>{processo.descricao}</p>
                </div>

                {processo.movimentacoes &&
                  processo.movimentacoes.length > 0 && (
                    <div className={styles.ultimaMovimentacao}>
                      <span className={styles.movimentacaoLabel}>
                        Última movimentação:
                      </span>
                      <span className={styles.movimentacaoData}>
                        {formatarData(processo.movimentacoes[0].data)}
                      </span>
                      <span className={styles.movimentacaoDescricao}>
                        {processo.movimentacoes[0].descricao}
                      </span>
                    </div>
                  )}

                <div className={styles.processoActions}>
                  <button className={styles.actionButton}>Ver detalhes</button>
                  <button className={styles.actionButton}>
                    Adicionar movimentação
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .badge-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .badge-info {
          background-color: rgba(33, 150, 243, 0.15);
          color: #2196f3;
        }

        .badge-warning {
          background-color: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .badge-success {
          background-color: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .badge-secondary {
          background-color: rgba(158, 158, 158, 0.15);
          color: #9e9e9e;
        }

        .badge-dark {
          background-color: rgba(33, 33, 33, 0.15);
          color: #333;
        }
      `}</style>
    </div>
  );
}
