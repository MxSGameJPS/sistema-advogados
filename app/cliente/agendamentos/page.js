"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function ClienteAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentosFiltrados, setAgendamentosFiltrados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados do servidor
    setTimeout(() => {
      const agendamentosMock = [
        {
          id: 1,
          tipo: "Reunião",
          data: "2023-11-20",
          hora: "14:30",
          duracao: 60,
          advogado: {
            nome: "Maria Silva",
            email: "maria.silva@maisdireito.com",
            telefone: "(11) 98765-4321",
          },
          local: "Escritório Sede",
          endereco: "Av. Paulista, 1000, Sala 210, São Paulo - SP",
          status: "Confirmado",
          motivo: "Discussão sobre estratégia processual",
          processo: {
            id: 1,
            numero: "0123456-78.2023.8.26.0100",
          },
          observacoes: "Trazer documentos solicitados na última reunião",
        },
        {
          id: 2,
          tipo: "Audiência",
          data: "2023-11-28",
          hora: "10:00",
          duracao: 120,
          advogado: {
            nome: "João Ferreira",
            email: "joao.ferreira@maisdireito.com",
            telefone: "(11) 97654-3210",
          },
          local: "Fórum Central",
          endereco: "Praça da Sé, s/n, Centro, São Paulo - SP",
          status: "Agendado",
          motivo: "Audiência de instrução",
          processo: {
            id: 2,
            numero: "0098765-43.2023.8.26.0100",
          },
          observacoes: "Apresentar-se 30 minutos antes do horário marcado",
        },
        {
          id: 3,
          tipo: "Consulta",
          data: "2023-12-05",
          hora: "15:00",
          duracao: 45,
          advogado: {
            nome: "Pedro Souza",
            email: "pedro.souza@maisdireito.com",
            telefone: "(11) 96543-2109",
          },
          local: "Online (Zoom)",
          endereco: null,
          status: "Pendente",
          motivo: "Esclarecimento de dúvidas sobre o processo",
          processo: {
            id: 3,
            numero: "0456789-12.2023.8.26.0100",
          },
          observacoes: "Link será enviado por e-mail 30 minutos antes",
        },
        {
          id: 4,
          tipo: "Reunião",
          data: "2023-10-15",
          hora: "09:30",
          duracao: 60,
          advogado: {
            nome: "Ana Oliveira",
            email: "ana.oliveira@maisdireito.com",
            telefone: "(11) 95432-1098",
          },
          local: "Escritório Sede",
          endereco: "Av. Paulista, 1000, Sala 210, São Paulo - SP",
          status: "Realizado",
          motivo: "Contratação de serviços",
          processo: {
            id: 4,
            numero: "0567890-12.2023.8.26.0100",
          },
          observacoes: "Cliente trouxe todos os documentos solicitados",
        },
        {
          id: 5,
          tipo: "Audiência",
          data: "2023-10-20",
          hora: "13:30",
          duracao: 90,
          advogado: {
            nome: "João Ferreira",
            email: "joao.ferreira@maisdireito.com",
            telefone: "(11) 97654-3210",
          },
          local: "Fórum Regional",
          endereco: "Av. São Miguel, 5000, São Paulo - SP",
          status: "Cancelado",
          motivo: "Audiência de conciliação",
          processo: {
            id: 2,
            numero: "0098765-43.2023.8.26.0100",
          },
          observacoes: "Cancelado a pedido da parte contrária",
        },
      ];

      setAgendamentos(agendamentosMock);
      setAgendamentosFiltrados(agendamentosMock);
      setLoading(false);
    }, 800);
  }, []);

  const filtrarAgendamentos = useCallback(() => {
    let resultado = [...agendamentos];

    // Filtro por tipo
    if (filtroTipo !== "todos") {
      resultado = resultado.filter(
        (agendamento) =>
          agendamento.tipo.toLowerCase() === filtroTipo.toLowerCase()
      );
    }

    // Filtro por status
    if (filtroStatus !== "todos") {
      resultado = resultado.filter(
        (agendamento) =>
          agendamento.status.toLowerCase() === filtroStatus.toLowerCase()
      );
    }

    // Ordenar por data (mais recentes primeiro para futuros, depois passados)
    resultado.sort((a, b) => {
      const dataA = new Date(a.data + "T" + a.hora);
      const dataB = new Date(b.data + "T" + b.hora);
      const hoje = new Date();

      // Se ambas as datas estão no futuro ou ambas no passado, ordenar normalmente
      if ((dataA > hoje && dataB > hoje) || (dataA < hoje && dataB < hoje)) {
        return dataA - dataB;
      }

      // Colocar datas futuras primeiro
      return dataA > hoje ? -1 : 1;
    });

    setAgendamentosFiltrados(resultado);
  }, [filtroTipo, filtroStatus, agendamentos]);

  useEffect(() => {
    filtrarAgendamentos();
  }, [filtrarAgendamentos]);

  const formatarData = (dataString) => {
    if (!dataString) return "N/A";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  const formatarDataHora = (dataString, horaString) => {
    if (!dataString || !horaString) return "N/A";

    const [ano, mes, dia] = dataString.split("-");
    const [hora, minuto] = horaString.split(":");

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
  };

  const verificarDataPassada = (dataString, horaString) => {
    const dataEvento = new Date(dataString + "T" + horaString);
    const hoje = new Date();
    return dataEvento < hoje;
  };

  return (
    <div className="agendamentos-container">
      <div className="agendamentos-header">
        <div className="header-title">
          <h2>Meus Agendamentos</h2>
          <p>Visualize, agende e gerencie suas reuniões e audiências</p>
        </div>
        <div className="header-actions">
          <Link href="/cliente/agendamentos/novo" className="btn-novo">
            + Novo Agendamento
          </Link>
        </div>
      </div>

      <div className="filtros-container">
        <div className="filtro-grupo">
          <div className="filtro-item">
            <label htmlFor="filtroTipo">Tipo:</label>
            <select
              id="filtroTipo"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="reunião">Reunião</option>
              <option value="audiência">Audiência</option>
              <option value="consulta">Consulta</option>
            </select>
          </div>

          <div className="filtro-item">
            <label htmlFor="filtroStatus">Status:</label>
            <select
              id="filtroStatus"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="confirmado">Confirmado</option>
              <option value="agendado">Agendado</option>
              <option value="pendente">Pendente</option>
              <option value="realizado">Realizado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando agendamentos...</p>
        </div>
      ) : agendamentosFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum agendamento encontrado com os filtros selecionados.</p>
          <Link href="/cliente/agendamentos/novo" className="btn-novo-empty">
            Criar Novo Agendamento
          </Link>
        </div>
      ) : (
        <div className="agendamentos-lista">
          {agendamentosFiltrados.map((agendamento) => (
            <div
              key={agendamento.id}
              className={`agendamento-card ${
                verificarDataPassada(agendamento.data, agendamento.hora)
                  ? "passado"
                  : ""
              }`}
            >
              <div className="agendamento-header">
                <div className="agendamento-tipo-wrapper">
                  <div
                    className={`agendamento-icone tipo-${agendamento.tipo.toLowerCase()}`}
                  >
                    {agendamento.tipo === "Reunião"
                      ? "🗓️"
                      : agendamento.tipo === "Audiência"
                      ? "⚖️"
                      : "📞"}
                  </div>
                  <div className="agendamento-tipo-info">
                    <h3 className="agendamento-tipo">{agendamento.tipo}</h3>
                    <span
                      className={`agendamento-status status-${agendamento.status.toLowerCase()}`}
                    >
                      {agendamento.status}
                    </span>
                  </div>
                </div>
                <div className="agendamento-data-wrapper">
                  <div className="agendamento-data">
                    {formatarDataHora(agendamento.data, agendamento.hora)}
                  </div>
                  <div className="agendamento-duracao">
                    Duração: {agendamento.duracao} minutos
                  </div>
                </div>
              </div>

              <div className="agendamento-detalhes">
                <div className="detalhe-grupo">
                  <div className="detalhe-item">
                    <span className="detalhe-label">Advogado:</span>
                    <span className="detalhe-valor">
                      {agendamento.advogado.nome}
                    </span>
                  </div>

                  <div className="detalhe-item">
                    <span className="detalhe-label">Local:</span>
                    <span className="detalhe-valor">{agendamento.local}</span>
                  </div>
                </div>

                <div className="detalhe-item full">
                  <span className="detalhe-label">Motivo:</span>
                  <span className="detalhe-valor">{agendamento.motivo}</span>
                </div>

                {agendamento.processo && (
                  <div className="detalhe-item full">
                    <span className="detalhe-label">Processo:</span>
                    <span className="detalhe-valor">
                      {agendamento.processo.numero}
                    </span>
                  </div>
                )}

                {agendamento.observacoes && (
                  <div className="detalhe-item full">
                    <span className="detalhe-label">Observações:</span>
                    <span className="detalhe-valor">
                      {agendamento.observacoes}
                    </span>
                  </div>
                )}

                {agendamento.endereco && (
                  <div className="detalhe-item full">
                    <span className="detalhe-label">Endereço:</span>
                    <span className="detalhe-valor">
                      {agendamento.endereco}
                    </span>
                  </div>
                )}
              </div>

              <div className="agendamento-footer">
                {!verificarDataPassada(agendamento.data, agendamento.hora) &&
                  agendamento.status !== "Cancelado" && (
                    <div className="agendamento-acoes">
                      <Link
                        href={`/cliente/agendamentos/${agendamento.id}`}
                        className="btn-ver"
                      >
                        Ver Detalhes
                      </Link>
                      {agendamento.status !== "Realizado" && (
                        <button className="btn-cancelar">Cancelar</button>
                      )}
                    </div>
                  )}

                {agendamento.tipo === "Consulta" &&
                  agendamento.local.includes("Online") &&
                  !verificarDataPassada(agendamento.data, agendamento.hora) && (
                    <Link href="#" className="btn-online">
                      Acessar Reunião Online
                    </Link>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .agendamentos-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .agendamentos-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-title h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.75rem;
          color: var(--color-text-dark);
        }

        .header-title p {
          margin: 0;
          color: var(--color-text-muted);
        }

        .btn-novo,
        .btn-novo-empty {
          padding: 0.75rem 1.25rem;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          display: inline-block;
          transition: background-color 0.3s;
        }

        .btn-novo:hover,
        .btn-novo-empty:hover {
          background-color: #388e3c;
        }

        .btn-novo-empty {
          margin-top: 1rem;
        }

        .filtros-container {
          background-color: white;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .filtro-grupo {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filtro-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filtro-item label {
          font-weight: 500;
          color: var(--color-text-dark);
          white-space: nowrap;
        }

        .filtro-item select {
          padding: 0.5rem 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          background-color: white;
          font-size: 0.9rem;
          min-width: 180px;
        }

        .filtro-item select:focus {
          outline: none;
          border-color: #4caf50;
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

        .empty-state {
          background-color: white;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .empty-state p {
          color: var(--color-text-muted);
          margin: 0 0 1rem 0;
        }

        .agendamentos-lista {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .agendamento-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .agendamento-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .agendamento-card.passado {
          opacity: 0.7;
        }

        .agendamento-header {
          display: flex;
          justify-content: space-between;
          padding: 1.25rem;
          background-color: #f9f9f9;
          border-bottom: 1px solid #f0f0f0;
        }

        .agendamento-tipo-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .agendamento-icone {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .tipo-reunião {
          background-color: rgba(33, 150, 243, 0.15);
          color: #2196f3;
        }

        .tipo-audiência {
          background-color: rgba(244, 67, 54, 0.15);
          color: #f44336;
        }

        .tipo-consulta {
          background-color: rgba(156, 39, 176, 0.15);
          color: #9c27b0;
        }

        .agendamento-tipo-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: var(--color-text-dark);
        }

        .agendamento-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 500;
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

        .status-realizado {
          background-color: rgba(156, 39, 176, 0.15);
          color: #9c27b0;
        }

        .status-cancelado {
          background-color: rgba(244, 67, 54, 0.15);
          color: #f44336;
        }

        .agendamento-data-wrapper {
          text-align: right;
        }

        .agendamento-data {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text-dark);
          margin-bottom: 0.25rem;
        }

        .agendamento-duracao {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .agendamento-detalhes {
          padding: 1.25rem;
        }

        .detalhe-grupo {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .detalhe-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.75rem;
        }

        .detalhe-item.full {
          grid-column: 1 / -1;
        }

        .detalhe-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
        }

        .detalhe-valor {
          font-size: 0.95rem;
          color: var(--color-text-dark);
        }

        .agendamento-footer {
          padding: 1.25rem;
          border-top: 1px solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .agendamento-acoes {
          display: flex;
          gap: 1rem;
          flex: 1;
        }

        .btn-ver,
        .btn-cancelar,
        .btn-online {
          padding: 0.7rem 1rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          text-align: center;
          transition: all 0.3s;
        }

        .btn-ver {
          background-color: transparent;
          color: #4caf50;
          border: 1px solid #4caf50;
          flex: 1;
        }

        .btn-ver:hover {
          background-color: rgba(76, 175, 80, 0.1);
        }

        .btn-cancelar {
          background-color: transparent;
          color: #f44336;
          border: 1px solid #f44336;
          flex: 1;
        }

        .btn-cancelar:hover {
          background-color: rgba(244, 67, 54, 0.1);
        }

        .btn-online {
          background-color: #4caf50;
          color: white;
          border: none;
          width: 100%;
        }

        .btn-online:hover {
          background-color: #388e3c;
        }

        @media (max-width: 768px) {
          .agendamentos-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .btn-novo {
            width: 100%;
            text-align: center;
          }

          .filtro-grupo {
            flex-direction: column;
          }

          .filtro-item {
            width: 100%;
          }

          .filtro-item select {
            flex: 1;
          }

          .detalhe-grupo {
            grid-template-columns: 1fr;
          }

          .agendamento-header {
            flex-direction: column;
            gap: 1rem;
          }

          .agendamento-data-wrapper {
            text-align: left;
          }

          .agendamento-footer,
          .agendamento-acoes {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
