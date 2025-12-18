# Documentação Técnica - Sistema de Controle de Estoque

## Visão Geral

Esta documentação técnica descreve a arquitetura, tecnologias, padrões e especificações técnicas do sistema de controle de estoque.

---

## 1. Stack Tecnológico

### 1.1. Frontend

**Framework:**
- **Next.js 14+** (App Router)
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - API Routes
  - File-based routing

**Bibliotecas:**
- **React 18+**
  - Hooks
  - Server Components
  - Client Components

- **TypeScript**
  - Tipagem estática
  - Type safety
  - IntelliSense

- **Tailwind CSS**
  - Utility-first CSS
  - Responsive design
  - Customização de tema

- **shadcn/ui**
  - Componentes acessíveis
  - Customizáveis
  - Baseado em Radix UI

**Ferramentas de Desenvolvimento:**
- ESLint
- Prettier
- Husky (Git hooks)
- Jest + React Testing Library

---

### 1.2. Backend

**Runtime:**
- **Node.js 18+**
  - Next.js API Routes
  - Server-side logic

**Banco de Dados:**
- **Neon (PostgreSQL)**
  - Serverless PostgreSQL
  - Auto-scaling
  - Connection pooling

**SDK/ORM:**
- **Neon SDK**
  - SQL queries
  - Prepared statements
  - Transaction support

**Autenticação:**
- **NextAuth.js** ou **JWT custom**
  - Session management
  - Token-based auth
  - Password hashing (bcrypt)

**Validação:**
- **Zod**
  - Schema validation
  - Type inference
  - Runtime validation

---

### 1.3. Infraestrutura

**Deploy:**
- **Vercel** (recomendado) ou **Render**
  - Serverless functions
  - Edge network
  - Auto-scaling

**CDN:**
- Vercel Edge Network
  - Static assets
  - Global distribution

**Monitoramento:**
- Vercel Analytics
- Error tracking (Sentry - opcional)
- Performance monitoring

**CI/CD:**
- GitHub Actions
  - Automated tests
  - Build validation
  - Deployment

---

## 2. Arquitetura de Software

### 2.1. Clean Architecture

O sistema segue os princípios de Clean Architecture, separando o código em camadas bem definidas:

**Camadas:**

1. **Presentation Layer**
   - Componentes React
   - Páginas Next.js
   - Formulários e validação de UI

2. **Application Layer**
   - Use Cases
   - Services
   - DTOs (Data Transfer Objects)

3. **Domain Layer**
   - Entities
   - Value Objects
   - Business Rules
   - Repository Interfaces

4. **Infrastructure Layer**
   - Repository Implementations
   - Database connections
   - External services

**Princípios:**
- Dependências apontam para dentro (towards domain)
- Domain layer não depende de frameworks
- Testabilidade isolada por camada

---

### 2.2. Domain-Driven Design (DDD)

**Entidades (Entities):**
- `User`: Usuário do sistema
- `Product`: Produto cadastrado
- `Movement`: Movimentação de estoque
- `Sale`: Venda registrada
- `Supplier`: Fornecedor

**Value Objects:**
- `Money`: Representação de valores monetários
- `Email`: Validação de email
- `StockQuantity`: Quantidade de estoque

**Aggregates:**
- `Product` (root)
  - Contém regras de negócio
  - Garante consistência

- `Sale` (root)
  - Contém `SaleItem[]`
  - Transação atômica

**Repositories:**
- Interfaces no Domain Layer
- Implementações no Infrastructure Layer
- Abstração de acesso a dados

---

### 2.3. Repository Pattern

**Interfaces (Domain Layer):**

```typescript
interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(userId: string): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  findByUserId(userId: string): Promise<Product[]>;
}
```

**Implementações (Infrastructure Layer):**

```typescript
class ProductRepository implements IProductRepository {
  constructor(private db: NeonDatabase) {}
  
  async create(product: Product): Promise<Product> {
    // Implementação usando Neon SDK
  }
  
  // ... outros métodos
}
```

**Benefícios:**
- Abstração de acesso a dados
- Testabilidade (mock repositories)
- Flexibilidade para trocar implementação

---

## 3. Estrutura de Banco de Dados

### 3.1. Schema do Banco de Dados

**Tabela: users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

**Tabela: products**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  cost_price DECIMAL(10, 2) NOT NULL CHECK (cost_price >= 0),
  sell_price DECIMAL(10, 2) NOT NULL CHECK (sell_price >= 0),
  current_stock INTEGER NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
  min_stock INTEGER DEFAULT NULL CHECK (min_stock >= 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_name ON products(name);
```

**Tabela: movements**
```sql
CREATE TABLE movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('ENTRY', 'EXIT')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  observation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_movements_user_id ON movements(user_id);
CREATE INDEX idx_movements_product_id ON movements(product_id);
CREATE INDEX idx_movements_created_at ON movements(created_at DESC);
```

**Tabela: sales**
```sql
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sales_user_id ON sales(user_id);
CREATE INDEX idx_sales_created_at ON sales(created_at DESC);
```

**Tabela: sale_items**
```sql
CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sale_items_sale_id ON sale_items(sale_id);
CREATE INDEX idx_sale_items_product_id ON sale_items(product_id);
```

**Tabela: suppliers**
```sql
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_suppliers_user_id ON suppliers(user_id);
```

**Tabela: product_suppliers**
```sql
CREATE TABLE product_suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(product_id, supplier_id)
);

CREATE INDEX idx_product_suppliers_product_id ON product_suppliers(product_id);
CREATE INDEX idx_product_suppliers_supplier_id ON product_suppliers(supplier_id);
```

---

### 3.2. Índices e Performance

**Índices Criados:**
- Todos os `user_id` (filtro principal)
- `product_id` nas movimentações e vendas
- `created_at` para ordenação
- `email` para busca rápida

**Otimizações:**
- Connection pooling (Neon)
- Prepared statements
- Query optimization
- Paginação em listagens

---

## 4. APIs e Endpoints

### 4.1. Autenticação

**POST /api/auth/register**
```typescript
Request: {
  email: string;
  password: string;
  confirmPassword: string;
}

Response: {
  success: boolean;
  message: string;
}
```

**POST /api/auth/login**
```typescript
Request: {
  email: string;
  password: string;
}

Response: {
  token: string;
  user: {
    id: string;
    email: string;
  };
}
```

**POST /api/auth/logout**
```typescript
Response: {
  success: boolean;
}
```

---

### 4.2. Produtos

**GET /api/products**
```typescript
Query Params: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

Response: {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
```

**POST /api/products**
```typescript
Request: {
  name: string;
  costPrice: number;
  sellPrice: number;
  minStock?: number;
}

Response: {
  product: Product;
}
```

**GET /api/products/:id**
```typescript
Response: {
  product: Product;
}
```

**PUT /api/products/:id**
```typescript
Request: {
  name?: string;
  costPrice?: number;
  sellPrice?: number;
  minStock?: number;
}

Response: {
  product: Product;
}
```

**DELETE /api/products/:id**
```typescript
Response: {
  success: boolean;
}
```

---

### 4.3. Movimentações

**GET /api/movements**
```typescript
Query Params: {
  page?: number;
  limit?: number;
  productId?: string;
  type?: 'ENTRY' | 'EXIT';
  startDate?: string;
  endDate?: string;
}

Response: {
  movements: Movement[];
  total: number;
  page: number;
  totalPages: number;
}
```

**POST /api/movements/entry**
```typescript
Request: {
  productId: string;
  quantity: number;
  observation?: string;
}

Response: {
  movement: Movement;
  product: Product; // atualizado
}
```

**POST /api/movements/exit**
```typescript
Request: {
  productId: string;
  quantity: number;
  observation?: string;
}

Response: {
  movement: Movement;
  product: Product; // atualizado
}
```

---

### 4.4. Vendas

**GET /api/sales**
```typescript
Query Params: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

Response: {
  sales: Sale[];
  total: number;
  page: number;
  totalPages: number;
}
```

**POST /api/sales**
```typescript
Request: {
  items: {
    productId: string;
    quantity: number;
  }[];
}

Response: {
  sale: Sale;
  items: SaleItem[];
}
```

**GET /api/sales/:id**
```typescript
Response: {
  sale: Sale;
  items: SaleItem[];
}
```

---

## 5. Segurança

### 5.1. Autenticação e Autorização

**JWT Tokens:**
- Algoritmo: HS256
- Expiração: 7 dias (refresh token)
- Storage: HTTP-only cookies (recomendado) ou localStorage

**Password Hashing:**
- Algoritmo: bcrypt
- Salt rounds: 10

**Rate Limiting:**
- Login: 5 tentativas por 15 minutos
- API: 100 requests por minuto por usuário

---

### 5.2. Validação e Sanitização

**Input Validation:**
- Zod schemas
- Validação no backend
- Type safety com TypeScript

**SQL Injection Prevention:**
- Prepared statements
- Parameterized queries
- No string concatenation

**XSS Prevention:**
- React escape automático
- Sanitização de inputs
- Content Security Policy

**CSRF Protection:**
- Next.js built-in CSRF protection
- SameSite cookies

---

### 5.3. Autorização

**Middleware de Autenticação:**
```typescript
export async function authenticateRequest(
  request: Request
): Promise<User | null> {
  const token = extractToken(request);
  if (!token) return null;
  
  const payload = verifyToken(token);
  if (!payload) return null;
  
  return getUserById(payload.userId);
}
```

**Filtro por Usuário:**
- Todas as queries incluem `user_id`
- Garantia no repository layer
- Validação em use cases

---

## 6. Performance

### 6.1. Otimizações

**Database:**
- Índices em colunas filtradas
- Paginação em listagens
- Query optimization
- Connection pooling

**Frontend:**
- Server Components quando possível
- Code splitting
- Image optimization
- Lazy loading

**Caching:**
- Static pages (SSG)
- API responses (quando apropriado)
- Browser caching

---

### 6.2. Métricas de Performance

**Targets:**
- Time to First Byte (TTFB): < 200ms
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**API Performance:**
- List endpoints: < 500ms
- CRUD operations: < 200ms
- Complex operations (sales): < 1s

---

## 7. Testes

### 7.1. Estratégia de Testes

**Unit Tests:**
- Domain entities
- Value objects
- Business logic
- Utilities

**Integration Tests:**
- Use cases
- Repositories
- API endpoints

**E2E Tests:**
- Critical user flows
- Authentication
- Main features

---

### 7.2. Cobertura

**Target:**
- Overall: > 80%
- Critical paths: > 90%
- Domain layer: > 95%

**Ferramentas:**
- Jest (unit/integration)
- React Testing Library (components)
- Playwright (E2E)

---

## 8. Logging e Monitoramento

### 8.1. Logging

**Níveis:**
- ERROR: Erros críticos
- WARN: Avisos importantes
- INFO: Informações gerais
- DEBUG: Debug (desenvolvimento)

**Logs Estruturados:**
```typescript
logger.info('Product created', {
  productId: product.id,
  userId: user.id,
  timestamp: new Date(),
});
```

---

### 8.2. Monitoramento

**Métricas:**
- Request rate
- Error rate
- Response time
- Database query time

**Alertas:**
- Error rate > 1%
- Response time > 1s
- Database connection issues

---

## 9. Deployment

### 9.1. Ambiente de Produção

**Requisitos:**
- Node.js 18+
- PostgreSQL 14+
- SSL/TLS
- CDN para assets

**Variáveis de Ambiente:**
```
DATABASE_URL=
JWT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NODE_ENV=production
```

---

### 9.2. CI/CD Pipeline

**Stages:**
1. **Lint**: ESLint + Prettier
2. **Test**: Unit + Integration tests
3. **Build**: Next.js build
4. **Deploy**: Deploy to production

**GitHub Actions:**
- Run on push to main
- Run tests before deploy
- Automated deployment

---

## 10. Escalabilidade

### 10.1. Horizontal Scaling

**Stateless Design:**
- No server-side sessions
- JWT tokens
- Shared database

**Load Balancing:**
- Multiple Next.js instances
- Database connection pooling
- CDN for static assets

---

### 10.2. Otimizações Futuras

**Caching:**
- Redis para cache
- Query result caching
- Session caching

**Database:**
- Read replicas
- Partitioning (se necessário)
- Archiving old data

**CDN:**
- Static assets
- API responses (quando apropriado)

---

**Documento criado por**: Arquiteto de Software  
**Data**: [Data atual]  
**Versão**: 1.0  
**Status**: Completo - Pronto para implementação

