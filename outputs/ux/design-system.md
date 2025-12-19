# Design System - Sistema de Controle de Estoque

## Visão Geral

Este design system define os padrões visuais, componentes e diretrizes de design para o sistema de controle de estoque. Baseado no shadcn/ui e Tailwind CSS, garante consistência visual e experiência de usuário coesa em toda a aplicação.

**Base**: shadcn/ui + Tailwind CSS  
**Versão**: 1.0  
**Última Atualização**: [Data atual]

---

## 1. Princípios de Design

### 1.1. Simplicidade
- Interface limpa e despoluída
- Hierarquia visual clara
- Menos é mais

### 1.2. Clareza
- Informações diretas e objetivas
- Feedback imediato
- Mensagens claras

### 1.3. Eficiência
- Reduzir cliques necessários
- Fluxos otimizados
- Ações rápidas

### 1.4. Acessibilidade
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Screen reader friendly

### 1.5. Consistência
- Padrões uniformes
- Componentes reutilizáveis
- Linguagem consistente

---

## 2. Cores

### 2.1. Paleta Principal

**Baseado no tema padrão do shadcn/ui (slate/zinc)**

```css
/* Primárias */
--primary: 221.2 83.2% 53.3%;        /* Azul (#3b82f6) */
--primary-foreground: 210 40% 98%;

/* Secundárias */
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;

/* Backgrounds */
--background: 0 0% 100%;              /* Branco */
--foreground: 222.2 84% 4.9%;

/* Bordas e Inputs */
--border: 214.3 31.8% 91.4%;
--input: 214.3 31.8% 91.4%;
--ring: 221.2 83.2% 53.3%;

/* Estados */
--destructive: 0 84.2% 60.2%;        /* Vermelho para erros */
--destructive-foreground: 210 40% 98%;

--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;

--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;

--popover: 0 0% 100%;
--popover-foreground: 222.2 84% 4.9%;

--card: 0 0% 100%;
--card-foreground: 222.2 84% 4.9%;
```

### 2.2. Cores Semânticas

**Sucesso (Verde):**
- `--success`: 142.1 76.2% 36.3% (#22c55e)
- Usado para: Confirmações, estados positivos, notificações de sucesso

**Aviso (Amarelo):**
- `--warning`: 47.9 95.8% 53.1% (#eab308)
- Usado para: Alertas, avisos, estoque baixo

**Erro (Vermelho):**
- `--destructive`: 0 84.2% 60.2% (#ef4444)
- Usado para: Erros, ações destrutivas, estoque zero crítico

**Informação (Azul):**
- `--info`: 221.2 83.2% 53.3% (#3b82f6)
- Usado para: Informações, tooltips, help text

### 2.3. Status de Estoque (Cores Específicas)

**Estoque Normal:**
- Verde: `#22c55e`
- Estoque acima do mínimo

**Estoque Baixo:**
- Amarelo: `#eab308`
- Estoque <= mínimo definido

**Sem Estoque:**
- Vermelho: `#ef4444`
- Estoque = 0

**Sem Estoque Mínimo Definido:**
- Cinza: `#6b7280`
- Produto sem alerta configurado

---

## 3. Tipografia

### 3.1. Família de Fontes

**Fonte Principal**: Inter (sans-serif)
- Font-weight: 400, 500, 600, 700
- Fallback: system-ui, -apple-system, sans-serif

**Configuração Tailwind:**
```js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

### 3.2. Escala Tipográfica

**Desktop:**

| Elemento | Tamanho | Line Height | Weight | Uso |
|----------|---------|-------------|--------|-----|
| H1 | 2.25rem (36px) | 2.5rem | 700 | Títulos principais |
| H2 | 1.875rem (30px) | 2.25rem | 600 | Seções |
| H3 | 1.5rem (24px) | 2rem | 600 | Subsseções |
| H4 | 1.25rem (20px) | 1.75rem | 600 | Cards títulos |
| Body Large | 1rem (16px) | 1.5rem | 400 | Texto principal |
| Body | 0.875rem (14px) | 1.25rem | 400 | Texto secundário |
| Small | 0.75rem (12px) | 1rem | 400 | Labels, captions |
| Tiny | 0.625rem (10px) | 0.875rem | 400 | Badges pequenos |

**Mobile:**
- Reduzir 10-15% dos tamanhos desktop
- Manter line heights proporcionais

### 3.3. Estilos de Texto

**Bold (600):** Títulos, destaques, números importantes  
**Medium (500):** Labels, botões, navegação  
**Regular (400):** Corpo de texto, descrições  
**Light (300):** Texto secundário, placeholders

---

## 4. Espaçamento

### 4.1. Sistema de Espaçamento (Tailwind)

Baseado em múltiplos de 4px:

```
0.5 = 2px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
```

### 4.2. Padrões de Espaçamento

**Padding Interno:**
- Cards: `p-4` (16px) ou `p-6` (24px)
- Botões: `px-4 py-2` (16px horizontal, 8px vertical)
- Inputs: `px-3 py-2` (12px horizontal, 8px vertical)
- Drawers: `p-6` (24px)

**Margens entre Elementos:**
- Seções: `mb-8` (32px)
- Cards: `mb-4` (16px)
- Itens de lista: `mb-2` (8px)
- Labels e inputs: `mb-2` (8px)

**Gaps (Grid/Flex):**
- Grid de cards: `gap-4` (16px)
- Lista: `gap-2` (8px)
- Formulário: `gap-4` (16px)

---

## 5. Componentes Base (shadcn/ui)

### 5.1. Botões

**Variantes:**
- `default`: Primário, ações principais
- `secondary`: Secundário, ações menos importantes
- `destructive`: Ações destrutivas (excluir)
- `outline`: Botões com borda
- `ghost`: Botões sem background
- `link`: Links estilizados como botão

**Tamanhos:**
- `sm`: `h-9 px-3 text-sm`
- `default`: `h-10 px-4 py-2`
- `lg`: `h-11 px-8`
- `icon`: `h-10 w-10`

**Estados:**
- Normal: Background sólido, hover com opacidade
- Loading: Spinner no lugar do texto
- Disabled: Opacidade 50%, cursor not-allowed

### 5.2. Inputs

**Estilos:**
- Borda sutil: `border border-input`
- Focus: Ring azul, border azul
- Error: Border vermelho, mensagem abaixo
- Disabled: Background cinza, cursor not-allowed

**Tipos:**
- Text: Input padrão
- Number: Spinner (opcional)
- Email: Validação automática
- Password: Ícone olho para mostrar/ocultar
- Search: Ícone de lupa

### 5.3. Cards

**Estrutura:**
```
┌─────────────────┐
│  Header (opcional)│
├─────────────────┤
│                 │
│  Content        │
│                 │
├─────────────────┤
│  Footer (opcional)│
└─────────────────┘
```

**Estilos:**
- Background branco
- Borda sutil
- Shadow: `shadow-sm`
- Rounded: `rounded-lg`
- Padding: `p-4` ou `p-6`

### 5.4. Data Table

**Componentes:**
- Header: Ordenação clicável, ícones de seta
- Rows: Hover destacado, ações ao hover
- Pagination: Navegação no rodapé
- Empty state: Mensagem centralizada

**Estilos:**
- Borda entre linhas: `border-b`
- Hover: Background `hover:bg-muted/50`
- Selected: Background `bg-muted`

### 5.5. Drawer

**Desktop (Right Drawer):**
- Largura: 400px ou `w-[400px]`
- Posição: Direita
- Overlay: Background escuro com opacidade
- Animação: Slide da direita (300ms)

**Mobile:**
- Full screen ou 90% da altura
- Posição: Inferior (filtros) ou lateral (formulários)

### 5.6. Dialog/Modal

**Características:**
- Centralizado na tela
- Overlay escuro
- Tamanho: `max-w-md` ou `max-w-lg`
- Fechar: X no canto superior ou Escape

### 5.7. Toast Notifications

**Posições:**
- Desktop: Top-right
- Mobile: Bottom

**Tipos:**
- Success: Verde, ícone ✓
- Error: Vermelho, ícone ✗
- Warning: Amarelo, ícone ⚠
- Info: Azul, ícone ℹ

**Duração:**
- Auto-dismiss: 3-5 segundos
- Manual: Botão fechar sempre visível

---

## 6. Layout

### 6.1. Grid System

**Desktop:**
- Container: `max-w-7xl mx-auto`
- Grid de cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

**Mobile:**
- Container: `px-4` ou `px-6`
- Coluna única: `grid-cols-1`

### 6.2. Sidebar

**Desktop:**
- Largura: 256px (`w-64`)
- Collapsed: 64px (`w-16`)
- Background: Branco ou `bg-card`
- Borda direita: `border-r`

**Mobile:**
- Drawer que abre da esquerda
- Overlay quando aberto
- Full height

### 6.3. Header

**Altura:**
- Desktop: 64px (`h-16`)
- Mobile: 56px (`h-14`)

**Conteúdo:**
- Logo à esquerda
- Navegação central (desktop)
- Menu usuário à direita
- Menu hamburguer (mobile)

---

## 7. Estados Visuais

### 7.1. Loading States

**Spinner:**
- Cores: Primária
- Tamanhos: sm, md, lg
- Animação: Rotate infinito

**Skeleton:**
- Background: `bg-muted`
- Animação: Shimmer/pulse
- Mesmas dimensões do conteúdo real

**Progress Bar:**
- Para operações longas
- Cor: Primária
- Altura: 4px

### 7.2. Empty States

**Estrutura:**
- Ilustração simples ou ícone
- Título (H3)
- Descrição (Body)
- CTA (Botão)

**Estilos:**
- Centralizado
- Padding generoso
- Cor neutra (muted)

### 7.3. Error States

**Inputs:**
- Border vermelho
- Ícone de erro
- Mensagem abaixo do campo

**Páginas:**
- Ilustração/ícone
- Título de erro
- Mensagem descritiva
- Botão "Tentar novamente"

---

## 8. Ícones

### 8.1. Biblioteca

**Recomendado:** Lucide React (já usado pelo shadcn/ui)

**Ícones Principais:**
- Dashboard: `LayoutDashboard`
- Produtos: `Package`
- Movimentações: `ArrowUpDown`
- Vendas: `ShoppingCart`
- Fornecedores: `Truck`
- Histórico: `History`
- Busca: `Search`
- Filtros: `Filter`
- Editar: `Pencil`
- Excluir: `Trash2`
- Adicionar: `Plus`
- Salvar: `Check`
- Cancelar: `X`
- Menu: `Menu`
- Usuário: `User`

### 8.2. Tamanhos

- `sm`: 16px
- `md`: 20px (padrão)
- `lg`: 24px
- `xl`: 32px

---

## 9. Sombras e Elevação

### 9.1. Shadow Scale

```css
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

**Uso:**
- Cards: `shadow-sm`
- Dropdowns: `shadow-md`
- Modals: `shadow-lg`
- Tooltips: `shadow-sm`

### 9.2. Elevação por Componente

- Cards: Elevação 1 (shadow-sm)
- Dropdowns: Elevação 2 (shadow-md)
- Drawers/Modals: Elevação 3 (shadow-lg)
- Hover states: Elevação aumentada

---

## 10. Animações e Transições

### 10.1. Durações

```css
duration-75: 75ms   /* Micro-interações */
duration-150: 150ms /* Hovers rápidos */
duration-200: 200ms /* Padrão */
duration-300: 300ms /* Transições suaves */
duration-500: 500ms /* Transições de página */
```

### 10.2. Easing

- `ease-in-out`: Padrão para a maioria
- `ease-out`: Entrada de elementos
- `ease-in`: Saída de elementos

### 10.3. Animações Comuns

**Fade:**
```css
opacity-0 → opacity-100
duration-200 ease-in-out
```

**Slide:**
```css
translate-x-full → translate-x-0
duration-300 ease-out
```

**Scale (Hover):**
```css
scale-100 → scale-105
duration-150 ease-out
```

**Bounce (Loading):**
```css
animate-bounce
```

---

## 11. Responsividade

### 11.1. Breakpoints (Tailwind)

```css
sm: 640px   /* Mobile grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
2xl: 1536px /* Desktop muito grande */
```

### 11.2. Padrões Responsivos

**Grid:**
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3-4 colunas

**Sidebar:**
- Mobile: Drawer
- Desktop: Sempre visível

**Tabelas:**
- Mobile: Cards
- Desktop: Tabela

**Espaçamento:**
- Mobile: `px-4`
- Desktop: `px-6` ou `px-8`

---

## 12. Acessibilidade

### 12.1. Contraste

**WCAG AA:**
- Texto normal: 4.5:1
- Texto grande: 3:1
- Componentes UI: 3:1

### 12.2. Focus States

**Estilo:**
- Ring: 2px, cor primária
- Offset: 2px
- Visible sempre, não apenas no keyboard

### 12.3. Touch Targets

**Mobile:**
- Mínimo: 44x44px
- Ideal: 48x48px
- Espaçamento entre: 8px mínimo

### 12.4. ARIA Labels

- Ícones decorativos: `aria-hidden="true"`
- Botões com ícones: `aria-label` descritivo
- Estados: `aria-live`, `aria-busy`
- Formulários: Labels associados, `aria-required`

---

## 13. Tokens do Design System

### 13.1. Cores como Tokens

```js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... até 900
    DEFAULT: '#3b82f6',
  },
  // ... outras cores
}
```

### 13.2. Espaçamento como Tokens

```js
spacing: {
  // ... valores padrão do Tailwind
}
```

---

## 14. Componentes Customizados

### 14.1. StatusBadge

**Uso:** Indicar status de estoque

**Variantes:**
- `normal`: Verde
- `low`: Amarelo
- `empty`: Vermelho
- `unknown`: Cinza

### 14.2. MetricCard

**Uso:** Cards de métricas no dashboard

**Estrutura:**
- Título (H4)
- Valor grande (H2)
- Subtítulo opcional
- Link opcional

### 14.3. ProductCard (Mobile)

**Uso:** Listagem de produtos no mobile

**Estrutura:**
- Nome do produto
- Informações principais
- Ações rápidas
- Badge de status

---

## 15. Guidelines de Uso

### 15.1. Quando Usar Cada Componente

**Botões:**
- `default`: Ação principal da página
- `secondary`: Ação secundária
- `outline`: Ação menos importante
- `ghost`: Ações contextuais
- `destructive`: Excluir, cancelar operação

**Modals vs Drawers:**
- Modal: Confirmações, alertas, ações críticas
- Drawer: Formulários, filtros, conteúdo extenso

**Toast vs Dialog:**
- Toast: Feedback de ações rápidas (salvar, deletar)
- Dialog: Confirmações importantes, informações críticas

---

## 16. Checklist de Implementação

### 16.1. Configuração Inicial

- [ ] Configurar Tailwind CSS
- [ ] Instalar shadcn/ui
- [ ] Configurar tema de cores
- [ ] Configurar tipografia
- [ ] Configurar breakpoints

### 16.2. Componentes Base

- [ ] Botões (todas variantes)
- [ ] Inputs (todos tipos)
- [ ] Cards
- [ ] Data Table
- [ ] Drawer
- [ ] Dialog
- [ ] Toast
- [ ] Select
- [ ] Checkbox
- [ ] Radio

### 16.3. Componentes Customizados

- [ ] StatusBadge
- [ ] MetricCard
- [ ] ProductCard
- [ ] Sidebar
- [ ] Header

### 16.4. Estados

- [ ] Loading (Spinner, Skeleton)
- [ ] Empty States
- [ ] Error States
- [ ] Success States

---

## 17. Referências e Recursos

### 17.1. Documentação

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### 17.2. Ferramentas

- Figma (design)
- Storybook (documentação de componentes)
- Chromatic (testes visuais)

---

**Documento criado por**: UX Designer  
**Data**: [Data atual]  
**Versão**: 1.0  
**Status**: Completo - Pronto para implementação


