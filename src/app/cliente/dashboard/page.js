"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ClienteDashboard() {
  const [userData, setUserData] = useState(null);
  const [processos, setProcessos] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [resumo, setResumo] = useState({
    totalProcessos: 0,
    processosAtivos: 0,
    proximaAudiencia: null,
    proximoPrazo: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados do servidor
    setTimeout(() => {
      const userDataLocal = JSON.parse(localStorage.getItem("clienteAuth"));
      setUserData(userDataLocal);

      // Dados mockados para processos
      const processosMock = [
        {
          id: 1,
          numero: "0123456-78.2023.8.26.0100",
          tipo: "Trabalhista",
          status: "Em andamento",
          dataAtualizacao: "2023-11-10",
          advogado: "Dra. Maria Silva",
          descricao:
            "Reclamação trabalhista - horas extras e verbas rescisórias",
          proximoPrazo: "2023-11-25",
        },
        {
          id: 2,
          numero: "0098765-43.2023.8.26.0100",
          tipo: "Civil",
          status: "Aguardando prazo",
          dataAtualizacao: "2023-11-08",
          advogado: "Dr. João Ferreira",
          descricao: "Ação de indenização por danos materiais e morais",
          proximoPrazo: "2023-11-18",
        },
        {
          id: 3,
          numero: "0456789-12.2023.8.26.0100",
          tipo: "Consumidor",
          status: "Concluído",
          dataAtualizacao: "2023-11-05",
          advogado: "Dr. Pedro Souza",
          descricao: "Ação de rescisão contratual com devolução de valores",
          proximoPrazo: null,
        },
      ];

      // Dados mockados para agendamentos
      const agendamentosMock = [
        {
          id: 1,
          tipo: "Reunião",
          data: "2023-11-20",
          hora: "14:30",
          advogado: "Dra. Maria Silva",
          local: "Escritório Sede",
          status: "Confirmado",
        },
        {
          id: 2,
          tipo: "Audiência",
          data: "2023-11-28",
          hora: "10:00",
          advogado: "Dr. João Ferreira",
          local: "Fórum Central",
          status: "Agendado",
        },
        {
          id: 3,
          tipo: "Consulta",
          data: "2023-12-05",
          hora: "15:00",
          advogado: "Dr. Pedro Souza",
          local: "Online (Zoom)",
          status: "Pendente",
        },
      ];

      // Dados mockados para resumo
      const resumoMock = {
        totalProcessos: processosMock.length,
        processosAtivos: processosMock.filter((p) => p.status !== "Concluído")
          .length,
        proximaAudiencia: {
          data: "2023-11-28",
          hora: "10:00",
          tipo: "Audiência de Instrução",
          processo: "0098765-43.2023.8.26.0100",
        },
        proximoPrazo: {
          data: "2023-11-18",
          descricao: "Prazo para contestação",
          processo: "0098765-43.2023.8.26.0100",
        },
      };

      setProcessos(processosMock);
      setAgendamentos(agendamentosMock);
      setResumo(resumoMock);
      setLoading(false);
    }, 800);
  }, []);

  const formatarData = (dataString) => {
    if (!dataString) return "N/A";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
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
    <div className="cliente-dashboard">
      {loading ? (
        <div className="loading">Carregando dados...</div>
      ) : (
        <>
          <div className="welcome-section">
            <div className="welcome-text">
              <h2>Bem-vindo(a), {userData?.nome?.split(" ")[0]}!</h2>
              <p>
                Este é seu painel de acompanhamento de processos e agendamentos.
              </p>
            </div>
            <div className="quick-actions">
              <Link href="/cliente/agendamentos/novo" className="btn-primary">
                Agendar Reunião
              </Link>
              <Link href="/cliente/perfil" className="btn-outline">
                Atualizar Perfil
              </Link>
            </div>
          </div>

          <div className="dashboard-summary">
            <div className="summary-card">
              <div className="summary-icon">📊</div>
              <div className="summary-content">
                <div className="summary-value">{resumo.totalProcessos}</div>
                <div className="summary-label">Total de Processos</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">⚖️</div>
              <div className="summary-content">
                <div className="summary-value">{resumo.processosAtivos}</div>
                <div className="summary-label">Processos Ativos</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">📅</div>
              <div className="summary-content">
                <div className="summary-value">
                  {resumo.proximaAudiencia
                    ? formatarData(resumo.proximaAudiencia.data)
                    : "Nenhuma"}
                </div>
                <div className="summary-label">Próxima Audiência</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-icon">⏱️</div>
              <div className="summary-content">
                <div className="summary-value">
                  {resumo.proximoPrazo
                    ? `${calcularDiasRestantes(resumo.proximoPrazo.data)} dias`
                    : "Nenhum"}
                </div>
                <div className="summary-label">Próximo Prazo</div>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="section-processos">
              <div className="section-header">
                <h3>Seus Processos</h3>
                <Link href="/cliente/processos" className="view-all">
                  Ver todos
                </Link>
              </div>
              <div className="processos-list">
                {processos.length === 0 ? (
                  <div className="empty-state">Nenhum processo encontrado.</div>
                ) : (
                  processos.map((processo) => (
                    <div key={processo.id} className="processo-item">
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
                      <div className="processo-detalhes">
                        <div className="processo-descricao">
                          {processo.descricao}
                        </div>
                        <div className="processo-advogado">
                          <span className="detalhe-label">Advogado:</span>{" "}
                          {processo.advogado}
                        </div>
                        <div className="processo-atualizacao">
                          <span className="detalhe-label">Atualizado em:</span>{" "}
                          {formatarData(processo.dataAtualizacao)}
                        </div>
                        {processo.proximoPrazo && (
                          <div className="processo-prazo">
                            <span className="detalhe-label">
                              Próximo prazo:
                            </span>{" "}
                            {formatarData(processo.proximoPrazo)}
                          </div>
                        )}
                      </div>
                      <div className="processo-actions">
                        <Link
                          href={`/cliente/processos/${processo.id}`}
                          className="btn-link"
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="section-agendamentos">
              <div className="section-header">
                <h3>Próximos Agendamentos</h3>
                <Link href="/cliente/agendamentos" className="view-all">
                  Ver todos
                </Link>
              </div>
              <div className="agendamentos-list">
                {agendamentos.length === 0 ? (
                  <div className="empty-state">
                    Nenhum agendamento encontrado.
                  </div>
                ) : (
                  agendamentos.map((agendamento) => (
                    <div key={agendamento.id} className="agendamento-item">
                      <div className="agendamento-icon">
                        {agendamento.tipo === "Reunião"
                          ? "🗓️"
                          : agendamento.tipo === "Audiência"
                          ? "⚖️"
                          : "📞"}
                      </div>
                      <div className="agendamento-info">
                        <div className="agendamento-tipo">
                          {agendamento.tipo}
                        </div>
                        <div className="agendamento-data">
                          {formatarData(agendamento.data)} às {agendamento.hora}
                        </div>
                        <div className="agendamento-local">
                          {agendamento.local}
                        </div>
                        <div className="agendamento-advogado">
                          Com: {agendamento.advogado}
                        </div>
                      </div>
                      <div className="agendamento-status">
                        <span
                          className={`status-badge status-${agendamento.status.toLowerCase()}`}
                        >
                          {agendamento.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .cliente-dashboard {
          width: 100%;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          font-size: 1.2rem;
          color: var(--color-text-muted);
        }

        .welcome-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .welcome-text h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          color: var(--color-text-dark);
        }

        .welcome-text p {
          margin: 0;
          color: var(--color-text-muted);
        }

        .quick-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary {
          padding: 0.75rem 1.25rem;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.3s;
        }

        .btn-primary:hover {
          background-color: #388e3c;
        }

        .btn-outline {
          padding: 0.75rem 1.25rem;
          background-color: transparent;
          color: #4caf50;
          border: 1px solid #4caf50;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
        }

        .btn-outline:hover {
          background-color: rgba(76, 175, 80, 0.1);
        }

        .dashboard-summary {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-card {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .summary-icon {
          font-size: 2rem;
          background-color: rgba(76, 175, 80, 0.1);
          color: #4caf50;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-content {
          flex: 1;
        }

        .summary-value {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-text-dark);
          margin-bottom: 0.25rem;
        }

        .summary-label {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .dashboard-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--color-text-dark);
        }

        .view-all {
          color: #4caf50;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .section-processos,
        .section-agendamentos {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .processo-item {
          padding: 1rem;
          border-radius: 6px;
          background-color: #f9f9f9;
          margin-bottom: 1rem;
          border-left: 3px solid #4caf50;
        }

        .processo-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
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

        .status-confirmado {
          background-color: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .status-agendado {
          background-color: rgba(33, 150, 243, 0.15);
          color: #2196f3;
        }

        .status-pendente {
          background-color: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .processo-tipo {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .processo-numero {
          font-family: monospace;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
          color: var(--color-text-dark);
          font-weight: 500;
        }

        .processo-detalhes {
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .processo-descricao {
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .detalhe-label {
          font-weight: 500;
          color: var(--color-text-dark);
        }

        .processo-advogado,
        .processo-atualizacao,
        .processo-prazo {
          margin-bottom: 0.25rem;
          color: var(--color-text-muted);
        }

        .processo-actions {
          text-align: right;
        }

        .btn-link {
          display: inline-block;
          color: #4caf50;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .btn-link:hover {
          text-decoration: underline;
        }

        .empty-state {
          padding: 2rem;
          text-align: center;
          color: var(--color-text-muted);
          background-color: #f9f9f9;
          border-radius: 8px;
        }

        .agendamento-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: #f9f9f9;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .agendamento-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
        }

        .agendamento-info {
          flex: 1;
        }

        .agendamento-tipo {
          font-weight: 500;
          color: var(--color-text-dark);
          margin-bottom: 0.25rem;
        }

        .agendamento-data,
        .agendamento-local,
        .agendamento-advogado {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }

        @media (max-width: 992px) {
          .dashboard-sections {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .welcome-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .dashboard-summary {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
