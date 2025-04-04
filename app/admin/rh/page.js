"use client";

import { useState, useEffect } from "react";

export default function RH() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [statsRH, setStatsRH] = useState({
    totalFuncionarios: 0,
    folhaMensal: 0,
    novosMes: 0,
    desligadosMes: 0,
  });
  const [abaAtiva, setAbaAtiva] = useState("funcionarios");
  const [filtro, setFiltro] = useState("todos");

  // Simular carregamento de dados
  useEffect(() => {
    // Dados de exemplo para demonstração
    const departamentosDemo = [
      { id: 1, nome: "Jurídico" },
      { id: 2, nome: "Administrativo" },
      { id: 3, nome: "Financeiro" },
      { id: 4, nome: "Recepção" },
      { id: 5, nome: "Marketing" },
    ];

    const cargosDemo = [
      { id: 1, nome: "Advogado Sênior", departamentoId: 1 },
      { id: 2, nome: "Advogado Pleno", departamentoId: 1 },
      { id: 3, nome: "Advogado Júnior", departamentoId: 1 },
      { id: 4, nome: "Estagiário Jurídico", departamentoId: 1 },
      { id: 5, nome: "Assistente Administrativo", departamentoId: 2 },
      { id: 6, nome: "Gerente Administrativo", departamentoId: 2 },
      { id: 7, nome: "Analista Financeiro", departamentoId: 3 },
      { id: 8, nome: "Contador", departamentoId: 3 },
      { id: 9, nome: "Recepcionista", departamentoId: 4 },
      { id: 10, nome: "Especialista em Marketing", departamentoId: 5 },
    ];

    const funcionariosDemo = [
      {
        id: 1,
        nome: "Carlos Rodrigues",
        email: "carlos.rodrigues@maisdireito.com.br",
        telefone: "(11) 98765-4321",
        departamentoId: 1,
        cargoId: 1,
        dataAdmissao: "2020-03-15",
        salario: 12000,
        status: "Ativo",
      },
      {
        id: 2,
        nome: "Ana Paula Silva",
        email: "ana.silva@maisdireito.com.br",
        telefone: "(11) 98765-1234",
        departamentoId: 1,
        cargoId: 2,
        dataAdmissao: "2021-05-10",
        salario: 8500,
        status: "Ativo",
      },
      {
        id: 3,
        nome: "Bruno Oliveira",
        email: "bruno.oliveira@maisdireito.com.br",
        telefone: "(11) 97654-3210",
        departamentoId: 1,
        cargoId: 3,
        dataAdmissao: "2022-01-20",
        salario: 6000,
        status: "Ativo",
      },
      {
        id: 4,
        nome: "Daniela Santos",
        email: "daniela.santos@maisdireito.com.br",
        telefone: "(11) 91234-5678",
        departamentoId: 1,
        cargoId: 4,
        dataAdmissao: "2023-03-01",
        salario: 1800,
        status: "Ativo",
      },
      {
        id: 5,
        nome: "Eduardo Lima",
        email: "eduardo.lima@maisdireito.com.br",
        telefone: "(11) 99876-5432",
        departamentoId: 2,
        cargoId: 5,
        dataAdmissao: "2021-08-15",
        salario: 3500,
        status: "Ativo",
      },
      {
        id: 6,
        nome: "Fernanda Gomes",
        email: "fernanda.gomes@maisdireito.com.br",
        telefone: "(11) 98765-9876",
        departamentoId: 2,
        cargoId: 6,
        dataAdmissao: "2019-11-10",
        salario: 7000,
        status: "Ativo",
      },
      {
        id: 7,
        nome: "Gabriel Almeida",
        email: "gabriel.almeida@maisdireito.com.br",
        telefone: "(11) 95432-1098",
        departamentoId: 3,
        cargoId: 7,
        dataAdmissao: "2020-09-05",
        salario: 5500,
        status: "Ativo",
      },
      {
        id: 8,
        nome: "Helena Costa",
        email: "helena.costa@maisdireito.com.br",
        telefone: "(11) 92345-6789",
        departamentoId: 3,
        cargoId: 8,
        dataAdmissao: "2018-06-20",
        salario: 6800,
        status: "Ativo",
      },
      {
        id: 9,
        nome: "Igor Pereira",
        email: "igor.pereira@maisdireito.com.br",
        telefone: "(11) 93456-7890",
        departamentoId: 4,
        cargoId: 9,
        dataAdmissao: "2022-05-15",
        salario: 2800,
        status: "Ativo",
      },
      {
        id: 10,
        nome: "Julia Martins",
        email: "julia.martins@maisdireito.com.br",
        telefone: "(11) 94567-8901",
        departamentoId: 5,
        cargoId: 10,
        dataAdmissao: "2023-01-10",
        salario: 4500,
        status: "Ativo",
      },
      {
        id: 11,
        nome: "Luciana Ferreira",
        email: "luciana.ferreira@maisdireito.com.br",
        telefone: "(11) 95678-9012",
        departamentoId: 1,
        cargoId: 3,
        dataAdmissao: "2023-02-05",
        salario: 6000,
        status: "Ativo",
      },
    ];

    // Calcular estatísticas
    const totalFuncionarios = funcionariosDemo.length;
    const folhaMensal = funcionariosDemo.reduce(
      (acc, func) => acc + func.salario,
      0
    );

    // Contar funcionários admitidos no último mês
    const hoje = new Date();
    const umMesAtras = new Date();
    umMesAtras.setMonth(hoje.getMonth() - 1);

    const novosMes = funcionariosDemo.filter((func) => {
      const dataAdmissao = new Date(func.dataAdmissao);
      return dataAdmissao >= umMesAtras && dataAdmissao <= hoje;
    }).length;

    // Em um sistema real, teríamos dados de desligados
    const desligadosMes = 0;

    setFuncionarios(funcionariosDemo);
    setDepartamentos(departamentosDemo);
    setCargos(cargosDemo);
    setStatsRH({
      totalFuncionarios,
      folhaMensal,
      novosMes,
      desligadosMes,
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
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  // Função para obter o nome do departamento pelo ID
  const getNomeDepartamento = (id) => {
    const departamento = departamentos.find((dep) => dep.id === id);
    return departamento ? departamento.nome : "-";
  };

  // Função para obter o nome do cargo pelo ID
  const getNomeCargo = (id) => {
    const cargo = cargos.find((c) => c.id === id);
    return cargo ? cargo.nome : "-";
  };

  // Filtrar funcionários com base no filtro ativo
  const funcionariosFiltrados = () => {
    if (filtro === "todos") {
      return funcionarios;
    } else {
      // Filtro por departamento
      return funcionarios.filter(
        (func) => func.departamentoId === parseInt(filtro)
      );
    }
  };

  return (
    <div className="rh">
      <div className="dashboard-header">
        <div className="abas">
          <button
            className={`aba-btn ${abaAtiva === "funcionarios" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("funcionarios")}
          >
            Funcionários
          </button>
          <button
            className={`aba-btn ${abaAtiva === "departamentos" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("departamentos")}
          >
            Departamentos e Cargos
          </button>
          <button
            className={`aba-btn ${abaAtiva === "folha" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("folha")}
          >
            Folha de Pagamento
          </button>
          <button
            className={`aba-btn ${abaAtiva === "ferias" ? "ativo" : ""}`}
            onClick={() => setAbaAtiva("ferias")}
          >
            Férias e Licenças
          </button>
        </div>
        <div className="acoes">
          <button className="btn btn-primary">Novo Funcionário</button>
          <button className="btn btn-outline">Exportar Lista</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsRH.totalFuncionarios}</div>
            <div className="resumo-card-label">Total de Funcionários</div>
          </div>
          <div className="resumo-card-icon">👥</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {formatarMoeda(statsRH.folhaMensal)}
            </div>
            <div className="resumo-card-label">Folha Mensal</div>
          </div>
          <div className="resumo-card-icon">💰</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsRH.novosMes}</div>
            <div className="resumo-card-label">Admissões no Mês</div>
          </div>
          <div className="resumo-card-icon">✨</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsRH.desligadosMes}</div>
            <div className="resumo-card-label">Desligamentos no Mês</div>
          </div>
          <div className="resumo-card-icon">🚪</div>
        </div>
      </div>

      {abaAtiva === "funcionarios" && (
        <div className="funcionarios-section">
          <div className="filtro-container">
            <label htmlFor="filtroDepto">Filtrar por Departamento:</label>
            <select
              id="filtroDepto"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="todos">Todos os Departamentos</option>
              {departamentos.map((depto) => (
                <option key={depto.id} value={depto.id}>
                  {depto.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Lista de Funcionários</h3>
              <div className="search-box">
                <input type="text" placeholder="Buscar funcionário..." />
                <button className="search-button">🔍</button>
              </div>
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Departamento</th>
                    <th>Cargo</th>
                    <th>Data de Admissão</th>
                    <th>Salário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionariosFiltrados().map((funcionario) => (
                    <tr key={funcionario.id}>
                      <td>{funcionario.nome}</td>
                      <td>{funcionario.email}</td>
                      <td>{funcionario.telefone}</td>
                      <td>{getNomeDepartamento(funcionario.departamentoId)}</td>
                      <td>{getNomeCargo(funcionario.cargoId)}</td>
                      <td>{formatarData(funcionario.dataAdmissao)}</td>
                      <td className="valor-cell">
                        {formatarMoeda(funcionario.salario)}
                      </td>
                      <td>
                        <span
                          className={`status status-${
                            funcionario.status === "Ativo"
                              ? "concluído"
                              : "pendente"
                          }`}
                        >
                          {funcionario.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-secondary">
                            Editar
                          </button>
                          <button className="btn btn-sm btn-danger">
                            Desativar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {abaAtiva === "departamentos" && (
        <div className="departamentos-section">
          <div className="row">
            <div className="card col-6">
              <div className="card-header">
                <h3 className="card-title">Departamentos</h3>
                <button className="btn btn-sm btn-primary">
                  Novo Departamento
                </button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Funcionários</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {departamentos.map((departamento) => {
                    const numFuncionarios = funcionarios.filter(
                      (f) => f.departamentoId === departamento.id
                    ).length;

                    return (
                      <tr key={departamento.id}>
                        <td>{departamento.nome}</td>
                        <td>{numFuncionarios}</td>
                        <td>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-secondary">
                              Editar
                            </button>
                            <button className="btn btn-sm btn-danger">
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="card col-6">
              <div className="card-header">
                <h3 className="card-title">Cargos</h3>
                <button className="btn btn-sm btn-primary">Novo Cargo</button>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Departamento</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cargos.map((cargo) => (
                    <tr key={cargo.id}>
                      <td>{cargo.nome}</td>
                      <td>{getNomeDepartamento(cargo.departamentoId)}</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-secondary">
                            Editar
                          </button>
                          <button className="btn btn-sm btn-danger">
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {abaAtiva === "folha" && (
        <div className="construcao-section">
          <div className="card">
            <div className="construcao">
              <div className="construcao-icon">🚧</div>
              <h3>Módulo em Desenvolvimento</h3>
              <p>
                A funcionalidade de Folha de Pagamento está em desenvolvimento e
                estará disponível em breve.
              </p>
            </div>
          </div>
        </div>
      )}

      {abaAtiva === "ferias" && (
        <div className="construcao-section">
          <div className="card">
            <div className="construcao">
              <div className="construcao-icon">🚧</div>
              <h3>Módulo em Desenvolvimento</h3>
              <p>
                A funcionalidade de Férias e Licenças está em desenvolvimento e
                estará disponível em breve.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .rh {
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

        .filtro-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .filtro-container label {
          font-weight: 500;
        }

        .filtro-container select {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #e0e0e0;
          background-color: white;
          min-width: 200px;
        }

        .table-container {
          overflow-x: auto;
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

        .search-box {
          display: flex;
          align-items: center;
        }

        .search-box input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          min-width: 200px;
        }

        .search-button {
          padding: 0.5rem;
          background-color: var(--color-accent);
          border: 1px solid var(--color-accent);
          border-radius: 0 4px 4px 0;
          cursor: pointer;
        }

        .row {
          display: flex;
          gap: 1.5rem;
          width: 100%;
        }

        .col-6 {
          flex: 1;
          min-width: 0;
        }

        .construcao {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
        }

        .construcao-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .construcao h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-text-dark);
        }

        .construcao p {
          color: var(--color-text-muted);
          max-width: 400px;
        }

        @media (max-width: 1200px) {
          .resumo-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .row {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .abas {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .resumo-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
