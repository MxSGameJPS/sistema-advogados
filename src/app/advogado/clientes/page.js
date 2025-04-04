"use client";

import { useState, useEffect } from "react";

export default function GestaoClientes() {
  const [clientes, setClientes] = useState([]);
  const [estadoCadastros, setEstadoCadastros] = useState({
    total: 0,
    ativos: 0,
    pendentes: 0,
    inativos: 0,
  });
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados do servidor
    setTimeout(() => {
      const mockClientes = [
        {
          id: 1,
          nome: "João Silva",
          tipo: "Pessoa Física",
          cpfCnpj: "123.456.789-00",
          email: "joao.silva@email.com",
          telefone: "(11) 98765-4321",
          dataCadastro: "2023-08-15",
          status: "ativo",
          endereco: "Rua das Flores, 123 - São Paulo/SP",
        },
        {
          id: 2,
          nome: "Empresa ABC Ltda",
          tipo: "Pessoa Jurídica",
          cpfCnpj: "12.345.678/0001-90",
          email: "contato@empresaabc.com",
          telefone: "(11) 3456-7890",
          dataCadastro: "2023-09-20",
          status: "ativo",
          endereco: "Av. Paulista, 1000 - São Paulo/SP",
        },
        {
          id: 3,
          nome: "Maria Souza",
          tipo: "Pessoa Física",
          cpfCnpj: "987.654.321-00",
          email: "maria.souza@email.com",
          telefone: "(11) 91234-5678",
          dataCadastro: "2023-10-10",
          status: "pendente",
          endereco: "Rua dos Pinheiros, 500 - São Paulo/SP",
        },
        {
          id: 4,
          nome: "Carlos Ferreira",
          tipo: "Pessoa Física",
          cpfCnpj: "456.789.123-00",
          email: "carlos.ferreira@email.com",
          telefone: "(11) 97890-1234",
          dataCadastro: "2023-07-05",
          status: "inativo",
          endereco: "Av. Rebouças, 750 - São Paulo/SP",
        },
        {
          id: 5,
          nome: "Empresa XYZ S.A.",
          tipo: "Pessoa Jurídica",
          cpfCnpj: "98.765.432/0001-10",
          email: "contato@empresaxyz.com",
          telefone: "(11) 2345-6789",
          dataCadastro: "2023-11-01",
          status: "ativo",
          endereco: "Av. Faria Lima, 2000 - São Paulo/SP",
        },
      ];

      setClientes(mockClientes);

      // Calcula estatísticas
      const estatisticas = mockClientes.reduce(
        (acumulador, cliente) => {
          acumulador.total++;
          if (cliente.status === "ativo") acumulador.ativos++;
          if (cliente.status === "pendente") acumulador.pendentes++;
          if (cliente.status === "inativo") acumulador.inativos++;
          return acumulador;
        },
        { total: 0, ativos: 0, pendentes: 0, inativos: 0 }
      );

      setEstadoCadastros(estatisticas);
      setCarregando(false);
    }, 800);
  }, []);

  // Formatar data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  // Filtrar clientes com base no status selecionado
  const clientesFiltrados = clientes.filter((cliente) => {
    if (filtroStatus === "todos") return true;
    return cliente.status === filtroStatus;
  });

  return (
    <div className="gestao-clientes">
      <div className="dashboard-header">
        <div className="filtros">
          <button
            className={`filtro-btn ${filtroStatus === "todos" ? "ativo" : ""}`}
            onClick={() => setFiltroStatus("todos")}
          >
            Todos
          </button>
          <button
            className={`filtro-btn ${filtroStatus === "ativo" ? "ativo" : ""}`}
            onClick={() => setFiltroStatus("ativo")}
          >
            Ativos
          </button>
          <button
            className={`filtro-btn ${
              filtroStatus === "pendente" ? "ativo" : ""
            }`}
            onClick={() => setFiltroStatus("pendente")}
          >
            Pendentes
          </button>
          <button
            className={`filtro-btn ${
              filtroStatus === "inativo" ? "ativo" : ""
            }`}
            onClick={() => setFiltroStatus("inativo")}
          >
            Inativos
          </button>
        </div>
        <div className="acoes">
          <button className="btn-primario">Novo Cliente</button>
          <button className="btn-secundario">Exportar Lista</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estadoCadastros.total}</div>
            <div className="resumo-label">Total de Clientes</div>
          </div>
          <div className="resumo-icon">👥</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estadoCadastros.ativos}</div>
            <div className="resumo-label">Clientes Ativos</div>
          </div>
          <div className="resumo-icon">✅</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estadoCadastros.pendentes}</div>
            <div className="resumo-label">Cadastros Pendentes</div>
          </div>
          <div className="resumo-icon">⏳</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estadoCadastros.inativos}</div>
            <div className="resumo-label">Clientes Inativos</div>
          </div>
          <div className="resumo-icon">🚫</div>
        </div>
      </div>

      {carregando ? (
        <div className="carregando">Carregando clientes...</div>
      ) : clientesFiltrados.length === 0 ? (
        <div className="lista-vazia">
          <p>Nenhum cliente encontrado para os filtros selecionados.</p>
        </div>
      ) : (
        <div className="tabela-container">
          <table className="tabela-clientes">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>CPF/CNPJ</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Data Cadastro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.tipo}</td>
                  <td>{cliente.cpfCnpj}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{formatarData(cliente.dataCadastro)}</td>
                  <td>
                    <span className={`status ${cliente.status}`}>
                      {cliente.status === "ativo" && "Ativo"}
                      {cliente.status === "pendente" && "Pendente"}
                      {cliente.status === "inativo" && "Inativo"}
                    </span>
                  </td>
                  <td>
                    <div className="acoes-btns">
                      <button className="btn-acao" title="Ver Detalhes">
                        👁️
                      </button>
                      <button className="btn-acao" title="Editar">
                        ✏️
                      </button>
                      {cliente.status === "pendente" && (
                        <>
                          <button className="btn-acao" title="Aprovar">
                            ✅
                          </button>
                          <button className="btn-acao" title="Rejeitar">
                            ❌
                          </button>
                        </>
                      )}
                      {cliente.status === "ativo" && (
                        <button className="btn-acao" title="Desativar">
                          🚫
                        </button>
                      )}
                      {cliente.status === "inativo" && (
                        <button className="btn-acao" title="Reativar">
                          🔄
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
        .gestao-clientes {
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
          gap: 0.5rem;
        }

        .filtro-btn {
          padding: 0.5rem 1rem;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .filtro-btn.ativo {
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          border-color: var(--color-accent);
          font-weight: 500;
        }

        .acoes {
          display: flex;
          gap: 0.5rem;
        }

        .btn-primario {
          background-color: var(--color-accent);
          color: var(--color-primary-dark);
          border: none;
          padding: 0.5rem 1rem;
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

        .resumo-valor {
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 0.25rem;
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

        .tabela-clientes {
          width: 100%;
          border-collapse: collapse;
        }

        .tabela-clientes th,
        .tabela-clientes td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .tabela-clientes th {
          background-color: #f5f5f5;
          font-weight: 500;
          color: var(--color-text-dark);
        }

        .tabela-clientes tr:hover {
          background-color: #f9f9f9;
        }

        .status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status.ativo {
          background-color: rgba(76, 175, 80, 0.15);
          color: #4caf50;
        }

        .status.pendente {
          background-color: rgba(255, 152, 0, 0.15);
          color: #ff9800;
        }

        .status.inativo {
          background-color: rgba(158, 158, 158, 0.15);
          color: #9e9e9e;
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

          .filtros,
          .acoes {
            width: 100%;
            justify-content: space-between;
          }

          .resumo-cards {
            grid-template-columns: 1fr;
          }

          .tabela-clientes thead {
            display: none;
          }

          .tabela-clientes,
          .tabela-clientes tbody,
          .tabela-clientes tr,
          .tabela-clientes td {
            display: block;
            width: 100%;
          }

          .tabela-clientes tr {
            margin-bottom: 1rem;
            border: 1px solid #eee;
            border-radius: 8px;
          }

          .tabela-clientes td {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 1rem;
            text-align: right;
            border-bottom: 1px solid #f5f5f5;
          }

          .tabela-clientes td:before {
            content: attr(data-label);
            font-weight: 500;
            float: left;
            text-align: left;
          }

          .tabela-clientes td:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
