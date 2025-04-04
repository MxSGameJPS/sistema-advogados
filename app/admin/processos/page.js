"use client";

import { useState, useEffect } from "react";

export default function Processos() {
  const [processos, setProcessos] = useState([]);
  const [advogados, setAdvogados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statsProcessos, setStatsProcessos] = useState({
    total: 0,
    andamento: 0,
    ganhos: 0,
    perdidos: 0,
    arquivados: 0,
  });
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [abaAtiva, setAbaAtiva] = useState("ativos");

  // Dados temporários para demonstração
  useEffect(() => {
    // Dados de advogados
    const advogadosDemo = [
      { id: 1, nome: "Carlos Rodrigues" },
      { id: 2, nome: "Ana Paula Silva" },
      { id: 3, nome: "Bruno Oliveira" },
      { id: 4, nome: "Daniela Santos" },
    ];

    // Dados de clientes
    const clientesDemo = [
      { id: 1, nome: "João Carlos Silva" },
      { id: 2, nome: "Maria Oliveira Santos" },
      { id: 3, nome: "Empresa ABC Ltda" },
      { id: 4, nome: "Carlos Eduardo Ferreira" },
      { id: 5, nome: "Tecnologia XYZ S/A" },
    ];

    // Dados de processos
    const processosDemo = [
      {
        id: "2023-0001",
        cliente: { id: 1, nome: "João Carlos Silva" },
        advogado: { id: 1, nome: "Carlos Rodrigues" },
        tipo: "Trabalhista",
        descricao: "Processo trabalhista contra Empresa XYZ",
        dataInicio: "2023-01-15",
        ultimaAtualizacao: "2023-03-10",
        proximaAudiencia: "2023-05-20",
        vara: "2ª Vara do Trabalho de São Paulo",
        status: "Em Andamento",
      },
      {
        id: "2023-0002",
        cliente: { id: 3, nome: "Empresa ABC Ltda" },
        advogado: { id: 2, nome: "Ana Paula Silva" },
        tipo: "Tributário",
        descricao: "Contestação de multa fiscal",
        dataInicio: "2023-02-05",
        ultimaAtualizacao: "2023-03-15",
        proximaAudiencia: null,
        vara: "5ª Vara da Fazenda Pública de São Paulo",
        status: "Em Andamento",
      },
      {
        id: "2023-0003",
        cliente: { id: 2, nome: "Maria Oliveira Santos" },
        advogado: { id: 3, nome: "Bruno Oliveira" },
        tipo: "Cível",
        descricao: "Ação de indenização por danos morais",
        dataInicio: "2022-11-10",
        ultimaAtualizacao: "2023-02-28",
        proximaAudiencia: "2023-04-12",
        vara: "3ª Vara Cível de São Paulo",
        status: "Em Andamento",
      },
      {
        id: "2022-0015",
        cliente: { id: 5, nome: "Tecnologia XYZ S/A" },
        advogado: { id: 1, nome: "Carlos Rodrigues" },
        tipo: "Empresarial",
        descricao: "Disputa contratual com fornecedor",
        dataInicio: "2022-08-20",
        ultimaAtualizacao: "2023-01-15",
        proximaAudiencia: null,
        vara: "7ª Vara Empresarial de São Paulo",
        status: "Ganho",
      },
      {
        id: "2022-0010",
        cliente: { id: 4, nome: "Carlos Eduardo Ferreira" },
        advogado: { id: 4, nome: "Daniela Santos" },
        tipo: "Familiar",
        descricao: "Processo de divórcio",
        dataInicio: "2022-06-10",
        ultimaAtualizacao: "2022-12-05",
        proximaAudiencia: null,
        vara: "2ª Vara de Família de São Paulo",
        status: "Encerrado",
      },
      {
        id: "2022-0008",
        cliente: { id: 1, nome: "João Carlos Silva" },
        advogado: { id: 2, nome: "Ana Paula Silva" },
        tipo: "Trabalhista",
        descricao: "Reclamação trabalhista por horas extras",
        dataInicio: "2022-05-15",
        ultimaAtualizacao: "2022-11-20",
        proximaAudiencia: null,
        vara: "5ª Vara do Trabalho de São Paulo",
        status: "Perdido",
      },
      {
        id: "2022-0007",
        cliente: { id: 3, nome: "Empresa ABC Ltda" },
        advogado: { id: 1, nome: "Carlos Rodrigues" },
        tipo: "Tributário",
        descricao: "Execução fiscal",
        dataInicio: "2022-04-03",
        ultimaAtualizacao: "2022-10-15",
        proximaAudiencia: null,
        vara: "8ª Vara da Fazenda Pública de São Paulo",
        status: "Arquivado",
      },
    ];

    // Contar processos por status
    const total = processosDemo.length;
    const andamento = processosDemo.filter(
      (proc) => proc.status === "Em Andamento"
    ).length;
    const ganhos = processosDemo.filter(
      (proc) => proc.status === "Ganho"
    ).length;
    const perdidos = processosDemo.filter(
      (proc) => proc.status === "Perdido"
    ).length;
    const arquivados = processosDemo.filter(
      (proc) => proc.status === "Arquivado" || proc.status === "Encerrado"
    ).length;

    setProcessos(processosDemo);
    setAdvogados(advogadosDemo);
    setClientes(clientesDemo);
    setStatsProcessos({
      total,
      andamento,
      ganhos,
      perdidos,
      arquivados,
    });
  }, []);

  // Função para formatar a data (yyyy-mm-dd para dd/mm/yyyy)
  const formatarData = (dataString) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  // Filtrar processos com base na aba ativa e filtros
  const processosFiltrados = () => {
    let listaFiltrada = [...processos];

    // Primeiro filtro por aba (ativos vs. histórico)
    if (abaAtiva === "ativos") {
      listaFiltrada = listaFiltrada.filter(
        (proc) =>
          proc.status === "Em Andamento" ||
          proc.status === "Ganho" ||
          proc.status === "Perdido"
      );
    } else {
      listaFiltrada = listaFiltrada.filter(
        (proc) => proc.status === "Arquivado" || proc.status === "Encerrado"
      );
    }

    // Aplicar filtro de status se não for "todos"
    if (filtroStatus !== "todos") {
      listaFiltrada = listaFiltrada.filter((proc) => {
        if (filtroStatus === "andamento") return proc.status === "Em Andamento";
        if (filtroStatus === "ganho") return proc.status === "Ganho";
        if (filtroStatus === "perdido") return proc.status === "Perdido";
        if (filtroStatus === "arquivado")
          return proc.status === "Arquivado" || proc.status === "Encerrado";
        return true;
      });
    }

    // Aplicar filtro de tipo se não for "todos"
    if (filtroTipo !== "todos") {
      listaFiltrada = listaFiltrada.filter(
        (proc) => proc.tipo.toLowerCase() === filtroTipo.toLowerCase()
      );
    }

    return listaFiltrada;
  };

  // Obter lista única de tipos de processos
  const tiposProcessos = [...new Set(processos.map((proc) => proc.tipo))];

  return (
    <div className="processos">
      <div className="dashboard-header">
        <div className="abas">
          <button
            className={`aba-btn ${abaAtiva === "ativos" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("ativos")}
          >
            Processos Ativos
          </button>
          <button
            className={`aba-btn ${abaAtiva === "historico" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("historico")}
          >
            Histórico de Processos
          </button>
        </div>
        <div className="acoes">
          <button className="btn btn-primary">Novo Processo</button>
          <button className="btn btn-outline">Exportar Lista</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsProcessos.total}</div>
            <div className="resumo-card-label">Total de Processos</div>
          </div>
          <div className="resumo-card-icon">📋</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsProcessos.andamento}</div>
            <div className="resumo-card-label">Em Andamento</div>
          </div>
          <div className="resumo-card-icon">⏳</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsProcessos.ganhos}</div>
            <div className="resumo-card-label">Ganhos</div>
          </div>
          <div className="resumo-card-icon">✅</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsProcessos.perdidos}</div>
            <div className="resumo-card-label">Perdidos</div>
          </div>
          <div className="resumo-card-icon">❌</div>
        </div>
      </div>

      <div className="filtros-container">
        <div className="filtro-grupo">
          <label htmlFor="filtroStatus">Status:</label>
          <select
            id="filtroStatus"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os Status</option>
            {abaAtiva === "ativos" ? (
              <>
                <option value="andamento">Em Andamento</option>
                <option value="ganho">Ganhos</option>
                <option value="perdido">Perdidos</option>
              </>
            ) : (
              <option value="arquivado">Arquivados</option>
            )}
          </select>
        </div>
        <div className="filtro-grupo">
          <label htmlFor="filtroTipo">Tipo:</label>
          <select
            id="filtroTipo"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos os Tipos</option>
            {tiposProcessos.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Buscar processo..." />
          <button className="search-button">🔍</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {abaAtiva === "ativos"
              ? "Processos Ativos"
              : "Histórico de Processos"}
          </h3>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nº Processo</th>
                <th>Cliente</th>
                <th>Advogado</th>
                <th>Tipo</th>
                <th>Vara</th>
                <th>Data de Início</th>
                <th>Próxima Audiência</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {processosFiltrados().map((processo) => (
                <tr key={processo.id}>
                  <td>{processo.id}</td>
                  <td>{processo.cliente.nome}</td>
                  <td>{processo.advogado.nome}</td>
                  <td>{processo.tipo}</td>
                  <td>{processo.vara}</td>
                  <td>{formatarData(processo.dataInicio)}</td>
                  <td>{formatarData(processo.proximaAudiencia)}</td>
                  <td>
                    <span
                      className={`status status-${processo.status
                        .toLowerCase()
                        .replace(/\s+/g, "")}`}
                    >
                      {processo.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-secondary">
                        Detalhes
                      </button>
                      <button className="btn btn-sm btn-primary">Editar</button>
                      {processo.status === "Em Andamento" && (
                        <button className="btn btn-sm btn-outline">
                          Atualizar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .processos {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .abas,
        .acoes {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .aba-btn {
          padding: 0.5rem 1rem;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .aba-btn.ativo {
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          border-color: var(--color-accent);
          font-weight: 500;
        }

        .aba-btn:hover:not(.ativo) {
          background-color: #e0e0e0;
        }

        .resumo-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .resumo-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
        }

        .resumo-card-valor {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--color-text-dark);
          margin-bottom: 0.5rem;
        }

        .resumo-card-label {
          color: #666;
          font-size: 0.9rem;
        }

        .resumo-card-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        .filtros-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .filtro-grupo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filtro-grupo label {
          font-weight: 500;
        }

        .filtro-grupo select {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          min-width: 200px;
        }

        .search-box {
          display: flex;
          align-items: center;
          margin-left: auto;
        }

        .search-box input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          min-width: 250px;
        }

        .search-button {
          padding: 0.5rem;
          background-color: var(--color-accent);
          border: 1px solid var(--color-accent);
          border-radius: 0 4px 4px 0;
          cursor: pointer;
        }

        .table-container {
          overflow-x: auto;
        }

        .status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-emandamento {
          background-color: #e3f2fd;
          color: #1976d2;
        }

        .status-ganho {
          background-color: #e8f5e9;
          color: #388e3c;
        }

        .status-perdido {
          background-color: #ffebee;
          color: #d32f2f;
        }

        .status-arquivado,
        .status-encerrado {
          background-color: #f5f5f5;
          color: #757575;
        }

        .btn-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
        }

        .btn-outline:hover {
          background-color: rgba(212, 170, 61, 0.1);
        }

        @media (max-width: 1200px) {
          .resumo-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .search-box {
            margin-left: 0;
            width: 100%;
          }

          .search-box input {
            flex: 1;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .resumo-cards {
            grid-template-columns: 1fr;
          }

          .filtros-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .filtro-grupo {
            width: 100%;
          }

          .filtro-grupo select {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
