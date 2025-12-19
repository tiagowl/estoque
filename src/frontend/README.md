# Sistema de Controle de Estoque

Sistema completo de controle de estoque desenvolvido com Next.js 14, TypeScript, Clean Architecture e DDD.

## 🚀 Funcionalidades Implementadas

### Autenticação
- ✅ Cadastro de usuários
- ✅ Login com JWT
- ✅ Proteção de rotas

### Gestão de Produtos
- ✅ CRUD completo (Criar, Ler, Atualizar, Excluir)
- ✅ Listagem com busca
- ✅ Definição de estoque mínimo
- ✅ Visualização de estoque atual
- ✅ Exportação para CSV

### Movimentações de Estoque
- ✅ Registro de entrada de estoque
- ✅ Registro de saída de estoque
- ✅ Histórico completo de movimentações
- ✅ Filtros por produto e tipo
- ✅ Exportação para CSV

### Sistema de Vendas
- ✅ Registro de vendas com múltiplos produtos
- ✅ Cálculo automático de totais
- ✅ Atualização automática de estoque
- ✅ Histórico de vendas

### Gestão de Fornecedores
- ✅ CRUD completo de fornecedores
- ✅ Cadastro de nome e telefone
- ✅ Listagem de fornecedores

### Dashboard
- ✅ Métricas principais (total de produtos, estoque baixo, sem estoque)
- ✅ Listagem de produtos com estoque baixo
- ✅ Listagem de produtos sem estoque
- ✅ Links rápidos para outras seções

### Interface
- ✅ Layout responsivo com sidebar
- ✅ Design moderno com shadcn/ui
- ✅ Componentes reutilizáveis
- ✅ Mobile-first design

## 📁 Estrutura do Projeto

```
src/frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticação
│   │   ├── products/      # Produtos
│   │   ├── movements/     # Movimentações
│   │   ├── sales/         # Vendas
│   │   └── suppliers/     # Fornecedores
│   ├── (auth)/            # Rotas públicas
│   │   ├── login/
│   │   └── register/
│   └── (dashboard)/       # Rotas protegidas
│       ├── dashboard/
│       ├── products/
│       ├── movements/
│       ├── sales/
│       └── suppliers/
├── domain/                # Domain Layer (DDD)
│   ├── entities/          # Entidades de domínio
│   ├── repositories/      # Interfaces de repositórios
│   └── errors/            # Erros de domínio
├── application/           # Application Layer
│   ├── use-cases/         # Casos de uso
│   └── services/          # Serviços de aplicação
├── infrastructure/        # Infrastructure Layer
│   ├── database/          # Cliente do banco
│   └── repositories/      # Implementações de repositórios
└── shared/                # Código compartilhado
    ├── components/        # Componentes React
    │   ├── ui/           # Componentes shadcn/ui
    │   └── layout/       # Componentes de layout
    └── utils/             # Utilitários
```

## 🛠️ Setup

### 1. Instalar Dependências

```bash
cd src/frontend
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Executar Migrations do Banco

Execute o schema SQL no seu banco Neon:

```bash
# Via psql
psql $DATABASE_URL < database/schema.sql

# Ou copie e cole o conteúdo de database/schema.sql no SQL Editor do Neon
```

**Opcional**: Para dados de teste (apaga todos os dados existentes!):

```bash
psql $DATABASE_URL < database/seed.sql
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm run type-check` - Verifica tipos TypeScript

## 🏗️ Arquitetura

O projeto segue **Clean Architecture** com separação em camadas:

- **Domain**: Entidades e regras de negócio (independente de frameworks)
- **Application**: Casos de uso e serviços
- **Infrastructure**: Implementações (repositórios, banco de dados)
- **Presentation**: UI e API routes (Next.js)

### Principais Padrões

- **Repository Pattern**: Abstração de acesso a dados
- **Use Cases**: Lógica de aplicação encapsulada
- **DTOs**: Transferência de dados tipada (Zod)
- **Domain Entities**: Entidades com regras de negócio

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Validação de inputs (Zod)
- ✅ Prepared statements (SQL injection prevention)
- ✅ Criptografia de senhas (bcrypt)
- ✅ Proteção de rotas

## 🎨 Tecnologias

- **Next.js 14** (App Router, Server Components)
- **TypeScript** (Type safety)
- **PostgreSQL** (Neon serverless)
- **Tailwind CSS** (Estilização)
- **shadcn/ui** (Componentes UI)
- **Zod** (Validação)
- **JWT** (Autenticação)
- **bcryptjs** (Hash de senhas)

## 📱 Responsividade

O sistema é totalmente responsivo:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)
- ✅ Sidebar colapsável no mobile
- ✅ Touch targets adequados

## 🔄 Fluxo de Trabalho

1. Usuário faz login
2. Acessa dashboard e vê métricas
3. Cadastra produtos
4. Registra movimentações (entrada/saída)
5. Registra vendas (atualiza estoque automaticamente)
6. Gerencia fornecedores
7. Exporta dados quando necessário

## 📝 Próximos Passos

Funcionalidades já implementadas estão completas. Possíveis melhorias futuras:

- [ ] Relatórios avançados
- [ ] Gráficos e visualizações
- [ ] Notificações por email
- [ ] App mobile nativo
- [ ] Múltiplos usuários por conta

## 📚 Documentação Adicional

- Ver `outputs/product-owner/` para requisitos completos
- Ver `outputs/architect/` para documentação técnica
- Ver `outputs/ux/` para design system e wireframes

---

**Status**: ✅ MVP Completo - Pronto para uso!
