# Documentação de Requisitos - Sistema de Controle de Estoque

## 1. Visão Geral do Projeto

### 1.1. Objetivo do Sistema
Desenvolver um micro SaaS para controle de estoque voltado para pequenos comerciantes, oferecendo uma solução simples, intuitiva e acessível para gerenciar produtos, movimentações, vendas e fornecedores.

### 1.2. Público-Alvo
- Donos de mercadinhos
- Proprietários de lojas de roupas
- Donos de lojas de celulares
- Proprietários de restaurantes pequenos

### 1.3. Proposta de Valor
- Controle de estoque em tempo real
- Notificações automáticas de estoque baixo
- Interface simples e intuitiva
- Acessível via mobile e desktop
- Custo acessível para pequenos negócios

---

## 2. Objetivos de Negócio

### 2.1. Objetivos Primários
1. **Reduzir perdas por falta de controle**: Evitar que produtos fiquem em falta sem aviso prévio
2. **Otimizar compras**: Saber exatamente quando e quanto comprar
3. **Aumentar lucratividade**: Controle de margem de lucro através de preços de custo e venda
4. **Facilitar gestão**: Sistema simples que não requer treinamento extensivo

### 2.2. Objetivos Secundários
1. **Histórico completo**: Rastreabilidade de todas as movimentações
2. **Análise de dados**: Exportação para análises externas
3. **Gestão de fornecedores**: Centralizar informações de contatos
4. **Automação**: Reduzir trabalho manual através de atualizações automáticas

### 2.3. Métricas de Sucesso
- **Adoção**: 70% dos usuários cadastrados usam o sistema semanalmente
- **Retenção**: 80% dos usuários continuam usando após 3 meses
- **Satisfação**: NPS > 50
- **Eficiência**: Redução de 30% no tempo gasto com controle de estoque

---

## 3. Usuários-Alvo e Personas

### 3.1. Persona 1: Dono de Mercadinho
**Características:**
- Idade: 40-50 anos
- Nível técnico: Básico a intermediário
- Necessidades: Controle rápido, saber quando repor, evitar perdas por validade
- Uso: Principalmente no estabelecimento, ocasionalmente em casa

**Jornada:**
1. Cadastra produtos iniciais
2. Define estoque mínimo baseado em experiência
3. Recebe notificações quando precisa repor
4. Registra entradas após compras
5. Registra vendas e sistema atualiza estoque

### 3.2. Persona 2: Proprietário de Loja de Roupas
**Características:**
- Idade: 30-45 anos
- Nível técnico: Intermediário
- Necessidades: Controle por tamanhos/modelos, histórico de vendas, previsão
- Uso: No estabelecimento e em casa para planejamento

**Jornada:**
1. Cadastra produtos com variações (tamanhos)
2. Monitora produtos mais vendidos
3. Usa histórico para prever compras
4. Exporta dados para análise de tendências

### 3.3. Persona 3: Dono de Loja de Celulares
**Características:**
- Idade: 25-40 anos
- Nível técnico: Avançado
- Necessidades: Controle preciso, rastreamento, margem de lucro
- Uso: No estabelecimento, mobile para consultas rápidas

**Jornada:**
1. Cadastra produtos com informações detalhadas
2. Monitora margem de lucro por produto
3. Usa notificações para reposição estratégica
4. Analisa histórico para otimizar compras

### 3.4. Persona 4: Proprietário de Restaurante Pequeno
**Características:**
- Idade: 35-50 anos
- Nível técnico: Básico
- Necessidades: Controle de perecíveis, reposição rápida, custos
- Uso: Principalmente no estabelecimento, várias vezes ao dia

**Jornada:**
1. Cadastra ingredientes como produtos
2. Define estoques mínimos críticos
3. Registra entradas diárias de compras
4. Monitora produtos próximos ao vencimento (futuro)

---

## 4. Funcionalidades Principais

### 4.1. Autenticação e Acesso
- **Landing Page**: Página inicial de marketing com informações do produto
- **Cadastro**: Registro de novos usuários (email, senha)
- **Login**: Autenticação de usuários existentes
- **Sessão**: Manutenção de sessão entre navegações

### 4.2. Gestão de Produtos
- **CRUD Completo**: Criar, ler, atualizar e excluir produtos
- **Campos**: Nome, preço de custo, preço de venda, estoque atual, estoque mínimo
- **Listagem**: Tabela com ordenação, filtros e paginação
- **Interface**: Drawer lateral para formulários, Data Table para listagem

### 4.3. Movimentação de Estoque
- **Entrada**: Registrar entrada de produtos (compras, devoluções)
- **Saída**: Registrar saída de produtos (perdas, avarias, ajustes)
- **Histórico**: Visualizar todas as movimentações com filtros
- **Rastreabilidade**: Data, produto, tipo, quantidade, observação

### 4.4. Notificações de Estoque
- **Configuração**: Definir estoque mínimo por produto
- **Alertas**: Notificação automática quando estoque <= mínimo
- **Dashboard**: Visualização de produtos em estoque baixo
- **Tempo Real**: Verificação automática após movimentações

### 4.5. Dashboard
- **Métricas Principais**:
  - Total de produtos cadastrados
  - Quantidade de produtos em estoque baixo
  - Quantidade de produtos sem estoque
- **Visualização**: Cards usando componentes shadcn/ui
- **Navegação**: Links para listagens filtradas

### 4.6. Sistema de Vendas
- **Registro**: Cadastrar vendas com múltiplos produtos
- **Cálculo**: Total automático da venda
- **Atualização Automática**: Estoque decrementado automaticamente
- **Histórico**: Vendas registradas no histórico de movimentações

### 4.7. Gestão de Fornecedores
- **CRUD**: Criar, ler, atualizar e excluir fornecedores
- **Campos**: Nome, telefone, produtos fornecidos (relação)
- **Listagem**: Visualização de fornecedores e produtos associados
- **Relação**: Múltiplos fornecedores podem fornecer o mesmo produto

### 4.8. Exportação de Dados
- **Produtos**: Exportar lista completa para CSV/Excel
- **Movimentações**: Exportar histórico com filtros aplicados
- **Formato**: Compatível com Excel, LibreOffice, Google Sheets
- **Encoding**: UTF-8 para caracteres especiais

---

## 5. Restrições e Limitações

### 5.1. Restrições Técnicas
- **Framework**: Next.js (React)
- **UI Components**: shadcn/ui (via MCP configurado no Cursor)
- **Banco de Dados**: Neon (PostgreSQL)
- **API**: Next.js API Routes
- **Arquitetura**: Clean Architecture, DDD, Repository Pattern
- **SDK**: Neon SDK para interação com banco

### 5.2. Restrições de Interface
- **Layout Base**: Componente sidebar-07 do shadcn/ui
- **Listagens**: Data Table do shadcn/ui
- **Estatísticas**: Card do shadcn/ui
- **Formulários**: Input, Select e Button do shadcn/ui
- **Drawers**: Drawer à direita para edição/criação
- **Responsividade**: Mobile e desktop obrigatórios

### 5.3. Restrições Funcionais
- **Paginação**: Desktop usa paginação tradicional
- **Mobile**: Listagem usa rolagem infinita
- **Filtros Mobile**: Drawer com botão de ícone acima da listagem
- **Acesso**: Apenas usuários autenticados podem acessar o sistema

### 5.4. Restrições de Negócio
- **Escopo Inicial**: Focar em MVP com funcionalidades essenciais
- **Público**: Pequenos comerciantes (não empresas grandes)
- **Complexidade**: Manter sistema simples e intuitivo
- **Custo**: Solução acessível (considerar planos futuros)

---

## 6. Requisitos Não-Funcionais

### 6.1. Performance
- **Tempo de Carregamento**: Página inicial < 3 segundos
- **Operações CRUD**: < 1 segundo
- **Listagens**: Carregamento < 2 segundos para até 1000 itens
- **Exportação**: Geração de arquivo < 10 segundos para 1000 registros

### 6.2. Usabilidade
- **Curva de Aprendizado**: Sistema deve ser intuitivo sem treinamento
- **Acessibilidade**: Contraste adequado, navegação por teclado
- **Responsividade**: Funcional em dispositivos de 320px até 4K
- **Feedback**: Mensagens claras para todas as ações

### 6.3. Segurança
- **Autenticação**: JWT ou similar
- **Autorização**: Usuários só acessam seus próprios dados
- **Validação**: Backend valida todos os inputs
- **Criptografia**: Senhas hasheadas (bcrypt ou similar)
- **HTTPS**: Comunicação criptografada

### 6.4. Confiabilidade
- **Disponibilidade**: 99% uptime
- **Backup**: Dados devem ser backupados regularmente
- **Transações**: Operações críticas devem ser atômicas
- **Tratamento de Erros**: Erros não devem quebrar a aplicação

### 6.5. Escalabilidade
- **Usuários**: Suportar crescimento gradual
- **Dados**: Estrutura preparada para grandes volumes
- **Performance**: Otimizações desde o início

### 6.6. Manutenibilidade
- **Código Limpo**: Seguir Clean Architecture e DDD
- **Documentação**: Código documentado e README atualizado
- **Testes**: Cobertura mínima de 80% nas funcionalidades críticas
- **Padrões**: Seguir convenções do Next.js e React

---

## 7. Arquitetura e Tecnologias

### 7.1. Stack Tecnológico
- **Frontend**: Next.js 14+ (React)
- **UI Library**: shadcn/ui
- **Banco de Dados**: Neon (PostgreSQL)
- **ORM/SDK**: Neon SDK
- **Autenticação**: NextAuth.js ou JWT custom
- **Validação**: Zod ou similar
- **Estilização**: Tailwind CSS (via shadcn/ui)

### 7.2. Arquitetura de Software
- **Clean Architecture**: Separação de camadas (Domain, Application, Infrastructure)
- **DDD (Domain-Driven Design)**: Modelagem baseada no domínio de negócio
- **Repository Pattern**: Abstração de acesso a dados
- **API Routes**: Endpoints do Next.js para backend

### 7.3. Estrutura de Pastas (Sugerida)
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Rotas de autenticação
│   ├── (dashboard)/       # Rotas protegidas
│   └── api/               # API Routes
├── domain/                # Camada de domínio (DDD)
│   ├── entities/
│   ├── value-objects/
│   └── repositories/
├── application/           # Camada de aplicação
│   ├── use-cases/
│   └── services/
├── infrastructure/        # Camada de infraestrutura
│   ├── database/
│   ├── repositories/
│   └── external/
└── shared/                # Código compartilhado
    ├── components/
    ├── utils/
    └── types/
```

### 7.4. Componentes UI Principais
- **Sidebar-07**: Menu lateral de navegação
- **Data Table**: Listagem de produtos, movimentações, fornecedores
- **Card**: Estatísticas no dashboard
- **Drawer**: Formulários de criação/edição
- **Input, Select, Button**: Formulários
- **Dialog/Modal**: Confirmações e alertas

---

## 8. Modelo de Dados

### 8.1. Entidades Principais

#### Usuário (User)
- `id`: UUID
- `email`: String (único)
- `password_hash`: String
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### Produto (Product)
- `id`: UUID
- `user_id`: UUID (FK)
- `name`: String
- `cost_price`: Decimal
- `sell_price`: Decimal
- `current_stock`: Integer
- `min_stock`: Integer (nullable)
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### Movimentação (Movement)
- `id`: UUID
- `user_id`: UUID (FK)
- `product_id`: UUID (FK)
- `type`: Enum (ENTRY, EXIT)
- `quantity`: Integer
- `observation`: String (nullable)
- `created_at`: Timestamp

#### Venda (Sale)
- `id`: UUID
- `user_id`: UUID (FK)
- `total`: Decimal
- `created_at`: Timestamp

#### Item de Venda (SaleItem)
- `id`: UUID
- `sale_id`: UUID (FK)
- `product_id`: UUID (FK)
- `quantity`: Integer
- `unit_price`: Decimal

#### Fornecedor (Supplier)
- `id`: UUID
- `user_id`: UUID (FK)
- `name`: String
- `phone`: String
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### Produto-Fornecedor (ProductSupplier)
- `id`: UUID
- `product_id`: UUID (FK)
- `supplier_id`: UUID (FK)

---

## 9. Jornada do Usuário

### 9.1. Primeiro Acesso
1. Usuário acessa landing page
2. Lê sobre o produto e benefícios
3. Clica em "Cadastrar" ou "Login"
4. Preenche formulário de cadastro
5. Recebe confirmação e é redirecionado para login
6. Faz login
7. É redirecionado para dashboard
8. Vê tutorial ou mensagem de boas-vindas (opcional)

### 9.2. Uso Diário
1. Usuário faz login
2. Acessa dashboard e vê métricas
3. Verifica produtos em estoque baixo
4. Cadastra novos produtos (se necessário)
5. Registra entrada de estoque após compras
6. Registra vendas durante o dia
7. Consulta histórico quando necessário
8. Faz logout

### 9.3. Gestão de Fornecedores
1. Usuário acessa menu "Fornecedores"
2. Visualiza lista de fornecedores
3. Cadastra novo fornecedor
4. Associa produtos ao fornecedor
5. Edita informações quando necessário

### 9.4. Exportação de Dados
1. Usuário acessa listagem (produtos ou movimentações)
2. Aplica filtros desejados (opcional)
3. Clica em "Exportar"
4. Arquivo é baixado automaticamente
5. Abre arquivo em Excel/Sheets para análise

---

## 10. Regras de Negócio

### 10.1. Produtos
- Produto deve ter nome único por usuário (opcional, pode permitir duplicatas)
- Preço de venda pode ser menor que preço de custo (permitir com aviso)
- Estoque não pode ser negativo
- Estoque mínimo é opcional (se não definido, não gera notificação)

### 10.2. Movimentações
- Entrada sempre incrementa estoque
- Saída sempre decrementa estoque
- Saída não pode deixar estoque negativo
- Movimentações são imutáveis (não podem ser editadas, apenas criadas)

### 10.3. Vendas
- Venda deve ter pelo menos um produto
- Quantidade vendida não pode exceder estoque disponível
- Estoque é atualizado automaticamente ao finalizar venda
- Venda é uma transação atômica (tudo ou nada)

### 10.4. Notificações
- Notificação é gerada quando: estoque atual <= estoque mínimo
- Notificação desaparece quando: estoque atual > estoque mínimo
- Produtos sem estoque mínimo definido não geram notificação

### 10.5. Fornecedores
- Um produto pode ter múltiplos fornecedores
- Um fornecedor pode fornecer múltiplos produtos
- Exclusão de fornecedor não exclui produtos associados

---

## 11. Casos de Uso Especiais

### 11.1. Produto Deletado com Histórico
- **Cenário**: Usuário deleta produto que tem movimentações
- **Solução**: Manter histórico com referência ao produto (soft delete ou manter ID)

### 11.2. Estoque Negativo
- **Cenário**: Tentativa de saída que deixaria estoque negativo
- **Solução**: Bloquear operação e exibir erro claro

### 11.3. Múltiplas Vendas Simultâneas
- **Cenário**: Dois usuários tentam vender o mesmo produto ao mesmo tempo
- **Solução**: Transações atômicas e locks no banco de dados

### 11.4. Exportação de Grandes Volumes
- **Cenário**: Usuário tenta exportar 10.000+ registros
- **Solução**: Processamento assíncrono ou streaming

---

## 12. Integrações Futuras (Fora do Escopo Inicial)

### 12.1. Possíveis Expansões
- Integração com sistemas de pagamento
- App mobile nativo
- Relatórios avançados e gráficos
- Controle de validade de produtos
- Múltiplos usuários por conta (equipe)
- API pública para integrações
- Notificações por email/SMS
- Backup automático na nuvem

---

## 13. Definições e Glossário

- **MVP**: Minimum Viable Product - versão mínima funcional
- **CRUD**: Create, Read, Update, Delete - operações básicas
- **DDD**: Domain-Driven Design - metodologia de design
- **Repository Pattern**: Padrão de acesso a dados
- **Clean Architecture**: Arquitetura em camadas
- **Estoque Mínimo**: Quantidade abaixo da qual o sistema alerta
- **Movimentação**: Entrada ou saída de produtos do estoque
- **Soft Delete**: Exclusão lógica (marca como deletado, não remove)

---

## 14. Aprovações e Validações

### 14.1. Stakeholders
- Product Owner: Aprovação de requisitos e prioridades
- Time Técnico: Validação de viabilidade técnica
- Usuários Beta: Feedback após MVP

### 14.2. Critérios de Aprovação
- Requisitos atendem necessidades do público-alvo
- Solução é tecnicamente viável
- Escopo é realizável no prazo definido
- Custo de desenvolvimento é aceitável

---

## 15. Histórico de Versões

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0 | [Data atual] | Product Owner | Documentação inicial de requisitos |

---

## 16. Contatos e Referências

### 16.1. Equipe do Projeto
- **Product Owner**: [Nome]
- **Arquiteto**: [Nome]
- **Frontend Dev**: [Nome]
- **Backend Dev**: [Nome]
- **DevOps**: [Nome]
- **Tester**: [Nome]
- **UX**: [Nome]

### 16.2. Referências Técnicas
- Documentação Next.js: https://nextjs.org/docs
- Documentação shadcn/ui: https://ui.shadcn.com
- Documentação Neon: https://neon.tech/docs
- Clean Architecture: Referências de Robert C. Martin

---

**Documento criado em**: [Data]  
**Última atualização**: [Data]  
**Status**: Em aprovação

