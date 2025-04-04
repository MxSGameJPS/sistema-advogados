# Documentação do Painel Administrativo - MaisDireito Advogados

## Visão Geral

O painel administrativo do MaisDireito Advogados foi desenvolvido para oferecer uma plataforma centralizada e completa para gerenciamento de todos os aspectos operacionais do escritório. Desenvolvido com React e Next.js, o painel apresenta uma interface intuitiva e responsiva, permitindo acesso rápido às principais funcionalidades necessárias para o dia a dia do escritório.

## Funcionalidades Principais

### 1. Dashboard

O dashboard principal oferece uma visão consolidada das informações mais relevantes do escritório:

- **Estatísticas em tempo real**: Clientes ativos, processos pendentes, processos encerrados e receita mensal
- **Atividades do dia**: Visualização rápida de compromissos, audiências e tarefas agendadas para o dia
- **Processos recentes**: Lista dos processos mais recentemente atualizados ou criados

### 2. Gestão de Clientes

Módulo completo para gerenciamento da carteira de clientes:

- **Cadastro de clientes**: Formulário para registro de pessoas físicas e jurídicas
- **Listagem e filtragem**: Visualização de clientes com filtros por status (ativo, inativo, pendente)
- **Estatísticas**: Indicadores de total de clientes, ativos, inativos e pendentes
- **Aprovação de cadastros**: Fluxo para aprovação de novos clientes
- **Gerenciamento de status**: Funcionalidades para ativar, desativar ou reativar clientes

### 3. Controle Financeiro

Sistema completo para gestão financeira do escritório:

- **Controle de receitas e despesas**: Registro e categorização de entradas e saídas
- **Visualização mensal**: Filtro por mês e ano para análise financeira periódica
- **Resumo financeiro**: Cards com totais de receitas, despesas e saldo
- **Ações rápidas**: Botões para adicionar receitas, despesas e exportar relatórios

### 4. Controle de Estoque

Gerenciamento de materiais e insumos do escritório:

- **Inventário completo**: Listagem de todos os itens em estoque
- **Filtros inteligentes**: Visualização por categoria, baixo estoque ou vencimento próximo
- **Estatísticas**: Indicadores de valor total em estoque, produtos com baixo estoque e produtos próximos do vencimento
- **Ações de gerenciamento**: Cadastro de novos produtos, entrada em estoque e exportação de relatórios

### 5. Recursos Humanos (RH)

Administração completa da equipe:

- **Gestão de funcionários**: Cadastro, edição e visualização de colaboradores
- **Departamentos e cargos**: Organização da estrutura organizacional
- **Indicadores de RH**: Total de funcionários, folha de pagamento mensal, novas contratações e desligamentos
- **Funcionalidades adicionais**: Abas para folha de pagamento e controle de férias

## Arquitetura e Integração

### Estrutura de Arquivos

```
/src/app/admin/
  ├── layout.js        # Layout principal com sidebar e controle de autenticação
  ├── page.js          # Página de redirecionamento para login
  ├── login/          
  │   └── page.js      # Página de login
  ├── dashboard/
  │   └── page.js      # Dashboard principal
  ├── clientes/
  │   └── page.js      # Gestão de clientes
  ├── financeiro/
  │   └── page.js      # Controle financeiro
  ├── estoque/
  │   └── page.js      # Controle de estoque
  ├── rh/
  │   └── page.js      # Recursos humanos
  └── dashboard.css    # Estilos globais do painel administrativo
```

### Autenticação e Segurança

O sistema atual implementa um fluxo básico de autenticação:

- **Login**: Validação de usuário e senha (atualmente simulado com credenciais padrão: admin/admin)
- **Controle de sessão**: Armazenamento da sessão via localStorage
- **Redirecionamento protegido**: Verificação de autenticação em todas as rotas administrativas
- **Logout**: Funcionalidade para encerramento seguro da sessão

**Importante**: Para ambiente de produção, recomenda-se implementar:
- Autenticação via JWT ou similar
- Backend com validação segura de credenciais
- HTTPS para todas as comunicações
- Política de senhas fortes e renovação periódica

### Integração com API

Atualmente, o painel utiliza dados simulados (mock data) para demonstração. Para integração com uma API real:

1. Substituir as chamadas simuladas por requisições HTTP reais
2. Implementar tratamento de erros e loading states
3. Configurar interceptors para tokens de autenticação
4. Implementar cache de dados quando apropriado

Exemplo de integração (a ser implementado):

```javascript
// Em cada componente que necessita dados
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get('/endpoint');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
```

## Guia de Uso

### Acesso ao Sistema

1. Navegue até `/admin` para ser redirecionado à tela de login
2. Insira as credenciais (padrão: admin/admin)
3. Após autenticação, você será redirecionado ao dashboard principal

### Navegação

- Utilize a barra lateral (sidebar) para acessar os diferentes módulos
- A sidebar pode ser recolhida para melhor visualização em dispositivos menores
- O cabeçalho superior mostra o título da página atual e informações do usuário logado

### Personalização

O painel foi desenvolvido utilizando variáveis CSS para fácil personalização:

```css
:root {
  --color-primary: #121212;
  --color-primary-light: #1e1e1e;
  --color-primary-dark: #0a0a0a;
  --color-accent: #d4af37;
  --color-accent-dark: #b8941f;
  --color-text-light: #e0e0e0;
  --color-text-muted: #a0a0a0;
}
```

## Próximos Passos e Melhorias

### Funcionalidades Planejadas

- **Gestão de Processos**: Módulo completo para acompanhamento de processos jurídicos
- **Agenda integrada**: Calendário com compromissos, prazos e audiências
- **Gestão de documentos**: Armazenamento e versionamento de documentos
- **Relatórios avançados**: Dashboards analíticos com gráficos e indicadores de desempenho
- **Notificações**: Sistema de alertas para prazos, audiências e tarefas

### Melhorias Técnicas

- Implementação de testes automatizados (Jest/React Testing Library)
- Validação de formulários com bibliotecas como Formik ou React Hook Form
- Implementação de estado global com Context API ou Redux
- Otimização de performance com técnicas de memoização
- Migração para Typescript para maior segurança de tipos

## Suporte e Contato

Para suporte técnico ou dúvidas sobre o painel administrativo, entre em contato:

**E-mail**: mxsgamejps@gmail.com
**Telefone**: (51) 99339-2983

---

© 2025 Saulo Pabanello. Todos os direitos reservados. 