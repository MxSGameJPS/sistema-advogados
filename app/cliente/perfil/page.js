"use client";

import { useState, useEffect } from "react";

export default function ClientePerfil() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: {
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userDataLocal = JSON.parse(localStorage.getItem("clienteAuth"));

    if (userDataLocal) {
      setUserData(userDataLocal);

      // Preencher os dados do formulário
      setFormData({
        nome: userDataLocal.nome || "",
        email: userDataLocal.email || "",
        telefone: userDataLocal.telefone || "",
        cpf: userDataLocal.cpf || "",
        endereco: userDataLocal.endereco || {
          rua: "Av. Paulista",
          numero: "1000",
          complemento: "Sala 210",
          bairro: "Bela Vista",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01310-100",
        },
      });

      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verifica se é um campo de endereço
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de atualização no servidor
    setTimeout(() => {
      // Atualizar dados no localStorage
      const updatedUserData = {
        ...userData,
        ...formData,
      };

      localStorage.setItem("clienteAuth", JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setEditMode(false);
      setFeedback({
        type: "success",
        message: "Dados atualizados com sucesso!",
      });

      setLoading(false);

      // Limpar a mensagem após 3 segundos
      setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="perfil-container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados...</p>
        </div>
      ) : (
        <>
          <div className="perfil-header">
            <div className="perfil-title">
              <h2>Meu Perfil</h2>
              <p>Visualize e atualize seus dados cadastrais</p>
            </div>
            <div className="perfil-actions">
              {!editMode ? (
                <button className="btn-edit" onClick={() => setEditMode(true)}>
                  Editar Perfil
                </button>
              ) : (
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setEditMode(false);
                    // Restaurar dados originais
                    if (userData) {
                      setFormData({
                        nome: userData.nome || "",
                        email: userData.email || "",
                        telefone: userData.telefone || "",
                        cpf: userData.cpf || "",
                        endereco: userData.endereco || {
                          rua: "",
                          numero: "",
                          complemento: "",
                          bairro: "",
                          cidade: "",
                          estado: "",
                          cep: "",
                        },
                      });
                    }
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          {feedback.message && (
            <div className={`feedback ${feedback.type}`}>
              {feedback.message}
            </div>
          )}

          <div className="perfil-card">
            <div className="perfil-section">
              <div className="perfil-avatar">
                <div className="avatar-placeholder">
                  {formData.nome ? formData.nome.charAt(0).toUpperCase() : "C"}
                </div>
              </div>
              <div className="perfil-info">
                <h3>{formData.nome}</h3>
                <p className="client-since">
                  Cliente desde:{" "}
                  {userData?.dataCadastro
                    ? new Date(userData.dataCadastro).toLocaleDateString(
                        "pt-BR"
                      )
                    : "N/A"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="perfil-form">
              <div className="form-section">
                <h3 className="section-title">Dados Pessoais</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nome">Nome Completo</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefone">Telefone</label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="form-section">
                <h3 className="section-title">Endereço</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="endereco.cep">CEP</label>
                    <input
                      type="text"
                      id="endereco.cep"
                      name="endereco.cep"
                      value={formData.endereco.cep}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>

                  <div className="form-group lg">
                    <label htmlFor="endereco.rua">Rua</label>
                    <input
                      type="text"
                      id="endereco.rua"
                      name="endereco.rua"
                      value={formData.endereco.rua}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>

                  <div className="form-group sm">
                    <label htmlFor="endereco.numero">Número</label>
                    <input
                      type="text"
                      id="endereco.numero"
                      name="endereco.numero"
                      value={formData.endereco.numero}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>

                  <div className="form-group md">
                    <label htmlFor="endereco.complemento">Complemento</label>
                    <input
                      type="text"
                      id="endereco.complemento"
                      name="endereco.complemento"
                      value={formData.endereco.complemento}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endereco.bairro">Bairro</label>
                    <input
                      type="text"
                      id="endereco.bairro"
                      name="endereco.bairro"
                      value={formData.endereco.bairro}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endereco.cidade">Cidade</label>
                    <input
                      type="text"
                      id="endereco.cidade"
                      name="endereco.cidade"
                      value={formData.endereco.cidade}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>

                  <div className="form-group sm">
                    <label htmlFor="endereco.estado">Estado</label>
                    <input
                      type="text"
                      id="endereco.estado"
                      name="endereco.estado"
                      value={formData.endereco.estado}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={!editMode ? "readonly" : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Segurança</h3>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={!editMode}
                  >
                    Alterar Senha
                  </button>
                </div>
              </div>

              {editMode && (
                <div className="form-submit">
                  <button type="submit" className="btn-save" disabled={loading}>
                    {loading ? "Salvando..." : "Salvar Alterações"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </>
      )}

      <style jsx>{`
        .perfil-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #4caf50;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .perfil-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .perfil-title h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          color: var(--color-text-dark);
        }

        .perfil-title p {
          margin: 0;
          color: var(--color-text-muted);
        }

        .btn-edit,
        .btn-cancel,
        .btn-save,
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          font-size: 0.9rem;
        }

        .btn-edit {
          background-color: #4caf50;
          color: white;
        }

        .btn-edit:hover {
          background-color: #388e3c;
        }

        .btn-cancel {
          background-color: #f5f5f5;
          color: var(--color-text-dark);
        }

        .btn-cancel:hover {
          background-color: #e0e0e0;
        }

        .btn-save {
          background-color: #4caf50;
          color: white;
          width: 100%;
          padding: 1rem;
        }

        .btn-save:hover {
          background-color: #388e3c;
        }

        .btn-secondary {
          background-color: #f5f5f5;
          color: var(--color-text-dark);
        }

        .btn-secondary:hover {
          background-color: #e0e0e0;
        }

        .btn-secondary:disabled,
        .btn-save:disabled {
          background-color: #e0e0e0;
          color: #9e9e9e;
          cursor: not-allowed;
        }

        .feedback {
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .feedback.success {
          background-color: rgba(76, 175, 80, 0.1);
          color: #388e3c;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .feedback.error {
          background-color: rgba(244, 67, 54, 0.1);
          color: #d32f2f;
          border: 1px solid rgba(244, 67, 54, 0.3);
        }

        .perfil-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .perfil-section {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .perfil-avatar {
          margin-right: 1.5rem;
        }

        .avatar-placeholder {
          width: 80px;
          height: 80px;
          background-color: #4caf50;
          color: white;
          font-size: 2rem;
          font-weight: bold;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .perfil-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          color: var(--color-text-dark);
        }

        .client-since {
          color: var(--color-text-muted);
          margin: 0;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          color: var(--color-text-dark);
          margin: 0 0 1rem 0;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group.lg {
          grid-column: span 2;
        }

        .form-group.md {
          grid-column: span 1;
        }

        .form-group.sm {
          grid-column: span 1;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--color-text-dark);
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4caf50;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }

        .form-group input.readonly {
          background-color: #f5f5f5;
          color: #757575;
          border-color: #e0e0e0;
          cursor: default;
        }

        .form-divider {
          height: 1px;
          background-color: #e0e0e0;
          margin: 2rem 0;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
        }

        .form-submit {
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .perfil-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.lg,
          .form-group.md,
          .form-group.sm {
            grid-column: span 1;
          }

          .perfil-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
