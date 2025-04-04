"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NovoAgendamento() {
  const [agendamento, setAgendamento] = useState({
    tipo: "",
    data: "",
    hora: "",
    duracao: 60,
    advogado: "",
    local: "",
    motivo: "",
    processo: "",
    observacoes: "",
  });

  const [advogados, setAdvogados] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [locais, setLocais] = useState([
    {
      id: 1,
      nome: "Escritório Sede",
      endereco: "Av. Paulista, 1000, Sala 210, São Paulo - SP",
    },
    { id: 2, nome: "Online (Zoom)", endereco: null },
    { id: 3, nome: "Online (Teams)", endereco: null },
    { id: 4, nome: "Outro", endereco: null },
  ]);

  const [status, setStatus] = useState({
    enviando: false,
    sucesso: false,
    erro: null,
  });

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [dataMinima, setDataMinima] = useState("");

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Definir a data mínima (dia seguinte)
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    setDataMinima(amanha.toISOString().split("T")[0]);

    // Simular carregamento de dados
    setTimeout(() => {
      const advogadosMock = [
        {
          id: 1,
          nome: "Maria Silva",
          especialidade: "Direito Civil",
          foto: "/advogados/maria.jpg",
        },
        {
          id: 2,
          nome: "João Ferreira",
          especialidade: "Direito Trabalhista",
          foto: "/advogados/joao.jpg",
        },
        {
          id: 3,
          nome: "Pedro Souza",
          especialidade: "Direito Penal",
          foto: "/advogados/pedro.jpg",
        },
        {
          id: 4,
          nome: "Ana Oliveira",
          especialidade: "Direito de Família",
          foto: "/advogados/ana.jpg",
        },
      ];

      const processosMock = [
        {
          id: 1,
          numero: "0123456-78.2023.8.26.0100",
          tipo: "Ação de Indenização",
        },
        {
          id: 2,
          numero: "0098765-43.2023.8.26.0100",
          tipo: "Ação Trabalhista",
        },
        {
          id: 3,
          numero: "0456789-12.2023.8.26.0100",
          tipo: "Ação de Alimentos",
        },
        { id: 4, numero: "0567890-12.2023.8.26.0100", tipo: "Defesa Criminal" },
      ];

      setAdvogados(advogadosMock);
      setProcessos(processosMock);
    }, 600);
  }, []);

  // Atualizar horários disponíveis quando a data ou advogado mudar
  useEffect(() => {
    if (agendamento.data && agendamento.advogado) {
      // Simulação de consulta de horários disponíveis
      setTimeout(() => {
        const horariosMock = [
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
        ];

        // Simulação de alguns horários já ocupados
        const horariosOcupados = ["10:00", "14:00", "15:30"];

        setHorariosDisponiveis(
          horariosMock.filter((h) => !horariosOcupados.includes(h))
        );
      }, 300);
    } else {
      setHorariosDisponiveis([]);
    }
  }, [agendamento.data, agendamento.advogado]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpar os erros do campo que está sendo alterado
    setFormErrors((prev) => ({
      ...prev,
      [name]: null,
    }));

    setAgendamento((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Ajustar o local com base no tipo
    if (name === "tipo" && value === "Audiência") {
      setAgendamento((prev) => ({
        ...prev,
        local: "Fórum - A definir",
        [name]: value,
      }));
    }
  };

  const validarFormulario = () => {
    const erros = {};

    if (!agendamento.tipo) erros.tipo = "Selecione o tipo de agendamento";
    if (!agendamento.data) erros.data = "Selecione uma data";
    if (!agendamento.hora) erros.hora = "Selecione um horário";
    if (!agendamento.advogado) erros.advogado = "Selecione um advogado";
    if (!agendamento.local) erros.local = "Selecione o local";
    if (!agendamento.motivo) erros.motivo = "Informe o motivo do agendamento";

    setFormErrors(erros);
    return Object.keys(erros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      window.scrollTo(0, 0);
      return;
    }

    setStatus({ enviando: true, sucesso: false, erro: null });

    // Simulação de envio para o servidor
    setTimeout(() => {
      try {
        // Simulação de resposta do servidor
        setStatus({
          enviando: false,
          sucesso: true,
          erro: null,
        });

        // Resetar o formulário após o sucesso
        setTimeout(() => {
          window.location.href = "/cliente/agendamentos";
        }, 2000);
      } catch (error) {
        setStatus({
          enviando: false,
          sucesso: false,
          erro: "Ocorreu um erro ao enviar o agendamento. Tente novamente.",
        });
      }
    }, 1500);
  };

  return (
    <div className="novo-agendamento-container">
      <div className="header-voltar">
        <Link href="/cliente/agendamentos" className="btn-voltar">
          ← Voltar para Agendamentos
        </Link>
      </div>

      <div className="form-card">
        <div className="form-header">
          <h2>Novo Agendamento</h2>
          <p>Preencha os dados para agendar uma reunião ou consulta</p>
        </div>

        {(status.sucesso || status.erro) && (
          <div
            className={`notification ${status.sucesso ? "success" : "error"}`}
          >
            {status.sucesso && (
              <>
                <span className="notification-icon">✓</span>
                <p>Agendamento realizado com sucesso! Redirecionando...</p>
              </>
            )}
            {status.erro && (
              <>
                <span className="notification-icon">!</span>
                <p>{status.erro}</p>
              </>
            )}
          </div>
        )}

        {Object.keys(formErrors).length > 0 && (
          <div className="form-errors">
            <p>Por favor, corrija os seguintes erros:</p>
            <ul>
              {Object.values(formErrors).map((erro, index) => (
                <li key={index}>{erro}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="agendamento-form">
          <div className="form-section">
            <h3>Informações do Agendamento</h3>

            <div className="form-row">
              <div
                className={`form-group ${formErrors.tipo ? "has-error" : ""}`}
              >
                <label htmlFor="tipo">Tipo de Agendamento*</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={agendamento.tipo}
                  onChange={handleChange}
                  disabled={status.enviando}
                >
                  <option style={{ color: "var(--color-text-dark)" }} value="">Selecione o tipo</option>
                  <option style={{ color: "var(--color-text-dark)" }} value="Reunião">Reunião</option>
                  <option style={{ color: "var(--color-text-dark)" }} value="Consulta">Consulta</option>
                  <option style={{ color: "var(--color-text-dark)" }} value="Audiência">Audiência</option>
                </select>
                {formErrors.tipo && (
                  <span className="error-message">{formErrors.tipo}</span>
                )}
              </div>

              <div
                className={`form-group ${
                  formErrors.processo ? "has-error" : ""
                }`}
              >
                <label htmlFor="processo">Relacionado ao Processo</label>
                <select
                  id="processo"
                  name="processo"
                  value={agendamento.processo}
                  onChange={handleChange}
                  disabled={status.enviando}
                >
                  <option style={{ color: "var(--color-text-dark)" }} value="">Selecione o processo (opcional)</option>
                  {processos.map((processo) => (
                    <option style={{ color: "var(--color-text-dark)" }} key={processo.id} value={processo.id}>
                      {processo.numero} - {processo.tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              className={`form-group ${formErrors.motivo ? "has-error" : ""}`}
            >
              <label htmlFor="motivo">Motivo do Agendamento*</label>
              <textarea
                id="motivo"
                name="motivo"
                value={agendamento.motivo}
                onChange={handleChange}
                placeholder="Descreva o motivo do agendamento"
                rows={4}
                disabled={status.enviando}
                style={{ color: "var(--color-text-dark)" }}
              ></textarea>
              {formErrors.motivo && (
                <span className="error-message">{formErrors.motivo}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Advogado</h3>

            <div
              className={`form-group ${formErrors.advogado ? "has-error" : ""}`}
            >
              <label htmlFor="advogado">Selecione o Advogado*</label>
              <div className="advogados-lista">
                {advogados.length === 0 ? (
                  <div className="loading-advogados">
                    Carregando advogados...
                  </div>
                ) : (
                  advogados.map((adv) => (
                    <div
                      key={adv.id}
                      className={`advogado-card ${
                        agendamento.advogado == adv.id ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleChange({
                          target: { name: "advogado", value: adv.id },
                        })
                      }
                    >
                      <div className="advogado-avatar">
                        <div className="advogado-inicial">
                          {adv.nome.charAt(0)}
                        </div>
                      </div>
                      <div className="advogado-info">
                        <h4>{adv.nome}</h4>
                        <p>{adv.especialidade}</p>
                      </div>
                      {agendamento.advogado == adv.id && (
                        <div className="selected-icon">✓</div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {formErrors.advogado && (
                <span className="error-message">{formErrors.advogado}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Data e Horário</h3>

            <div className="form-row">
              <div
                className={`form-group ${formErrors.data ? "has-error" : ""}`}
              >
                <label htmlFor="data">Data*</label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={agendamento.data}
                  onChange={handleChange}
                  min={dataMinima}
                  disabled={status.enviando}
                  style={{ color: "var(--color-text-dark)" }}
                />
                {formErrors.data && (
                  <span className="error-message">{formErrors.data}</span>
                )}
              </div>

              <div
                className={`form-group ${formErrors.hora ? "has-error" : ""}`}
              >
                <label htmlFor="hora">Horário*</label>
                <select
                  id="hora"
                  name="hora"
                  value={agendamento.hora}
                  onChange={handleChange}
                  disabled={
                    !agendamento.data ||
                    !agendamento.advogado ||
                    status.enviando
                  }
                >
                  <option style={{ color: "var(--color-text-dark)" }} value="">Selecione o horário</option>
                  {horariosDisponiveis.map((horario) => (
                    <option style={{ color: "var(--color-text-dark)" }} key={horario} value={horario}>
                      {horario}
                    </option>
                  ))}
                </select>
                {!agendamento.data || !agendamento.advogado ? (
                  <span className="info-message">
                    Selecione a data e o advogado para ver os horários
                    disponíveis
                  </span>
                ) : horariosDisponiveis.length === 0 ? (
                  <span className="info-message">
                    Carregando horários disponíveis...
                  </span>
                ) : null}
                {formErrors.hora && (
                  <span className="error-message">{formErrors.hora}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="duracao">Duração</label>
                <select
                  id="duracao"
                  name="duracao"
                  value={agendamento.duracao}
                  onChange={handleChange}
                  disabled={status.enviando}
                >
                  <option style={{ color: "var(--color-text-dark)" }} value={30}>30 minutos</option>
                  <option style={{ color: "var(--color-text-dark)" }} value={45}>45 minutos</option>
                  <option style={{ color: "var(--color-text-dark)" }} value={60}>1 hora</option>
                  <option style={{ color: "var(--color-text-dark)" }} value={90}>1 hora e 30 minutos</option>
                  <option style={{ color: "var(--color-text-dark)" }} value={120}>2 horas</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Local</h3>

            <div
              className={`form-group ${formErrors.local ? "has-error" : ""}`}
            >
              <label htmlFor="local">Local*</label>
              <select
                id="local"
                name="local"
                value={agendamento.local}
                onChange={handleChange}
                disabled={agendamento.tipo === "Audiência" || status.enviando}
              >
                <option style={{ color: "var(--color-text-dark)" }} value="">Selecione o local</option>
                {locais.map((local) => (
                  <option style={{ color: "var(--color-text-dark)" }} key={local.id} value={local.nome}>
                    {local.nome}
                  </option>
                ))}
              </select>
              {agendamento.tipo === "Audiência" && (
                <span className="info-message">
                  Local definido automaticamente para audiências.
                </span>
              )}
              {formErrors.local && (
                <span className="error-message">{formErrors.local}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={agendamento.observacoes}
                onChange={handleChange}
                placeholder="Informações adicionais para o agendamento"
                rows={3}
                disabled={status.enviando}
                style={{ color: "var(--color-text-dark)" }}
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <Link href="/cliente/agendamentos" className="btn-cancelar">
              Cancelar
            </Link>
            <button
              type="submit"
              className="btn-agendar"
              disabled={status.enviando}
            >
              {status.enviando ? "Enviando..." : "Confirmar Agendamento"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .novo-agendamento-container {
          max-width: 850px;
          margin: 0 auto;
        }

        .header-voltar {
          margin-bottom: 1.5rem;
        }

        .btn-voltar {
          display: inline-block;
          color: var(--color-text-muted);
          text-decoration: none;
          padding: 0.5rem 0;
          transition: color 0.3s;
        }

        .btn-voltar:hover {
          color: var(--color-text-dark);
        }

        .form-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .form-header {
          padding: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .form-header h2 {
          margin: 0 0 0.5rem 0;
          color: var(--color-text-dark);
        }

        .form-header p {
          margin: 0;
          color: var(--color-text-muted);
        }

        .notification {
          margin: 0 1.5rem;
          padding: 1rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .notification p {
          margin: 0;
        }

        .notification.success {
          background-color: rgba(76, 175, 80, 0.1);
          color: #388e3c;
          border: 1px solid rgba(76, 175, 80, 0.3);
        }

        .notification.error {
          background-color: rgba(244, 67, 54, 0.1);
          color: #d32f2f;
          border: 1px solid rgba(244, 67, 54, 0.3);
        }

        .notification-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          font-weight: bold;
        }

        .success .notification-icon {
          background-color: #4caf50;
          color: white;
        }

        .error .notification-icon {
          background-color: #f44336;
          color: white;
        }

        .form-errors {
          margin: 1.5rem;
          padding: 1rem;
          background-color: rgba(244, 67, 54, 0.1);
          border: 1px solid rgba(244, 67, 54, 0.3);
          border-radius: 4px;
          color: #d32f2f;
        }

        .form-errors p {
          margin: 0 0 0.5rem 0;
          font-weight: 500;
        }

        .form-errors ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .form-errors li {
          margin-bottom: 0.25rem;
        }

        .agendamento-form {
          padding: 1.5rem;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-section h3 {
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f0f0f0;
          color: var(--color-text-dark);
          font-size: 1.1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group.has-error input,
        .form-group.has-error select,
        .form-group.has-error textarea {
          border-color: #f44336;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--color-text-dark);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background-color: white;
          font-size: 0.95rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4caf50;
        }

        .form-group input:disabled,
        .form-group select:disabled,
        .form-group textarea:disabled {
          background-color: #f9f9f9;
          cursor: not-allowed;
        }

        .error-message {
          display: block;
          color: #f44336;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .info-message {
          display: block;
          color: var(--color-text-muted);
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .advogados-lista {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .loading-advogados {
          grid-column: 1 / -1;
          padding: 1rem;
          text-align: center;
          color: var(--color-text-muted);
        }

        .advogado-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .advogado-card:hover {
          border-color: #4caf50;
          background-color: rgba(76, 175, 80, 0.05);
        }

        .advogado-card.selected {
          border-color: #4caf50;
          background-color: rgba(76, 175, 80, 0.1);
        }

        .advogado-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #4caf50;
          font-size: 1.2rem;
        }

        .advogado-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 0.95rem;
          color: var(--color-text-dark);
        }

        .advogado-info p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--color-text-dark);
        }

        .selected-icon {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background-color: #4caf50;
          color: #000;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f0f0f0;
        }

        .btn-cancelar,
        .btn-agendar {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          text-align: center;
          transition: all 0.3s;
          font-size: 0.95rem;
        }

        .btn-cancelar {
          background-color: transparent;
          color: var(--color-text-dark);
          border: 1px solid #e0e0e0;
        }

        .btn-cancelar:hover {
          background-color: #f9f9f9;
          color: var(--color-text-dark);
        }

        .btn-agendar {
          background-color: #4caf50;
          color: white;
          border: none;
          min-width: 180px;
        }

        .btn-agendar:hover {
          background-color: #388e3c;
        }

        .btn-agendar:disabled {
          background-color: #9e9e9e;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-actions {
            flex-direction: column;
          }

          .btn-cancelar,
          .btn-agendar {
            width: 100%;
          }

          .advogados-lista {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
