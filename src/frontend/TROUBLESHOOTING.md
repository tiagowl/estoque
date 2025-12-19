# Troubleshooting - shadcn/ui

## Problema: Estilos não aparecem / Componentes sem estilo

### Soluções:

1. **Limpar cache do Next.js:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Verificar se globals.css está importado:**
   - Arquivo `app/layout.tsx` deve ter: `import './globals.css';`

3. **Verificar variáveis CSS:**
   - Abra `app/globals.css`
   - Certifique-se de que as variáveis `:root` estão definidas

4. **Verificar Tailwind:**
   ```bash
   npx tailwindcss --help
   ```

5. **Reinstalar dependências:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Problema: Imports não funcionam

### Verificar:

1. **tsconfig.json** - paths devem estar corretos:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

2. **components.json** - aliases devem estar corretos

3. **Restart do TypeScript server** no VS Code:
   - Ctrl+Shift+P → "TypeScript: Restart TS Server"

## Problema: Componentes Radix UI não funcionam

### Verificar dependências:

```bash
npm list @radix-ui/react-dialog
npm list @radix-ui/react-select
npm list @radix-ui/react-slot
```

Se estiver faltando, instale:
```bash
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-label
```

## Verificação Rápida

Execute este checklist:

- [ ] `components.json` existe na raiz
- [ ] `tailwind.config.js` tem content paths corretos
- [ ] `app/globals.css` tem variáveis CSS definidas
- [ ] `app/layout.tsx` importa `globals.css`
- [ ] `tsconfig.json` tem paths `@/*` configurado
- [ ] Dependências instaladas (`npm install`)
- [ ] Cache limpo (`.next` deletado)

## Teste Rápido

Crie uma página de teste para verificar se os estilos estão funcionando:

```tsx
// app/test/page.tsx
import { Button } from '@/shared/components/ui/button';

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste shadcn/ui</h1>
      <Button>Botão de Teste</Button>
    </div>
  );
}
```

Se o botão aparecer estilizado, tudo está funcionando! 🎉


