"use client";

import { useState, useEffect } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [estadoCadastros, setEstadoCadastros] = useState({
    pendentes: 0,
    ativos: 0,
    inativos: 0,
    total: 0,
  });
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // Dados temporários para demonstração
  useEffect(() => {
    const clientesDemo = [
      {
        id: 1,
        nome: "João Carlos Silva",
        email: "joao.silva@email.com",
        telefone: "(11) 99876-5432",
        tipo: "Pessoa Física",
        cpfCnpj: "123.456.789-00",
        endereco: "Rua das Flores, 123 - São Paulo, SP",
        dataRegistro: "2022-03-15",
        status: "Ativo",
      },
      {
        id: 2,
        nome: "Maria Oliveira Santos",
        email: "maria.santos@email.com",
        telefone: "(11) 98765-4321",
        tipo: "Pessoa Física",
        cpfCnpj: "987.654.321-00",
        endereco: "Av. Paulista, 1000 - São Paulo, SP",
        dataRegistro: "2022-06-20",
        status: "Ativo",
      },
      {
        id: 3,
        nome: "Empresa ABC Ltda",
        email: "contato@empresaabc.com.br",
        telefone: "(11) 3456-7890",
        tipo: "Pessoa Jurídica",
        cpfCnpj: "12.345.678/0001-90",
        endereco: "Av. Brigadeiro Faria Lima, 500 - São Paulo, SP",
        dataRegistro: "2022-01-10",
        status: "Ativo",
      },
      {
        id: 4,
        nome: "Carlos Eduardo Ferreira",
        email: "carlos.ferreira@email.com",
        telefone: "(11) 91234-5678",
        tipo: "Pessoa Física",
        cpfCnpj: "456.789.123-00",
        endereco: "Rua Augusta, 789 - São Paulo, SP",
        dataRegistro: "2022-08-05",
        status: "Inativo",
      },
      {
        id: 5,
        nome: "Tecnologia XYZ S/A",
        email: "contato@xyz.com.br",
        telefone: "(11) 3321-6547",
        tipo: "Pessoa Jurídica",
        cpfCnpj: "45.678.901/0001-23",
        endereco: "Av. Engenheiro Luís Carlos Berrini, 300 - São Paulo, SP",
        dataRegistro: "2021-11-30",
        status: "Ativo",
      },
      {
        id: 6,
        nome: "Ana Beatriz Costa",
        email: "ana.costa@email.com",
        telefone: "(11) 97654-3210",
        tipo: "Pessoa Física",
        cpfCnpj: "789.123.456-00",
        endereco: "Alameda Santos, 450 - São Paulo, SP",
        dataRegistro: "2023-01-18",
        status: "Pendente",
      },
      {
        id: 7,
        nome: "Ricardo Almeida",
        email: "ricardo.almeida@email.com",
        telefone: "(11) 98877-6655",
        tipo: "Pessoa Física",
        cpfCnpj: "321.654.987-00",
        endereco: "Rua Oscar Freire, 200 - São Paulo, SP",
        dataRegistro: "2022-12-03",
        status: "Ativo",
      },
      {
        id: 8,
        nome: "Distribuidora RS Ltda",
        email: "contato@distribuidorars.com.br",
        telefone: "(11) 3789-4561",
        tipo: "Pessoa Jurídica",
        cpfCnpj: "78.901.234/0001-56",
        endereco: "Av. do Estado, 1500 - São Paulo, SP",
        dataRegistro: "2021-09-12",
        status: "Inativo",
      },
      {
        id: 9,
        nome: "Daniela Gomes",
        email: "daniela.gomes@email.com",
        telefone: "(11) 99988-7766",
        tipo: "Pessoa Física",
        cpfCnpj: "654.321.987-00",
        endereco: "Rua Pamplona, 150 - São Paulo, SP",
        dataRegistro: "2023-02-25",
        status: "Pendente",
      },
      {
        id: 10,
        nome: "Consultoria JLM Ltda",
        email: "contato@jlm.com.br",
        telefone: "(11) 3654-7890",
        tipo: "Pessoa Jurídica",
        cpfCnpj: "34.567.890/0001-12",
        endereco: "Rua Haddock Lobo, 400 - São Paulo, SP",
        dataRegistro: "2022-07-15",
        status: "Ativo",
      },
    ];

    // Contar cadastros por status
    const pendentes = clientesDemo.filter(
      (cliente) => cliente.status === "Pendente"
    ).length;
    const ativos = clientesDemo.filter(
      (cliente) => cliente.status === "Ativo"
    ).length;
    const inativos = clientesDemo.filter(
      (cliente) => cliente.status === "Inativo"
    ).length;
    const total = clientesDemo.length;

    setClientes(clientesDemo);
    setEstadoCadastros({
      pendentes,
      ativos,
      inativos,
      total,
    });
  }, []);

  // Função para formatar a data (yyyy-mm-dd para dd/mm/yyyy)
  const formatarData = (dataString) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  // Filtrar clientes com base no filtro de status
  const clientesFiltrados = () => {
    if (filtroStatus === "todos") {
      return clientes;
    } else {
      return clientes.filter(
        (cliente) => cliente.status.toLowerCase() === filtroStatus.toLowerCase()
      );
    }
  };

  return (
    <div className="clientes">
      <div className="dashboard-header">
        <div className="filtros">
          <div className="filtro-grupo">
            <label htmlFor="filtroStatus">Status:</label>
            <select
              id="filtroStatus"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="pendente">Pendentes</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
        </div>
        <div className="acoes">
          <button className="btn btn-primary">Novo Cliente</button>
          <button className="btn btn-outline">Exportar Lista</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{estadoCadastros.total}</div>
            <div className="resumo-card-label">Total de Clientes</div>
          </div>
          <div className="resumo-card-icon">👥</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{estadoCadastros.ativos}</div>
            <div className="resumo-card-label">Clientes Ativos</div>
          </div>
          <div className="resumo-card-icon">✅</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{estadoCadastros.pendentes}</div>
            <div className="resumo-card-label">Cadastros Pendentes</div>
          </div>
          <div className="resumo-card-icon">⏳</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{estadoCadastros.inativos}</div>
            <div className="resumo-card-label">Clientes Inativos</div>
          </div>
          <div className="resumo-card-icon">🚫</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Lista de Clientes</h3>
          <div className="search-box">
            <input type="text" placeholder="Buscar cliente..." />
            <button className="search-button">🔍</button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>CPF/CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Data de Registro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados().map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.tipo}</td>
                  <td>{cliente.cpfCnpj}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{formatarData(cliente.dataRegistro)}</td>
                  <td>
                    <span
                      className={`status status-${cliente.status.toLowerCase()}`}
                    >
                      {cliente.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button className="btn btn-sm btn-secondary">
                        Detalhes
                      </button>
                      <button className="btn btn-sm btn-primary">Editar</button>
                      {cliente.status === "Pendente" && (
                        <>
                          <button className="btn btn-sm btn-success">
                            Aprovar
                          </button>
                          <button className="btn btn-sm btn-danger">
                            Recusar
                          </button>
                        </>
                      )}
                      {cliente.status === "Ativo" && (
                        <button className="btn btn-sm btn-danger">
                          Desativar
                        </button>
                      )}
                      {cliente.status === "Inativo" && (
                        <button className="btn btn-sm btn-success">
                          Reativar
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
        .clientes {
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
          min-width: 150px;
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

        .status-ativo {
          background-color: #e8f5e9;
          color: #388e3c;
        }

        .status-pendente {
          background-color: #fff8e1;
          color: #ffa000;
        }

        .status-inativo {
          background-color: #ffebee;
          color: #d32f2f;
        }

        .btn-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn-success {
          background-color: #4caf50;
          color: white;
        }

        .btn-success:hover {
          background-color: #388e3c;
        }

        .search-box {
          display: flex;
          align-items: center;
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

        @media (max-width: 1200px) {
          .resumo-cards {
            grid-template-columns: repeat(2, 1fr);
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
        }
      `}</style>
    </div>
  );
}
