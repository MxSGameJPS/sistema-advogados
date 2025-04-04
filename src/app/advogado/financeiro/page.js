"use client";

import { useState, useEffect } from "react";

export default function ControleFinanceiro() {
  const [transacoes, setTransacoes] = useState([]);
  const [resumo, setResumo] = useState({
    receitas: 0,
    despesas: 0,
    saldo: 0,
    receber: 0,
  });
  const [filtroMes, setFiltroMes] = useState(new Date().getMonth());
  const [filtroAno, setFiltroAno] = useState(new Date().getFullYear());
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [carregando, setCarregando] = useState(true);

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

  useEffect(() => {
    // Simulação de carregamento de dados do servidor
    setTimeout(() => {
      const mockTransacoes = [
        {
          id: 1,
          descricao: "Honorários - Processo nº 0001234-12.2023",
          tipo: "receita",
          categoria: "honorários",
          valor: 3500,
          data: "2023-12-10",
          status: "recebido",
          cliente: {
            id: 1,
            nome: "João Silva",
          },
          processo: "0001234-12.2023.8.26.0100",
        },
        {
          id: 2,
          descricao: "Honorários - Processo nº 0005678-90.2023",
          tipo: "receita",
          categoria: "honorários",
          valor: 4500,
          data: "2023-12-15",
          status: "pendente",
          cliente: {
            id: 2,
            nome: "Maria Souza",
          },
          processo: "0005678-90.2023.8.26.0100",
        },
        {
          id: 3,
          descricao: "Custas judiciais - Processo nº 0007890-12.2023",
          tipo: "despesa",
          categoria: "custas processuais",
          valor: 850,
          data: "2023-12-08",
          status: "pago",
          cliente: {
            id: 3,
            nome: "Empresa ABC Ltda",
          },
          processo: "0007890-12.2023.8.26.0100",
        },
        {
          id: 4,
          descricao: "Consultoria - Cliente Pedro Oliveira",
          tipo: "receita",
          categoria: "consultoria",
          valor: 1200,
          data: "2023-12-05",
          status: "recebido",
          cliente: {
            id: 4,
            nome: "Pedro Oliveira",
          },
          processo: null,
        },
        {
          id: 5,
          descricao: "Material de escritório",
          tipo: "despesa",
          categoria: "material",
          valor: 350,
          data: "2023-12-12",
          status: "pago",
          cliente: null,
          processo: null,
        },
      ];

      setTransacoes(mockTransacoes);

      // Calcular resumo
      const resumoCalculado = mockTransacoes.reduce(
        (acc, transacao) => {
          if (transacao.tipo === "receita") {
            if (transacao.status === "recebido") {
              acc.receitas += transacao.valor;
            } else if (transacao.status === "pendente") {
              acc.receber += transacao.valor;
            }
          } else if (transacao.tipo === "despesa" && transacao.status === "pago") {
            acc.despesas += transacao.valor;
          }
          return acc;
        },
        { receitas: 0, despesas: 0, receber: 0 }
      );

      resumoCalculado.saldo = resumoCalculado.receitas - resumoCalculado.despesas;

      setResumo(resumoCalculado);
      setCarregando(false);
    }, 800);
  }, []);

  // Formatar valor monetário
  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Formatar data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  // Filtrar transações
  const transacoesFiltradas = transacoes.filter((transacao) => {
    const data = new Date(transacao.data);
    const mesCorreto = filtroMes === "todos" || data.getMonth() === parseInt(filtroMes);
    const anoCorreto = filtroAno === "todos" || data.getFullYear() === parseInt(filtroAno);
    const tipoCorreto = filtroTipo === "todos" || transacao.tipo === filtroTipo;

    return mesCorreto && anoCorreto && tipoCorreto;
  });

  return (
    <div className="controle-financeiro">
      <div className="dashboard-header">
        <div className="filtros">
          <div className="filtro-grupo">
            <label>Mês:</label>
            <select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
            >
              <option value="todos">Todos</option>
              {meses.map((mes, index) => (
                <option key={index} value={index}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="filtro-grupo">
            <label>Ano:</label>
            <select
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className="filtro-grupo">
            <label>Tipo:</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
          </div>
        </div>
        <div className="acoes">
          <button className="btn-primario">Nova Transação</button>
          <button className="btn-secundario">Exportar Relatório</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor positivo">{formatarMoeda(resumo.receitas)}</div>
            <div className="resumo-label">Receitas</div>
          </div>
          <div className="resumo-icon">💵</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor negativo">{formatarMoeda(resumo.despesas)}</div>
            <div className="resumo-label">Despesas</div>
          </div>
          <div className="resumo-icon">💸</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className={`resumo-valor ${resumo.saldo >= 0 ? 'positivo' : 'negativo'}`}>
              {formatarMoeda(resumo.saldo)}
            </div>
            <div className="resumo-label">Saldo</div>
          </div>
          <div className="resumo-icon">💰</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor pendente">{formatarMoeda(resumo.receber)}</div>
            <div className="resumo-label">A Receber</div>
          </div>
          <div className="resumo-icon">⏳</div>
        </div>
      </div>

      {carregando ? (
        <div className="carregando">Carregando dados financeiros...</div>
      ) : transacoesFiltradas.length === 0 ? (
        <div className="lista-vazia">
          <p>Nenhuma transação encontrada para os filtros selecionados.</p>
        </div>
      ) : (
        <div className="tabela-container">
          <table className="tabela-transacoes">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Cliente/Processo</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoesFiltradas.map((transacao) => (
                <tr key={transacao.id} className={transacao.tipo}>
                  <td>{formatarData(transacao.data)}</td>
                  <td>{transacao.descricao}</td>
                  <td>{transacao.categoria}</td>
                  <td>
                    {transacao.cliente ? (
                      transacao.cliente.nome
                    ) : (
                      <span className="info-na">N/A</span>
                    )}
                    {transacao.processo && (
                      <div className="processo-info">{transacao.processo}</div>
                    )}
                  </td>
                  <td className={`valor ${transacao.tipo}`}>
                    {transacao.tipo === 'despesa' ? '-' : ''}
                    {formatarMoeda(transacao.valor)}
                  </td>
                  <td>
                    <span className={`status ${transacao.status}`}>
                      {transacao.status === "recebido" && "Recebido"}
                      {transacao.status === "pendente" && "Pendente"}
                      {transacao.status === "pago" && "Pago"}
                    </span>
                  </td>
                  <td>
                    <div className="acoes-btns">
                      <button className="btn-acao" title="Editar">
                        ✏️
                      </button>
                      <button className="btn-acao" title="Excluir">
                        🗑️
                      </button>
                      {transacao.status === "pendente" && (
                        <button className="btn-acao" title="Marcar como Recebido/Pago">
                          ✅
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .controle-financeiro {
          padding: 1rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filtros {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filtro-grupo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filtro-grupo label {
          font-weight: 500;
          white-space: nowrap;
        }

        .filtro-grupo select {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          min-width: 150px;
        }

        .acoes {
          display: flex;
          gap: 0.5rem;
        }

        .btn-primario {
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          border: none;
          padding: a .5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .btn-secundario {
          background-color: transparent;
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .resumo-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .resumo-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .resumo-info {
          display: flex;
          flex-direction: column;
        }

        .resumo-valor {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .resumo-valor.positivo {
          color: var(--color-success, #4caf50);
        }

        .resumo-valor.negativo {
          color: var(--color-danger, #f44336);
        }

        .resumo-valor.pendente {
          color: var(--color-warning, #ff9800);
        }

        .resumo-label {
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }

        .resumo-icon {
          font-size: 2.5rem;
          opacity: 0.8;
        }

        .carregando,
        .lista-vazia {
          padding: 2rem;
          text-align: center;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .tabela-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow-x: auto;
        }

        .tabela-transacoes {
          width: 100%;
          border-collapse: collapse;
        }

        .tabela-transacoes th,
        .tabela-transacoes td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .tabela-transacoes th {
          background-color: #f5f5f5;
          font-weight: 500;
          color: var(--color-text-dark);
        }

        .tabela-transacoes tr:hover {
          background-color: #f9f9f9;
        }

        .tabela-transacoes tr.receita:hover {
          background-color: rgba(76, 175, 80, 0.05);
        }

        .tabela-transacoes tr.despesa:hover {
          background-color: rgba(244, 67, 54, 0.05);
        }

        .valor {
          font-weight: 500;
        }

        .valor.receita {
          color: var(--color-success, #4caf50);
        }

        .valor.despesa {
          color: var(--color-danger, #f44336);
        }

        .status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status.recebido,
        .status.pago {
          background-color: rgba(76, 175, 80, 0.15);
          color: var(--color-success, #4caf50);
        }

        .status.pendente {
          background-color: rgba(255, 152, 0, 0.15);
          color: var(--color-warning, #ff9800);
        }

        .info-na {
          color: var(--color-text-muted);
          font-style: italic;
        }

        .processo-info {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
        }

        .acoes-btns {
          display: flex;
          gap: 0.5rem;
        }

        .btn-acao {
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .btn-acao:hover {
          background-color: #f0f0f0;
        }

        @media (max-width: 1024px) {
          .resumo-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .filtros {
            width: 100%;
          }

          .filtro-grupo {
            flex: 1;
            min-width: 200px;
          }

          .acoes {
            width: 100%;
            justify-content: space-between;
          }

          .resumo-cards {
            grid-template-columns: 1fr;
          }

          .tabela-transacoes thead {
            display: none;
          }

          .tabela-transacoes,
          .tabela-transacoes tbody,
          .tabela-transacoes tr,
          .tabela-transacoes td {
            display: block;
            width: 100%;
          }

          .tabela-transacoes tr {
            margin-bottom: 1rem;
            border: 1px solid #eee;
            border-radius: 8px;
          }

          .tabela-transacoes td {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            text-align: right;
            border-bottom: 1px solid #f5f5f5;
          }

          .tabela-transacoes td:before {
            content: attr(data-label);
            font-weight: 500;
            float: left;
            text-align: left;
          }

          .tabela-transacoes td:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
} 