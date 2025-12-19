# Como instalar @radix-ui/react-avatar

O pacote `@radix-ui/react-avatar` já está no `package.json`, mas se você ainda está vendo o erro, siga estes passos:

## Solução 1: Reinstalar dependências

No terminal, navegue até o diretório `src/frontend` e execute:

```bash
cd src/frontend
npm install
```

## Solução 2: Instalação forçada

Se o problema persistir, execute:

```bash
cd src/frontend
npm install @radix-ui/react-avatar --save --force
```

## Solução 3: Limpar e reinstalar

Se nada funcionar, limpe tudo e reinstale:

```bash
cd src/frontend
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

## Verificar instalação

Para verificar se o pacote foi instalado corretamente:

```bash
cd src/frontend
npm list @radix-ui/react-avatar
```

Você deve ver algo como:
```
@radix-ui/react-avatar@1.0.4
```

## Importante

Após instalar, **reinicie o servidor Next.js** (Ctrl+C e depois `npm run dev` novamente).


