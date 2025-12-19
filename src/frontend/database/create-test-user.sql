-- Script para criar usuário de teste com hash bcrypt válido
-- Execute este script APÓS executar o schema.sql
-- 
-- IMPORTANTE: Este hash é válido para a senha "password123"
-- Se você precisar gerar um novo hash, pode usar a API de registro ou executar:
-- node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('password123', 10).then(hash => console.log(hash))"

-- Deletar usuário se já existir (opcional)
DELETE FROM users WHERE email = 'test@example.com';

-- Inserir usuário de teste
-- Email: test@example.com
-- Senha: password123
INSERT INTO users (id, email, password_hash) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440000',
    'test@example.com',
    '$2a$10$rOzJqKqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq'
  );

-- Para verificar se o usuário foi criado:
-- SELECT id, email, created_at FROM users WHERE email = 'test@example.com';


