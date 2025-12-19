# Protótipos Interativos - Sistema de Controle de Estoque

## Visão Geral

Este documento descreve os protótipos interativos do sistema, incluindo interações funcionais, estados da interface, transições e feedback visual. Os protótipos são baseados nos wireframes e devem ser implementados usando componentes do shadcn/ui.

---

## 1. Ferramentas e Tecnologias

**Ferramenta de Prototipagem Recomendada:**
- Figma (para protótipos de alta fidelidade)
- Framer (para protótipos mais interativos)
- Next.js + shadcn/ui (protótipo funcional)

**Componentes Base (shadcn/ui):**
- Sidebar (sidebar-07)
- Data Table
- Card
- Drawer
- Dialog
- Input, Select, Button
- Toast (sonner ou toast)

---

## 2. Protótipo 1: Fluxo de Autenticação

### 2.1. Estados e Interações

**Tela: Login**

**Estados:**
1. **Inicial**
   - Campos vazios
   - Botão "Entrar" desabilitado
   - Links funcionais

2. **Preenchendo**
   - Validação em tempo real
   - Botão habilita quando campos válidos
   - Ícone de olho para mostrar/ocultar senha

3. **Enviando**
   - Botão com spinner e texto "Entrando..."
   - Botão desabilitado
   - Campos desabilitados

4. **Sucesso**
   - Redirecionamento automático para dashboard
   - Toast: "Login realizado com sucesso!"

5. **Erro**
   - Mensagem de erro abaixo dos campos
   - Campos mantêm valores
   - Botão reabilitado
   - Toast: "Email ou senha incorretos"

**Interações:**
- **Foco em campo**: Borda azul, label sobe
- **Validação**: Ícone de check (✓) ou erro (✗) ao lado do campo
- **Enter**: Submete formulário se válido
- **Tab**: Navega entre campos

**Animações:**
- Transição suave entre estados (200ms)
- Fade-in no toast (300ms)
- Slide-up no redirecionamento

---

### 2.2. Protótipo: Cadastro

**Fluxo:**
```
Landing Page → [Cadastrar] → Formulário → Validação → Sucesso → Login
```

**Interações Especiais:**
- Validação de senha em tempo real:
  - Mínimo 8 caracteres
  - Confirmação deve coincidir
  - Indicador de força da senha (opcional)

**Feedback Visual:**
- Progress bar mostrando campos preenchidos
- Mensagens de erro específicas por campo
- Highlight em campo com erro

---

## 3. Protótipo 2: Dashboard

### 3.1. Estados e Interações

**Carregamento Inicial:**
```
Spinner global → Skeleton dos cards → Dados carregados → Animações de entrada
```

**Cards de Métricas:**
- **Estado Loading**: Skeleton com shimmer effect
- **Estado Carregado**: Fade-in com números animados (contador)
- **Estado Erro**: Ícone de erro, mensagem "Erro ao carregar"

**Interações:**
- **Hover em Card**: Elevação sutil, cursor pointer
- **Click em Card**: Navegação para lista filtrada
- **Hover em Produto (Lista)**: Destaque visual

**Animações:**
- Cards aparecem com stagger (delay progressivo)
- Números contam de 0 até valor final
- Transições suaves entre páginas (slide)

---

### 3.2. Lista de Produtos em Estoque Baixo

**Comportamento:**
- Atualização automática quando estoque muda
- Badge vermelho com contador
- Lista expansível/colapsável

**Interações:**
- Click em item: Abre drawer de edição rápida
- Hover: Background destacado
- Swipe (mobile): Ações rápidas (editar/excluir)

---

## 4. Protótipo 3: Listagem de Produtos

### 4.1. Desktop - Data Table

**Interações:**

1. **Ordenação**
   - Click no header da coluna: Ordena ASC
   - Click novamente: Ordena DESC
   - Ícone de seta indica direção
   - Animação suave na reordenação das linhas

2. **Busca**
   - Input com ícone de lupa
   - Busca em tempo real (debounce 300ms)
   - Highlight nos termos encontrados
   - Estado "Nenhum resultado encontrado"

3. **Ações por Linha**
   - Hover: Botões de ação aparecem
   - Click em Editar: Abre drawer à direita
   - Click em Excluir: Abre dialog de confirmação

4. **Paginação**
   - Navegação por páginas
   - Botões desabilitados nas extremidades
   - Indicador de página atual
   - Transição suave ao mudar página

**Estados:**
- Loading: Skeleton rows
- Empty: Mensagem amigável + CTA
- Error: Mensagem + botão retry
- Success: Dados exibidos

---

### 4.2. Mobile - Cards com Scroll Infinito

**Interações:**

1. **Scroll Infinito**
   - Scroll até 80% da página: Carrega próxima página
   - Indicador de loading no final
   - Skeleton cards durante carregamento
   - Fade-in nos novos itens

2. **Busca**
   - Botão de busca abre modal
   - Busca com teclado virtual otimizado
   - Resultados filtrados em tempo real

3. **Ações**
   - Long press: Menu contextual
   - Swipe left: Ações rápidas
   - Tap: Abre detalhes

**Animações:**
- Cards aparecem com fade-in + slide-up
- Pull-to-refresh no topo
- Scroll suave e performático

---

## 5. Protótipo 4: Formulário de Produto (Drawer)

### 5.1. Interações

**Abertura:**
- Drawer desliza da direita (300ms)
- Overlay com fade-in
- Foco automático no primeiro campo

**Preenchimento:**
- Validação em tempo real
- Mensagens de erro abaixo dos campos
- Botão salvar desabilitado até validar

**Campos Especiais:**

1. **Preço (Custo/Venda)**
   - Máscara de moeda (R$)
   - Validação de valor positivo
   - Comparação custo vs venda (aviso se venda < custo)

2. **Estoque Mínimo**
   - Campo numérico
   - Opcional (placeholder: "Opcional")
   - Validação: >= 0

**Botões:**
- **Cancelar**: Fecha drawer sem salvar
- **Salvar**: Valida → Envia → Loading → Sucesso → Fecha drawer

**Estados:**
- **Editando**: Campos preenchidos com dados atuais
- **Criando**: Campos vazios
- **Salvando**: Spinner no botão, campos desabilitados
- **Erro**: Mensagem de erro, campos reabilitados

**Animações:**
- Drawer: Slide da direita
- Overlay: Fade-in/fade-out
- Validação: Shake no campo com erro

---

## 6. Protótipo 5: Movimentação de Estoque

### 6.1. Formulário de Entrada/Saída

**Fluxo:**
```
Selecionar Produto → Digitar Quantidade → (Opcional) Observação → Registrar
```

**Interações:**

1. **Seleção de Produto**
   - Autocomplete/searchable select
   - Lista de produtos com estoque atual visível
   - Filtro por nome em tempo real

2. **Quantidade**
   - Input numérico
   - Validação: > 0
   - Para Saída: Validação <= estoque atual
   - Preview: "Estoque após: X unidades"

3. **Observação**
   - Textarea opcional
   - Contador de caracteres (500 max)
   - Placeholder: "Ex: Compra do fornecedor X"

**Feedback Visual:**
- Ícone de sucesso ao registrar
- Toast: "Entrada registrada com sucesso!"
- Atualização automática na listagem

---

## 7. Protótipo 6: Sistema de Vendas

### 7.1. Fluxo de Venda

**Interações:**

1. **Adicionar Produto**
   - Busca rápida
   - Seleção mostra estoque disponível
   - Quantidade com +/- buttons
   - Adiciona ao carrinho

2. **Carrinho**
   - Lista de produtos
   - Editar quantidade
   - Remover produto
   - Total atualizado em tempo real
   - Validação de estoque antes de finalizar

3. **Finalizar Venda**
   - Dialog de confirmação
   - Resumo da venda
   - Botão "Confirmar" com loading
   - Sucesso: Toast + redirecionamento

**Estados Especiais:**
- **Estoque Insuficiente**: Badge vermelho, botão desabilitado
- **Produto Sem Estoque**: Não aparece na busca ou aparece desabilitado

**Animações:**
- Produto adicionado: Slide do produto para o carrinho
- Quantidade alterada: Número anima
- Total: Contador animado

---

## 8. Protótipo 7: Filtros Mobile (Drawer)

### 8.1. Interações

**Abertura:**
- Botão de filtros abre drawer de baixo para cima
- Overlay escuro

**Filtros:**
- Checkboxes para tipos
- Selects para categorias
- Date pickers para datas
- Botão "Limpar Filtros"

**Aplicação:**
- Botão "Aplicar" no rodapé fixo
- Drawer fecha após aplicar
- Lista atualiza com animação

**Estados:**
- **Filtros Ativos**: Badge no botão mostrando quantidade
- **Sem Resultados**: Mensagem amigável

---

## 9. Transições e Animações

### 9.1. Princípios

- **Duração**: 200-300ms para interações, 300-500ms para transições de página
- **Easing**: ease-in-out para a maioria, ease-out para entrada, ease-in para saída
- **Performance**: Usar transform e opacity (GPU accelerated)

### 9.2. Transições de Página

**Desktop:**
- Fade + slide horizontal
- Sidebar mantém estado

**Mobile:**
- Slide horizontal (iOS style)
- Header mantém estado

### 9.3. Micro-interações

- **Botões**: Scale 0.95 ao pressionar, bounce-back ao soltar
- **Cards**: Elevation aumenta no hover (desktop), scale sutil (mobile)
- **Inputs**: Label anima ao focar
- **Loading**: Skeleton com shimmer effect

---

## 10. Feedback Visual

### 10.1. Toast Notifications

**Tipos:**
- **Success**: Verde, ícone ✓
- **Error**: Vermelho, ícone ✗
- **Warning**: Amarelo, ícone ⚠
- **Info**: Azul, ícone ℹ

**Comportamento:**
- Aparece no canto superior direito (desktop) ou inferior (mobile)
- Auto-dismiss após 3-5 segundos
- Pode ser fechado manualmente
- Stack de múltiplos toasts

### 10.2. Loading States

**Tipos:**
1. **Spinner**: Operações rápidas (< 1s)
2. **Skeleton**: Carregamento de conteúdo
3. **Progress Bar**: Operações longas (> 3s)
4. **Button Loading**: Spinner no botão durante ação

### 10.3. Empty States

**Componentes:**
- Ilustração simples
- Título descritivo
- Mensagem amigável
- CTA relevante

**Exemplos:**
- "Nenhum produto cadastrado" + Botão "Cadastrar Primeiro Produto"
- "Nenhum resultado encontrado" + Botão "Limpar Filtros"

---

## 11. Acessibilidade

### 11.1. Navegação por Teclado

- **Tab**: Navega entre elementos interativos
- **Enter/Space**: Ativa botões e links
- **Escape**: Fecha modais e drawers
- **Arrow Keys**: Navega em listas e selects

### 11.2. Screen Readers

- Labels descritivos em todos os campos
- ARIA labels em ícones e botões
- Estados anunciados (loading, error, success)
- Landmarks apropriados

### 11.3. Contraste e Visibilidade

- Contraste mínimo 4.5:1 para texto
- Estados de foco visíveis
- Indicadores visuais além de cor

---

## 12. Protótipo Funcional (Next.js)

### 12.1. Estrutura Recomendada

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   └── (dashboard)/
│       ├── dashboard/
│       ├── products/
│       ├── movements/
│       └── sales/
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── layout/
│   ├── products/
│   └── shared/
└── hooks/
    ├── useProducts.ts
    ├── useMovements.ts
    └── useToast.ts
```

### 12.2. Componentes Principais

**Layout:**
- `Sidebar` (sidebar-07 do shadcn)
- `Header`
- `MobileDrawer`

**Produtos:**
- `ProductTable` (desktop)
- `ProductCard` (mobile)
- `ProductForm` (drawer)
- `ProductFilters`

**Compartilhado:**
- `LoadingSpinner`
- `EmptyState`
- `ErrorBoundary`

---

## 13. Testes de Interatividade

### 13.1. Checklist de Interações

- [ ] Todos os botões respondem ao hover/click
- [ ] Formulários validam em tempo real
- [ ] Loading states aparecem durante ações
- [ ] Mensagens de erro são claras
- [ ] Toast notifications funcionam
- [ ] Navegação por teclado funciona
- [ ] Animações são suaves (60fps)
- [ ] Mobile: Touch targets >= 44x44px
- [ ] Drawers fecham ao clicar fora
- [ ] Scroll infinito funciona corretamente

---

## 14. Próximos Passos

1. **Implementar Protótipo no Figma**
   - Alta fidelidade visual
   - Todas as interações mapeadas
   - Estados definidos

2. **Criar Protótipo Funcional**
   - Next.js + shadcn/ui
   - Dados mockados
   - Interações funcionais

3. **Testes de Usabilidade**
   - Testar com usuários reais
   - Coletar feedback
   - Iterar baseado em resultados

4. **Refinamentos**
   - Ajustar animações
   - Otimizar performance
   - Melhorar acessibilidade

---

**Documento criado por**: UX Designer  
**Data**: [Data atual]  
**Versão**: 1.0  
**Status**: Pronto para implementação de protótipos


