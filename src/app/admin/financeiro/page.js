"use client";

import { useState, useEffect } from "react";

export default function Financeiro() {
  const [dadosFinanceiros, setDadosFinanceiros] = useState({
    receitas: [],
    despesas: [],
    resumo: {
      totalReceitas: 0,
      totalDespesas: 0,
      saldo: 0,
    },
    filtroMes: new Date().getMonth(),
    filtroAno: new Date().getFullYear(),
  });

  // Dados temporários para demonstração
  useEffect(() => {
    const dadosDemo = {
      receitas: [
        {
          id: 1,
          data: "2023-04-05",
          descricao: "Honorários - Processo 2023-0001",
          valor: 5500,
          categoria: "Honorários",
          status: "Recebido",
        },
        {
          id: 2,
          data: "2023-04-12",
          descricao: "Consultoria Jurídica - Empresa XYZ",
          valor: 3800,
          categoria: "Consultoria",
          status: "Recebido",
        },
        {
          id: 3,
          data: "2023-04-18",
          descricao: "Honorários - Processo 2023-0004",
          valor: 7200,
          categoria: "Honorários",
          status: "Pendente",
        },
        {
          id: 4,
          data: "2023-04-25",
          descricao: "Assessoria Jurídica Mensal",
          valor: 4500,
          categoria: "Assessoria",
          status: "Pendente",
        },
      ],
      despesas: [
        {
          id: 1,
          data: "2023-04-02",
          descricao: "Aluguel do Escritório",
          valor: 3800,
          categoria: "Instalações",
          status: "Pago",
        },
        {
          id: 2,
          data: "2023-04-10",
          descricao: "Salários da Equipe",
          valor: 12500,
          categoria: "Pessoal",
          status: "Pago",
        },
        {
          id: 3,
          data: "2023-04-15",
          descricao: "Contas de Serviços (Água, Luz, Internet)",
          valor: 950,
          categoria: "Serviços",
          status: "Pago",
        },
        {
          id: 4,
          data: "2023-04-22",
          descricao: "Material de Escritório",
          valor: 420,
          categoria: "Material",
          status: "Pendente",
        },
      ],
    };

    // Calcular resumo
    const totalReceitas = dadosDemo.receitas.reduce(
      (acc, item) => acc + item.valor,
      0
    );
    const totalDespesas = dadosDemo.despesas.reduce(
      (acc, item) => acc + item.valor,
      0
    );

    setDadosFinanceiros({
      ...dadosDemo,
      resumo: {
        totalReceitas,
        totalDespesas,
        saldo: totalReceitas - totalDespesas,
      },
      filtroMes: new Date().getMonth(),
      filtroAno: new Date().getFullYear(),
    });
  }, []);

  // Formatação de valores monetários em Real brasileiro
  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para formatar a data (yyyy-mm-dd para dd/mm/yyyy)
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  // Array com os nomes dos meses
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Manipuladores de mudança de filtro
  const handleMesChange = (e) => {
    setDadosFinanceiros({
      ...dadosFinanceiros,
      filtroMes: parseInt(e.target.value),
    });
  };

  const handleAnoChange = (e) => {
    setDadosFinanceiros({
      ...dadosFinanceiros,
      filtroAno: parseInt(e.target.value),
    });
  };

  return (
    <div className="financeiro">
      <div className="dashboard-header">
        <div className="filtros">
          <div className="filtro-grupo">
            <label htmlFor="filtroMes">Mês:</label>
            <select
              id="filtroMes"
              value={dadosFinanceiros.filtroMes}
              onChange={handleMesChange}
            >
              {meses.map((mes, index) => (
                <option key={index} value={index}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="filtro-grupo">
            <label htmlFor="filtroAno">Ano:</label>
            <select
              id="filtroAno"
              value={dadosFinanceiros.filtroAno}
              onChange={handleAnoChange}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <button className="btn btn-primary">Aplicar Filtros</button>
        </div>
        <div className="acoes">
          <button className="btn btn-primary">Nova Receita</button>
          <button className="btn btn-secondary">Nova Despesa</button>
          <button className="btn btn-outline">Exportar Relatório</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="card resumo-card receitas">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {formatarMoeda(dadosFinanceiros.resumo.totalReceitas)}
            </div>
            <div className="resumo-card-label">Receitas</div>
          </div>
          <div className="resumo-card-icon">💹</div>
        </div>

        <div className="card resumo-card despesas">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {formatarMoeda(dadosFinanceiros.resumo.totalDespesas)}
            </div>
            <div className="resumo-card-label">Despesas</div>
          </div>
          <div className="resumo-card-icon">📉</div>
        </div>

        <div className="card resumo-card saldo">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {formatarMoeda(dadosFinanceiros.resumo.saldo)}
            </div>
            <div className="resumo-card-label">Saldo</div>
          </div>
          <div className="resumo-card-icon">💰</div>
        </div>
      </div>

      <div className="financeiro-section">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Receitas</h3>
            <button className="btn btn-sm btn-primary">Ver Todas</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dadosFinanceiros.receitas.map((receita) => (
                <tr key={receita.id}>
                  <td>{formatarData(receita.data)}</td>
                  <td>{receita.descricao}</td>
                  <td>{receita.categoria}</td>
                  <td className="valor-cell">{formatarMoeda(receita.valor)}</td>
                  <td>
                    <span
                      className={`status status-${
                        receita.status === "Recebido" ? "concluído" : "pendente"
                      }`}
                    >
                      {receita.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-secondary">
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="financeiro-section">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Despesas</h3>
            <button className="btn btn-sm btn-primary">Ver Todas</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dadosFinanceiros.despesas.map((despesa) => (
                <tr key={despesa.id}>
                  <td>{formatarData(despesa.data)}</td>
                  <td>{despesa.descricao}</td>
                  <td>{despesa.categoria}</td>
                  <td className="valor-cell">{formatarMoeda(despesa.valor)}</td>
                  <td>
                    <span
                      className={`status status-${
                        despesa.status === "Pago" ? "concluído" : "pendente"
                      }`}
                    >
                      {despesa.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-secondary">
                        Editar
                      </button>
                      <button className="btn btn-sm btn-danger">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .financeiro {
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

        .filtros,
        .acoes {
          display: flex;
          gap: 1rem;
          align-items: center;
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
        }

        .resumo-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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

        .receitas .resumo-card-valor {
          color: #388e3c;
        }

        .despesas .resumo-card-valor {
          color: #d32f2f;
        }

        .saldo .resumo-card-valor {
          color: var(--color-accent);
        }

        .financeiro-section {
          margin-bottom: 1.5rem;
        }

        .valor-cell {
          text-align: right;
          font-family: monospace;
          font-weight: 500;
        }

        .btn-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn-outline {
          background-color: transparent;
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }

        .btn-outline:hover {
          background-color: rgba(212, 170, 61, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 992px) {
          .resumo-cards {
            grid-template-columns: repeat(1, 1fr);
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
