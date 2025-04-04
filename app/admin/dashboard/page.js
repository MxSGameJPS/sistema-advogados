"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    clientesAtivos: 0,
    processosPendentes: 0,
    processosEncerrados: 0,
    faturamentoMes: 0,
    atividadesHoje: [],
  });

  useEffect(() => {
    // Em um ambiente real, aqui você faria uma chamada API
    // para buscar os dados atualizados
    setStats({
      clientesAtivos: 148,
      processosPendentes: 42,
      processosEncerrados: 67,
      faturamentoMes: 247500,
      atividadesHoje: [
        {
          id: 1,
          tipo: "Audiência",
          cliente: "João Silva",
          horario: "09:30",
          status: "Pendente",
        },
        {
          id: 2,
          tipo: "Reunião",
          cliente: "Maria Oliveira",
          horario: "11:00",
          status: "Confirmado",
        },
        {
          id: 3,
          tipo: "Protocolo",
          cliente: "Carlos Souza",
          horario: "14:30",
          status: "Concluído",
        },
        {
          id: 4,
          tipo: "Audiência",
          cliente: "Ana Santos",
          horario: "16:00",
          status: "Pendente",
        },
      ],
    });
  }, []);

  // Formatação de valores monetários em Real brasileiro
  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="card stats-card">
          <div className="stats-card-content">
            <div className="stats-card-value">{stats.clientesAtivos}</div>
            <div className="stats-card-label">Clientes Ativos</div>
          </div>
          <div className="stats-card-icon client-icon">👥</div>
        </div>

        <div className="card stats-card">
          <div className="stats-card-content">
            <div className="stats-card-value">{stats.processosPendentes}</div>
            <div className="stats-card-label">Processos Pendentes</div>
          </div>
          <div className="stats-card-icon pending-icon">⏳</div>
        </div>

        <div className="card stats-card">
          <div className="stats-card-content">
            <div className="stats-card-value">{stats.processosEncerrados}</div>
            <div className="stats-card-label">Processos Encerrados</div>
          </div>
          <div className="stats-card-icon completed-icon">✅</div>
        </div>

        <div className="card stats-card">
          <div className="stats-card-content">
            <div className="stats-card-value">
              {formatarMoeda(stats.faturamentoMes)}
            </div>
            <div className="stats-card-label">Faturamento do Mês</div>
          </div>
          <div className="stats-card-icon revenue-icon">💰</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="card flex-1">
          <div className="card-header">
            <h3 className="card-title">Atividades de Hoje</h3>
            <button className="btn btn-primary">Ver Todas</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Cliente</th>
                <th>Horário</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {stats.atividadesHoje.map((atividade) => (
                <tr key={atividade.id}>
                  <td>{atividade.tipo}</td>
                  <td>{atividade.cliente}</td>
                  <td>{atividade.horario}</td>
                  <td>
                    <span
                      className={`status status-${atividade.status.toLowerCase()}`}
                    >
                      {atividade.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-secondary">
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="card flex-1">
          <div className="card-header">
            <h3 className="card-title">Últimos Processos</h3>
            <button className="btn btn-primary">Ver Todos</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Nº Processo</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023-0001</td>
                <td>João Silva</td>
                <td>Trabalhista</td>
                <td>
                  <span className="status status-andamento">Em Andamento</span>
                </td>
                <td>10/03/2023</td>
                <td>
                  <button className="btn btn-sm btn-secondary">Detalhes</button>
                </td>
              </tr>
              <tr>
                <td>2023-0002</td>
                <td>Maria Oliveira</td>
                <td>Cível</td>
                <td>
                  <span className="status status-ganho">Ganho</span>
                </td>
                <td>05/03/2023</td>
                <td>
                  <button className="btn btn-sm btn-secondary">Detalhes</button>
                </td>
              </tr>
              <tr>
                <td>2023-0003</td>
                <td>Carlos Souza</td>
                <td>Tributário</td>
                <td>
                  <span className="status status-pendente">Pendente</span>
                </td>
                <td>02/03/2023</td>
                <td>
                  <button className="btn btn-sm btn-secondary">Detalhes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .stats-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
        }

        .stats-card-value {
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-text-dark);
          margin-bottom: 0.5rem;
        }

        .stats-card-label {
          color: #666;
          font-size: 0.9rem;
        }

        .stats-card-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        .dashboard-row {
          display: flex;
          gap: 1.5rem;
        }

        .flex-1 {
          flex: 1;
        }

        .status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-pendente,
        .status-pendente {
          background-color: #fff8e1;
          color: #ffa000;
        }

        .status-confirmado,
        .status-andamento {
          background-color: #e3f2fd;
          color: #1976d2;
        }

        .status-concluído,
        .status-ganho {
          background-color: #e8f5e9;
          color: #388e3c;
        }

        .btn-sm {
          padding: 0.25rem 0.5rem;
          font-size: 0.85rem;
        }

        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
