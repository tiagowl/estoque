# Configuração do shadcn/ui

O projeto está configurado para usar shadcn/ui. Esta documentação descreve a configuração atual.

## ✅ Arquivos de Configuração

### 1. `components.json`
Arquivo de configuração principal do shadcn/ui:
- **style**: default
- **rsc**: true (React Server Components)
- **tsx**: true
- **Aliases configurados**:
  - `@/shared/components` → componentes
  - `@/shared/utils` → utilitários (cn, etc)
  - `@/shared/components/ui` → componentes UI

### 2. `tailwind.config.js`
Configurado com:
- ✅ Variáveis CSS do shadcn/ui
- ✅ Animações (tailwindcss-animate)
- ✅ Dark mode support
- ✅ Content paths corretos

### 3. `app/globals.css`
Inclui:
- ✅ Todas as variáveis CSS do shadcn/ui (:root e .dark)
- ✅ Configuração de base styles
- ✅ Font feature settings

### 4. `tsconfig.json`
Paths configurados:
- ✅ `@/*` aponta para `./*`

## 📦 Componentes Disponíveis

Os seguintes componentes shadcn/ui estão implementados:

- ✅ `Button` - Botões com variantes
- ✅ `Input` - Campos de input
- ✅ `Card` - Cards com header, content, footer
- ✅ `Dialog` - Modais/diálogos
- ✅ `Drawer` - Drawer lateral (customizado)
- ✅ `Label` - Labels para formulários
- ✅ `Select` - Select dropdown
- ✅ `Table` - Tabelas

## 🔧 Como Usar

### Importar Componentes

```tsx
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
```

### Usar o utilitário `cn`

```tsx
import { cn } from '@/shared/utils/cn';

<div className={cn("base-class", condition && "conditional-class")}>
```

## 🎨 Cores e Temas

O projeto usa o tema padrão do shadcn/ui com:
- **Background**: Branco (modo claro)
- **Primary**: Preto/escuro
- **Secondary**: Cinza claro
- **Destructive**: Vermelho

Para mudar o tema, edite as variáveis CSS em `app/globals.css`.

## 🚀 Adicionar Novos Componentes

Para adicionar novos componentes do shadcn/ui:

1. Execute o comando do shadcn CLI (se disponível):
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. Ou copie manualmente do [shadcn/ui](https://ui.shadcn.com/docs/components) para `shared/components/ui/`

3. Certifique-se de importar corretamente usando os aliases configurados

## ⚠️ Troubleshooting

### Estilos não aparecem

1. Verifique se `app/globals.css` está importado em `app/layout.tsx`
2. Verifique se as variáveis CSS estão definidas
3. Limpe o cache do Next.js: `rm -rf .next` e reinicie

### Componentes não encontrados

1. Verifique os paths no `tsconfig.json`
2. Verifique os aliases no `components.json`
3. Certifique-se de usar os imports corretos: `@/shared/components/ui/[component]`

### Tailwind não está processando

1. Verifique `tailwind.config.js` - content paths
2. Verifique `postcss.config.js`
3. Reinicie o servidor de desenvolvimento

## 📝 Notas

- Todos os componentes estão em `shared/components/ui/`
- O utilitário `cn` está em `shared/utils/cn.ts`
- O projeto usa React Server Components por padrão
- Componentes que precisam de interatividade devem ter `'use client'` no topo


