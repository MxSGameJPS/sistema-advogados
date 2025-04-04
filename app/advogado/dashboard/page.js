"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdvogadoDashboard() {
  const [loading, setLoading] = useState(true);
  const [desempenho, setDesempenho] = useState({
    processos: {
      total: 0,
      emAndamento: 0,
      concluidos: 0,
      ganhos: 0,
      taxa: 0,
    },
    audiencias: {
      realizadas: 0,
      agendadas: 0,
      taxa: 0,
    },
    financeiro: {
      previsao: 0,
      recebido: 0,
      pendente: 0,
      taxa: 0,
    },
    clientes: {
      total: 0,
      ativos: 0,
      novos: 0,
      satisfacao: 0,
    },
  });
  const [proximasAtividades, setProximasAtividades] = useState([]);
  const [processosRecentes, setProcessosRecentes] = useState([]);
  const router = useRouter();

  // Carregar dados do dashboard
  useEffect(() => {
    const carregarDados = async () => {
      // Em um ambiente real, isso seria uma chamada à API
      setLoading(true);

      // Simulando atraso de carregamento
      setTimeout(() => {
        // Dados simulados
        setDesempenho({
          processos: {
            total: 48,
            emAndamento: 32,
            concluidos: 16,
            ganhos: 12,
            taxa: 75,
          },
          audiencias: {
            realizadas: 24,
            agendadas: 8,
            taxa: 100,
          },
          financeiro: {
            previsao: 180000,
            recebido: 135000,
            pendente: 45000,
            taxa: 75,
          },
          clientes: {
            total: 28,
            ativos: 22,
            novos: 5,
            satisfacao: 92,
          },
        });

        setProximasAtividades([
          {
            id: 1,
            tipo: "Audiência",
            descricao:
              "Audiência de conciliação - Processo nº 0001234-12.2023.8.19.0001",
            data: "2023-12-18T14:30:00",
            local: "2ª Vara Cível - Tribunal de Justiça",
          },
          {
            id: 2,
            tipo: "Prazo",
            descricao:
              "Prazo final para recurso - Processo nº 0005678-90.2023.8.19.0001",
            data: "2023-12-20T23:59:59",
          },
          {
            id: 3,
            tipo: "Reunião",
            descricao: "Reunião com cliente Maria Silva",
            data: "2023-12-19T10:00:00",
            local: "Escritório",
          },
          {
            id: 4,
            tipo: "Despacho",
            descricao:
              "Despacho com juiz - Processo nº 0007890-12.2023.8.19.0001",
            data: "2023-12-21T15:00:00",
            local: "3ª Vara Cível",
          },
        ]);

        setProcessosRecentes([
          {
            id: 1,
            numero: "0001234-12.2023.8.19.0001",
            cliente: "João Pereira",
            tipo: "Indenização",
            status: "Em andamento",
            atualizacao: "2023-12-15",
          },
          {
            id: 2,
            numero: "0005678-90.2023.8.19.0001",
            cliente: "Maria Silva",
            tipo: "Divórcio",
            status: "Aguardando sentença",
            atualizacao: "2023-12-14",
          },
          {
            id: 3,
            numero: "0007890-12.2023.8.19.0001",
            cliente: "Empresa ABC Ltda",
            tipo: "Reclamatória Trabalhista",
            status: "Recurso pendente",
            atualizacao: "2023-12-13",
          },
        ]);

        setLoading(false);
      }, 1000);
    };

    carregarDados();
  }, []);

  // Formatação de valores monetários
  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Formatação de data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Formatação de hora
  const formatarHora = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Renderização condicional durante o carregamento
  if (loading) {
    return (
      <div className="loading-container">
        <p>Carregando mapa de desempenho...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 400px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="advogado-dashboard">
      <div className="dashboard-header">
        <h2>Meu Mapa de Desempenho</h2>
        <div className="periodo-seletor">
          <select defaultValue="mes">
            <option value="mes">Último mês</option>
            <option value="trimestre">Último trimestre</option>
            <option value="semestre">Último semestre</option>
            <option value="ano">Último ano</option>
          </select>
        </div>
      </div>

      {/* Indicadores de desempenho */}
      <div className="metricas-container">
        <div className="metrica-card">
          <div className="metrica-header">
            <h3>Processos</h3>
            <span className="metrica-icon">⚖️</span>
          </div>
          <div className="metrica-body">
            <div className="metrica-principal">
              <span className="valor">{desempenho.processos.total}</span>
              <span className="label">Total</span>
            </div>
            <div className="metrica-detalhes">
              <div className="detalhe-item">
                <span className="detalhe-valor">
                  {desempenho.processos.emAndamento}
                </span>
                <span className="detalhe-label">Em andamento</span>
              </div>
              <div className="detalhe-item">
                <span className="detalhe-valor">
                  {desempenho.processos.concluidos}
                </span>
                <span className="detalhe-label">Concluídos</span>
              </div>
              <div className="detalhe-item">
                <span className="detalhe-valor positivo">
                  {desempenho.processos.ganhos}
                </span>
                <span className="detalhe-label">Ganhos</span>
              </div>
            </div>
          </div>
          <div className="metrica-footer">
            <div className="progresso-container">
              <div className="progresso-barra">
                <div
                  className="progresso-valor"
                  style={{ width: `${desempenho.processos.taxa}%` }}
                ></div>
              </div>
              <span className="progresso-texto">
                {desempenho.processos.taxa}% de sucesso
              </span>
            </div>
          </div>
        </div>

        <div className="metrica-card">
          <div className="metrica-header">
            <h3>Audiências</h3>
            <span className="metrica-icon">🗣️</span>
          </div>
          <div className="metrica-body">
            <div className="metrica-principal">
              <span className="valor">{desempenho.audiencias.realizadas}</span>
              <span className="label">Realizadas</span>
            </div>
            <div className="metrica-detalhes">
              <div className="detalhe-item destaque">
                <span className="detalhe-valor">
                  {desempenho.audiencias.agendadas}
                </span>
                <span className="detalhe-label">Agendadas</span>
              </div>
            </div>
          </div>
          <div className="metrica-footer">
            <div className="progresso-container">
              <div className="progresso-barra">
                <div
                  className="progresso-valor"
                  style={{ width: `${desempenho.audiencias.taxa}%` }}
                ></div>
              </div>
              <span className="progresso-texto">
                {desempenho.audiencias.taxa}% de comparecimento
              </span>
            </div>
          </div>
        </div>

        <div className="metrica-card">
          <div className="metrica-header">
            <h3>Financeiro</h3>
            <span className="metrica-icon">💰</span>
          </div>
          <div className="metrica-body">
            <div className="metrica-principal">
              <span className="valor">
                {formatarMoeda(desempenho.financeiro.previsao)}
              </span>
              <span className="label">Previsão Total</span>
            </div>
            <div className="metrica-detalhes">
              <div className="detalhe-item positivo">
                <span className="detalhe-valor">
                  {formatarMoeda(desempenho.financeiro.recebido)}
                </span>
                <span className="detalhe-label">Recebido</span>
              </div>
              <div className="detalhe-item negativo">
                <span className="detalhe-valor">
                  {formatarMoeda(desempenho.financeiro.pendente)}
                </span>
                <span className="detalhe-label">Pendente</span>
              </div>
            </div>
          </div>
          <div className="metrica-footer">
            <div className="progresso-container">
              <div className="progresso-barra">
                <div
                  className="progresso-valor"
                  style={{ width: `${desempenho.financeiro.taxa}%` }}
                ></div>
              </div>
              <span className="progresso-texto">
                {desempenho.financeiro.taxa}% recebido
              </span>
            </div>
          </div>
        </div>

        <div className="metrica-card">
          <div className="metrica-header">
            <h3>Clientes</h3>
            <span className="metrica-icon">👥</span>
          </div>
          <div className="metrica-body">
            <div className="metrica-principal">
              <span className="valor">{desempenho.clientes.total}</span>
              <span className="label">Total</span>
            </div>
            <div className="metrica-detalhes">
              <div className="detalhe-item">
                <span className="detalhe-valor">
                  {desempenho.clientes.ativos}
                </span>
                <span className="detalhe-label">Ativos</span>
              </div>
              <div className="detalhe-item positivo">
                <span className="detalhe-valor">
                  +{desempenho.clientes.novos}
                </span>
                <span className="detalhe-label">Novos</span>
              </div>
            </div>
          </div>
          <div className="metrica-footer">
            <div className="progresso-container">
              <div className="progresso-barra">
                <div
                  className="progresso-valor"
                  style={{ width: `${desempenho.clientes.satisfacao}%` }}
                ></div>
              </div>
              <span className="progresso-texto">
                {desempenho.clientes.satisfacao}% satisfação
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-secoes">
        {/* Próximas atividades */}
        <div className="secao-dashboard">
          <div className="secao-header">
            <h3>Próximas Atividades</h3>
            <button
              className="btn-ver-todos"
              onClick={() => router.push("/advogado/agenda")}
            >
              Ver agenda completa
            </button>
          </div>
          <div className="lista-atividades">
            {proximasAtividades.map((atividade) => (
              <div className="atividade-item" key={atividade.id}>
                <div className="atividade-tipo">
                  <span className="tipo-icone">
                    {atividade.tipo === "Audiência" && "⚖️"}
                    {atividade.tipo === "Prazo" && "⏱️"}
                    {atividade.tipo === "Reunião" && "👥"}
                    {atividade.tipo === "Despacho" && "📝"}
                  </span>
                  <span className="tipo-texto">{atividade.tipo}</span>
                </div>
                <div className="atividade-detalhes">
                  <p className="atividade-descricao">{atividade.descricao}</p>
                  <div className="atividade-meta">
                    <span className="atividade-data">
                      {formatarData(atividade.data)} às{" "}
                      {formatarHora(atividade.data)}
                    </span>
                    {atividade.local && (
                      <span className="atividade-local">
                        <span className="local-icone">📍</span>
                        {atividade.local}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Processos recentes */}
        <div className="secao-dashboard">
          <div className="secao-header">
            <h3>Processos Recentes</h3>
            <button
              className="btn-ver-todos"
              onClick={() => router.push("/advogado/processos")}
            >
              Ver todos os processos
            </button>
          </div>
          <div className="lista-processos">
            <table className="processos-tabela">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Atualização</th>
                </tr>
              </thead>
              <tbody>
                {processosRecentes.map((processo) => (
                  <tr key={processo.id} className="processo-item">
                    <td className="processo-numero">{processo.numero}</td>
                    <td className="processo-cliente">{processo.cliente}</td>
                    <td className="processo-tipo">{processo.tipo}</td>
                    <td className="processo-status">
                      <span
                        className={`status-badge ${processo.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {processo.status}
                      </span>
                    </td>
                    <td className="processo-data">
                      {formatarData(processo.atualizacao)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .advogado-dashboard {
          padding: 1rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .dashboard-header h2 {
          margin: 0;
          color: var(--color-text);
        }

        .periodo-seletor select {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--color-border);
          background-color: var(--color-bg-light);
          color: var(--color-text);
        }

        .metricas-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metrica-card {
          background-color: var(--color-bg-light);
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .metrica-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .metrica-header h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--color-text-dark);
        }

        .metrica-icon {
          font-size: 1.5rem;
        }

        .metrica-body {
          flex-grow: 1;
          margin-bottom: 1.5rem;
        }

        .metrica-principal {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }

        .metrica-principal .valor {
          font-size: 2rem;
          font-weight: bold;
          color: var(--color-primary);
        }

        .metrica-principal .label {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .metrica-detalhes {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .detalhe-item {
          display: flex;
          flex-direction: column;
          min-width: 80px;
        }

        .detalhe-valor {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .detalhe-valor.positivo {
          color: var(--color-success);
        }

        .detalhe-valor.negativo {
          color: var(--color-danger);
        }

        .detalhe-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .progresso-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progresso-barra {
          height: 8px;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progresso-valor {
          height: 100%;
          background-color: var(--color-accent);
          border-radius: 4px;
        }

        .progresso-texto {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .dashboard-secoes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .secao-dashboard {
          background-color: var(--color-bg-light);
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .secao-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .secao-header h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--color-text-dark);
        }

        .btn-ver-todos {
          background: none;
          border: none;
          color: var(--color-accent);
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn-ver-todos:hover {
          text-decoration: underline;
        }

        .lista-atividades {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .atividade-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: 6px;
          background-color: rgba(0, 0, 0, 0.02);
          border-left: 3px solid var(--color-accent);
        }

        .atividade-tipo {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
        }

        .tipo-icone {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .tipo-texto {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          text-align: center;
        }

        .atividade-detalhes {
          flex-grow: 1;
        }

        .atividade-descricao {
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .atividade-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .atividade-local {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .processos-tabela {
          width: 100%;
          border-collapse: collapse;
        }

        .processos-tabela th {
          text-align: left;
          padding: 0.75rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .processos-tabela td {
          padding: 0.75rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .processo-numero {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .status-badge.em-andamento {
          background-color: rgba(var(--color-primary-rgb), 0.1);
          color: var(--color-primary);
        }

        .status-badge.aguardando-sentença {
          background-color: rgba(var(--color-accent-rgb), 0.1);
          color: var(--color-accent);
        }

        .status-badge.recurso-pendente {
          background-color: rgba(var(--color-warning-rgb), 0.1);
          color: var(--color-warning);
        }

        @media (max-width: 1200px) {
          .dashboard-secoes {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .metricas-container {
            grid-template-columns: 1fr;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .secao-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .atividade-item {
            flex-direction: column;
          }

          .atividade-tipo {
            flex-direction: row;
            min-width: auto;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .processos-tabela thead {
            display: none;
          }

          .processos-tabela,
          .processos-tabela tbody,
          .processos-tabela tr,
          .processos-tabela td {
            display: block;
            width: 100%;
          }

          .processos-tabela tr {
            margin-bottom: 1rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            padding: 0.5rem;
          }

          .processos-tabela td {
            padding: 0.5rem;
            text-align: right;
            border-bottom: none;
            position: relative;
          }

          .processos-tabela td:before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
          }
        }
      `}</style>
    </div>
  );
}
