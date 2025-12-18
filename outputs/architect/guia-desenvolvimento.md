# Guia de Desenvolvimento - Sistema de Controle de Estoque

## Visão Geral

Este guia define padrões, convenções e boas práticas para desenvolvimento do sistema de controle de estoque, garantindo consistência e qualidade do código.

---

## 1. Estrutura de Pastas

### 1.1. Organização do Projeto

```
estoque/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Route group para autenticação
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/              # Route group protegido
│   │   │   ├── layout.tsx            # Layout com sidebar
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── movements/
│   │   │   │   └── page.tsx
│   │   │   └── sales/
│   │   │       └── page.tsx
│   │   └── api/                      # API Routes
│   │       ├── auth/
│   │       │   └── route.ts
│   │       ├── products/
│   │       │   ├── route.ts          # GET, POST
│   │       │   └── [id]/
│   │       │       └── route.ts      # GET, PUT, DELETE
│   │       ├── movements/
│   │       │   ├── route.ts
│   │       │   ├── entry/
│   │       │   │   └── route.ts
│   │       │   └── exit/
│   │       │       └── route.ts
│   │       └── sales/
│   │           └── route.ts
│   │
│   ├── domain/                       # Domain Layer (DDD)
│   │   ├── entities/
│   │   │   ├── Product.ts
│   │   │   ├── Movement.ts
│   │   │   ├── Sale.ts
│   │   │   └── User.ts
│   │   ├── value-objects/
│   │   │   ├── Money.ts
│   │   │   └── Email.ts
│   │   ├── repositories/
│   │   │   ├── IProductRepository.ts
│   │   │   ├── IMovementRepository.ts
│   │   │   └── ISaleRepository.ts
│   │   └── errors/
│   │       ├── DomainError.ts
│   │       └── ValidationError.ts
│   │
│   ├── application/                  # Application Layer
│   │   ├── use-cases/
│   │   │   ├── products/
│   │   │   │   ├── CreateProductUseCase.ts
│   │   │   │   ├── UpdateProductUseCase.ts
│   │   │   │   ├── DeleteProductUseCase.ts
│   │   │   │   └── ListProductsUseCase.ts
│   │   │   ├── movements/
│   │   │   │   ├── RegisterEntryUseCase.ts
│   │   │   │   └── RegisterExitUseCase.ts
│   │   │   └── sales/
│   │   │       └── RegisterSaleUseCase.ts
│   │   ├── services/
│   │   │   ├── AuthService.ts
│   │   │   ├── StockNotificationService.ts
│   │   │   └── ExportService.ts
│   │   └── dtos/
│   │       ├── CreateProductDTO.ts
│   │       ├── UpdateProductDTO.ts
│   │       └── RegisterSaleDTO.ts
│   │
│   ├── infrastructure/               # Infrastructure Layer
│   │   ├── database/
│   │   │   ├── neon-client.ts
│   │   │   └── migrations/
│   │   ├── repositories/
│   │   │   ├── ProductRepository.ts
│   │   │   ├── MovementRepository.ts
│   │   │   └── SaleRepository.ts
│   │   └── external/
│   │       └── (future integrations)
│   │
│   └── shared/                       # Shared Code
│       ├── components/
│       │   ├── ui/                   # shadcn/ui components
│       │   │   ├── button.tsx
│       │   │   ├── input.tsx
│       │   │   └── ...
│       │   └── layout/
│       │       ├── Sidebar.tsx
│       │       └── Header.tsx
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useProducts.ts
│       │   └── useToast.ts
│       ├── utils/
│       │   ├── format.ts
│       │   ├── validation.ts
│       │   └── errors.ts
│       └── types/
│           └── index.ts
│
├── public/                           # Static assets
├── tests/                            # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local                        # Environment variables
├── .env.example                      # Example env file
├── next.config.js                    # Next.js config
├── tailwind.config.js                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json
└── README.md
```

---

## 2. Convenções de Nomenclatura

### 2.1. Arquivos e Pastas

**Componentes React:**
- PascalCase: `ProductCard.tsx`, `UserProfile.tsx`
- Um componente por arquivo
- Nome do arquivo = nome do componente

**Hooks:**
- camelCase com prefixo `use`: `useAuth.ts`, `useProducts.ts`

**Utils/Helpers:**
- camelCase: `formatMoney.ts`, `validateEmail.ts`

**Types/Interfaces:**
- PascalCase: `Product.ts`, `CreateProductDTO.ts`

**Constantes:**
- UPPER_SNAKE_CASE: `MAX_PRODUCT_NAME_LENGTH`, `API_BASE_URL`

**Pastas:**
- kebab-case: `product-repository.ts`, `auth-service.ts`
- Ou camelCase para consistência: `productRepository.ts`

---

### 2.2. Variáveis e Funções

**Variáveis:**
```typescript
// ✅ Bom
const productName = 'Produto A';
const totalProducts = 10;
const isAuthenticated = true;

// ❌ Evitar
const ProductName = 'Produto A';  // PascalCase só para tipos
const total_products = 10;        // snake_case não usado
const is_authenticated = true;
```

**Funções:**
```typescript
// ✅ Bom
function createProduct(data: CreateProductDTO) {}
function calculateTotal(items: SaleItem[]) {}
async function fetchProducts(userId: string) {}

// ❌ Evitar
function CreateProduct() {}  // PascalCase só para componentes
function calculate_total() {}  // snake_case não usado
```

**Booleanos:**
```typescript
// ✅ Bom
const isActive = true;
const hasPermission = false;
const canEdit = true;

// Prefixos: is, has, can, should, will
```

---

### 2.3. Classes e Interfaces

**Classes:**
```typescript
// ✅ Bom
class ProductRepository {}
class AuthService {}

// PascalCase, substantivos
```

**Interfaces:**
```typescript
// ✅ Bom
interface IProductRepository {}  // Prefixo I para interfaces
interface Product {}
interface CreateProductDTO {}

// Para DTOs, usar sufixo DTO
```

**Types:**
```typescript
// ✅ Bom
type ProductStatus = 'active' | 'inactive';
type UserRole = 'admin' | 'user';
```

---

## 3. Padrões de Código

### 3.1. TypeScript

**Tipos Explícitos:**
```typescript
// ✅ Bom - tipos explícitos em funções públicas
export async function createProduct(
  data: CreateProductDTO
): Promise<Product> {
  // ...
}

// ✅ Bom - inference em variáveis locais
const products = await repository.findAll();
const total = products.length;
```

**Evitar `any`:**
```typescript
// ❌ Evitar
function processData(data: any) {}

// ✅ Preferir
function processData(data: unknown) {
  if (isValidData(data)) {
    // agora TypeScript sabe o tipo
  }
}
```

**Optional Chaining:**
```typescript
// ✅ Bom
const name = product?.name ?? 'Unknown';
const count = products?.length ?? 0;
```

---

### 3.2. React Components

**Componentes Funcionais:**
```typescript
// ✅ Bom
interface ProductCardProps {
  product: Product;
  onEdit?: (id: string) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <div>
      <h3>{product.name}</h3>
      {/* ... */}
    </div>
  );
}
```

**Server vs Client Components:**
```typescript
// ✅ Server Component (padrão)
export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />;
}

// ✅ Client Component (quando precisa interatividade)
'use client';

export function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  // ...
}
```

---

### 3.3. API Routes

**Estrutura Padrão:**
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { CreateProductUseCase } from '@/application/use-cases/products';

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Lógica aqui
    return NextResponse.json({ products: [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Similar estrutura
}
```

---

### 3.4. Use Cases

**Estrutura Padrão:**
```typescript
// application/use-cases/products/CreateProductUseCase.ts
export class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private logger: Logger
  ) {}

  async execute(
    data: CreateProductDTO,
    userId: string
  ): Promise<Product> {
    // 1. Validação
    this.validate(data);

    // 2. Criar entidade
    const product = Product.create({
      ...data,
      userId,
      currentStock: 0,
    });

    // 3. Persistir
    const savedProduct = await this.productRepository.create(product);

    // 4. Log
    this.logger.info('Product created', { productId: savedProduct.id });

    return savedProduct;
  }

  private validate(data: CreateProductDTO): void {
    // Validações de negócio
  }
}
```

---

### 3.5. Repositories

**Implementação:**
```typescript
// infrastructure/repositories/ProductRepository.ts
export class ProductRepository implements IProductRepository {
  constructor(private db: NeonDatabase) {}

  async create(product: Product): Promise<Product> {
    const sql = `
      INSERT INTO products (id, user_id, name, cost_price, sell_price, current_stock, min_stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const result = await this.db.query(sql, [
      product.id,
      product.userId,
      product.name,
      product.costPrice,
      product.sellPrice,
      product.currentStock,
      product.minStock,
    ]);

    return this.mapToDomain(result.rows[0]);
  }

  private mapToDomain(row: any): Product {
    return Product.create({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      // ... mapear campos snake_case para camelCase
    });
  }
}
```

---

## 4. Tratamento de Erros

### 4.1. Estrutura de Erros

```typescript
// domain/errors/DomainError.ts
export abstract class DomainError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

export class UnauthorizedError extends DomainError {
  constructor() {
    super('Unauthorized', 'UNAUTHORIZED', 401);
  }
}
```

### 4.2. Uso de Erros

```typescript
// ✅ Bom
if (!product) {
  throw new NotFoundError('Product');
}

if (quantity > product.currentStock) {
  throw new ValidationError('Insufficient stock');
}

// ✅ Capturar e tratar
try {
  await useCase.execute(data);
} catch (error) {
  if (error instanceof DomainError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  // Erro inesperado
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

---

## 5. Validação

### 5.1. Zod Schemas

```typescript
// shared/utils/validation.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3).max(100),
  costPrice: z.number().positive(),
  sellPrice: z.number().positive(),
  minStock: z.number().int().nonnegative().optional(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;
```

### 5.2. Validação em API Routes

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const validation = createProductSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Validation error', details: validation.error.errors },
      { status: 400 }
    );
  }

  const data = validation.data; // Type-safe!
  // ...
}
```

---

## 6. Testes

### 6.1. Estrutura de Testes

```typescript
// tests/unit/domain/Product.test.ts
import { describe, it, expect } from '@jest/globals';
import { Product } from '@/domain/entities/Product';

describe('Product', () => {
  it('should create a valid product', () => {
    const product = Product.create({
      name: 'Test Product',
      costPrice: 10,
      sellPrice: 15,
      userId: 'user-123',
    });

    expect(product.name).toBe('Test Product');
    expect(product.currentStock).toBe(0);
  });

  it('should throw error for invalid price', () => {
    expect(() => {
      Product.create({
        name: 'Test',
        costPrice: -10, // Invalid
        sellPrice: 15,
        userId: 'user-123',
      });
    }).toThrow(ValidationError);
  });
});
```

### 6.2. Mocks

```typescript
// tests/unit/application/CreateProductUseCase.test.ts
import { CreateProductUseCase } from '@/application/use-cases/products';
import { IProductRepository } from '@/domain/repositories/IProductRepository';

describe('CreateProductUseCase', () => {
  it('should create product successfully', async () => {
    const mockRepository: jest.Mocked<IProductRepository> = {
      create: jest.fn().mockResolvedValue(mockProduct),
      // ... outros métodos
    };

    const useCase = new CreateProductUseCase(mockRepository);
    const result = await useCase.execute(data, userId);

    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProduct);
  });
});
```

---

## 7. Git e Versionamento

### 7.1. Commits

**Formato:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat(products): add product creation form
fix(auth): handle expired tokens correctly
docs(api): update API documentation
refactor(domain): extract product validation logic
```

### 7.2. Branches

**Estrutura:**
- `main`: Produção
- `develop`: Desenvolvimento
- `feature/*`: Novas funcionalidades
- `fix/*`: Correções
- `hotfix/*`: Hotfixes urgentes

**Exemplos:**
- `feature/product-crud`
- `fix/stock-calculation`
- `hotfix/auth-bug`

---

## 8. Code Review

### 8.1. Checklist

**Funcionalidade:**
- [ ] Código faz o que deveria fazer?
- [ ] Edge cases foram considerados?
- [ ] Erros são tratados adequadamente?

**Código:**
- [ ] Segue padrões do projeto?
- [ ] É legível e bem documentado?
- [ ] Não há código duplicado?
- [ ] Performance é adequada?

**Testes:**
- [ ] Testes foram escritos?
- [ ] Cobertura adequada?
- [ ] Testes passam?

**Segurança:**
- [ ] Inputs são validados?
- [ ] Autenticação/autorização corretas?
- [ ] Sem vulnerabilidades conhecidas?

---

## 9. Performance

### 9.1. Best Practices

**Database:**
- Usar índices adequados
- Paginação em listagens
- Evitar N+1 queries
- Prepared statements

**Frontend:**
- Server Components quando possível
- Code splitting
- Lazy loading
- Image optimization

**Caching:**
- Cache apropriado em API routes
- Revalidation quando necessário
- Static generation onde possível

---

## 10. Segurança

### 10.1. Checklist

- [ ] Inputs validados (frontend + backend)
- [ ] SQL injection prevenido (prepared statements)
- [ ] XSS prevenido (React escape automático)
- [ ] CSRF protection (Next.js built-in)
- [ ] Senhas hasheadas (bcrypt)
- [ ] Tokens seguros (JWT, HTTP-only cookies)
- [ ] Rate limiting implementado
- [ ] HTTPS obrigatório (produção)

---

## 11. Documentação

### 11.1. Comentários

**Quando comentar:**
- Complex business logic
- Workarounds temporários
- Decisões não óbvias
- TODOs

**Como comentar:**
```typescript
// ✅ Bom
// Calcula margem de lucro: (venda - custo) / custo * 100
const margin = ((sellPrice - costPrice) / costPrice) * 100;

// ❌ Evitar
// Incrementa i
i++;
```

### 11.2. README

Manter README.md atualizado com:
- Setup do projeto
- Como rodar localmente
- Estrutura do projeto
- Scripts disponíveis
- Variáveis de ambiente

---

## 12. Ferramentas e Configurações

### 12.1. ESLint

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### 12.2. Prettier

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

---

## 13. Recursos e Referências

### 13.1. Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Neon Docs](https://neon.tech/docs)

### 13.2. Padrões

- Clean Architecture (Robert C. Martin)
- DDD (Eric Evans)
- SOLID Principles
- Clean Code

---

**Documento criado por**: Arquiteto de Software  
**Data**: [Data atual]  
**Versão**: 1.0  
**Status**: Completo - Guia de referência para desenvolvimento

