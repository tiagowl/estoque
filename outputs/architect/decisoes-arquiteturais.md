# Decisões Arquiteturais (ADRs) - Sistema de Controle de Estoque

## Visão Geral

Este documento registra as decisões arquiteturais importantes tomadas durante o design do sistema de controle de estoque. Cada ADR (Architecture Decision Record) segue o formato: Contexto, Decisão e Consequências.

---

## ADR-001: Uso de Clean Architecture

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Time Técnico

### Contexto

Precisávamos escolher uma arquitetura que:
- Permita manutenibilidade a longo prazo
- Facilite testes unitários
- Separe responsabilidades claramente
- Seja escalável e adaptável

### Decisão

Adotar Clean Architecture com separação em camadas:
- **Presentation Layer**: UI, páginas, componentes React
- **Application Layer**: Use cases, services, DTOs
- **Domain Layer**: Entities, value objects, business rules, repository interfaces
- **Infrastructure Layer**: Implementações de repositories, database, external services

### Consequências

**Positivas:**
- ✅ Código bem organizado e fácil de navegar
- ✅ Testabilidade alta (pode mockar repositories)
- ✅ Domain layer independente de frameworks
- ✅ Facilita mudanças futuras (trocar banco, framework, etc.)

**Negativas:**
- ❌ Mais código boilerplate inicialmente
- ❌ Curva de aprendizado para time novo
- ❌ Pode parecer over-engineering para MVP

**Mitigações:**
- Documentação clara da arquitetura
- Code review para garantir padrões
- Exemplos de implementação

---

## ADR-002: Next.js com App Router

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Frontend Dev

### Contexto

Precisávamos escolher um framework para o frontend que:
- Suporte SSR e SSG
- Tenha API routes integradas
- Seja performático
- Tenha boa experiência de desenvolvimento
- Suporte TypeScript nativamente

### Decisão

Usar **Next.js 14+ com App Router** como framework principal.

### Consequências

**Positivas:**
- ✅ SSR/SSG out-of-the-box
- ✅ API routes integradas (full-stack)
- ✅ File-based routing simplificado
- ✅ Server Components (performance)
- ✅ Excelente DX (Developer Experience)
- ✅ Comunidade grande e ativa
- ✅ Deploy fácil no Vercel

**Negativas:**
- ❌ Curva de aprendizado do App Router
- ❌ Mudanças recentes podem ter breaking changes
- ❌ Lock-in com Vercel (deploy recomendado)

**Alternativas Consideradas:**
- **Remix**: Similar, mas menor comunidade
- **SvelteKit**: Ótimo, mas menos familiar para time
- **Astro**: Foco em conteúdo estático, não ideal aqui

---

## ADR-003: Neon (PostgreSQL) como Banco de Dados

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Backend Dev

### Contexto

Precisávamos escolher um banco de dados que:
- Seja SQL (relacional para integridade)
- Suporte transações atômicas
- Escale facilmente
- Tenha custo baixo para MVP
- Seja gerenciado (serverless)

### Decisão

Usar **Neon** (PostgreSQL serverless) como banco de dados principal.

### Consequências

**Positivas:**
- ✅ PostgreSQL (robusto, confiável)
- ✅ Serverless (auto-scaling)
- ✅ Connection pooling integrado
- ✅ Backups automáticos
- ✅ Tier gratuito disponível
- ✅ Compatível com ferramentas PostgreSQL

**Negativas:**
- ❌ Vendor lock-in com Neon
- ❌ Cold starts em operações raras
- ❌ Limites no tier gratuito

**Alternativas Consideradas:**
- **Supabase**: Similar, mas mais features (não necessárias agora)
- **PlanetScale**: MySQL, mas preferimos PostgreSQL
- **Railway**: Boa opção, mas Neon mais otimizado para serverless

---

## ADR-004: Repository Pattern

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto

### Contexto

Precisávamos abstrair o acesso a dados para:
- Facilitar testes (mock repositories)
- Permitir trocar implementação de banco
- Separar lógica de negócio de acesso a dados
- Centralizar queries complexas

### Decisão

Implementar **Repository Pattern** com:
- Interfaces no Domain Layer
- Implementações no Infrastructure Layer
- Injeção de dependência
- Um repository por aggregate

### Consequências

**Positivas:**
- ✅ Testabilidade alta (mock fácil)
- ✅ Flexibilidade para trocar implementação
- ✅ Queries centralizadas
- ✅ Domain layer independente de banco

**Negativas:**
- ❌ Mais código para escrever
- ❌ Pode ser over-abstraction para queries simples
- ❌ Necessário mapear entre DB e Domain

**Implementação:**
- Interfaces em `domain/repositories/`
- Implementações em `infrastructure/repositories/`
- Uso de DTOs para mapeamento

---

## ADR-005: JWT para Autenticação

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Backend Dev

### Contexto

Precisávamos escolher estratégia de autenticação que:
- Seja stateless (para escalabilidade)
- Suporte SPA e SSR
- Seja segura
- Não precise de session storage no servidor

### Decisão

Usar **JWT (JSON Web Tokens)** para autenticação com:
- Token no cookie HTTP-only (preferido) ou localStorage
- Refresh tokens para renovação
- Expiração de 7 dias
- Algoritmo HS256

### Consequências

**Positivas:**
- ✅ Stateless (escala horizontalmente)
- ✅ Funciona bem com SSR
- ✅ Padrão da indústria
- ✅ Não precisa session storage

**Negativas:**
- ❌ Tokens não podem ser revogados facilmente (sem blacklist)
- ❌ Tamanho maior que session IDs
- ❌ Vulnerável se não usar HTTPS

**Mitigações:**
- Tokens de curta duração (7 dias)
- Refresh token rotation
- HTTPS obrigatório
- Blacklist opcional para logout (Redis)

**Alternativas Consideradas:**
- **Session-based**: Não escala bem
- **NextAuth.js**: Poderia usar, mas preferimos controle total
- **OAuth providers**: Não necessário para MVP

---

## ADR-006: shadcn/ui como Biblioteca de Componentes

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Frontend Dev, UX

### Contexto

Precisávamos escolher uma biblioteca de componentes UI que:
- Seja customizável
- Tenha componentes acessíveis
- Funcione bem com Tailwind CSS
- Não seja um pacote npm gigante
- Tenha componentes copiáveis (copy-paste)

### Decisão

Usar **shadcn/ui** como biblioteca de componentes base.

### Consequências

**Positivas:**
- ✅ Componentes copiados para o projeto (ownership total)
- ✅ Altamente customizável
- ✅ Baseado em Radix UI (acessível)
- ✅ Funciona com Tailwind CSS
- ✅ Não adiciona bundle size (componentes no projeto)
- ✅ Comunidade ativa e bem mantido

**Negativas:**
- ❌ Precisa copiar componentes manualmente
- ❌ Não é um npm package tradicional
- ❌ Atualizações manuais

**Mitigações:**
- Documentar componentes usados
- Versionar componentes no projeto
- Usar CLI do shadcn para adicionar componentes

**Alternativas Consideradas:**
- **Material-UI**: Bundle grande, difícil customização
- **Chakra UI**: Boa opção, mas preferimos Tailwind
- **Ant Design**: Muito pesado, estilo específico

---

## ADR-007: Zod para Validação

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Backend Dev

### Contexto

Precisávamos escolher uma biblioteca de validação que:
- Funcione no backend e frontend
- Tenha TypeScript integration
- Seja type-safe
- Tenha boa performance
- Tenha sintaxe declarativa

### Decisão

Usar **Zod** para validação de schemas em:
- API routes (validação de input)
- Frontend (validação de formulários)
- Type inference automático

### Consequências

**Positivas:**
- ✅ TypeScript-first (inference automático)
- ✅ Funciona no frontend e backend
- ✅ Sintaxe declarativa e legível
- ✅ Boa performance
- ✅ Mensagens de erro customizáveis

**Negativas:**
- ❌ Bundle size adicional (mas pequeno)
- ❌ Curva de aprendizado inicial

**Alternativas Consideradas:**
- **Yup**: Similar, mas menos TypeScript integration
- **Joi**: Boa opção, mas mais pesada
- **Validação manual**: Muito trabalho, propenso a erros

---

## ADR-008: Transações para Operações Críticas

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Backend Dev

### Contexto

Operações como vendas precisam ser atômicas:
- Criar sale
- Criar sale_items
- Atualizar stock de múltiplos produtos
- Criar movements
- Verificar notificações

Se qualquer passo falhar, tudo deve ser revertido.

### Decisão

Usar **transações de banco de dados** para operações críticas:
- Registro de venda (sale + items + stock updates + movements)
- Movimentações de estoque complexas
- Operações que envolvem múltiplas tabelas

### Consequências

**Positivas:**
- ✅ Garantia de atomicidade (ACID)
- ✅ Consistência de dados
- ✅ Rollback automático em caso de erro
- ✅ Previne race conditions

**Negativas:**
- ❌ Locks de banco durante transação
- ❌ Pode afetar performance se muito longas
- ❌ Complexidade adicional no código

**Implementação:**
- Usar `BEGIN`, `COMMIT`, `ROLLBACK`
- Transações curtas (< 1 segundo)
- Tratamento de erros adequado

**Alternativas Consideradas:**
- **Saga Pattern**: Muito complexo para este caso
- **Event Sourcing**: Over-engineering
- **Sem transações**: Risco de inconsistência

---

## ADR-009: Mobile-First Design

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, UX, Product Owner

### Contexto

Pesquisa de usuário mostrou que:
- 90% dos usuários usam smartphone como dispositivo principal
- Necessidade de acessar fora do estabelecimento
- Mobile-first é obrigatório para sucesso

### Decisão

Adotar estratégia **Mobile-First** para desenvolvimento:
- Design mobile primeiro
- Componentes responsivos desde o início
- Testes em dispositivos móveis
- Performance otimizada para mobile

### Consequências

**Positivas:**
- ✅ Melhor experiência mobile
- ✅ Base sólida para desktop
- ✅ Alinhado com necessidades dos usuários
- ✅ Performance melhor em geral

**Negativas:**
- ❌ Pode ser mais trabalhoso inicialmente
- ❌ Precisa testar em múltiplos dispositivos

**Implementação:**
- Tailwind mobile-first breakpoints
- Componentes responsivos
- Touch targets adequados (44x44px mínimo)
- Performance otimizada

---

## ADR-010: API Routes em Next.js (vs Backend Separado)

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, DevOps

### Contexto

Precisávamos decidir entre:
- API Routes do Next.js (full-stack)
- Backend separado (Node.js/Express, etc.)

### Decisão

Usar **API Routes do Next.js** para o backend.

### Consequências

**Positivas:**
- ✅ Um único projeto (simplicidade)
- ✅ Deploy simplificado
- ✅ Type sharing entre frontend/backend
- ✅ Menos complexidade de infraestrutura
- ✅ Custo menor (um serviço)

**Negativas:**
- ❌ Acoplamento com Next.js
- ❌ Scaling pode ser limitado (mas Vercel resolve)
- ❌ Menos flexível para separar depois

**Alternativas Consideradas:**
- **Backend separado (Express/Fastify)**: Mais complexidade, desnecessário para MVP
- **Serverless functions**: Similar, mas API Routes mais integrado

**Plano Futuro:**
- Se necessário escalar muito, pode separar backend depois
- Arquitetura permite essa separação

---

## ADR-011: Server-Side Rendering (SSR) para Páginas Principais

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Frontend Dev

### Contexto

Páginas como dashboard e listagens têm dados que:
- Mudam frequentemente
- Precisam estar atualizados
- Beneficiam de SEO (landing page)

### Decisão

Usar **SSR (Server-Side Rendering)** para:
- Páginas autenticadas (dashboard, produtos, etc.)
- Landing page (SEO)
- Usar **Static Generation (SSG)** apenas onde faz sentido (landing page inicial)

### Consequências

**Positivas:**
- ✅ Dados sempre atualizados
- ✅ SEO melhor (landing page)
- ✅ First load mais rápido (dados incluídos)
- ✅ Segurança (dados não expostos no cliente)

**Negativas:**
- ❌ Mais carga no servidor
- ❌ TTFB pode ser maior
- ❌ Precisa de servidor Node.js

**Implementação:**
- Server Components quando possível
- Client Components apenas quando necessário
- Caching apropriado

---

## ADR-012: TypeScript como Linguagem Principal

**Status**: Aceito  
**Data**: [Data atual]  
**Decisores**: Arquiteto, Time Técnico

### Contexto

Precisávamos escolher entre TypeScript e JavaScript para:
- Type safety
- IntelliSense
- Manutenibilidade
- Detecção de erros em compile-time

### Decisão

Usar **TypeScript** como linguagem principal do projeto.

### Consequências

**Positivas:**
- ✅ Type safety (menos bugs)
- ✅ Melhor IntelliSense/autocomplete
- ✅ Refactoring mais seguro
- ✅ Documentação implícita (tipos)
- ✅ Padrão da indústria

**Negativas:**
- ❌ Curva de aprendizado
- ❌ Mais verboso que JavaScript
- ❌ Build time ligeiramente maior

**Configuração:**
- Strict mode habilitado
- Type checking no CI
- Tipos explícitos em interfaces públicas

---

## Resumo de Decisões

| ADR | Decisão | Status |
|-----|---------|--------|
| ADR-001 | Clean Architecture | ✅ Aceito |
| ADR-002 | Next.js App Router | ✅ Aceito |
| ADR-003 | Neon (PostgreSQL) | ✅ Aceito |
| ADR-004 | Repository Pattern | ✅ Aceito |
| ADR-005 | JWT Authentication | ✅ Aceito |
| ADR-006 | shadcn/ui | ✅ Aceito |
| ADR-007 | Zod Validation | ✅ Aceito |
| ADR-008 | Database Transactions | ✅ Aceito |
| ADR-009 | Mobile-First | ✅ Aceito |
| ADR-010 | API Routes (Next.js) | ✅ Aceito |
| ADR-011 | SSR | ✅ Aceito |
| ADR-012 | TypeScript | ✅ Aceito |

---

## Processo de Decisão

### Quando Criar um ADR

Criar um ADR quando:
- Decisão arquitetural importante
- Impacta múltiplos desenvolvedores
- Pode ser questionada no futuro
- Tem trade-offs significativos

### Formato

1. **Status**: Proposto / Aceito / Rejeitado / Deprecado
2. **Contexto**: Situação que levou à decisão
3. **Decisão**: O que foi decidido
4. **Consequências**: Positivas, negativas, alternativas

### Revisão

ADRs devem ser revisados:
- Quando contexto muda
- Quando nova informação aparece
- Periodicamente (trimestralmente)

---

**Documento criado por**: Arquiteto de Software  
**Data**: [Data atual]  
**Versão**: 1.0  
**Status**: Completo - Decisões aprovadas

