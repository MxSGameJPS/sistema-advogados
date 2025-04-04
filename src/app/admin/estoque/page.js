"use client";

import { useState, useEffect } from "react";

export default function Estoque() {
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [statsProdutos, setStatsProdutos] = useState({
    total: 0,
    valorTotal: 0,
    proximosVencimentos: 0,
    estoquesBaixos: 0,
  });
  const [filtroAtivo, setFiltroAtivo] = useState("todos");

  // Simular carregamento de dados
  useEffect(() => {
    // Dados de exemplo para demonstração
    const produtosDemo = [
      {
        id: 1,
        codigo: "PAP001",
        nome: "Papel A4",
        categoria: "Papelaria",
        quantidade: 25,
        unidade: "Resmas",
        valorUnitario: 22.5,
        valorTotal: 562.5,
        estoqueMinimo: 10,
        proximoVencimento: null,
      },
      {
        id: 2,
        codigo: "PAP002",
        nome: "Canetas Esferográficas",
        categoria: "Papelaria",
        quantidade: 150,
        unidade: "Unidades",
        valorUnitario: 1.5,
        valorTotal: 225,
        estoqueMinimo: 50,
        proximoVencimento: null,
      },
      {
        id: 3,
        codigo: "PAP003",
        nome: "Grampeadores",
        categoria: "Papelaria",
        quantidade: 8,
        unidade: "Unidades",
        valorUnitario: 18.9,
        valorTotal: 151.2,
        estoqueMinimo: 5,
        proximoVencimento: null,
      },
      {
        id: 4,
        codigo: "INF001",
        nome: "Toners para Impressora",
        categoria: "Informática",
        quantidade: 5,
        unidade: "Unidades",
        valorUnitario: 189.9,
        valorTotal: 949.5,
        estoqueMinimo: 3,
        proximoVencimento: null,
      },
      {
        id: 5,
        codigo: "INF002",
        nome: "Pen Drives 32GB",
        categoria: "Informática",
        quantidade: 12,
        unidade: "Unidades",
        valorUnitario: 42.9,
        valorTotal: 514.8,
        estoqueMinimo: 5,
        proximoVencimento: null,
      },
      {
        id: 6,
        codigo: "LIM001",
        nome: "Desinfetante",
        categoria: "Limpeza",
        quantidade: 10,
        unidade: "Litros",
        valorUnitario: 8.9,
        valorTotal: 89,
        estoqueMinimo: 5,
        proximoVencimento: "2023-07-15",
      },
      {
        id: 7,
        codigo: "LIM002",
        nome: "Papel Higiênico",
        categoria: "Limpeza",
        quantidade: 48,
        unidade: "Rolos",
        valorUnitario: 1.2,
        valorTotal: 57.6,
        estoqueMinimo: 24,
        proximoVencimento: null,
      },
      {
        id: 8,
        codigo: "CAF001",
        nome: "Café",
        categoria: "Copa",
        quantidade: 6,
        unidade: "Pacotes",
        valorUnitario: 15.9,
        valorTotal: 95.4,
        estoqueMinimo: 3,
        proximoVencimento: "2023-06-10",
      },
      {
        id: 9,
        codigo: "CAF002",
        nome: "Açúcar",
        categoria: "Copa",
        quantidade: 4,
        unidade: "Pacotes",
        valorUnitario: 9.5,
        valorTotal: 38,
        estoqueMinimo: 2,
        proximoVencimento: "2023-08-20",
      },
      {
        id: 10,
        codigo: "CAF003",
        nome: "Copos Descartáveis",
        categoria: "Copa",
        quantidade: 1,
        unidade: "Pacotes",
        valorUnitario: 6.9,
        valorTotal: 6.9,
        estoqueMinimo: 2,
        proximoVencimento: null,
      },
    ];

    // Extrair categorias únicas
    const categoriasUnicas = [
      ...new Set(produtosDemo.map((produto) => produto.categoria)),
    ];

    // Calcular estatísticas
    const total = produtosDemo.length;
    const valorTotal = produtosDemo.reduce(
      (acc, produto) => acc + produto.valorTotal,
      0
    );

    // Contar produtos com vencimento próximo (30 dias)
    const hoje = new Date();
    const trintaDiasDepois = new Date();
    trintaDiasDepois.setDate(hoje.getDate() + 30);

    const proximosVencimentos = produtosDemo.filter((produto) => {
      if (!produto.proximoVencimento) return false;
      const dataVencimento = new Date(produto.proximoVencimento);
      return dataVencimento <= trintaDiasDepois && dataVencimento >= hoje;
    }).length;

    // Contar produtos com estoque baixo
    const estoquesBaixos = produtosDemo.filter(
      (produto) => produto.quantidade <= produto.estoqueMinimo
    ).length;

    setProdutosEstoque(produtosDemo);
    setCategorias(categoriasUnicas);
    setStatsProdutos({
      total,
      valorTotal,
      proximosVencimentos,
      estoquesBaixos,
    });
  }, []);

  // Filtrar produtos com base no filtro ativo
  const produtosFiltrados = () => {
    if (filtroAtivo === "todos") {
      return produtosEstoque;
    } else if (filtroAtivo === "estoqueBaixo") {
      return produtosEstoque.filter(
        (produto) => produto.quantidade <= produto.estoqueMinimo
      );
    } else if (filtroAtivo === "vencimentoProximo") {
      const hoje = new Date();
      const trintaDiasDepois = new Date();
      trintaDiasDepois.setDate(hoje.getDate() + 30);

      return produtosEstoque.filter((produto) => {
        if (!produto.proximoVencimento) return false;
        const dataVencimento = new Date(produto.proximoVencimento);
        return dataVencimento <= trintaDiasDepois && dataVencimento >= hoje;
      });
    } else {
      // Filtro por categoria
      return produtosEstoque.filter(
        (produto) => produto.categoria === filtroAtivo
      );
    }
  };

  // Formatação de valores monetários em Real brasileiro
  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Formatação de data
  const formatarData = (dataString) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="estoque">
      <div className="dashboard-header">
        <div className="filtros">
          <div className="filtro-grupo">
            <label>Filtrar por:</label>
            <div className="filtro-botoes">
              <button
                className={`filtro-btn ${
                  filtroAtivo === "todos" ? "ativo" : ""
                }`}
                onClick={() => setFiltroAtivo("todos")}
              >
                Todos
              </button>
              <button
                className={`filtro-btn ${
                  filtroAtivo === "estoqueBaixo" ? "ativo" : ""
                }`}
                onClick={() => setFiltroAtivo("estoqueBaixo")}
              >
                Estoque Baixo
              </button>
              <button
                className={`filtro-btn ${
                  filtroAtivo === "vencimentoProximo" ? "ativo" : ""
                }`}
                onClick={() => setFiltroAtivo("vencimentoProximo")}
              >
                Vencimento Próximo
              </button>
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  className={`filtro-btn ${
                    filtroAtivo === categoria ? "ativo" : ""
                  }`}
                  onClick={() => setFiltroAtivo(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="acoes">
          <button className="btn btn-primary">Novo Produto</button>
          <button className="btn btn-secondary">Entrada de Estoque</button>
          <button className="btn btn-outline">Exportar Inventário</button>
        </div>
      </div>

      <div className="resumo-cards">
        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">{statsProdutos.total}</div>
            <div className="resumo-card-label">Total de Produtos</div>
          </div>
          <div className="resumo-card-icon">📦</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {formatarMoeda(statsProdutos.valorTotal)}
            </div>
            <div className="resumo-card-label">Valor em Estoque</div>
          </div>
          <div className="resumo-card-icon">💰</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {statsProdutos.estoquesBaixos}
            </div>
            <div className="resumo-card-label">Estoques Baixos</div>
          </div>
          <div className="resumo-card-icon">⚠️</div>
        </div>

        <div className="card resumo-card">
          <div className="resumo-card-content">
            <div className="resumo-card-valor">
              {statsProdutos.proximosVencimentos}
            </div>
            <div className="resumo-card-label">Próximos Vencimentos</div>
          </div>
          <div className="resumo-card-icon">⏳</div>
        </div>
      </div>

      <div className="estoque-section">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Produtos em Estoque</h3>
            <div className="search-box">
              <input type="text" placeholder="Buscar produtos..." />
              <button className="search-button">🔍</button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Quantidade</th>
                  <th>Unidade</th>
                  <th>Val. Unit.</th>
                  <th>Val. Total</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados().map((produto) => (
                  <tr
                    key={produto.id}
                    className={
                      produto.quantidade <= produto.estoqueMinimo
                        ? "estoque-baixo"
                        : ""
                    }
                  >
                    <td>{produto.codigo}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.categoria}</td>
                    <td>{produto.quantidade}</td>
                    <td>{produto.unidade}</td>
                    <td className="valor-cell">
                      {formatarMoeda(produto.valorUnitario)}
                    </td>
                    <td className="valor-cell">
                      {formatarMoeda(produto.valorTotal)}
                    </td>
                    <td>{formatarData(produto.proximoVencimento)}</td>
                    <td>
                      {produto.quantidade <= produto.estoqueMinimo ? (
                        <span className="status status-pendente">
                          Estoque Baixo
                        </span>
                      ) : (
                        <span className="status status-concluído">Normal</span>
                      )}
                    </td>
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

      <style jsx>{`
        .estoque {
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

        .filtro-botoes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filtro-btn {
          padding: 0.4rem 0.75rem;
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

        .estoque-section {
          margin-bottom: 1.5rem;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          min-width: 1200px;
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
          transition: all 0.2s;
        }

        .btn-outline:hover {
          background-color: rgba(212, 170, 61, 0.1);
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

        .estoque-baixo {
          background-color: rgba(255, 160, 0, 0.05);
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
