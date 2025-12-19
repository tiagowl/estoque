-- Seed Data - Dados de Teste
-- IMPORTANTE: Este script é apenas para desenvolvimento/testes

-- Limpar dados existentes (CUIDADO em produção!)
TRUNCATE TABLE product_suppliers CASCADE;
TRUNCATE TABLE sale_items CASCADE;
TRUNCATE TABLE sales CASCADE;
TRUNCATE TABLE movements CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE suppliers CASCADE;
TRUNCATE TABLE users CASCADE;

-- Inserir usuário de teste
-- Senha: "password123" (hash com bcrypt)
INSERT INTO users (id, email, password_hash) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440000',
    'test@example.com',
    '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' -- bcrypt hash de "password123"
  );

-- Inserir produtos de teste
INSERT INTO products (id, user_id, name, cost_price, sell_price, current_stock, min_stock) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Produto A', 10.00, 15.00, 50, 10),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Produto B', 20.00, 30.00, 25, 5),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Produto C', 5.00, 8.00, 0, 10),
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Produto D', 15.00, 25.00, 8, 15),
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'Produto E', 12.00, 20.00, 100, 20);

-- Inserir movimentações de teste
INSERT INTO movements (id, user_id, product_id, type, quantity, observation) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'ENTRY', 50, 'Compra inicial'),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'ENTRY', 30, 'Compra inicial'),
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'EXIT', 5, 'Venda'),
  ('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440003', 'ENTRY', 10, 'Reposição'),
  ('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440003', 'EXIT', 10, 'Venda');

-- Inserir fornecedores de teste
INSERT INTO suppliers (id, user_id, name, phone) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Fornecedor A', '(11) 1234-5678'),
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Fornecedor B', '(11) 9876-5432');

-- Relacionar produtos com fornecedores
INSERT INTO product_suppliers (product_id, supplier_id) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001'),
  ('660e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001'),
  ('660e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002');

-- Inserir vendas de teste
INSERT INTO sales (id, user_id, total) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 75.00);

-- Inserir itens de venda
INSERT INTO sale_items (id, sale_id, product_id, quantity, unit_price) VALUES
  ('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 2, 15.00),
  ('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', 1, 30.00),
  ('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', 1, 15.00);

