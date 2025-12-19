# Scripts de Banco de Dados

## Schema (schema.sql)

Este arquivo contém a estrutura completa do banco de dados:
- Criação de todas as tabelas
- Índices
- Constraints
- Triggers

## Seed (seed.sql)

Este arquivo popula o banco com dados de teste para desenvolvimento.

**IMPORTANTE**: Este script **APAGA TODOS OS DADOS** antes de inserir novos!

## Como Usar

### 1. Executar Schema

```bash
psql $DATABASE_URL < database/schema.sql
```

Ou usando o Neon Console:
1. Acesse o console do Neon
2. Vá em SQL Editor
3. Cole o conteúdo de `schema.sql`
4. Execute

### 2. Executar Seed (opcional)

```bash
psql $DATABASE_URL < database/seed.sql
```

**Atenção**: O seed apaga todos os dados existentes!

## Dados de Teste

O seed cria:
- 1 usuário: `test@example.com` (senha: `password123`)
- 5 produtos
- Algumas movimentações
- 2 fornecedores
- 1 venda de exemplo

**Credenciais de teste:**
- Email: `test@example.com`
- Senha: `password123`

⚠️ **IMPORTANTE - Como criar o usuário de teste:**

**OPÇÃO RECOMENDADA - Via API de Registro:**
1. Certifique-se de que o servidor está rodando: `npm run dev`
2. Acesse a página de cadastro: `http://localhost:3000/register`
3. Cadastre o usuário com:
   - **Email**: `test@example.com`
   - **Senha**: `password123`
   - **Confirmar senha**: `password123`
4. Clique em "Cadastrar"
5. Agora você pode fazer login em `http://localhost:3000/login` com essas credenciais

**Por que usar a API?**
- O hash bcrypt é gerado corretamente pelo sistema
- Garante que o login funcionará
- É a forma mais confiável

**Nota sobre seed.sql:**
O arquivo `seed.sql` contém um placeholder de hash que **NÃO funciona**. Se você executou o seed.sql, o usuário foi criado mas o hash não é válido. Nesse caso:
- Delete o usuário no banco: `DELETE FROM users WHERE email = 'test@example.com';`
- Crie novamente via API (passos acima)

⚠️ **ATENÇÃO**: Estas credenciais são apenas para desenvolvimento/testes. NUNCA use em produção!

