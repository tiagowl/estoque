# Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto `src/frontend/` com as seguintes variáveis:

```env
# Database Configuration
# Conectar ao seu banco Neon PostgreSQL
# Formato: postgresql://user:password@host:port/database?sslmode=require
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT Configuration
# Secret usado para assinar tokens JWT - MUDAR EM PRODUÇÃO!
# Use um valor aleatório forte (pode gerar com: openssl rand -base64 32)
JWT_SECRET=a7f3b9c2e5d8f1a4b6c9e2d5f8a1b4c7e0d3f6a9b2c5e8f1a4b7c0d3e6f9a2b
JWT_EXPIRES_IN=7d

# Next.js Configuration
# URL base da aplicação
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
# development | production
NODE_ENV=development
```

## Como Configurar

### 1. Criar o arquivo

No diretório `src/frontend/`, crie um arquivo chamado `.env.local`:

```bash
# Windows PowerShell
New-Item -Path .env.local -ItemType File

# Linux/Mac
touch .env.local
```

### 2. Configurar DATABASE_URL

Obtenha a connection string do seu banco Neon:
1. Acesse o dashboard do Neon (https://console.neon.tech)
2. Selecione seu projeto
3. Vá em "Connection Details"
4. Copie a connection string
5. Cole no `.env.local` substituindo `DATABASE_URL=`

Exemplo:
```
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Configurar JWT_SECRET

Gere uma chave secreta segura:

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

Cole o resultado no `.env.local` substituindo `JWT_SECRET=`

### 4. Configurar outras variáveis

- `JWT_EXPIRES_IN`: Tempo de expiração do token (padrão: 7d = 7 dias)
- `NEXT_PUBLIC_APP_URL`: URL base da aplicação (padrão: http://localhost:3000)
- `NODE_ENV`: Ambiente (development ou production)

## Importante

⚠️ **NUNCA** commite o arquivo `.env.local` no git!

O arquivo `.env.local` já está no `.gitignore` e não será versionado.

## Exemplo Completo

```env
DATABASE_URL=postgresql://usuario:senha@ep-exemplo.us-east-2.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=a7f3b9c2e5d8f1a4b6c9e2d5f8a1b4c7e0d3f6a9b2c5e8f1a4b7c0d3e6f9a2b
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Verificação

Após configurar, você pode verificar se as variáveis estão sendo lidas corretamente:

```bash
# No diretório src/frontend
npm run dev
```

Se houver erro relacionado a variáveis de ambiente, verifique:
1. O arquivo `.env.local` existe na raiz de `src/frontend/`
2. As variáveis estão escritas corretamente (sem espaços extras)
3. O `DATABASE_URL` está no formato correto
4. Reinicie o servidor de desenvolvimento após criar/editar `.env.local`

