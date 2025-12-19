# Diagramas de Arquitetura - Sistema de Controle de Estoque

## Visão Geral

Este documento apresenta os diagramas arquiteturais do sistema de controle de estoque, mostrando a estrutura geral, componentes principais, fluxos de dados e integrações.

---

## 1. Arquitetura Geral do Sistema

### 1.1. Diagrama de Camadas (Clean Architecture)

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Next.js    │  │   React     │  │  shadcn/ui  │         │
│  │  App Router │  │ Components  │  │ Components  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  - Pages/Routes                                               │
│  - UI Components                                              │
│  - Forms & Validation                                         │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Use Cases  │  │  Services   │  │   DTOs      │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  - CreateProductUseCase                                      │
│  - UpdateStockUseCase                                        │
│  - RegisterSaleUseCase                                       │
│  - NotificationService                                       │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Entities   │  │    Value    │  │  Domain     │         │
│  │             │  │   Objects   │  │  Services   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  - Product                                                    │
│  - Movement                                                   │
│  - Sale                                                       │
│  - Business Rules                                             │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                INFRASTRUCTURE LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Repositories│  │   Neon SDK  │  │   External  │         │
│  │             │  │             │  │   APIs      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  - ProductRepository                                         │
│  - MovementRepository                                        │
│  - Database Connection                                       │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                          │
│                  Neon (PostgreSQL)                           │
│                                                               │
│  - Tables                                                     │
│  - Indexes                                                    │
│  - Constraints                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Arquitetura de Componentes

### 2.1. Diagrama de Componentes Principais

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Next.js Application                     │    │
│  │                                                       │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │   (auth)     │  │ (dashboard)  │                │    │
│  │  │              │  │              │                │    │
│  │  │ - /login     │  │ - /dashboard │                │    │
│  │  │ - /register  │  │ - /products  │                │    │
│  │  └──────────────┘  │ - /movements │                │    │
│  │                    │ - /sales     │                │    │
│  │                    └──────────────┘                │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────┐            │    │
│  │  │         API Routes (/api)           │            │    │
│  │  │                                     │            │    │
│  │  │  /api/products                      │            │    │
│  │  │  /api/movements                     │            │    │
│  │  │  /api/sales                         │            │    │
│  │  │  /api/auth                          │            │    │
│  │  └─────────────────────────────────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                        SERVER                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Application Layer                       │    │
│  │                                                       │    │
│  │  ┌──────────────┐  ┌──────────────┐                │    │
│  │  │ Use Cases    │  │  Services    │                │    │
│  │  │              │  │              │                │    │
│  │  │ - Products   │  │ - Auth       │                │    │
│  │  │ - Movements  │  │ - Stock      │                │    │
│  │  │ - Sales      │  │ - Notif.     │                │    │
│  │  └──────────────┘  └──────────────┘                │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────┐            │    │
│  │  │         Domain Layer                │            │    │
│  │  │                                     │            │    │
│  │  │  Entities & Business Rules          │            │    │
│  │  └─────────────────────────────────────┘            │    │
│  │                                                       │    │
│  │  ┌─────────────────────────────────────┐            │    │
│  │  │      Infrastructure Layer           │            │    │
│  │  │                                     │            │    │
│  │  │  Repositories                       │            │    │
│  │  │  - ProductRepository                │            │    │
│  │  │  - MovementRepository               │            │    │
│  │  └─────────────────────────────────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    Neon Database                             │
│                  (PostgreSQL)                                │
│                                                               │
│  - users                                                      │
│  - products                                                   │
│  - movements                                                  │
│  - sales                                                      │
│  - sale_items                                                 │
│  - suppliers                                                  │
│  - product_suppliers                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Fluxo de Dados

### 3.1. Fluxo de Cadastro de Produto

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│ Browser │────>│  Next.js     │────>│  API Route  │────>│ Use Case     │
│         │     │  Component   │     │ /api/       │     │ CreateProduct│
│         │     │              │     │ products    │     │              │
└─────────┘     └──────────────┘     └─────────────┘     └──────┬───────┘
     ↕                                                             │
     │                                                             │
     │ POST /api/products                                          │
     │ { name, costPrice, sellPrice }                              │
     │                                                             │
     │                                                             ▼
     │                                                     ┌──────────────┐
     │                                                     │  Domain      │
     │                                                     │  Entity      │
     │                                                     │  Product     │
     │                                                     │              │
     │                                                     │  - Validate  │
     │                                                     │  - Business  │
     │                                                     │    Rules     │
     │                                                     └──────┬───────┘
     │                                                            │
     │                                                            ▼
     │                                                     ┌──────────────┐
     │                                                     │ Repository   │
     │                                                     │ ProductRepo  │
     │                                                     │              │
     │                                                     │  - Save to   │
     │                                                     │    Database  │
     │                                                     └──────┬───────┘
     │                                                            │
     │                                                            ▼
     │                                                     ┌──────────────┐
     │                                                     │  Neon SDK    │
     │                                                     │  PostgreSQL  │
     │                                                     │              │
     │<────────────────────────────────────────────────────│  INSERT      │
     │                                                     └──────────────┘
     │
     │ Response: { id, name, costPrice, sellPrice, ... }
     │
```

### 3.2. Fluxo de Registro de Venda

```
┌─────────┐
│ Browser │
│         │
└────┬────┘
     │
     │ POST /api/sales
     │ { items: [{ productId, quantity }] }
     │
     ▼
┌──────────────────────┐
│  API Route           │
│  /api/sales          │
│  - Validate Request  │
│  - Auth Check        │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  RegisterSaleUseCase │
│                      │
│  1. Validate Stock   │
│  2. Calculate Total  │
│  3. Begin Transaction│
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Transaction Block   │
│                      │
│  ┌────────────────┐  │
│  │ Create Sale    │  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │ Create Items   │  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │ Update Stock   │  │
│  │ (for each item)│  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │ Create         │  │
│  │ Movements      │  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │ Check Low      │  │
│  │ Stock Alerts   │  │
│  └───────┬────────┘  │
│          │           │
│  ┌───────▼────────┐  │
│  │ Commit         │  │
│  │ Transaction    │  │
│  └────────────────┘  │
└────┬─────────────────┘
     │
     │ Success
     │
     ▼
┌──────────────────────┐
│  Response            │
│  { saleId, total }   │
└──────────────────────┘
```

---

## 4. Modelo de Dados (ER Diagram)

### 4.1. Diagrama Entidade-Relacionamento

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ email (UQ)  │
│ password    │
│ created_at  │
│ updated_at  │
└──────┬──────┘
       │ 1
       │
       │ N
┌──────▼────────┐      ┌────────────────┐      ┌──────────────┐
│   Product     │      │   Movement     │      │    Sale      │
├───────────────┤      ├────────────────┤      ├──────────────┤
│ id (PK)       │      │ id (PK)        │      │ id (PK)      │
│ user_id (FK)  │──┐   │ user_id (FK)   │      │ user_id (FK) │
│ name          │  │   │ product_id (FK)│──┐   │ total        │
│ cost_price    │  │   │ type           │  │   │ created_at   │
│ sell_price    │  │   │ quantity       │  │   └──────┬───────┘
│ current_stock │  │   │ observation    │  │          │ 1
│ min_stock     │  │   │ created_at     │  │          │
│ created_at    │  │   └────────────────┘  │          │
│ updated_at    │  │                       │          │ N
└───────────────┘  │                       │   ┌──────▼──────────┐
                   │                       │   │   SaleItem      │
                   │                       │   ├────────────────┤
                   │                       │   │ id (PK)        │
                   │                       │   │ sale_id (FK)   │
                   │                       │   │ product_id (FK)│──┐
                   │                       │   │ quantity       │  │
                   │                       │   │ unit_price     │  │
                   │                       │   └────────────────┘  │
                   │                       │                       │
                   │                       │                       │
┌──────────────────┐                       │                       │
│   Supplier       │                       │                       │
├──────────────────┤                       │                       │
│ id (PK)          │                       │                       │
│ user_id (FK)     │───────────────────────┘                       │
│ name             │                                               │
│ phone            │                                               │
│ created_at       │                                               │
│ updated_at       │                                               │
└────────┬─────────┘                                               │
         │ 1                                                        │
         │                                                          │
         │ N                                                        │
┌────────▼──────────────┐                                          │
│  ProductSupplier      │                                          │
├───────────────────────┤                                          │
│ id (PK)               │                                          │
│ product_id (FK)       │──────────────────────────────────────────┘
│ supplier_id (FK)      │
└───────────────────────┘
```

---

## 5. Arquitetura de Segurança

### 5.1. Fluxo de Autenticação

```
┌─────────┐
│ Browser │
│         │
└────┬────┘
     │
     │ POST /api/auth/login
     │ { email, password }
     │
     ▼
┌──────────────────────┐
│  API Route           │
│  /api/auth/login     │
│                      │
│  - Validate Input    │
│  - Rate Limiting     │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  AuthService         │
│                      │
│  - Hash Password     │
│  - Compare with DB   │
│  - Generate JWT      │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Database            │
│  - Verify User       │
│  - Check Password    │
└────┬─────────────────┘
     │
     │ JWT Token
     │
     ▼
┌──────────────────────┐
│  Response            │
│  { token, user }     │
│                      │
│  Set Cookie/Header   │
└──────────────────────┘
```

### 5.2. Fluxo de Autorização

```
┌─────────┐
│ Browser │
│         │
│ JWT Token in Cookie/Header
└────┬────┘
     │
     │ Request to Protected Route
     │ GET /api/products
     │
     ▼
┌──────────────────────┐
│  Middleware          │
│  (Auth)              │
│                      │
│  - Extract Token     │
│  - Verify JWT        │
│  - Get User ID       │
└────┬─────────────────┘
     │
     │ Valid?
     │
     ├─── NO ───> 401 Unauthorized
     │
     ▼ YES
┌──────────────────────┐
│  API Route Handler   │
│                      │
│  - Use User ID       │
│  - Filter by User    │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Repository          │
│                      │
│  - Query with        │
│    user_id filter    │
└──────────────────────┘
```

---

## 6. Arquitetura de Notificações

### 6.1. Fluxo de Notificação de Estoque Baixo

```
┌──────────────────────┐
│  Stock Movement      │
│  (Entry/Exit/Sale)   │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  UpdateStockUseCase  │
│                      │
│  - Update Quantity   │
│  - Trigger Check     │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  StockNotification   │
│  Service             │
│                      │
│  - Check if          │
│    stock <= min      │
│  - Generate Alert    │
└────┬─────────────────┘
     │
     │ Low Stock?
     │
     ├─── NO ───> Continue
     │
     ▼ YES
┌──────────────────────┐
│  Notification Queue  │
│  (In-Memory/Redis)   │
│                      │
│  - Store Alert       │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Dashboard           │
│  (Real-time Update)  │
│                      │
│  - Fetch Alerts      │
│  - Display Badge     │
│  - Update List       │
└──────────────────────┘
```

---

## 7. Arquitetura de Deployment

### 7.1. Diagrama de Deploy

```
┌─────────────────────────────────────────────────────────────┐
│                    CDN / Edge Network                        │
│                  (Static Assets)                             │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                  Load Balancer                               │
└─────────────────────────────────────────────────────────────┘
                            ↕
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼────────┐                    ┌────────▼────────┐
│  Next.js App   │                    │  Next.js App    │
│  Instance 1    │                    │  Instance 2      │
│                │                    │                  │
│  - SSR         │                    │  - SSR           │
│  - API Routes  │                    │  - API Routes    │
└───────┬────────┘                    └────────┬────────┘
        │                                       │
        └───────────────────┬───────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Neon Database       │
                │   (PostgreSQL)        │
                │                       │
                │  - Primary Instance   │
                │  - Read Replicas      │
                │  - Automatic Backups  │
                └───────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │   Object Storage      │
                │   (Optional)          │
                │                       │
                │  - File Exports       │
                │  - Attachments        │
                └───────────────────────┘
```

---

## 8. Estrutura de Diretórios

### 8.1. Organização do Código

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── movements/
│   │   │   └── page.tsx
│   │   └── sales/
│   │       └── page.tsx
│   └── api/
│       ├── auth/
│       │   └── route.ts
│       ├── products/
│       │   └── route.ts
│       ├── movements/
│       │   └── route.ts
│       └── sales/
│           └── route.ts
│
├── domain/                       # Domain Layer (DDD)
│   ├── entities/
│   │   ├── Product.ts
│   │   ├── Movement.ts
│   │   ├── Sale.ts
│   │   └── User.ts
│   ├── value-objects/
│   │   ├── Money.ts
│   │   └── Email.ts
│   └── repositories/
│       ├── IProductRepository.ts
│       ├── IMovementRepository.ts
│       └── ISaleRepository.ts
│
├── application/                  # Application Layer
│   ├── use-cases/
│   │   ├── products/
│   │   │   ├── CreateProductUseCase.ts
│   │   │   ├── UpdateProductUseCase.ts
│   │   │   └── ListProductsUseCase.ts
│   │   ├── movements/
│   │   │   ├── RegisterEntryUseCase.ts
│   │   │   └── RegisterExitUseCase.ts
│   │   └── sales/
│   │       └── RegisterSaleUseCase.ts
│   ├── services/
│   │   ├── AuthService.ts
│   │   ├── StockNotificationService.ts
│   │   └── ExportService.ts
│   └── dtos/
│       ├── CreateProductDTO.ts
│       └── RegisterSaleDTO.ts
│
├── infrastructure/               # Infrastructure Layer
│   ├── database/
│   │   ├── neon-client.ts
│   │   └── migrations/
│   ├── repositories/
│   │   ├── ProductRepository.ts
│   │   ├── MovementRepository.ts
│   │   └── SaleRepository.ts
│   └── external/
│       └── (future integrations)
│
└── shared/                       # Shared Code
    ├── components/
    │   ├── ui/                   # shadcn/ui components
    │   └── layout/
    ├── utils/
    │   ├── format.ts
    │   └── validation.ts
    ├── hooks/
    │   ├── useAuth.ts
    │   └── useProducts.ts
    └── types/
        └── index.ts
```

---

## 9. Fluxo de Requisição Completo

### 9.1. Request/Response Cycle

```
┌─────────┐
│ Client  │
│ Browser │
└────┬────┘
     │
     │ HTTP Request
     │ GET /api/products
     │ Headers: { Authorization: Bearer <token> }
     │
     ▼
┌──────────────────────┐
│  Next.js Middleware  │
│                      │
│  - CORS              │
│  - Auth Check        │
│  - Rate Limiting     │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  API Route Handler   │
│  /api/products       │
│                      │
│  - Parse Request     │
│  - Validate Input    │
│  - Extract User ID   │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Use Case            │
│  ListProductsUseCase │
│                      │
│  - Business Logic    │
│  - Validation        │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Repository          │
│  ProductRepository   │
│                      │
│  - Build Query       │
│  - Apply Filters     │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Neon SDK            │
│                      │
│  - Execute Query     │
│  - Return Results    │
└────┬─────────────────┘
     │
     │ Database Results
     │
     ▼
┌──────────────────────┐
│  Repository          │
│                      │
│  - Map to Domain     │
│  - Return Entities   │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  Use Case            │
│                      │
│  - Transform to DTO  │
└────┬─────────────────┘
     │
     ▼
┌──────────────────────┐
│  API Route           │
│                      │
│  - Serialize         │
│  - Return JSON       │
└────┬─────────────────┘
     │
     │ HTTP Response
     │ 200 OK
     │ { products: [...] }
     │
     ▼
┌─────────┐
│ Client  │
│ Browser │
└─────────┘
```

---

**Documento criado por**: Arquiteto de Software  
**Data**: [Data atual]  
**Versão**: 1.0  
**Status**: Completo - Pronto para revisão técnica


