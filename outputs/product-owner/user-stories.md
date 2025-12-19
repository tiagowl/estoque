# User Stories - Sistema de Controle de Estoque

## Personas Identificadas

### Persona 1: Dono de Mercadinho
- **Nome**: João Silva
- **Idade**: 45 anos
- **Perfil**: Gerencia um mercadinho de bairro, trabalha sozinho ou com 1-2 funcionários
- **Necessidades**: Controle rápido de estoque, saber quando repor produtos, evitar perdas por validade

### Persona 2: Proprietário de Loja de Roupas
- **Nome**: Maria Santos
- **Idade**: 38 anos
- **Perfil**: Gerencia loja física, precisa controlar tamanhos e modelos
- **Necessidades**: Controle por categorias, histórico de vendas, previsão de reposição

### Persona 3: Dono de Loja de Celulares
- **Nome**: Carlos Oliveira
- **Idade**: 32 anos
- **Perfil**: Gerencia loja de eletrônicos, produtos de alto valor
- **Necessidades**: Controle preciso de estoque, rastreamento de produtos, margem de lucro

### Persona 4: Proprietário de Restaurante Pequeno
- **Nome**: Ana Costa
- **Idade**: 40 anos
- **Perfil**: Gerencia restaurante familiar, controle de ingredientes
- **Necessidades**: Controle de perecíveis, reposição rápida, custos de produção

---

## User Stories por Funcionalidade

### EPIC 1: Autenticação e Landing Page

#### US-001: Landing Page de Marketing
**Como** visitante do site  
**Eu quero** visualizar uma página inicial atrativa que apresente o produto  
**Para que** eu possa entender os benefícios e decidir me cadastrar

**Prioridade**: Alta  
**Estimativa**: 5 pontos

---

#### US-002: Cadastro de Usuário
**Como** visitante interessado  
**Eu quero** me cadastrar no sistema  
**Para que** eu possa acessar a plataforma e começar a usar

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

#### US-003: Login no Sistema
**Como** usuário cadastrado  
**Eu quero** fazer login no sistema  
**Para que** eu possa acessar minha conta e gerenciar meu estoque

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

### EPIC 2: Gestão de Produtos

#### US-004: Cadastrar Produto
**Como** comerciante  
**Eu quero** cadastrar produtos com nome, preço de custo e preço de venda  
**Para que** eu possa ter controle dos meus itens e calcular margem de lucro

**Prioridade**: Alta  
**Estimativa**: 5 pontos

---

#### US-005: Listar Produtos
**Como** comerciante  
**Eu quero** visualizar todos os meus produtos em uma tabela  
**Para que** eu possa ter uma visão geral do meu estoque

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

#### US-006: Editar Produto
**Como** comerciante  
**Eu quero** editar informações de produtos cadastrados  
**Para que** eu possa atualizar preços e informações quando necessário

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

#### US-007: Excluir Produto
**Como** comerciante  
**Eu quero** excluir produtos que não vendo mais  
**Para que** eu possa manter meu cadastro organizado

**Prioridade**: Média  
**Estimativa**: 2 pontos

---

#### US-008: Filtrar Produtos
**Como** comerciante  
**Eu quero** filtrar produtos na listagem  
**Para que** eu possa encontrar rapidamente produtos específicos

**Prioridade**: Média  
**Estimativa**: 3 pontos

---

### EPIC 3: Movimentação de Estoque

#### US-009: Registrar Entrada de Estoque
**Como** comerciante  
**Eu quero** registrar entrada de produtos no estoque  
**Para que** eu possa atualizar a quantidade disponível após compras

**Prioridade**: Alta  
**Estimativa**: 5 pontos

---

#### US-010: Registrar Saída de Estoque
**Como** comerciante  
**Eu quero** registrar saída de produtos do estoque  
**Para que** eu possa controlar quando produtos saem sem ser por venda (perdas, avarias, etc)

**Prioridade**: Alta  
**Estimativa**: 5 pontos

---

#### US-011: Visualizar Histórico de Movimentações
**Como** comerciante  
**Eu quero** visualizar o histórico de todas as movimentações com data, produto, tipo, quantidade e observação  
**Para que** eu possa rastrear todas as alterações no estoque

**Prioridade**: Alta  
**Estimativa**: 5 pontos

---

### EPIC 4: Notificações de Estoque

#### US-012: Definir Estoque Mínimo
**Como** comerciante  
**Eu quero** definir um estoque mínimo para cada produto  
**Para que** o sistema possa me alertar quando precisar repor

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

#### US-013: Receber Notificação de Estoque Baixo
**Como** comerciante  
**Eu quero** ser notificado quando um produto atingir o estoque mínimo  
**Para que** eu possa repor antes de faltar

**Prioridade**: Alta  
**Estimativa**: 5 pontos

---

### EPIC 5: Dashboard

#### US-014: Visualizar Total de Produtos
**Como** comerciante  
**Eu quero** ver o total de produtos cadastrados no dashboard  
**Para que** eu tenha uma visão geral do meu negócio

**Prioridade**: Alta  
**Estimativa**: 2 pontos

---

#### US-015: Visualizar Produtos em Estoque Baixo
**Como** comerciante  
**Eu quero** ver quantos produtos estão com estoque baixo no dashboard  
**Para que** eu possa priorizar reposições urgentes

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

#### US-016: Visualizar Produtos Sem Estoque
**Como** comerciante  
**Eu quero** ver quantos produtos estão sem estoque no dashboard  
**Para que** eu saiba quais produtos precisam ser repostos imediatamente

**Prioridade**: Alta  
**Estimativa**: 3 pontos

---

### EPIC 6: Gestão de Vendas

#### US-017: Registrar Venda
**Como** comerciante  
**Eu quero** registrar uma venda associando produtos vendidos  
**Para que** eu possa controlar minhas vendas e atualizar o estoque automaticamente

**Prioridade**: Alta  
**Estimativa**: 8 pontos

---

#### US-018: Atualização Automática de Estoque na Venda
**Como** comerciante  
**Eu quero** que o estoque seja atualizado automaticamente quando registro uma venda  
**Para que** eu não precise fazer duas operações separadas

**Prioridade**: Alta  
**Estimativa**: 3 pontos (incluído em US-017)

---

### EPIC 7: Gestão de Fornecedores

#### US-019: Cadastrar Fornecedor
**Como** comerciante  
**Eu quero** cadastrar fornecedores com nome, telefone e produtos fornecidos  
**Para que** eu possa ter um cadastro organizado e facilitar compras

**Prioridade**: Média  
**Estimativa**: 5 pontos

---

#### US-020: Listar Fornecedores
**Como** comerciante  
**Eu quero** visualizar todos os meus fornecedores  
**Para que** eu possa encontrar contatos rapidamente

**Prioridade**: Média  
**Estimativa**: 3 pontos

---

#### US-021: Editar Fornecedor
**Como** comerciante  
**Eu quero** editar informações de fornecedores  
**Para que** eu possa atualizar contatos e produtos fornecidos

**Prioridade**: Média  
**Estimativa**: 3 pontos

---

#### US-022: Excluir Fornecedor
**Como** comerciante  
**Eu quero** excluir fornecedores que não trabalho mais  
**Para que** eu mantenha meu cadastro atualizado

**Prioridade**: Baixa  
**Estimativa**: 2 pontos

---

### EPIC 8: Exportação de Dados

#### US-023: Exportar Produtos para CSV/Excel
**Como** comerciante  
**Eu quero** exportar dados de produtos para CSV/Excel  
**Para que** eu possa fazer análises externas ou backups

**Prioridade**: Média  
**Estimativa**: 5 pontos

---

#### US-024: Exportar Movimentações para CSV/Excel
**Como** comerciante  
**Eu quero** exportar histórico de movimentações para CSV/Excel  
**Para que** eu possa fazer análises de histórico e relatórios

**Prioridade**: Média  
**Estimativa**: 5 pontos

---

### EPIC 9: Interface e Experiência do Usuário

#### US-025: Layout Responsivo Mobile
**Como** comerciante  
**Eu quero** usar o sistema no meu celular  
**Para que** eu possa gerenciar o estoque mesmo quando estou fora da loja

**Prioridade**: Alta  
**Estimativa**: 8 pontos

---

#### US-026: Paginação na Listagem (Desktop)
**Como** comerciante  
**Eu quero** navegar por páginas na listagem de itens no desktop  
**Para que** eu possa visualizar grandes quantidades de dados de forma organizada

**Prioridade**: Média  
**Estimativa**: 3 pontos

---

#### US-027: Rolagem Infinita (Mobile)
**Como** comerciante  
**Eu quero** rolar infinitamente a listagem no mobile  
**Para que** eu possa ver todos os itens sem precisar clicar em páginas

**Prioridade**: Média  
**Estimativa**: 3 pontos

---

#### US-028: Filtros com Drawer (Mobile)
**Como** comerciante  
**Eu quero** acessar filtros através de um drawer no mobile  
**Para que** eu possa filtrar itens de forma intuitiva no celular

**Prioridade**: Média  
**Estimativa**: 5 pontos

---

## Resumo de User Stories

- **Total de User Stories**: 28
- **Alta Prioridade**: 18
- **Média Prioridade**: 8
- **Baixa Prioridade**: 2
- **Total de Pontos Estimados**: 120 pontos


