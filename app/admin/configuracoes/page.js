"use client";

import { useState } from "react";

export default function Configuracoes() {
  const [configuracoes, setConfiguracoes] = useState({
    nomeEscritorio: "MaisDireito Advogados",
    emailPrincipal: "contato@maisdireito.com.br",
    telefone: "(11) 1234-5678",
    endereco: "Rua Exemplo, 123, 10º andar, Centro - São Paulo, SP",
    redesSociais: {
      facebook: "https://facebook.com/maisdireito",
      instagram: "https://instagram.com/maisdireito",
      linkedin: "https://linkedin.com/company/maisdireito",
    },
    horarioFuncionamento: "Segunda a Sexta: 09h às 18h",
    notificacoesEmail: true,
    notificacoesSms: false,
    temaEscuro: true,
  });

  const [permissoes, setPermissoes] = useState([
    {
      id: 1,
      funcao: "Administrador",
      descricao: "Acesso total ao sistema",
      usuarios: 2,
    },
    {
      id: 2,
      funcao: "Advogado",
      descricao: "Acesso aos processos e clientes",
      usuarios: 5,
    },
    {
      id: 3,
      funcao: "Secretária",
      descricao: "Acesso à agenda e contatos",
      usuarios: 3,
    },
    {
      id: 4,
      funcao: "Financeiro",
      descricao: "Acesso ao módulo financeiro",
      usuarios: 1,
    },
  ]);

  const [integracoes, setIntegracoes] = useState([
    {
      id: 1,
      nome: "Google Calendar",
      status: "Ativo",
      ultimaSincronia: "10/03/2023",
    },
    { id: 2, nome: "Microsoft Teams", status: "Inativo", ultimaSincronia: "-" },
    {
      id: 3,
      nome: "Sistema Judicial",
      status: "Ativo",
      ultimaSincronia: "15/03/2023",
    },
    {
      id: 4,
      nome: "Sistema Contábil",
      status: "Ativo",
      ultimaSincronia: "12/03/2023",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Em um cenário real, aqui seria feita uma chamada à API
    alert("Configurações salvas com sucesso!");
  };

  const handleToggle = (campo) => {
    setConfiguracoes({
      ...configuracoes,
      [campo]: !configuracoes[campo],
    });
  };

  return (
    <div className="configuracoes">
      <div className="dashboard-header">
        <h2>Configurações do Sistema</h2>
        <div className="acoes">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="configuracoes-content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Informações do Escritório</h3>
          </div>
          <div className="card-content">
            <form className="config-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Escritório</label>
                  <input
                    type="text"
                    value={configuracoes.nomeEscritorio}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        nomeEscritorio: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>E-mail Principal</label>
                  <input
                    type="email"
                    value={configuracoes.emailPrincipal}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        emailPrincipal: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={configuracoes.telefone}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        telefone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Horário de Funcionamento</label>
                  <input
                    type="text"
                    value={configuracoes.horarioFuncionamento}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        horarioFuncionamento: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Endereço</label>
                <input
                  type="text"
                  value={configuracoes.endereco}
                  onChange={(e) =>
                    setConfiguracoes({
                      ...configuracoes,
                      endereco: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Redes Sociais</h3>
          </div>
          <div className="card-content">
            <form className="config-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Facebook</label>
                  <input
                    type="text"
                    value={configuracoes.redesSociais.facebook}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        redesSociais: {
                          ...configuracoes.redesSociais,
                          facebook: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Instagram</label>
                  <input
                    type="text"
                    value={configuracoes.redesSociais.instagram}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        redesSociais: {
                          ...configuracoes.redesSociais,
                          instagram: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="text"
                    value={configuracoes.redesSociais.linkedin}
                    onChange={(e) =>
                      setConfiguracoes({
                        ...configuracoes,
                        redesSociais: {
                          ...configuracoes.redesSociais,
                          linkedin: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group"></div>
              </div>
            </form>
          </div>
        </div>

        <div className="cards-row">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Notificações</h3>
            </div>
            <div className="card-content">
              <ul className="config-toggle-list">
                <li>
                  <div className="toggle-item">
                    <span>Notificações por E-mail</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configuracoes.notificacoesEmail}
                        onChange={() => handleToggle("notificacoesEmail")}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="toggle-item">
                    <span>Notificações por SMS</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configuracoes.notificacoesSms}
                        onChange={() => handleToggle("notificacoesSms")}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="toggle-item">
                    <span>Tema Escuro</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configuracoes.temaEscuro}
                        onChange={() => handleToggle("temaEscuro")}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Permissões</h3>
            </div>
            <div className="card-content">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Função</th>
                    <th>Descrição</th>
                    <th>Usuários</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {permissoes.map((permissao) => (
                    <tr key={permissao.id}>
                      <td>{permissao.funcao}</td>
                      <td>{permissao.descricao}</td>
                      <td>{permissao.usuarios}</td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Integrações</h3>
          </div>
          <div className="card-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Integração</th>
                  <th>Status</th>
                  <th>Última Sincronia</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {integracoes.map((integracao) => (
                  <tr key={integracao.id}>
                    <td>{integracao.nome}</td>
                    <td>
                      <span
                        className={`status status-${
                          integracao.status === "Ativo" ? "ativo" : "inativo"
                        }`}
                      >
                        {integracao.status}
                      </span>
                    </td>
                    <td>{integracao.ultimaSincronia}</td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-primary">
                          Configurar
                        </button>
                        <button className="btn btn-sm btn-secondary">
                          {integracao.status === "Ativo"
                            ? "Desativar"
                            : "Ativar"}
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

      <style jsx>{`
        .configuracoes {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .configuracoes-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .cards-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .config-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--color-text-dark);
        }

        .form-group input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.95rem;
        }

        .full-width {
          grid-column: span 2;
        }

        .config-toggle-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .config-toggle-list li {
          padding: 1rem 0;
          border-bottom: 1px solid #eee;
        }

        .config-toggle-list li:last-child {
          border-bottom: none;
        }

        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: var(--color-accent);
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .status-ativo {
          background-color: #e8f5e9;
          color: #388e3c;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-inativo {
          background-color: #ffebee;
          color: #d32f2f;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        @media (max-width: 992px) {
          .cards-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}
