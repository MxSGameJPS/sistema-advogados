"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClienteProcessos() {
  const [processos, setProcessos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroPesquisa, setFiltroPesquisa] = useState("");
  const [processosFiltrados, setProcessosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados do servidor
    setTimeout(() => {
      const processosMock = [
        {
          id: 1,
          numero: "0123456-78.2023.8.26.0100",
          tipo: "Trabalhista",
          status: "Em andamento",
          dataDistribuicao: "2023-05-15",
          dataAtualizacao: "2023-11-10",
          advogado: {
            nome: "Maria Silva",
            email: "maria.silva@maisdireito.com",
            telefone: "(11) 98765-4321",
          },
          vara: "2ª Vara do Trabalho",
          comarca: "São Paulo",
          valorCausa: 50000,
          descricao:
            "Reclamação trabalhista - horas extras e verbas rescisórias",
          parteContraria: "Empresa XYZ Ltda.",
          proximoPrazo: "2023-11-25",
          proximaAudiencia: "2023-12-10",
          movimentacoes: [
            {
              id: 101,
              data: "2023-11-10",
              tipo: "Publicação",
              descricao: "Publicação de sentença",
            },
            {
              id: 102,
              data: "2023-10-25",
              tipo: "Audiência",
              descricao: "Audiência de instrução realizada",
            },
            {
              id: 103,
              data: "2023-09-15",
              tipo: "Petição",
              descricao: "Juntada de documentos",
            },
          ],
        },
        {
          id: 2,
          numero: "0098765-43.2023.8.26.0100",
          tipo: "Civil",
          status: "Aguardando prazo",
          dataDistribuicao: "2023-06-20",
          dataAtualizacao: "2023-11-08",
          advogado: {
            nome: "João Ferreira",
            email: "joao.ferreira@maisdireito.com",
            telefone: "(11) 97654-3210",
          },
          vara: "5ª Vara Cível",
          comarca: "São Paulo",
          valorCausa: 75000,
          descricao: "Ação de indenização por danos materiais e morais",
          parteContraria: "Seguradora ABC S/A",
          proximoPrazo: "2023-11-18",
          proximaAudiencia: "2023-11-28",
          movimentacoes: [
            {
              id: 201,
              data: "2023-11-08",
              tipo: "Intimação",
              descricao: "Intimação para contestar",
            },
            {
              id: 202,
              data: "2023-10-30",
              tipo: "Despacho",
              descricao: "Despacho inicial",
            },
          ],
        },
        {
          id: 3,
          numero: "0456789-12.2023.8.26.0100",
          tipo: "Consumidor",
          status: "Concluído",
          dataDistribuicao: "2023-03-10",
          dataAtualizacao: "2023-11-05",
          advogado: {
            nome: "Pedro Souza",
            email: "pedro.souza@maisdireito.com",
            telefone: "(11) 96543-2109",
          },
          vara: "3ª Vara do Juizado Especial Cível",
          comarca: "São Paulo",
          valorCausa: 25000,
          descricao: "Ação de rescisão contratual com devolução de valores",
          parteContraria: "Loja de Eletrônicos DEF",
          proximoPrazo: null,
          proximaAudiencia: null,
          movimentacoes: [
            {
              id: 301,
              data: "2023-11-05",
              tipo: "Trânsito em julgado",
              descricao: "Certidão de trânsito em julgado",
            },
            {
              id: 302,
              data: "2023-10-10",
              tipo: "Sentença",
              descricao: "Sentença procedente",
            },
            {
              id: 303,
              data: "2023-09-05",
              tipo: "Audiência",
              descricao: "Audiência de conciliação",
            },
          ],
        },
        {
          id: 4,
          numero: "0567890-12.2023.8.26.0100",
          tipo: "Família",
          status: "Em andamento",
          dataDistribuicao: "2023-07-05",
          dataAtualizacao: "2023-11-03",
          advogado: {
            nome: "Ana Oliveira",
            email: "ana.oliveira@maisdireito.com",
            telefone: "(11) 95432-1098",
          },
          vara: "2ª Vara de Família e Sucessões",
          comarca: "São Paulo",
          valorCausa: 0,
          descricao: "Ação de alimentos",
          parteContraria: "João da Silva",
          proximoPrazo: "2023-11-20",
          proximaAudiencia: "2023-12-05",
          movimentacoes: [
            {
              id: 401,
              data: "2023-11-03",
              tipo: "Designação",
              descricao: "Designação de audiência para 05/12/2023",
            },
            {
              id: 402,
              data: "2023-10-20",
              tipo: "Despacho",
              descricao: "Despacho inicial",
            },
          ],
        },
      ];

      setProcessos(processosMock);
      setProcessosFiltrados(processosMock);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    filtrarProcessos();
  }, [filtroStatus, filtroPesquisa, processos]);

  const filtrarProcessos = () => {
    let resultado = [...processos];

    // Filtro por status
    if (filtroStatus !== "todos") {
      resultado = resultado.filter(
        (processo) =>
          processo.status.toLowerCase() === filtroStatus.toLowerCase()
      );
    }

    // Filtro por pesquisa (número, tipo, advogado, etc)
    if (filtroPesquisa.trim() !== "") {
      const pesquisa = filtroPesquisa.toLowerCase().trim();
      resultado = resultado.filter(
        (processo) =>
          processo.numero.toLowerCase().includes(pesquisa) ||
          processo.tipo.toLowerCase().includes(pesquisa) ||
          processo.advogado.nome.toLowerCase().includes(pesquisa) ||
          processo.comarca.toLowerCase().includes(pesquisa) ||
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

  const calcularDiasRestantes = (dataString) => {
    if (!dataString) return null;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const data = new Date(dataString);

    const diffTempo = data.getTime() - hoje.getTime();
    const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

    return diffDias;
  };

  return (
    <div className="processos-container">
      <div className="processos-header">
        <div className="header-title">
          <h2>Meus Processos</h2>
          <p>Acompanhe o andamento dos seus processos</p>
        </div>
      </div>

      <div className="filtros-container">
        <div className="filtro-pesquisa">
          <input
            type="text"
            placeholder="Buscar por número, tipo, advogado..."
            value={filtroPesquisa}
            onChange={(e) => setFiltroPesquisa(e.target.value)}
          />
          <button className="btn-pesquisar">🔍</button>
        </div>

        <div className="filtro-status">
          <label htmlFor="filtroStatus">Status:</label>
          <select
            id="filtroStatus"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="em andamento">Em andamento</option>
            <option value="aguardando prazo">Aguardando prazo</option>
            <option value="concluído">Concluído</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando processos...</p>
        </div>
      ) : processosFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum processo encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="processos-lista">
          {processosFiltrados.map((processo) => (
            <div key={processo.id} className="processo-card">
              <div className="processo-header">
                <span
                  className={`status-badge status-${processo.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {processo.status}
                </span>
                <span className="processo-tipo">{processo.tipo}</span>
              </div>

              <div className="processo-numero">{processo.numero}</div>

              <div className="processo-info">
                <div className="info-grupo">
                  <div className="info-item">
                    <span className="info-label">Advogado:</span>
                    <span className="info-valor">{processo.advogado.nome}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Distribuição:</span>
                    <span className="info-valor">
                      {formatarData(processo.dataDistribuicao)}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Comarca:</span>
                    <span className="info-valor">{processo.comarca}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Vara:</span>
                    <span className="info-valor">{processo.vara}</span>
                  </div>
                </div>

                <div className="info-descricao">
                  <span className="info-label">Descrição:</span>
                  <p>{processo.descricao}</p>
                </div>
              </div>

              <div className="processo-prazos">
                <div className="prazo-item">
                  <span className="prazo-label">Próximo Prazo:</span>
                  <span className="prazo-valor">
                    {processo.proximoPrazo
                      ? `${formatarData(
                          processo.proximoPrazo
                        )} (${calcularDiasRestantes(
                          processo.proximoPrazo
                        )} dias)`
                      : "Nenhum prazo pendente"}
                  </span>
                </div>

                <div className="prazo-item">
                  <span className="prazo-label">Próxima Audiência:</span>
                  <span className="prazo-valor">
                    {processo.proximaAudiencia
                      ? formatarData(processo.proximaAudiencia)
                      : "Nenhuma audiência agendada"}
                  </span>
                </div>
              </div>

              <div className="processo-footer">
                <Link
                  href={`/cliente/processos/${processo.id}`}
                  className="btn-ver-detalhes"
                >
                  Ver Detalhes
                </Link>
                <Link
                  href={`/cliente/agendamentos/novo?advogado=${processo.advogado.nome}&processo=${processo.numero}`}
                  className="btn-agendar"
                >
                  Agendar Reunião
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .processos-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .processos-header {
          margin-bottom: 1.5rem;
        }

        .header-title h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          color: var(--color-text-dark);
        }

        .header-title p {
          margin: 0;
          color: var(--color-text-muted);
        }

        .filtros-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          background-color: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .filtro-pesquisa {
          display: flex;
          flex: 1;
          max-width: 500px;
        }

        .filtro-pesquisa input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px 0 0 4px;
          font-size: 0.9rem;
        }

        .filtro-pesquisa input:focus {
          outline: none;
          border-color: #4caf50;
        }

        .btn-pesquisar {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
        }

        .filtro-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filtro-status label {
          font-weight: 500;
          color: var(--color-text-dark);
        }

        .filtro-status select {
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background-color: white;
          font-size: 0.9rem;
          min-width: 180px;
        }

        .filtro-status select:focus {
          outline: none;
          border-color: #4caf50;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #4caf50;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .empty-state {
          background-color: white;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .empty-state p {
          color: var(--color-text-muted);
          margin: 0;
        }

        .processos-lista {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .processo-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .processo-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-em-andamento {
          background-color: rgba(33, 150, 243, 0.15);
          color: #2196f3;
        }

        .status-aguardando-prazo {
          background-color: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .status-concluído {
          background-color: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .processo-tipo {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .processo-numero {
          font-family: monospace;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-dark);
          margin-bottom: 1rem;
        }

        .processo-info {
          margin-bottom: 1.5rem;
        }

        .info-grupo {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }

        .info-valor {
          font-size: 0.95rem;
          color: var(--color-text-dark);
        }

        .info-descricao p {
          margin: 0.25rem 0 0 0;
          font-size: 0.95rem;
          color: var(--color-text-dark);
          line-height: 1.5;
        }

        .processo-prazos {
          background-color: #f5f5f5;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1.5rem;
        }

        .prazo-item {
          flex: 1;
        }

        .prazo-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-muted);
          display: block;
          margin-bottom: 0.25rem;
        }

        .prazo-valor {
          font-size: 0.95rem;
          color: var(--color-text-dark);
        }

        .processo-footer {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .btn-ver-detalhes,
        .btn-agendar {
          flex: 1;
          text-align: center;
          padding: 0.75rem 1rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .btn-ver-detalhes {
          background-color: transparent;
          color: #4caf50;
          border: 1px solid #4caf50;
        }

        .btn-ver-detalhes:hover {
          background-color: rgba(76, 175, 80, 0.1);
        }

        .btn-agendar {
          background-color: #4caf50;
          color: white;
          border: none;
        }

        .btn-agendar:hover {
          background-color: #388e3c;
        }

        @media (max-width: 768px) {
          .filtros-container {
            flex-direction: column;
            gap: 1rem;
          }

          .filtro-pesquisa {
            max-width: 100%;
          }

          .filtro-status {
            width: 100%;
            justify-content: space-between;
          }

          .filtro-status select {
            flex: 1;
          }

          .processo-prazos {
            flex-direction: column;
            gap: 1rem;
          }

          .info-grupo {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
