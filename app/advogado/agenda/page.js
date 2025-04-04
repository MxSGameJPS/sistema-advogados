"use client";

import { useState, useEffect } from "react";

export default function AgendaReuniao() {
  const [eventos, setEventos] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    hoje: 0,
    estaSemana: 0,
    proximoMes: 0,
  });
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos");
  const [carregando, setCarregando] = useState(true);
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  useEffect(() => {
    // Simulação de carregamento de dados do servidor
    setTimeout(() => {
      const mockEventos = [
        {
          id: 1,
          titulo: "Reunião com cliente João Silva",
          tipo: "reuniao",
          data: "2023-12-18T10:00:00",
          duracao: 60, // minutos
          local: "Escritório",
          cliente: {
            id: 1,
            nome: "João Silva",
            telefone: "(11) 98765-4321",
            email: "joao.silva@email.com",
          },
          processo: null,
          descricao: "Discussão sobre o andamento do processo trabalhista",
          status: "agendado",
        },
        {
          id: 2,
          titulo: "Audiência - Processo nº 0001234-12.2023",
          tipo: "audiencia",
          data: "2023-12-20T14:30:00",
          duracao: 120, // minutos
          local: "2ª Vara Cível - Fórum Central",
          cliente: {
            id: 2,
            nome: "Maria Souza",
            telefone: "(11) 91234-5678",
            email: "maria.souza@email.com",
          },
          processo: "0001234-12.2023.8.26.0100",
          descricao: "Audiência de conciliação",
          status: "agendado",
        },
        {
          id: 3,
          titulo: "Prazo final para recurso",
          tipo: "prazo",
          data: "2023-12-22T23:59:59",
          duracao: 0, // minutos
          local: null,
          cliente: {
            id: 3,
            nome: "Empresa ABC Ltda",
            telefone: "(11) 3456-7890",
            email: "contato@empresaabc.com",
          },
          processo: "0005678-90.2023.8.26.0100",
          descricao: "Prazo fatal para apresentação de recurso de apelação",
          status: "pendente",
        },
        {
          id: 4,
          titulo: "Despacho com juiz",
          tipo: "despacho",
          data: "2023-12-19T15:00:00",
          duracao: 30, // minutos
          local: "Gabinete do Juiz - 5ª Vara",
          cliente: {
            id: 4,
            nome: "Pedro Oliveira",
            telefone: "(11) 97890-1234",
            email: "pedro.oliveira@email.com",
          },
          processo: "0007890-12.2023.8.26.0100",
          descricao: "Despacho para discutir andamento do processo",
          status: "agendado",
        },
        {
          id: 5,
          titulo: "Reunião de equipe",
          tipo: "interno",
          data: "2023-12-18T16:00:00",
          duracao: 60, // minutos
          local: "Sala de Reuniões",
          cliente: null,
          processo: null,
          descricao: "Discussão semanal sobre os casos em andamento",
          status: "agendado",
        },
      ];

      setEventos(mockEventos);

      // Calcular estatísticas
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const proximoDomingo = new Date(hoje);
      proximoDomingo.setDate(hoje.getDate() + (7 - hoje.getDay()));

      const proximoMesInicio = new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 1,
        1
      );
      const proximoMesFim = new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 2,
        0
      );

      const stats = mockEventos.reduce(
        (acc, evento) => {
          const dataEvento = new Date(evento.data);
          acc.total++;

          if (
            dataEvento.getDate() === hoje.getDate() &&
            dataEvento.getMonth() === hoje.getMonth() &&
            dataEvento.getFullYear() === hoje.getFullYear()
          ) {
            acc.hoje++;
          }

          if (dataEvento >= hoje && dataEvento <= proximoDomingo) {
            acc.estaSemana++;
          }

          if (dataEvento >= proximoMesInicio && dataEvento <= proximoMesFim) {
            acc.proximoMes++;
          }

          return acc;
        },
        { total: 0, hoje: 0, estaSemana: 0, proximoMes: 0 }
      );

      setEstatisticas(stats);
      setCarregando(false);
    }, 800);
  }, []);

  // Formatação de data
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Formatação de hora
  const formatarHora = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtrar eventos
  const eventosFiltrados = eventos.filter((evento) => {
    // Filtro por tipo
    if (filtroTipo !== "todos" && evento.tipo !== filtroTipo) {
      return false;
    }

    // Filtro por período
    if (filtroPeriodo !== "todos") {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataEvento = new Date(evento.data);

      if (filtroPeriodo === "hoje") {
        return (
          dataEvento.getDate() === hoje.getDate() &&
          dataEvento.getMonth() === hoje.getMonth() &&
          dataEvento.getFullYear() === hoje.getFullYear()
        );
      }

      if (filtroPeriodo === "semana") {
        const proximoDomingo = new Date(hoje);
        proximoDomingo.setDate(hoje.getDate() + (7 - hoje.getDay()));
        return dataEvento >= hoje && dataEvento <= proximoDomingo;
      }

      if (filtroPeriodo === "mes") {
        const fimDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        return dataEvento >= hoje && dataEvento <= fimDoMes;
      }
    }

    return true;
  });

  // Obter ícone do tipo de evento
  const getIconeTipo = (tipo) => {
    switch (tipo) {
      case "reuniao":
        return "👥";
      case "audiencia":
        return "⚖️";
      case "prazo":
        return "⏱️";
      case "despacho":
        return "📝";
      case "interno":
        return "🏢";
      default:
        return "📅";
    }
  };

  // Obter cor do tipo de evento
  const getCorTipo = (tipo) => {
    switch (tipo) {
      case "reuniao":
        return "var(--color-primary)";
      case "audiencia":
        return "var(--color-accent)";
      case "prazo":
        return "var(--color-danger)";
      case "despacho":
        return "var(--color-info)";
      case "interno":
        return "var(--color-success)";
      default:
        return "var(--color-text-muted)";
    }
  };

  return (
    <div className="agenda-reuniao">
      <div className="dashboard-header">
        <div className="filtros">
          <div className="filtro-grupo">
            <label>Tipo:</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="reuniao">Reuniões</option>
              <option value="audiencia">Audiências</option>
              <option value="prazo">Prazos</option>
              <option value="despacho">Despachos</option>
              <option value="interno">Internos</option>
            </select>
          </div>
          <div className="filtro-grupo">
            <label>Período:</label>
            <select
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="hoje">Hoje</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
            </select>
          </div>
        </div>
        <div className="acoes">
          <button className="btn-primario">Novo Evento</button>
          <button className="btn-secundario">Exportar Agenda</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estatisticas.total}</div>
            <div className="resumo-label">Total de Eventos</div>
          </div>
          <div className="resumo-icon">📅</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estatisticas.hoje}</div>
            <div className="resumo-label">Eventos Hoje</div>
          </div>
          <div className="resumo-icon">📌</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estatisticas.estaSemana}</div>
            <div className="resumo-label">Esta Semana</div>
          </div>
          <div className="resumo-icon">📆</div>
        </div>

        <div className="resumo-card">
          <div className="resumo-info">
            <div className="resumo-valor">{estatisticas.proximoMes}</div>
            <div className="resumo-label">Próximo Mês</div>
          </div>
          <div className="resumo-icon">🗓️</div>
        </div>
      </div>

      {carregando ? (
        <div className="carregando">Carregando agenda...</div>
      ) : eventosFiltrados.length === 0 ? (
        <div className="lista-vazia">
          <p>Nenhum evento encontrado para os filtros selecionados.</p>
        </div>
      ) : (
        <div className="eventos-lista">
          {eventosFiltrados.map((evento) => (
            <div key={evento.id} className="evento-card">
              <div
                className="evento-barra-lateral"
                style={{ backgroundColor: getCorTipo(evento.tipo) }}
              ></div>
              <div className="evento-conteudo">
                <div className="evento-cabecalho">
                  <div className="evento-tipo">
                    <span className="tipo-icone">
                      {getIconeTipo(evento.tipo)}
                    </span>
                    <span className="tipo-texto">
                      {evento.tipo === "reuniao" && "Reunião"}
                      {evento.tipo === "audiencia" && "Audiência"}
                      {evento.tipo === "prazo" && "Prazo"}
                      {evento.tipo === "despacho" && "Despacho"}
                      {evento.tipo === "interno" && "Interno"}
                    </span>
                  </div>
                  <div className="evento-data-hora">
                    <div className="evento-data">
                      {formatarData(evento.data)}
                    </div>
                    <div className="evento-hora">
                      {formatarHora(evento.data)}
                    </div>
                  </div>
                </div>

                <h3 className="evento-titulo">{evento.titulo}</h3>

                <div className="evento-detalhes">
                  {evento.local && (
                    <div className="evento-local">
                      <span className="detalhe-icone">📍</span>
                      <span className="detalhe-texto">{evento.local}</span>
                    </div>
                  )}

                  {evento.duracao > 0 && (
                    <div className="evento-duracao">
                      <span className="detalhe-icone">⏱️</span>
                      <span className="detalhe-texto">
                        {evento.duracao} minutos
                      </span>
                    </div>
                  )}

                  {evento.cliente && (
                    <div className="evento-cliente">
                      <span className="detalhe-icone">👤</span>
                      <span className="detalhe-texto">
                        {evento.cliente.nome}
                      </span>
                    </div>
                  )}

                  {evento.processo && (
                    <div className="evento-processo">
                      <span className="detalhe-icone">📄</span>
                      <span className="detalhe-texto">{evento.processo}</span>
                    </div>
                  )}
                </div>

                {evento.descricao && (
                  <div className="evento-descricao">
                    <p>{evento.descricao}</p>
                  </div>
                )}

                <div className="evento-acoes">
                  <button className="btn-acao">Editar</button>
                  <button className="btn-acao">Cancelar</button>
                  <button className="btn-acao">Concluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .agenda-reuniao {
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

        .resumo-info {
          display: flex;
          flex-direction: column;
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

        .eventos-lista {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .evento-card {
          display: flex;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .evento-barra-lateral {
          width: 8px;
          background-color: var(--color-primary);
        }

        .evento-conteudo {
          flex: 1;
          padding: 1.5rem;
        }

        .evento-cabecalho {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .evento-tipo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tipo-icone {
          font-size: 1.25rem;
        }

        .tipo-texto {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .evento-data-hora {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .evento-data,
        .evento-hora {
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .evento-titulo {
          font-size: 1.25rem;
          margin: 0.5rem 0 1rem;
          color: var(--color-primary-dark);
        }

        .evento-detalhes {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .evento-local,
        .evento-duracao,
        .evento-cliente,
        .evento-processo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .detalhe-icone {
          font-size: 1rem;
        }

        .detalhe-texto {
          font-size: 0.9rem;
          color: var(--color-text);
        }

        .evento-descricao {
          background-color: rgba(0, 0, 0, 0.02);
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .evento-descricao p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .evento-acoes {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .btn-acao {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          border-radius: 4px;
          border: none;
          background-color: #f0f0f0;
          color: var(--color-text);
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-acao:hover {
          background-color: #e0e0e0;
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
            grid-template-columns: repeat(2, 1fr);
          }

          .evento-cabecalho {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .evento-data-hora {
            align-items: flex-start;
            flex-direction: row;
            gap: 0.5rem;
          }

          .evento-acoes {
            flex-wrap: wrap;
          }

          .btn-acao {
            flex: 1;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .resumo-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
